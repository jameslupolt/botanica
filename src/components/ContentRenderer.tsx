import { Info, Lightbulb, AlertTriangle, Sparkles } from 'lucide-react';
import type { ContentBlock } from '../types';
import { RegionalExample } from './RegionalExample';

const CALLOUT_STYLES = {
  info: {
    bg: 'bg-sky-50 border-sky-300',
    icon: Info,
    iconColor: 'text-sky-600',
  },
  warning: {
    bg: 'bg-amber-50 border-amber-300',
    icon: AlertTriangle,
    iconColor: 'text-amber-600',
  },
  tip: {
    bg: 'bg-leaf-100 border-leaf-400',
    icon: Lightbulb,
    iconColor: 'text-leaf-600',
  },
  fact: {
    bg: 'bg-purple-50 border-purple-300',
    icon: Sparkles,
    iconColor: 'text-purple-600',
  },
};

function RenderBlock({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'heading':
      return (
        <h3 className="mt-6 mb-3 text-xl font-display font-semibold text-bark-800">
          {block.text}
        </h3>
      );

    case 'text':
      return (
        <p className="mb-4 leading-relaxed text-bark-700">
          {block.text}
        </p>
      );

    case 'image':
      return (
        <figure className="my-6">
          <img
            src={block.src}
            alt={block.alt}
            className="w-full rounded-xl shadow-md"
          />
          {block.caption && (
            <figcaption className="mt-2 text-center text-sm text-bark-500 italic">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul';
      return (
        <Tag
          className={`mb-4 ml-6 space-y-1.5 ${
            block.ordered ? 'list-decimal' : 'list-disc'
          } text-bark-700 leading-relaxed`}
        >
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </Tag>
      );
    }

    case 'callout': {
      const style = CALLOUT_STYLES[block.variant];
      const Icon = style.icon;
      return (
        <div className={`my-5 rounded-xl border-l-4 p-4 ${style.bg}`}>
          <div className="flex items-start gap-3">
            <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${style.iconColor}`} />
            <div>
              <p className="font-semibold text-bark-800">{block.title}</p>
              <p className="mt-1 text-sm text-bark-600">{block.text}</p>
            </div>
          </div>
        </div>
      );
    }

    case 'key-term':
      return (
        <div className="my-4 rounded-xl bg-bark-50 border border-bark-200 p-4">
          <span className="inline-block rounded-md bg-bark-200 px-2 py-0.5 text-sm font-bold text-bark-800">
            {block.term}
          </span>
          <p className="mt-2 text-sm text-bark-600 leading-relaxed">
            {block.definition}
          </p>
        </div>
      );

    case 'regional-example':
      return <RegionalExample prompt={block.prompt} taxonId={block.taxonId} />;
  }
}

export function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="prose-botanical">
      {blocks.map((block, i) => (
        <RenderBlock key={i} block={block} />
      ))}
    </div>
  );
}
