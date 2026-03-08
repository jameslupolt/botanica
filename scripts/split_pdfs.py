#!/usr/bin/env python3
"""Split large reference PDFs into per-chapter files.

Strategy:
  1. If the PDF has a TOC (bookmarks), use it to find chapter boundaries.
  2. If no TOC, scan page text for chapter heading patterns as a fallback.
  3. Create a subfolder per book and write one PDF per chapter.
"""

import os
import re
import sys
import fitz  # PyMuPDF


REFERENCES_DIR = os.path.join(os.path.dirname(__file__), "..", "references")


def sanitize_filename(name: str) -> str:
    """Remove or replace characters unsafe for filenames."""
    name = re.sub(r'[<>:"/\\|?*]', "", name)
    name = re.sub(r"\s+", " ", name).strip()
    # Truncate to reasonable length
    if len(name) > 120:
        name = name[:120].rstrip()
    return name


def short_book_name(filename: str) -> str:
    """Derive a short folder name from the long PDF filename."""
    mapping = {
        "Taiz": "Taiz-PlantPhysiology-7e",
        "Raven": "Raven-BiologyOfPlants-8e",
        "Stern": "Stern-IntroPlantBiology",
        "Judd": "Judd-PlantSystematics-4e",
    }
    for key, short in mapping.items():
        if key in filename:
            return short
    # Fallback: first 50 chars
    return sanitize_filename(filename[:50])


# ---------------------------------------------------------------------------
# TOC-based splitting
# ---------------------------------------------------------------------------


def split_taiz(doc: fitz.Document, toc: list, out_dir: str):
    """Split Taiz — flat L1 TOC with internal file-based names."""
    chapters = []
    for i, (level, title, page) in enumerate(toc):
        # Derive friendly name from coded title like '01_Taiz7e-Ch01'
        match = re.match(
            r"\d+_Taiz7e-(Ch\d+|FM|Glossary|Illustration Credits|Index)", title
        )
        if match:
            tag = match.group(1)
            if tag == "FM":
                friendly = "00 - Front Matter"
            elif tag.startswith("Ch"):
                friendly = f"{tag.replace('Ch', 'Chapter ')}"
            else:
                friendly = tag
        else:
            friendly = sanitize_filename(title)
        start = page - 1  # fitz is 0-indexed
        end = toc[i + 1][2] - 2 if i + 1 < len(toc) else doc.page_count - 1
        chapters.append((friendly, start, end))
    write_chapters(doc, chapters, out_dir)


def split_raven(doc: fitz.Document, toc: list, out_dir: str):
    """Split Raven — hierarchical TOC; split at CHAPTER level (L2) and
    also keep major section intros and front/back matter."""
    chapters = []
    # Collect chapter-level entries (L2 with 'CHAPTER' in title) plus
    # some L1 entries for front/back matter
    split_points = []
    for i, (level, title, page) in enumerate(toc):
        if level == 2 and "CHAPTER" in title.upper():
            split_points.append((title, page))
        elif level == 1 and any(
            kw in title.upper()
            for kw in [
                "PREFACE",
                "INTRODUCTION",
                "APPENDIX",
                "GLOSSARY",
                "INDEX",
                "CONTENTS",
            ]
        ):
            split_points.append((title, page))

    # If we found chapter entries, also capture front matter (pages before first split)
    if split_points:
        first_page = split_points[0][1]
        if first_page > 1:
            split_points.insert(0, ("Front Matter", 1))

    # Sort by page
    split_points.sort(key=lambda x: x[1])

    # De-duplicate same page entries (keep first)
    seen_pages = set()
    deduped = []
    for title, page in split_points:
        if page not in seen_pages:
            seen_pages.add(page)
            deduped.append((title, page))
    split_points = deduped

    for i, (title, page) in enumerate(split_points):
        start = page - 1
        end = (
            split_points[i + 1][1] - 2
            if i + 1 < len(split_points)
            else doc.page_count - 1
        )
        friendly = sanitize_filename(title)
        # Prefix with index for ordering
        friendly = f"{i:02d} - {friendly}"
        chapters.append((friendly, start, end))

    write_chapters(doc, chapters, out_dir)


# ---------------------------------------------------------------------------
# Text-based fallback for PDFs without TOC
# ---------------------------------------------------------------------------

CHAPTER_PATTERNS = [
    # "Chapter 1", "CHAPTER 1", "Chapter 1:", "Chapter One"
    re.compile(r"^\s*(?:CHAPTER|Chapter)\s+(\d+|[A-Z][a-z]+)", re.MULTILINE),
    # Just large-font standalone numbers with "chapter" nearby
    re.compile(r"(?:^|\n)\s*(\d{1,2})\s*\n", re.MULTILINE),
]


