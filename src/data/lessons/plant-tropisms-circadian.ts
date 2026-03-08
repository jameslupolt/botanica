import type { Lesson } from '../../types';

export const plantTropismsCircadian: Lesson = {
  id: 'plant-tropisms-circadian',
  title: 'Plant Tropisms, Nastic Movements & Circadian Rhythms',
  slug: 'plant-tropisms-circadian',
  description: 'Learn how plants sense gravity, light, touch, and daily time cycles to coordinate directional growth, rapid movement, and adaptive physiology across changing environments.',
  category: 'physiology',
  difficulty: 'advanced',
  estimatedMinutes: 24,
  icon: '🧭',
  color: 'sky',
  prerequisites: ['light-signaling', 'plant-hormones'],
  order: 94,
  sections: [
    {
      id: 'movement-overview',
      title: 'Why Plants Move Without Muscles',
      content: [
        { type: 'text', text: 'Plants lack muscles, but they move continuously through growth, turgor adjustments, and developmental reprogramming. Some movements are directional and linked to a stimulus vector (tropisms), while others are directional-independent movements triggered by stimulus intensity (nastic responses). On top of both, circadian clocks gate responsiveness by time of day.' },
        { type: 'key-term', term: 'Tropism', definition: 'A directional growth response where the orientation of growth depends on stimulus direction, such as phototropism toward light or gravitropism with gravity.' },
        { type: 'key-term', term: 'Nastic movement', definition: 'A movement response independent of stimulus direction, often based on turgor changes, such as leaf folding in Mimosa or nyctinastic leaf closure at dusk.' },
        { type: 'callout', title: 'Integration Principle', text: 'The same plant organ often integrates multiple cues at once: light quality, gravity, touch, humidity, and time-of-day signaling.', variant: 'info' },
      ],
    },
    {
      id: 'phototropism',
      title: 'Phototropism: Bending Toward Light',
      content: [
        { type: 'text', text: 'Shoot phototropism is primarily mediated by blue-light photoreceptors phototropin 1 and phototropin 2. Asymmetric blue light triggers lateral auxin redistribution, typically increasing auxin on the shaded side of the stem. In shoots, elevated auxin promotes cell elongation, so the shaded side grows faster and the organ bends toward light.' },
        { type: 'list', items: [
          'Phototropins detect blue light gradients across tissue.',
          'PIN and ABCB transport systems help establish auxin asymmetry.',
          'Auxin-induced wall loosening increases differential growth.',
          'Phototropism improves canopy positioning and carbon gain.',
        ] },
        { type: 'callout', title: 'Root vs. Shoot Contrast', text: 'Auxin has opposite effects in many roots and shoots: concentrations that promote shoot elongation can inhibit root elongation.', variant: 'fact' },
      ],
    },
    {
      id: 'gravitropism-hydrotropism',
      title: 'Gravitropism and Hydrotropism in Root Navigation',
      content: [
        { type: 'text', text: 'Roots sense gravity using amyloplast-rich statocytes in the root cap. Sedimentation of statoliths triggers signaling that shifts auxin to the lower side of the root. Because higher auxin inhibits elongation in root epidermal and cortical cells, the lower side grows less, causing downward curvature. Hydrotropism can override or interact with gravitropism when moisture gradients are steep.' },
        { type: 'key-term', term: 'Statolith', definition: 'A dense starch-containing amyloplast in gravity-sensing cells that helps detect organ orientation relative to gravity.' },
        { type: 'text', text: 'Hydrotropism is especially important in drying soils where roots must bias growth toward wetter microsites. Crosstalk among ABA, auxin, and reactive oxygen signaling contributes to moisture-oriented growth decisions.' },
        { type: 'regional-example', prompt: 'After rainfall, examine roots of potted plants near transparent pot edges. Roots often branch and proliferate preferentially in moist zones rather than uniformly through dry substrate.' },
      ],
    },
    {
      id: 'thigmo-and-nastic',
      title: 'Thigmotropism and Rapid Nastic Responses',
      content: [
        { type: 'text', text: 'Mechanical stimulation drives both slow growth-based and rapid turgor-based responses. Tendrils show thigmotropism by coiling around supports after localized touch. In contrast, sensitive-plant and carnivorous trap closure are rapid nastic responses mediated by ion fluxes, membrane depolarization, and water redistribution in motor tissues.' },
        { type: 'list', items: [
          'Touch can activate calcium waves and jasmonate signaling.',
          'Tendril coiling combines differential growth and mechanical feedback.',
          'Pulvinus motor cells regulate leaf angle through turgor shifts.',
          'Repeated stimulation can produce habituation-like damping.',
        ] },
        { type: 'callout', title: 'Energy Tradeoff', text: 'Rapid movement is costly. Many species gate strong nastic responses to high-value situations such as herbivory or prey capture.', variant: 'tip' },
      ],
    },
    {
      id: 'circadian-gating',
      title: 'Circadian Clocks Gate Plant Responsiveness',
      content: [
        { type: 'text', text: 'Plant circadian systems coordinate physiology with daily light and temperature cycles. Core loops involving genes such as CCA1, LHY, and TOC1 generate approximately 24-hour rhythms that persist in constant conditions and are entrained by dawn and dusk signals.' },
        { type: 'key-term', term: 'Circadian gating', definition: 'Time-of-day modulation of response amplitude, where identical stimuli produce different outputs depending on internal clock phase.' },
        { type: 'text', text: 'Gating affects stomatal conductance, growth rates, hormone sensitivity, defense priming, and flowering pathways. Correct clock-photoperiod alignment improves resource use and fitness; clock mismatch can reduce growth and yield.' },
      ],
    },
    {
      id: 'applications',
      title: 'Applications in Agriculture and Controlled Environments',
      content: [
        { type: 'text', text: 'Greenhouse and vertical-farm systems increasingly manipulate directional light, photoperiod timing, and mechanical cues to shape architecture and productivity. Breeding for root-angle traits improves drought tolerance and nutrient capture by changing how root systems explore soil.' },
        { type: 'list', items: [
          'Directional LEDs can reduce stem lodging and improve canopy efficiency.',
          'Timed irrigation can exploit daily rhythms in root uptake and stomatal behavior.',
          'Mechanical conditioning can reduce transplant shock and improve standability.',
          'Clock-aware scheduling can improve pesticide efficacy and stress resilience.',
        ] },
      ],
    },
  ],
  quiz: {
    id: 'plant-tropisms-circadian-quiz',
    title: 'Plant Tropisms, Nastic Movements & Circadian Rhythms Quiz',
    passingScore: 70,
    questions: [
      { id: 'ptc-q1', type: 'multiple-choice', question: 'Which statement best defines a tropism?', options: ['Movement independent of stimulus direction', 'Directional growth based on stimulus direction', 'Random growth noise', 'Only rapid turgor movements'], correctAnswer: 1, explanation: 'Tropisms are directional growth responses aligned relative to a stimulus vector.' },
      { id: 'ptc-q2', type: 'true-false', question: 'In many shoots, increased auxin on the shaded side promotes elongation and bending toward light.', options: ['True', 'False'], correctAnswer: 0, explanation: 'This differential elongation is the classic phototropic mechanism in shoots.' },
      { id: 'ptc-q3', type: 'multiple-choice', question: 'Gravity sensing in roots is strongly associated with which structure?', options: ['Guard cells', 'Trichomes', 'Statolith-containing statocytes', 'Xylem vessels'], correctAnswer: 2, explanation: 'Statolith sedimentation in statocytes provides the gravity cue.' },
      { id: 'ptc-q4', type: 'multiple-choice', question: 'Nastic movement differs from tropism because it is:', options: ['Always irreversible', 'Independent of stimulus direction', 'Limited to roots', 'Only hormone-independent'], correctAnswer: 1, explanation: 'Nastic responses depend on stimulus intensity or state, not direction.' },
      { id: 'ptc-q5', type: 'ordering', question: 'Order a common shoot phototropism sequence:', options: ['Blue-light perception by phototropins', 'Auxin redistribution across the organ', 'Differential cell elongation', 'Curvature toward light'], correctAnswer: [0, 1, 2, 3], explanation: 'Perception leads to hormone asymmetry, then growth asymmetry, then bending.' },
      { id: 'ptc-q6', type: 'true-false', question: 'Circadian gating means a plant can respond differently to the same stimulus at different times of day.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Clock phase modulates sensitivity and output strength.' },
      { id: 'ptc-q7', type: 'multiple-choice', question: 'Thigmotropism is most directly associated with:', options: ['Tendril coiling around supports', 'Night closure of petals', 'Root growth toward salts', 'Leaf chlorosis'], correctAnswer: 0, explanation: 'Tendrils use touch-guided directional growth.' },
      { id: 'ptc-q8', type: 'multiple-choice', question: 'Hydrotropism helps roots primarily by:', options: ['Avoiding all gravity effects', 'Growing toward moisture gradients', 'Increasing photosynthetic pigments', 'Reducing xylem diameter'], correctAnswer: 1, explanation: 'Hydrotropism biases root growth toward wetter zones.' },
      { id: 'ptc-q9', type: 'true-false', question: 'Clock mismatch with local day length can reduce plant performance.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Internal-external timing mismatch often lowers growth efficiency.' },
      { id: 'ptc-q10', type: 'multiple-choice', question: 'A practical greenhouse use of these concepts is:', options: ['Eliminating all light gradients', 'Using directional lighting to steer architecture', 'Preventing any touch stimulation', 'Randomizing photoperiod daily'], correctAnswer: 1, explanation: 'Directional lighting and timed cues can optimize morphology and yield.' },
    ],
  },
};
