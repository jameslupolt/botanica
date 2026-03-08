import type { Lesson } from '../../types';

export const systemicAcquiredResistance: Lesson = {
  id: 'systemic-acquired-resistance',
  title: 'Systemic Acquired Resistance and Immune Priming',
  slug: 'systemic-acquired-resistance',
  description: 'Learn how local infection induces long-distance defense readiness, the signaling molecules involved in SAR, and how priming can be leveraged for durable crop protection.',
  category: 'ecology',
  difficulty: 'advanced',
  estimatedMinutes: 24,
  icon: '📣',
  color: 'petal',
  prerequisites: ['plant-immunity-biotic-interactions', 'pti-eti-signaling'],
  order: 103,
  sections: [
    {
      id: 'sar-concept',
      title: 'From Local Attack to Whole-Plant Readiness',
      content: [
        { type: 'text', text: 'Systemic acquired resistance (SAR) is a whole-plant defense state induced after localized pathogen challenge. Rather than constitutively activating all defenses at maximum intensity, SAR creates a primed condition in distal tissues, enabling faster and stronger responses upon later infection.' },
        { type: 'key-term', term: 'Systemic acquired resistance (SAR)', definition: 'A long-lasting, broad-spectrum immune state induced in uninfected tissues after local pathogen exposure, often associated with salicylic acid signaling and defense priming.' },
      ],
    },
    {
      id: 'mobile-signals',
      title: 'Mobile Signals and Long-Distance Communication',
      content: [
        { type: 'text', text: 'SAR depends on signals that move from infected tissue to distant leaves through vascular and apoplastic routes. Multiple molecules can contribute, including salicylic acid derivatives, pipecolic acid/N-hydroxypipecolic acid, azelaic acid-associated signaling, and lipid transfer-related components.' },
        { type: 'list', items: [
          'Signals can move in overlapping waves rather than a single messenger.',
          'Phloem transport helps broadcast immune status across organs.',
          'Calcium and ROS dynamics can participate in systemic propagation.',
          'Signal identity and weighting vary by pathosystem and species.',
        ] },
        { type: 'callout', title: 'Network, Not Single Molecule', text: 'SAR is best viewed as a coordinated signaling network, not a one-signal relay.', variant: 'info' },
      ],
    },
    {
      id: 'priming-mechanisms',
      title: 'Priming Mechanisms and Molecular Memory',
      content: [
        { type: 'text', text: 'Primed tissues often maintain subtle transcriptional, metabolic, and chromatin states that reduce response latency. Upon secondary challenge, these tissues activate defenses with greater amplitude and speed, improving containment while reducing baseline cost relative to full constitutive activation.' },
        { type: 'key-term', term: 'Immune priming', definition: 'A preconditioned physiological state in which prior exposure to cues enhances the speed and magnitude of future defense responses.' },
      ],
    },
    {
      id: 'costs-and-tradeoffs',
      title: 'Benefits, Costs, and Tradeoffs',
      content: [
        { type: 'text', text: 'SAR improves broad disease resistance but is not free. Sustained priming can reallocate carbon and nitrogen away from growth or reproduction in low-disease environments. Successful breeding and management aim for context-appropriate inducibility rather than permanent high-cost activation.' },
        { type: 'list', items: [
          'High readiness can reduce growth under benign conditions.',
          'Timed induction can maximize benefit-to-cost ratio.',
          'Nutrient status can constrain effective systemic defense.',
          'Cross-talk with abiotic stress pathways alters outcomes.',
        ] },
      ],
    },
    {
      id: 'field-applications',
      title: 'Field and Greenhouse Applications',
      content: [
        { type: 'text', text: 'SAR-informed management includes elicitor treatments, biologically induced resistance, and integrated timing with pathogen risk forecasts. When combined with genetic resistance and hygiene practices, priming strategies can reduce disease pressure and pesticide dependence.' },
        { type: 'regional-example', prompt: 'Compare disease progression in production blocks with and without elicitor-based induced resistance programs during high-risk periods. Note differences in onset timing and lesion expansion.' },
      ],
    },
    {
      id: 'designing-programs',
      title: 'Designing Robust Induced-Resistance Programs',
      content: [
        { type: 'text', text: 'Operational success requires cultivar-specific calibration, growth-stage timing, and monitoring of environmental stress load. Over-application or poor timing can reduce returns. Decision support works best when induction windows align with forecasted infection pressure.' },
      ],
    },
  ],
  quiz: {
    id: 'systemic-acquired-resistance-quiz',
    title: 'Systemic Acquired Resistance Quiz',
    passingScore: 70,
    questions: [
      { id: 'sar-q1', type: 'multiple-choice', question: 'SAR is best described as:', options: ['Local-only defense at infection site', 'Whole-plant induced defense readiness after local infection', 'Permanent immunity to all pathogens', 'A purely structural bark trait'], correctAnswer: 1, explanation: 'SAR creates systemic preparedness in distal tissues after local challenge.' },
      { id: 'sar-q2', type: 'true-false', question: 'Immune priming means tissues respond faster to later attack without necessarily being fully activated at baseline.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Priming enhances responsiveness while often limiting resting cost.' },
      { id: 'sar-q3', type: 'multiple-choice', question: 'A common misconception about SAR is that it relies on:', options: ['A network of signals', 'Only one universal mobile molecule', 'Vascular communication', 'Signal cross-talk'], correctAnswer: 1, explanation: 'Evidence supports multi-signal coordination rather than one universal messenger.' },
      { id: 'sar-q4', type: 'multiple-choice', question: 'An expected tradeoff of persistent high defense readiness is:', options: ['Guaranteed higher yield always', 'Potential growth or reproduction penalty', 'Elimination of nutrient constraints', 'No interaction with abiotic stress'], correctAnswer: 1, explanation: 'Defense allocation can reduce growth under low disease pressure.' },
      { id: 'sar-q5', type: 'ordering', question: 'Order a simplified SAR sequence:', options: ['Local pathogen challenge', 'Generation/export of systemic signals', 'Priming of distal tissues', 'Enhanced response upon secondary attack'], correctAnswer: [0, 1, 2, 3], explanation: 'Local attack initiates signaling that primes remote tissues for later defense.' },
      { id: 'sar-q6', type: 'true-false', question: 'SAR-informed programs are strongest when combined with resistance genetics and sanitation.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Integrated management improves robustness and durability.' },
      { id: 'sar-q7', type: 'multiple-choice', question: 'Why is timing important for induced-resistance applications?', options: ['Because plant clocks never affect immunity', 'Because induction should align with risk windows and growth stage', 'Because earlier is always better', 'Because induction replaces all other controls'], correctAnswer: 1, explanation: 'Correct timing maximizes protective benefit and reduces unnecessary cost.' },
      { id: 'sar-q8', type: 'multiple-choice', question: 'Which factor can alter SAR outcomes in practice?', options: ['Cultivar background and nutrient status', 'Leaf color preference only', 'Pot shape only', 'Moon phase only'], correctAnswer: 0, explanation: 'Genotype and physiological status strongly influence induced resistance efficacy.' },
      { id: 'sar-q9', type: 'true-false', question: 'Systemic defense signaling can involve vascular transport routes.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Long-distance communication frequently includes vascular pathways.' },
      { id: 'sar-q10', type: 'multiple-choice', question: 'Best description of operational SAR strategy is:', options: ['Single spray with no monitoring', 'Calibrated induction plus surveillance and integrated controls', 'Permanent constitutive defense activation', 'Ignoring disease forecasting'], correctAnswer: 1, explanation: 'Successful deployment is calibrated, monitored, and integrated with other tactics.' },
    ],
  },
};
