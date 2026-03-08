import type { Lesson } from '../../types';

export const reproductivePhysiologyFruitSet: Lesson = {
  id: 'reproductive-physiology-fruit-set',
  title: 'Plant Reproductive Physiology: Gametes to Fruit Set',
  slug: 'reproductive-physiology-fruit-set',
  description: 'Follow reproductive events from gametogenesis and pollination to double fertilization, early embryo-endosperm signaling, and physiological control of fruit set and retention.',
  category: 'reproduction',
  difficulty: 'advanced',
  estimatedMinutes: 23,
  icon: '🍎',
  color: 'petal',
  prerequisites: ['flowers-fruits-seeds', 'pollination-biology'],
  order: 97,
  sections: [
    {
      id: 'gamete-development',
      title: 'Male and Female Gametophyte Development',
      content: [
        { type: 'text', text: 'Successful fruiting starts with coordinated development of pollen and embryo sacs. Sporogenesis and gametogenesis must align with floral timing, temperature windows, and resource status. Even subtle disturbances in meiosis or gametophyte maturation can sharply reduce seed set.' },
        { type: 'key-term', term: 'Double fertilization', definition: 'An angiosperm process where one sperm fertilizes the egg to form the zygote and a second sperm fuses with the central cell to form endosperm.' },
      ],
    },
    {
      id: 'pollination-and-compatibility',
      title: 'Pollination, Pollen Tube Growth, and Compatibility',
      content: [
        { type: 'text', text: 'After deposition on a receptive stigma, pollen hydrates, germinates, and extends a tube through the style toward the ovule. Guidance relies on chemical gradients and synergid signaling. In many taxa, self-incompatibility systems prevent self-fertilization by arresting incompatible pollen or tubes.' },
        { type: 'list', items: [
          'Stigma receptivity is temporally regulated.',
          'Pollen tube growth requires targeted vesicle trafficking and wall remodeling.',
          'Compatibility checkpoints occur at stigma and style tissues.',
          'Heat and drought can reduce tube growth velocity and targeting fidelity.',
        ] },
      ],
    },
    {
      id: 'fertilization-signaling',
      title: 'Fertilization Signaling and Early Seed Initiation',
      content: [
        { type: 'text', text: 'Upon sperm delivery, signaling cascades trigger egg activation, zygotic division, and endosperm development. Endosperm often functions as an early metabolic hub, coordinating maternal resource transfer and developmental tempo.' },
        { type: 'callout', title: 'Failure Point', text: 'In many crops, fertilization can occur but early endosperm or embryo arrest still causes poor fruit retention.', variant: 'warning' },
      ],
    },
    {
      id: 'hormonal-control-fruit-set',
      title: 'Hormonal Control of Fruit Set',
      content: [
        { type: 'text', text: 'Fruit set is strongly controlled by auxin, gibberellin, cytokinin, and ethylene balance. Fertilized ovules become hormone sources that signal surrounding ovary tissues to shift from floral development to fruit growth. If hormone cues are weak or stress-induced ethylene is high, flowers or young fruits may abort.' },
        { type: 'key-term', term: 'Parthenocarpy', definition: 'Fruit development without fertilization, naturally occurring or induced by hormonal/genetic manipulation.' },
        { type: 'list', items: [
          'Auxin and gibberellin can trigger early ovary growth programs.',
          'Ethylene often promotes abscission under stress or poor pollination.',
          'Source-sink balance influences which fruits are retained.',
          'Hormone sensitivity differs among cultivars and developmental stages.',
        ] },
      ],
    },
    {
      id: 'abscission-and-retention',
      title: 'Abscission, Sink Competition, and Fruit Retention',
      content: [
        { type: 'text', text: 'Young fruits compete for assimilates and vascular support. Plants commonly overproduce flowers and then selectively retain fruits that can be matured under current resource constraints. Abscission zones respond to hormonal shifts, carbon status, and stress signals.' },
        { type: 'regional-example', prompt: 'In backyard citrus or apple trees, observe early-season fruit drop. Many initial fruitlets abort naturally as the tree rebalances source-sink demand.' },
      ],
    },
    {
      id: 'crop-management',
      title: 'Crop Management: Securing Reliable Fruit Set',
      content: [
        { type: 'text', text: 'Agronomic strategies for stable fruit set include pollinator management, controlled environment timing, temperature buffering, deficit-avoidance irrigation, and targeted hormone treatments. In protected cultivation, vibration or bumblebee release often improves pollination consistency.' },
      ],
    },
  ],
  quiz: {
    id: 'reproductive-physiology-fruit-set-quiz',
    title: 'Plant Reproductive Physiology Quiz',
    passingScore: 70,
    questions: [
      { id: 'rpfs-q1', type: 'multiple-choice', question: 'Double fertilization produces:', options: ['Two embryos', 'Embryo and endosperm', 'Only endosperm', 'Only pollen tube'], correctAnswer: 1, explanation: 'One sperm forms the zygote, the other forms endosperm with the central cell.' },
      { id: 'rpfs-q2', type: 'true-false', question: 'All pollinated flowers necessarily set fruit.', options: ['True', 'False'], correctAnswer: 1, explanation: 'Pollination success does not guarantee fertilization, embryo viability, or retention.' },
      { id: 'rpfs-q3', type: 'multiple-choice', question: 'Parthenocarpy is:', options: ['Seed dormancy after harvest', 'Fruit development without fertilization', 'Self-incompatibility failure', 'Style senescence'], correctAnswer: 1, explanation: 'Parthenocarpic fruits form without fertilization.' },
      { id: 'rpfs-q4', type: 'multiple-choice', question: 'High stress ethylene during early fruit development commonly:', options: ['Prevents all pollen germination', 'Promotes abscission', 'Increases seed number', 'Stops vascular differentiation entirely'], correctAnswer: 1, explanation: 'Ethylene is strongly linked to flower and fruitlet drop in stress contexts.' },
      { id: 'rpfs-q5', type: 'ordering', question: 'Order key reproductive steps:', options: ['Pollination and pollen hydration', 'Pollen tube growth through style', 'Double fertilization', 'Early fruit set signaling'], correctAnswer: [0, 1, 2, 3], explanation: 'These events proceed from pollination to fertilization to fruit-initiation programs.' },
      { id: 'rpfs-q6', type: 'true-false', question: 'Endosperm can influence early embryo and maternal resource dynamics.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Endosperm development is central to early seed and sink establishment.' },
      { id: 'rpfs-q7', type: 'multiple-choice', question: 'A practical way to improve fruit set in greenhouse tomato is:', options: ['Eliminating pollinators', 'Mechanical vibration or managed pollinators', 'Maintaining extreme heat', 'Reducing irrigation to severe stress'], correctAnswer: 1, explanation: 'Assisted pollination improves pollen transfer and fruit set reliability.' },
      { id: 'rpfs-q8', type: 'multiple-choice', question: 'Self-incompatibility systems mainly act to:', options: ['Increase selfing frequency', 'Prevent incompatible self-fertilization', 'Destroy all pollen grains', 'Delay ovule development'], correctAnswer: 1, explanation: 'They are reproductive barriers against self-pollen in many species.' },
      { id: 'rpfs-q9', type: 'true-false', question: 'Early fruit drop can be part of normal source-sink adjustment.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Natural thinning often reflects resource allocation optimization.' },
      { id: 'rpfs-q10', type: 'multiple-choice', question: 'Which hormonal pair is often used to induce set-like growth responses?', options: ['Auxin and gibberellin', 'Ethylene and ABA only', 'Jasmonate and salicylate only', 'Brassinosteroid and cytokinin only'], correctAnswer: 0, explanation: 'Auxin and gibberellin are common promoters of early fruit growth signaling.' },
    ],
  },
};
