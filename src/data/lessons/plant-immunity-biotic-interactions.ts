import type { Lesson } from '../../types';

export const plantImmunityBioticInteractions: Lesson = {
  id: 'plant-immunity-biotic-interactions',
  title: 'Plant Immunity & Beneficial Biotic Interactions',
  slug: 'plant-immunity-biotic-interactions',
  description: 'Understand pattern-triggered and effector-triggered immunity, systemic defense signaling, and how plants balance defense with beneficial microbial partnerships.',
  category: 'ecology',
  difficulty: 'advanced',
  estimatedMinutes: 25,
  icon: '🛡️',
  color: 'petal',
  prerequisites: ['plant-disease-intro', 'signal-transduction'],
  order: 98,
  sections: [
    {
      id: 'immune-overview',
      title: 'Innate Immunity in a Sessile Organism',
      content: [
        { type: 'text', text: 'Plants cannot escape pathogens, so they rely on multi-layered innate immunity. Basal defenses include physical barriers and antimicrobial chemistry, while inducible defenses detect conserved microbial signatures and specific pathogen effectors.' },
        { type: 'key-term', term: 'PTI', definition: 'Pattern-triggered immunity activated by recognition of conserved microbial or damage-associated molecular patterns through cell-surface receptors.' },
        { type: 'key-term', term: 'ETI', definition: 'Effector-triggered immunity mediated by intracellular immune receptors that detect pathogen effectors or their activity.' },
      ],
    },
    {
      id: 'pti-layer',
      title: 'Pattern-Triggered Immunity (PTI)',
      content: [
        { type: 'text', text: 'PTI begins at the plasma membrane via pattern-recognition receptors (PRRs). Perception of molecules such as flagellin peptides or chitin fragments can rapidly induce calcium influx, reactive oxygen bursts, MAP kinase activation, callose deposition, and defense-gene transcription.' },
        { type: 'list', items: [
          'Early signaling: calcium transients and ROS production.',
          'Cell-wall reinforcement limits pathogen entry.',
          'Stomatal closure reduces invasion routes.',
          'Defense transcriptional networks reprogram metabolism.',
        ] },
      ],
    },
    {
      id: 'eti-layer',
      title: 'Effector-Triggered Immunity (ETI) and NLR Receptors',
      content: [
        { type: 'text', text: 'Many pathogens deploy effectors to suppress PTI and host defenses. Plants counter with NLR receptors that monitor effector presence directly or indirectly by sensing perturbation of guarded host proteins. ETI is often stronger and can include localized programmed cell death to limit biotroph spread.' },
        { type: 'key-term', term: 'NLR receptor', definition: 'Intracellular nucleotide-binding leucine-rich repeat immune receptor that detects pathogen effectors and activates robust defense responses.' },
        { type: 'callout', title: 'Arms Race Dynamics', text: 'Pathogens evolve new effector repertoires; plants evolve or stack recognition specificities. Durable resistance often requires multi-gene strategies.', variant: 'fact' },
      ],
    },
    {
      id: 'systemic-signaling',
      title: 'Systemic Acquired Resistance and Defense Hormones',
      content: [
        { type: 'text', text: 'Local infection can prime distant tissues through systemic signals, generating systemic acquired resistance (SAR). Salicylic acid pathways are central for many biotrophic interactions, while jasmonate and ethylene pathways are prominent in defenses against necrotrophs and herbivory.' },
        { type: 'list', items: [
          'SA pathways often enhance PR-gene expression and long-term readiness.',
          'JA and ethylene frequently coordinate wound and herbivore defenses.',
          'Cross-talk can be antagonistic or synergistic depending on attacker type.',
          'Priming improves speed and amplitude of future responses.',
        ] },
      ],
    },
    {
      id: 'beneficial-partners',
      title: 'Balancing Defense with Symbiosis and Microbiomes',
      content: [
        { type: 'text', text: 'Plants must distinguish harmful invaders from beneficial partners such as mycorrhizal fungi and nitrogen-fixing symbionts. Successful mutualisms involve partial immune accommodation, controlled signaling exchange, and host regulation of colonization intensity.' },
        { type: 'regional-example', prompt: 'Compare legume roots from inoculated and non-inoculated plots. Nodulation reflects cooperative signaling where immunity is modulated rather than fully shut down.' },
      ],
    },
    {
      id: 'resistance-strategies',
      title: 'Applications: Breeding and Integrated Disease Management',
      content: [
        { type: 'text', text: 'Modern disease management combines host resistance genetics, microbiome-aware agronomy, and targeted interventions. Gene stacking, quantitative resistance loci, and surveillance-informed deployment can reduce resistance breakdown risk.' },
      ],
    },
  ],
  quiz: {
    id: 'plant-immunity-biotic-interactions-quiz',
    title: 'Plant Immunity & Biotic Interactions Quiz',
    passingScore: 70,
    questions: [
      { id: 'pibi-q1', type: 'multiple-choice', question: 'PTI is initiated primarily by:', options: ['Intracellular chloroplast receptors', 'Cell-surface recognition of conserved patterns', 'Random ROS accumulation', 'Vacuolar pH shifts'], correctAnswer: 1, explanation: 'PTI depends on PRR recognition of conserved microbial or damage patterns.' },
      { id: 'pibi-q2', type: 'true-false', question: 'ETI often involves NLR receptors and can be stronger than PTI.', options: ['True', 'False'], correctAnswer: 0, explanation: 'ETI commonly amplifies defense outputs and may trigger localized cell death.' },
      { id: 'pibi-q3', type: 'multiple-choice', question: 'A common early PTI event is:', options: ['Immediate seed dormancy', 'Calcium influx and ROS burst', 'Cambium shutdown', 'Complete chloroplast loss'], correctAnswer: 1, explanation: 'Calcium and ROS are hallmark early immune signals.' },
      { id: 'pibi-q4', type: 'multiple-choice', question: 'Systemic acquired resistance is best described as:', options: ['Only local defense at infection site', 'Whole-plant priming after local challenge', 'Permanent immunity to all pathogens', 'A purely mechanical barrier response'], correctAnswer: 1, explanation: 'SAR increases readiness in distant tissues after local attack.' },
      { id: 'pibi-q5', type: 'ordering', question: 'Order a simplified immune progression:', options: ['Pattern perception by PRRs', 'Early signaling (calcium/ROS/MAPK)', 'Defense gene activation', 'Reinforced barriers and antimicrobial outputs'], correctAnswer: [0, 1, 2, 3], explanation: 'Recognition triggers signaling, then transcriptional and structural defenses.' },
      { id: 'pibi-q6', type: 'true-false', question: 'Plants must modulate immunity to maintain beneficial symbioses.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Mutualisms require selective immune accommodation and control.' },
      { id: 'pibi-q7', type: 'multiple-choice', question: 'NLR receptors are generally:', options: ['Extracellular wax proteins', 'Intracellular immune sensors', 'Only fungal toxins', 'Mitochondrial transporters'], correctAnswer: 1, explanation: 'NLRs are intracellular receptors that detect effectors or their impacts.' },
      { id: 'pibi-q8', type: 'multiple-choice', question: 'A major reason single-gene resistance can fail is:', options: ['Plants stop photosynthesis', 'Pathogens evolve matching virulence changes', 'Roots no longer absorb water', 'All stomata remain permanently closed'], correctAnswer: 1, explanation: 'Host-pathogen coevolution can erode single recognition specificities.' },
      { id: 'pibi-q9', type: 'true-false', question: 'JA and SA pathways can show antagonistic cross-talk.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Cross-talk helps tune defense based on attacker lifestyle.' },
      { id: 'pibi-q10', type: 'multiple-choice', question: 'A durable management strategy usually combines:', options: ['Only one resistance gene everywhere', 'Resistance diversity plus integrated practices', 'No monitoring and no rotation', 'Elimination of all microbes'], correctAnswer: 1, explanation: 'Stacking, diversification, and integrated management improve durability.' },
    ],
  },
};
