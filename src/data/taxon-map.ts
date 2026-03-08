/**
 * Maps lesson IDs to iNaturalist taxon IDs so that regional examples
 * show organisms relevant to the lesson topic.
 *
 * Lessons not listed here default to Plantae (47126).
 */

// Verified iNaturalist taxon IDs
const PLANTAE = 47126;
const BRYOPHYTA = 311249;
const POLYPODIOPSIDA = 121943; // ferns
const PINOPSIDA = 136329; // conifers
const ANGIOSPERMAE = 47125; // flowering plants
const FUNGI = 47170;

const LESSON_TAXON_MAP: Record<string, number> = {
  // Diversity lessons — show the specific group being studied
  'bryophytes': BRYOPHYTA,
  'ferns-lycophytes': POLYPODIOPSIDA,
  'seedless-plants': BRYOPHYTA,
  'gymnosperms': PINOPSIDA,
  'angiosperm-diversity': ANGIOSPERMAE,
  'plant-evolution': PLANTAE,
  'algae': PLANTAE, // algae are polyphyletic; Plantae catches green algae

  // Reproduction — flowering plant focus
  'reproduction': ANGIOSPERMAE,
  'flowers-fruits-seeds': ANGIOSPERMAE,

  // Fungi lessons
  'fungi-biology': FUNGI,
  'fungi-interactions': FUNGI,

  // Families — flowering plants
  'angiosperm-families': ANGIOSPERMAE,

  // Microbiology — bacteria/viruses interact with all plants
  'prokaryotes-viruses': PLANTAE,

  // Paleobotany — show general plants/ferns
  'fossil-record-plants': PLANTAE,
  'early-land-plants': BRYOPHYTA,
  'coal-age-forests': POLYPODIOPSIDA,
  'mesozoic-cenozoic-flora': ANGIOSPERMAE,

  // Marine — kelp/seaweed are not in Plantae; use Plantae as broadest match
  'kelp-seaweed': PLANTAE,
  'seagrass-phytoplankton': ANGIOSPERMAE,
  'blue-carbon': ANGIOSPERMAE,
};

/**
 * Returns the iNaturalist taxon ID most relevant to the given lesson,
 * falling back to Plantae (47126) for general botany lessons.
 */
export function getTaxonIdForLesson(lessonId: string): number {
  return LESSON_TAXON_MAP[lessonId] ?? PLANTAE;
}
