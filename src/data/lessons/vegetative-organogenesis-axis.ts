import type { Lesson } from '../../types';

export const vegetativeOrganogenesisAxis: Lesson = {
  id: 'vegetative-organogenesis-axis',
  title: 'Vegetative Organogenesis I: Shoot-Root Axis Formation',
  slug: 'vegetative-organogenesis-axis',
  description: 'Study how apical meristems establish the shoot-root axis, pattern primary tissues, and coordinate organ initiation from embryogenesis through early vegetative growth.',
  category: 'physiology',
  difficulty: 'advanced',
  estimatedMinutes: 24,
  icon: '🌱',
  color: 'sky',
  prerequisites: ['plant-development', 'embryogenesis-germination'],
  order: 95,
  sections: [
    {
      id: 'axis-foundation',
      title: 'From Embryo Polarity to Axis Establishment',
      content: [
        { type: 'text', text: 'Vegetative architecture begins with polarity establishment in the embryo. The apical-basal axis separates shoot and root programs, while radial patterning distinguishes epidermal, ground, and vascular tissues. Auxin maxima, transcription factor domains, and intercellular signaling stabilize these positional identities before visible organs emerge.' },
        { type: 'key-term', term: 'Apical-basal axis', definition: 'The developmental polarity running from shoot apex to root pole that organizes major body-plan domains in land plants.' },
      ],
    },
    {
      id: 'sam-organization',
      title: 'Shoot Apical Meristem Organization',
      content: [
        { type: 'text', text: 'The shoot apical meristem (SAM) maintains stem cells while continuously producing lateral organs. Functional zones include a central zone with slow-dividing stem cells, a peripheral zone where leaf primordia initiate, and a rib zone that contributes internal stem tissues.' },
        { type: 'list', items: [
          'WUSCHEL supports stem-cell identity in the organizing center.',
          'CLAVATA signaling restricts stem-cell pool size.',
          'Cytokinin generally promotes meristematic proliferation.',
          'Auxin convergence points mark sites of new organ initiation.',
        ] },
        { type: 'callout', title: 'Balance Rule', text: 'A stable SAM requires simultaneous renewal (stem-cell maintenance) and displacement (organ production).', variant: 'info' },
      ],
    },
    {
      id: 'ram-organization',
      title: 'Root Apical Meristem and the Stem Cell Niche',
      content: [
        { type: 'text', text: 'The root apical meristem (RAM) is organized around a quiescent center that helps maintain surrounding initials. Daughter cells move through elongation and differentiation zones, creating a spatial gradient of cell states. Root growth depends on coordination of cell division, anisotropic expansion, and tissue-specific differentiation.' },
        { type: 'key-term', term: 'Quiescent center', definition: 'A low-mitotic region in the root meristem that supports maintenance and identity of nearby stem-cell initials.' },
        { type: 'text', text: 'Auxin and cytokinin interactions define transition boundaries in the root tip, while gibberellin and brassinosteroid pathways tune elongation dynamics.' },
      ],
    },
    {
      id: 'primary-tissue-patterning',
      title: 'Primary Tissue Patterning During Axis Growth',
      content: [
        { type: 'text', text: 'As axes elongate, cell lineages differentiate into dermal, ground, and vascular systems. Procambial patterning and xylem-phloem specification rely on hormonal gradients, mobile transcription factors, and peptide signaling that coordinates neighboring cell fates.' },
        { type: 'list', items: [
          'Dermal tissue provides protection and environmental interface.',
          'Ground tissue supports metabolism, storage, and mechanics.',
          'Vascular patterning establishes long-distance transport routes.',
          'Boundary genes prevent identity mixing between domains.',
        ] },
      ],
    },
    {
      id: 'leaf-root-initiation',
      title: 'Organ Initiation: Leaves and Lateral Roots',
      content: [
        { type: 'text', text: 'Leaf primordia arise at phyllotactic positions in the SAM where auxin accumulates. Lateral roots initiate from pericycle founder cells, often near xylem poles, then emerge through overlying tissues via coordinated cell-wall remodeling and signaling.' },
        { type: 'callout', title: 'Common Logic, Different Context', text: 'Both shoot and root organ initiation rely on local competence, hormonal asymmetry, and mechanical accommodation of growing primordia.', variant: 'fact' },
        { type: 'regional-example', prompt: 'In transparent germination setups, watch primary roots produce lateral roots at non-random intervals. In young shoots, compare successive leaf insertion patterns (alternate, opposite, whorled) across different species.' },
      ],
    },
    {
      id: 'applied-traits',
      title: 'Applied Axis Traits in Breeding and Phenotyping',
      content: [
        { type: 'text', text: 'Axis architecture is a major breeding target because root depth, branch angle, internode length, and leaf distribution strongly affect stress tolerance and yield. Modern phenotyping platforms combine imaging, segmentation, and trait modeling to quantify architecture at scale.' },
        { type: 'list', items: [
          'Rooting depth and angle influence drought avoidance.',
          'Leaf insertion and internode spacing influence canopy light capture.',
          'Early meristem vigor predicts establishment performance.',
          'Architecture traits can be linked to genomic markers for selection.',
        ] },
      ],
    },
  ],
  quiz: {
    id: 'vegetative-organogenesis-axis-quiz',
    title: 'Vegetative Organogenesis I Quiz',
    passingScore: 70,
    questions: [
      { id: 'voa-q1', type: 'multiple-choice', question: 'The apical-basal axis primarily establishes:', options: ['Flower color gradients', 'Shoot-root polarity', 'Stomatal aperture timing', 'Pollen tube guidance'], correctAnswer: 1, explanation: 'It defines fundamental body polarity from shoot apex to root pole.' },
      { id: 'voa-q2', type: 'true-false', question: 'The SAM peripheral zone is a major site of leaf primordium initiation.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Leaf organogenesis occurs mainly in the SAM peripheral zone.' },
      { id: 'voa-q3', type: 'multiple-choice', question: 'Which RAM feature supports nearby stem-cell initials?', options: ['Casparian strip', 'Quiescent center', 'Lenticel complex', 'Hydathode'], correctAnswer: 1, explanation: 'The quiescent center helps maintain the root stem-cell niche.' },
      { id: 'voa-q4', type: 'multiple-choice', question: 'Lateral roots most commonly initiate from which tissue?', options: ['Epidermis', 'Pericycle', 'Phloem companion cells', 'Pith parenchyma'], correctAnswer: 1, explanation: 'Lateral roots arise from pericycle founder cells.' },
      { id: 'voa-q5', type: 'ordering', question: 'Order a typical root developmental sequence:', options: ['Cell division in meristem', 'Cell elongation', 'Cell differentiation', 'Lateral organ emergence'], correctAnswer: [0, 1, 2, 3], explanation: 'Meristematic proliferation precedes elongation, then differentiation and organ emergence.' },
      { id: 'voa-q6', type: 'true-false', question: 'Auxin maxima are involved in both leaf and lateral root initiation.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Auxin patterning is a shared mechanism in both contexts.' },
      { id: 'voa-q7', type: 'multiple-choice', question: 'Primary tissue systems include:', options: ['Dermal, ground, vascular', 'Cuticle, lenticel, stoma', 'Pollen, ovule, embryo', 'Xylem only'], correctAnswer: 0, explanation: 'Primary plant body patterning generates dermal, ground, and vascular systems.' },
      { id: 'voa-q8', type: 'multiple-choice', question: 'CLAVATA signaling mainly functions to:', options: ['Increase random mutation rates', 'Restrict stem-cell overproliferation in SAM', 'Open stomata at night', 'Elongate pollen tubes'], correctAnswer: 1, explanation: 'CLAVATA limits stem-cell pool size and balances WUS activity.' },
      { id: 'voa-q9', type: 'true-false', question: 'Axis architecture traits have little relevance to crop performance.', options: ['True', 'False'], correctAnswer: 1, explanation: 'Architecture traits are major determinants of resilience and yield.' },
      { id: 'voa-q10', type: 'multiple-choice', question: 'A key value of high-throughput architecture phenotyping is:', options: ['Eliminating genetics from breeding', 'Linking measurable traits to selection targets', 'Removing need for field testing', 'Preventing all environmental effects'], correctAnswer: 1, explanation: 'Quantified architecture enables marker-assisted and genomic selection.' },
    ],
  },
};