def detect_chapters_by_text(doc: fitz.Document) -> list:
    """Scan pages for chapter heading patterns. Returns [(title, start_page_0idx), ...]"""
    found = []
    for page_num in range(doc.page_count):
        page = doc[page_num]
        text = page.get_text("text")
        if not text:
            continue
        # Only check first ~500 chars of the page (chapter headings are at top)
        snippet = text[:500]
        for pat in CHAPTER_PATTERNS:
            m = pat.search(snippet)
            if m:
                # Extract a reasonable title from the match context
                # Grab up to 80 chars from the match start
                title_text = snippet[m.start() : m.start() + 80].strip()
                # Clean to first newline
                title_text = title_text.split("\n")[0].strip()
                if title_text and len(title_text) > 3:
                    found.append((title_text, page_num))
                    break  # One match per page is enough
    return found


def split_by_text_detection(doc: fitz.Document, out_dir: str, book_label: str):
    """Split a PDF using text-based chapter detection."""
    detected = detect_chapters_by_text(doc)

    if len(detected) < 3:
        # Too few detections — fall back to fixed ~50-page chunks
        print(
            f"  WARNING: Only {len(detected)} chapters detected by text for {book_label}."
        )
        print(f"  Falling back to ~50-page chunks.")
        split_by_fixed_chunks(doc, out_dir, chunk_size=50)
        return

    # Deduplicate nearby pages (within 2 pages)
    deduped = [detected[0]]
    for title, page in detected[1:]:
        if page - deduped[-1][1] >= 3:
            deduped.append((title, page))
    detected = deduped

    # Add front matter if first chapter doesn't start at page 0
    chapters = []
    if detected[0][1] > 2:
        chapters.append(("00 - Front Matter", 0, detected[0][1] - 1))

    for i, (title, start) in enumerate(detected):
        end = detected[i + 1][1] - 1 if i + 1 < len(detected) else doc.page_count - 1
        friendly = f"{i + 1:02d} - {sanitize_filename(title)}"
        chapters.append((friendly, start, end))

    write_chapters(doc, chapters, out_dir)


def split_by_fixed_chunks(doc: fitz.Document, out_dir: str, chunk_size: int = 50):
    """Last resort: split into fixed-size page chunks."""
    total = doc.page_count
    chapters = []
    for start in range(0, total, chunk_size):
        end = min(start + chunk_size - 1, total - 1)
        label = f"Pages {start + 1:04d}-{end + 1:04d}"
        chapters.append((label, start, end))
    write_chapters(doc, chapters, out_dir)


# ---------------------------------------------------------------------------
# Common writer
# ---------------------------------------------------------------------------


def write_chapters(doc: fitz.Document, chapters: list, out_dir: str):
    """Write chapter PDFs. chapters = [(friendly_name, start_page_0idx, end_page_0idx), ...]"""
    os.makedirs(out_dir, exist_ok=True)
    for name, start, end in chapters:
        if start > end:
            continue
        out_path = os.path.join(out_dir, f"{name}.pdf")
        new_doc = fitz.open()
        new_doc.insert_pdf(doc, from_page=start, to_page=end)
        new_doc.save(out_path)
        new_doc.close()
        page_count = end - start + 1
        print(f"  -> {name}.pdf  ({page_count} pages)")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def main():
    ref_dir = os.path.abspath(REFERENCES_DIR)
    if not os.path.isdir(ref_dir):
        print(f"ERROR: references directory not found: {ref_dir}")
        sys.exit(1)

    pdfs = sorted(f for f in os.listdir(ref_dir) if f.lower().endswith(".pdf"))
    if not pdfs:
        print("No PDFs found in references/")
        sys.exit(1)

    print(f"Found {len(pdfs)} PDFs to split.\n")

    for fname in pdfs:
        path = os.path.join(ref_dir, fname)
        folder_name = short_book_name(fname)
        out_dir = os.path.join(ref_dir, "chapters", folder_name)

        print(f"Processing: {fname[:70]}...")
        doc = fitz.open(path)
        toc = doc.get_toc()
        print(f"  Pages: {doc.page_count}, TOC entries: {len(toc)}")

        if "Taiz" in fname and len(toc) > 0:
            split_taiz(doc, toc, out_dir)
        elif "Raven" in fname and len(toc) > 5:
            split_raven(doc, toc, out_dir)
        elif len(toc) > 5:
            # Generic TOC split for any other book with bookmarks
            split_raven(doc, toc, out_dir)  # Reuse hierarchical logic
        else:
            # No TOC — text-based detection
            split_by_text_detection(doc, out_dir, fname[:40])

        doc.close()
        print(f"  Output: {out_dir}\n")

    print("Done! All PDFs split into references/chapters/")


if __name__ == "__main__":
    main()
