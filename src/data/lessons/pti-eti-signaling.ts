import type { Lesson } from '../../types';

export const ptiEtiSignaling: Lesson = {
  id: 'pti-eti-signaling',
  title: 'PTI and ETI Signaling Networks',
  slug: 'pti-eti-signaling',
  description: 'Dive into how plants detect pathogen patterns and effectors, amplify defense through shared signaling hubs, and balance immune activation with growth costs.',
  category: 'ecology',
  difficulty: 'advanced',
  estimatedMinutes: 24,
  icon: '🧪',
  color: 'petal',
  prerequisites: ['plant-immunity-biotic-interactions', 'signal-transduction'],
  order: 102,
  sections: [
    {
      id: 'framework',
      title: 'Two-Tier Immunity as an Integrated System',
      content: [
        { type: 'text', text: 'Plant immunity is often described as pattern-triggered immunity (PTI) plus effector-triggered immunity (ETI), but the two are tightly interwoven. PTI provides rapid broad-spectrum surveillance, while ETI detects adapted pathogen effectors and reinforces defense intensity and durability.' },
        { type: 'key-term', term: 'Immune potentiation', definition: 'Amplification of defense outputs when PTI and ETI are co-activated, often producing stronger and more sustained responses than either layer alone.' },
      ],
    },
    {
      id: 'pti-core',
      title: 'PTI Core: PRRs, Co-Receptors, and Early Signaling',
      content: [
        { type: 'text', text: 'PTI starts at the cell surface when pattern-recognition receptors detect conserved microbial or damage motifs. PRR complexes recruit co-receptors and cytoplasmic kinases, triggering calcium influx, ROS production, MAPK cascades, transcriptional reprogramming, and cell-wall reinforcement.' },
        { type: 'list', items: [
          'PRR activation often requires co-receptor assembly.',
          'Calcium and ROS form rapid feed-forward loops.',
          'MAPK modules connect perception to transcriptional control.',
          'Callose and wall remodeling increase penetration resistance.',
        ] },
        { type: 'callout', title: 'Signal Speed', text: 'Many PTI outputs begin within minutes, making early signaling kinetics a major determinant of resistance level.', variant: 'fact' },
      ],
    },
    {
      id: 'eti-core',
      title: 'ETI Core: NLR Surveillance and Defense Escalation',
      content: [
        { type: 'text', text: 'ETI is mediated by intracellular NLR receptors that detect pathogen effectors directly or by sensing perturbation of guarded host proteins. ETI often strengthens PTI-associated pathways and can induce localized programmed cell death to restrict pathogen spread.' },
        { type: 'key-term', term: 'Guard model', definition: 'A recognition logic where an immune receptor monitors a host target that is frequently manipulated by pathogen effectors.' },
        { type: 'text', text: 'Modern evidence shows ETI does not replace PTI; instead, ETI frequently restores or boosts PTI outputs that effectors attempted to suppress.' },
      ],
    },
    {
      id: 'shared-hubs',
      title: 'Shared Hubs, Cross-Talk, and Network Topology',
      content: [
        { type: 'text', text: 'PTI and ETI share signaling hubs including calcium channels, ROS-generating enzymes, kinase modules, transcription factors, and hormone nodes. Because these hubs are reused across contexts, plants rely on timing, localization, and signal amplitude to preserve specificity.' },
        { type: 'list', items: [
          'Temporal coding: transient versus sustained signaling pulses.',
          'Spatial coding: apoplast, plasma membrane, nucleus, and organellar interfaces.',
          'Hormone coding: SA/JA/ethylene balancing by attacker lifestyle.',
          'State coding: primed tissues respond faster to re-challenge.',
        ] },
      ],
    },
    {
      id: 'tradeoffs',
      title: 'Defense-Growth Tradeoffs and Immune Homeostasis',
      content: [
        { type: 'text', text: 'Constitutive immune activation can reduce growth, so plants use layered negative regulation to avoid unnecessary cost. Ubiquitin-mediated turnover, phosphatases, and chromatin-level feedback loops help terminate signaling after threat reduction.' },
        { type: 'callout', title: 'Breeding Challenge', text: 'Strong resistance alleles can carry yield penalties unless network tuning preserves growth under low disease pressure.', variant: 'warning' },
      ],
    },
    {
      id: 'applied-pathology',
      title: 'Applied Pathology: Durable Resistance Design',
      content: [
        { type: 'text', text: 'Durable resistance strategies combine receptor diversity, quantitative defense traits, pathogen monitoring, and deployment planning across landscapes. Integrating PTI-supportive traits with ETI gene stacks can reduce rapid resistance breakdown.' },
        { type: 'regional-example', prompt: 'Compare disease outcomes across nearby fields that use single major resistance genes versus mixed-cultivar strategies. Mixed deployment often slows selection for virulent pathogen races.' },
      ],
    },
  ],
  quiz: {
    id: 'pti-eti-signaling-quiz',
    title: 'PTI and ETI Signaling Networks Quiz',
    passingScore: 70,
    questions: [
      { id: 'pes-q1', type: 'multiple-choice', question: 'PTI is primarily initiated by:', options: ['Mitochondrial DNA repair', 'Cell-surface recognition of conserved patterns', 'Only chloroplast signaling', 'Random ion leakage'], correctAnswer: 1, explanation: 'PTI begins when PRRs perceive conserved microbial or damage-associated motifs.' },
      { id: 'pes-q2', type: 'true-false', question: 'ETI generally operates completely independently of PTI outputs.', options: ['True', 'False'], correctAnswer: 1, explanation: 'ETI frequently amplifies and restores PTI-associated pathways.' },
      { id: 'pes-q3', type: 'multiple-choice', question: 'A common ETI recognition logic is the:', options: ['Capillary model', 'Guard model', 'Refraction model', 'Palisade model'], correctAnswer: 1, explanation: 'In the guard model, immune receptors monitor host targets manipulated by effectors.' },
      { id: 'pes-q4', type: 'multiple-choice', question: 'An early immune signal shared across PTI/ETI is often:', options: ['Fruit ripening burst only', 'Calcium influx and ROS production', 'Secondary growth cessation', 'Pollen tube arrest'], correctAnswer: 1, explanation: 'Calcium and ROS are rapid shared components in immune activation.' },
      { id: 'pes-q5', type: 'ordering', question: 'Order a simplified PTI-to-output sequence:', options: ['Pattern perception by PRR complex', 'Early signaling (calcium/ROS/kinases)', 'Defense gene activation', 'Barrier and antimicrobial deployment'], correctAnswer: [0, 1, 2, 3], explanation: 'Recognition leads to signaling, then transcriptional and structural defense outputs.' },
      { id: 'pes-q6', type: 'true-false', question: 'Immune signaling must be downregulated after threat reduction to avoid unnecessary growth cost.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Homeostatic negative regulation reduces constitutive defense penalties.' },
      { id: 'pes-q7', type: 'multiple-choice', question: 'Why can single major resistance genes fail quickly?', options: ['They eliminate all pathogen diversity', 'Pathogens can evolve matching virulence changes', 'They prevent hormone signaling', 'They stop vascular transport'], correctAnswer: 1, explanation: 'Strong selection can favor pathogen races that evade single-gene recognition.' },
      { id: 'pes-q8', type: 'multiple-choice', question: 'Network specificity despite shared hubs is aided by:', options: ['Ignoring timing', 'Temporal and spatial signal coding', 'Removing receptor diversity', 'Suppressing transcription'], correctAnswer: 1, explanation: 'Timing, localization, and amplitude encode context in shared signaling components.' },
      { id: 'pes-q9', type: 'true-false', question: 'Combining PTI-supportive traits with ETI gene stacks can improve resistance durability.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Layered strategies can slow resistance breakdown and broaden protection.' },
      { id: 'pes-q10', type: 'multiple-choice', question: 'A practical deployment strategy for durability is:', options: ['Single genotype everywhere', 'Diverse resistance deployment with monitoring', 'No pathogen surveillance', 'Permanent fungicide-only reliance'], correctAnswer: 1, explanation: 'Genetic diversity plus surveillance-informed deployment improves long-term control.' },
    ],
  },
};
