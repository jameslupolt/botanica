import type { Lesson } from '../../types';

export const reticulateEvolutionConflict: Lesson = {
  id: 'reticulate-evolution-conflict',
  title: 'Reticulate Evolution and Phylogenetic Conflict',
  slug: 'reticulate-evolution-conflict',
  description: 'Examine hybridization, introgression, and incomplete lineage sorting as causes of conflicting phylogenetic signal, and learn how to interpret conflict-aware systematics outputs.',
  category: 'taxonomy',
  difficulty: 'advanced',
  estimatedMinutes: 24,
  icon: '🕸️',
  color: 'bark',
  prerequisites: ['phylogenetic-systematics-drilldown', 'sequence-phylogenomics'],
  order: 107,
  sections: [
    {
      id: 'conflict-overview',
      title: 'Why Gene Trees Disagree',
      content: [
        { type: 'text', text: 'Discordant gene trees are common in plants due to hybridization, introgression, incomplete lineage sorting, genome duplication history, and technical artifacts. Conflict is expected data structure, not necessarily error.' },
        { type: 'key-term', term: 'Reticulate evolution', definition: 'Evolutionary history involving lineage fusion events (such as hybridization) that create network-like relationships rather than strictly bifurcating trees.' },
      ],
    },
    {
      id: 'biological-sources',
      title: 'Biological Sources of Conflict',
      content: [
        { type: 'text', text: 'Incomplete lineage sorting preserves ancestral polymorphism across successive divergences, while introgression transfers alleles between lineages after divergence. Polyploidy and homoeolog retention add further complexity to plant histories.' },
        { type: 'list', items: [
          'ILS can dominate in rapid radiations.',
          'Introgression can be directional and ecologically structured.',
          'Polyploid origin events may involve multiple parental lineages.',
          'Organellar and nuclear histories can diverge.',
        ] },
      ],
    },
    {
      id: 'analytical-frameworks',
      title: 'Conflict-Aware Analytical Frameworks',
      content: [
        { type: 'text', text: 'Concatenation, coalescent summaries, quartet methods, and explicit network inference provide complementary perspectives. Robust interpretation compares outputs rather than privileging one method by default.' },
        { type: 'key-term', term: 'Species network inference', definition: 'Methods that estimate evolutionary histories with reticulation edges, modeling both divergence and gene flow.' },
      ],
    },
    {
      id: 'diagnostic-workflow',
      title: 'Diagnostic Workflow and Quality Control',
      content: [
        { type: 'text', text: 'Conflict interpretation requires rigorous QC: orthology checks, alignment curation, missing-data diagnostics, and sensitivity analyses. Spurious conflict from pipeline artifacts must be excluded before biological claims are made.' },
        { type: 'callout', title: 'False Conflict Risk', text: 'Poor orthology assignment can mimic introgression signatures.', variant: 'warning' },
      ],
    },
    {
      id: 'taxonomy-implications',
      title: 'Taxonomic and Communication Implications',
      content: [
        { type: 'text', text: 'Reticulate histories complicate rank-based taxonomy. Authors must decide when network complexity should change formal classification versus being communicated as evolutionary annotation around stable names.' },
      ],
    },
    {
      id: 'applied-cases',
      title: 'Applied Cases in Floristics and Conservation',
      content: [
        { type: 'text', text: 'Conflict-aware systematics informs species delimitation, conservation unit design, and management of hybrid zones. In some contexts, introgressed populations may carry adaptive variation relevant to climate resilience.' },
        { type: 'regional-example', prompt: 'In mixed-species contact zones, compare morphology-based IDs with genomic assignments. Discordance can reveal either hybridization or unresolved taxonomy.' },
      ],
    },
  ],
  quiz: {
    id: 'reticulate-evolution-conflict-quiz',
    title: 'Reticulate Evolution and Conflict Quiz',
    passingScore: 70,
    questions: [
      { id: 'rec-q1', type: 'multiple-choice', question: 'Reticulate evolution implies:', options: ['Strictly bifurcating history only', 'Network-like history with lineage fusion', 'No genetic exchange ever', 'Only sequencing error'], correctAnswer: 1, explanation: 'Reticulation includes hybridization/introgression events.' },
      { id: 'rec-q2', type: 'true-false', question: 'Gene-tree conflict always means the dataset is unusable.', options: ['True', 'False'], correctAnswer: 1, explanation: 'Conflict is common and can contain biological signal.' },
      { id: 'rec-q3', type: 'multiple-choice', question: 'Incomplete lineage sorting arises when:', options: ['All lineages instantly fix alleles', 'Ancestral polymorphism persists across divergences', 'PCR adds random taxa', 'Organelles replace nuclei'], correctAnswer: 1, explanation: 'ILS reflects persistence and sorting of ancestral variants.' },
      { id: 'rec-q4', type: 'multiple-choice', question: 'A key QC step before claiming introgression is:', options: ['Ignore orthology checks', 'Validate orthology and alignment quality', 'Use one locus only', 'Remove all conflicting loci'], correctAnswer: 1, explanation: 'Artifact control is essential before biological inference.' },
      { id: 'rec-q5', type: 'ordering', question: 'Order a conflict-analysis workflow:', options: ['Data QC and orthology checks', 'Multiple inference frameworks', 'Conflict pattern interpretation', 'Taxonomic/biological conclusion'], correctAnswer: [0, 1, 2, 3], explanation: 'Quality control and comparative inference should precede conclusions.' },
      { id: 'rec-q6', type: 'true-false', question: 'Organellar and nuclear phylogenies can disagree in plants.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Different inheritance pathways can produce discordant histories.' },
      { id: 'rec-q7', type: 'multiple-choice', question: 'Species network methods are designed to model:', options: ['Only bifurcations', 'Divergence and reticulation', 'Only morphology', 'Only branch lengths without topology'], correctAnswer: 1, explanation: 'Network methods include both splits and gene-flow edges.' },
      { id: 'rec-q8', type: 'multiple-choice', question: 'Conflict-aware taxonomy should prioritize:', options: ['Novelty without clarity', 'Transparent communication of uncertainty and evidence', 'Single-tree absolutism', 'No reproducibility'], correctAnswer: 1, explanation: 'Clear evidence reporting is critical for usable systematics.' },
      { id: 'rec-q9', type: 'true-false', question: 'Hybrid zones can contain adaptive variation relevant for conservation decisions.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Introgressed variation may have ecological importance.' },
      { id: 'rec-q10', type: 'multiple-choice', question: 'Best practice for conflicting results is to:', options: ['Hide discordant outputs', 'Compare and report framework-dependent differences', 'Discard difficult taxa', 'Assume one method is always correct'], correctAnswer: 1, explanation: 'Comparative interpretation improves reliability and transparency.' },
    ],
  },
};
