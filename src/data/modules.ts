import type { Module } from '../types';

export const ALL_MODULES: Module[] = [
  {
    id: 'foundations',
    title: 'Foundations of Plant Biology',
    slug: 'foundations',
    description:
      'Start here. Learn what makes plant cells unique, how cells organize into tissues, and the major organs of a plant body.',
    icon: '🔬',
    color: 'leaf',
    order: 1,
    lessonIds: ['plant-cells', 'plant-biochemistry', 'cell-walls', 'plant-tissues', 'plant-structures', 'plant-development', 'roots', 'leaves', 'stems', 'secondary-growth'],
  },
  {
    id: 'physiology',
    title: 'How Plants Work',
    slug: 'physiology',
    description:
      'Explore the processes that keep plants alive — photosynthesis, respiration, water transport, nutrition, hormones, and growth.',
    icon: '⚡',
    color: 'sky',
    order: 2,
    lessonIds: [
      'membrane-transport',
      'photosynthesis',
      'respiration',
      'water-transport',
      'soil-nutrition',
      'plant-hormones',
      'plant-growth',
      'light-signaling',
      'secondary-metabolism',
      'phloem-transport',
      'mineral-assimilation',
      'signal-transduction',
      'flowering-photoperiodism',
      'senescence-cell-death',
      'plant-tropisms-circadian',
      'vegetative-organogenesis-axis',
      'vegetative-organogenesis-branching',
      'bioenergetics-plants',
      'stomatal-biology-gas-exchange',
      'chronoculture-plant-clocks',
    ],
  },
  {
    id: 'diversity',
    title: 'Plant Diversity',
    slug: 'diversity',
    description:
      'Survey the plant kingdom from mosses and ferns through conifers to the flowering plants that dominate the Earth today.',
    icon: '📚',
    color: 'bark',
    order: 3,
    lessonIds: ['taxonomy', 'algae', 'bryophytes', 'ferns-lycophytes', 'seedless-plants', 'gymnosperms', 'angiosperm-diversity', 'angiosperm-families', 'angiosperm-origins', 'plant-evolution', 'evolution-speciation', 'phylogenetic-methods', 'monocot-families', 'eudicot-families', 'phylogenetic-systematics-drilldown', 'reticulate-evolution-conflict'],
  },
  {
    id: 'reproduction',
    title: 'Reproduction & Genetics',
    slug: 'reproduction',
    description:
      'Understand how plants reproduce, the role of meiosis in life cycles, and the principles of plant genetics.',
    icon: '🌸',
    color: 'petal',
    order: 4,
    lessonIds: ['reproduction', 'meiosis-life-cycles', 'genetics', 'molecular-genetics', 'flowers-fruits-seeds', 'embryogenesis-germination', 'plant-biotechnology', 'reproductive-physiology-fruit-set', 'reproductive-stress-yield-stability'],
  },
  {
    id: 'ecology',
    title: 'Ecology & Interactions',
    slug: 'ecology',
    description:
      'Discover how plants interact with their environment, other organisms, and fungal partners.',
    icon: '🌍',
    color: 'leaf',
    order: 5,
    lessonIds: ['ecology', 'pollination-biology', 'fungi-interactions', 'plant-adaptations', 'plant-stress', 'prokaryotes-viruses', 'plants-and-people', 'ethnobotany', 'aquatic-plants', 'fungi-biology', 'global-ecology', 'biomes-plant-geography', 'ecological-succession', 'defense-growth-allocation'],
  },
  {
    id: 'applied',
    title: 'Applied Plant Science',
    slug: 'applied',
    description:
      'See botany in action — from crop fields and orchards to forests and food processing.',
    icon: '🌾',
    color: 'leaf',
    order: 6,
    lessonIds: ['crop-science', 'plant-breeding', 'horticulture', 'forestry', 'post-harvest'],
  },
  {
    id: 'soils',
    title: 'Soil Science',
    slug: 'soils',
    description:
      'Dig into the living skin of the Earth — how soils form, what they contain, and why they matter for every plant.',
    icon: '🪨',
    color: 'bark',
    order: 7,
    lessonIds: ['soil-formation', 'soil-classification', 'soil-biology', 'soil-chemistry', 'soil-degradation'],
  },
  {
    id: 'conservation',
    title: 'Conservation & Climate',
    slug: 'conservation',
    description:
      'Understand the threats plants face today — climate change, habitat loss, invasive species — and the science of restoring plant communities.',
    icon: '🌍',
    color: 'leaf',
    order: 8,
    lessonIds: ['climate-change-plants', 'plant-conservation', 'restoration-ecology', 'invasive-plants'],
  },
  {
    id: 'field-botany',
    title: 'Field Botany',
    slug: 'field-botany',
    description:
      'Take botany outdoors — learn to identify plants with dichotomous keys, master botanical terminology, build herbarium collections, and conduct professional field surveys.',
    icon: '🔍',
    color: 'leaf',
    order: 9,
    lessonIds: ['dichotomous-keys', 'botanical-terminology', 'herbarium-techniques', 'field-documentation'],
  },
  {
    id: 'paleobotany',
    title: 'Paleobotany',
    slug: 'paleobotany',
    description:
      'Travel deep into Earth\'s past to discover how plants evolved over 500 million years — from the first land colonizers through coal-age giants to the rise of flowering plants.',
    icon: '🪨',
    color: 'bark',
    order: 10,
    lessonIds: ['fossil-record-plants', 'early-land-plants', 'coal-age-forests', 'mesozoic-cenozoic-flora'],
  },
  {
    id: 'plant-pathology',
    title: 'Plant Pathology',
    slug: 'plant-pathology',
    description:
      'Understand the science of plant disease — the pathogens that attack plants, the defenses plants mount, and the management strategies that protect crops and ecosystems.',
    icon: '🦠',
    color: 'petal',
    order: 11,
    lessonIds: ['plant-disease-intro', 'fungal-diseases', 'bacterial-viral-diseases', 'disease-management', 'plant-immunity-biotic-interactions', 'pti-eti-signaling', 'systemic-acquired-resistance', 'microbiome-immune-dialogue'],
  },
  {
    id: 'marine-plant-biology',
    title: 'Marine Plant Biology',
    slug: 'marine-plant-biology',
    description:
      'Dive into the photosynthetic life of the oceans — kelp forests, seagrass meadows, phytoplankton, and the blue-carbon ecosystems that regulate our climate.',
    icon: '🌊',
    color: 'sky',
    order: 12,
    lessonIds: ['kelp-seaweed', 'seagrass-phytoplankton', 'blue-carbon'],
  },
  {
    id: 'economic-botany',
    title: 'Economic Botany',
    slug: 'economic-botany',
    description:
      'Explore the plants that drive global economies — fibers and textiles, essential oils and spices, biofuels and industrial products derived from the plant kingdom.',
    icon: '💰',
    color: 'bark',
    order: 13,
    lessonIds: ['fiber-textile-plants', 'essential-oils-spices', 'biofuels-industrial'],
  },
  {
    id: 'plant-bioinformatics',
    title: 'Plant Bioinformatics',
    slug: 'plant-bioinformatics',
    description:
      'Enter the data-driven frontier of plant science — genomics, phylogenomics, transcriptomics, and the computational tools reshaping how we study plant biology.',
    icon: '💻',
    color: 'sky',
    order: 14,
    lessonIds: ['plant-genomics', 'sequence-phylogenomics', 'transcriptomics'],
  },
].sort((a, b) => a.order - b.order);

export function getModuleBySlug(slug: string): Module | undefined {
  return ALL_MODULES.find((m) => m.slug === slug);
}

export function getModuleForLesson(lessonId: string): Module | undefined {
  return ALL_MODULES.find((m) => m.lessonIds.includes(lessonId));
}

export function getModuleProgress(
  mod: Module,
  lessonProgress: Record<string, { completed: boolean }>,
) {
  const lessons = mod.lessonIds;
  const completed = lessons.filter((id) => lessonProgress[id]?.completed).length;
  return { total: lessons.length, completed, percent: Math.round((completed / lessons.length) * 100) };
}
