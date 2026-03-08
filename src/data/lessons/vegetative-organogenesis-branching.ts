import type { Lesson } from '../../types';

export const vegetativeOrganogenesisBranching: Lesson = {
  id: 'vegetative-organogenesis-branching',
  title: 'Vegetative Organogenesis II: Branching and Secondary Patterning',
  slug: 'vegetative-organogenesis-branching',
  description: 'Explore how axillary meristems, hormonal crosstalk, and cambial activity shape branching architecture, wood formation, and long-term vegetative structure.',
  category: 'physiology',
  difficulty: 'advanced',
  estimatedMinutes: 24,
  icon: '🌿',
  color: 'sky',
  prerequisites: ['vegetative-organogenesis-axis', 'secondary-growth'],
  order: 96,
  sections: [
    {
      id: 'branching-overview',
      title: 'Why Branching Patterns Matter',
      content: [
        { type: 'text', text: 'Branching architecture controls canopy shape, light interception, hydraulic distribution, reproductive output, and mechanical stability. Plants tune branching intensity through local bud states and whole-plant resource signaling, creating highly plastic structures across environments.' },
        { type: 'key-term', term: 'Apical dominance', definition: 'Suppression of axillary bud outgrowth by the actively growing shoot apex, mediated primarily by hormonal and sugar signaling networks.' },
      ],
    },
    {
      id: 'axillary-meristems',
      title: 'Axillary Meristem Initiation and Bud Fate',
      content: [
        { type: 'text', text: 'Axillary meristems are initiated in leaf axils and can remain dormant, activate into branches, or convert to reproductive structures depending on developmental phase and environmental conditions. Bud fate depends on meristem competence, source-sink relations, and inhibitory or promoting long-distance signals.' },
        { type: 'list', items: [
          'Dormancy preserves future branching potential.',
          'Activation supports rapid canopy expansion after disturbance.',
          'Some buds transition directly into inflorescences.',
          'Bud banks contribute to resilience after grazing or pruning.',
        ] },
      ],
    },
    {
      id: 'hormone-crosstalk',
      title: 'Auxin, Cytokinin, and Strigolactone Crosstalk',
      content: [
        { type: 'text', text: 'Apical auxin indirectly suppresses bud growth by shaping stem transport capacity and interacting with other hormones. Cytokinin generally promotes bud activation, while strigolactones reinforce inhibition of branch outgrowth. Sugars and nitrate signals modulate this core network, often shifting outcomes quickly after decapitation or nutrient pulses.' },
        { type: 'key-term', term: 'Canalization', definition: 'Self-reinforcing polarization of auxin transport that stabilizes specific vascular routes and influences whether a bud can establish export to the main stem.' },
        { type: 'callout', title: 'Rapid Release After Decapitation', text: 'Removing the shoot apex often causes fast bud release because inhibitory signaling drops and carbohydrate availability to buds increases.', variant: 'fact' },
      ],
    },
    {
      id: 'branch-angle-and-patterns',
      title: 'Branch Angle, Phyllotaxy, and Crown Form',
      content: [
        { type: 'text', text: 'Beyond branch number, branch angle and insertion pattern determine crown architecture and self-shading. Gravitropic setpoint angles, mechanical loading, and wood deposition patterns shape final geometry. Selection for branch-angle loci has major effects on planting density and harvest efficiency.' },
        { type: 'list', items: [
          'Narrower branch angles can increase canopy packing.',
          'Wider angles often improve light penetration and fruit quality.',
          'Phyllotactic pattern affects overlap and aerodynamic behavior.',
          'Biomechanics and wind exposure feed back on growth trajectories.',
        ] },
      ],
    },
    {
      id: 'cambium-secondary-patterning',
      title: 'Cambial Activity and Secondary Patterning',
      content: [
        { type: 'text', text: 'Long-term branching capacity depends on secondary growth. Vascular cambium produces secondary xylem and phloem, while ray systems support radial transport and storage. Hormone gradients, peptide signals, and seasonal cues regulate cambial dormancy and reactivation cycles.' },
        { type: 'text', text: 'Reaction wood formation helps reorient branches under gravity and mechanical stress, linking developmental patterning to structural mechanics.' },
      ],
    },
    {
      id: 'management-breeding',
      title: 'Pruning, Orchard Systems, and Breeding',
      content: [
        { type: 'text', text: 'Horticultural systems exploit branching biology through pruning, training, and rootstock selection. Breeding and genome editing increasingly target branching genes to optimize architecture for mechanized harvest and climate-resilient production.' },
        { type: 'regional-example', prompt: 'Compare heavily pruned orchard trees with unmanaged roadside trees. Note differences in branch hierarchy, angle uniformity, and light distribution through the crown.' },
      ],
    },
  ],
  quiz: {
    id: 'vegetative-organogenesis-branching-quiz',
    title: 'Vegetative Organogenesis II Quiz',
    passingScore: 70,
    questions: [
      { id: 'vob-q1', type: 'multiple-choice', question: 'Apical dominance primarily affects:', options: ['Seed coat hardness', 'Axillary bud outgrowth', 'Chloroplast division', 'Pollen viability'], correctAnswer: 1, explanation: 'Apical dominance regulates whether axillary buds remain dormant or branch.' },
      { id: 'vob-q2', type: 'true-false', question: 'Cytokinin generally promotes bud activation.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Cytokinin is commonly associated with release of bud growth.' },
      { id: 'vob-q3', type: 'multiple-choice', question: 'Which hormone class is strongly linked to branch inhibition?', options: ['Brassinosteroids', 'Strigolactones', 'Ethylene only', 'Salicylic acid'], correctAnswer: 1, explanation: 'Strigolactones are key inhibitors of branch outgrowth in many systems.' },
      { id: 'vob-q4', type: 'multiple-choice', question: 'Canalization in branching biology refers to:', options: ['Random transport diffusion', 'Stable auxin transport route formation', 'Bud death by necrosis', 'Phloem loading failure'], correctAnswer: 1, explanation: 'Canalization establishes persistent auxin export routes from active buds.' },
      { id: 'vob-q5', type: 'ordering', question: 'Order a typical bud-release scenario after apex removal:', options: ['Loss of apical inhibition', 'Improved bud carbohydrate access', 'Bud growth reactivation', 'Visible branch elongation'], correctAnswer: [0, 1, 2, 3], explanation: 'Inhibitory signal reduction and resource shifts precede visible outgrowth.' },
      { id: 'vob-q6', type: 'true-false', question: 'Branch angle traits can influence orchard planting density.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Architecture determines spacing, light distribution, and management intensity.' },
      { id: 'vob-q7', type: 'multiple-choice', question: 'The vascular cambium contributes mainly to:', options: ['Stomatal opening', 'Secondary xylem and phloem production', 'Pollination specificity', 'Seed dormancy break'], correctAnswer: 1, explanation: 'Cambium drives secondary thickening and long-term structural support.' },
      { id: 'vob-q8', type: 'multiple-choice', question: 'Reaction wood is most directly related to:', options: ['Pathogen exclusion', 'Mechanical reorientation support', 'Nitrogen fixation', 'Floral color change'], correctAnswer: 1, explanation: 'Reaction wood helps stems and branches compensate for mechanical loads.' },
      { id: 'vob-q9', type: 'true-false', question: 'All axillary buds in a plant necessarily activate during one season.', options: ['True', 'False'], correctAnswer: 1, explanation: 'Many buds remain dormant, forming a reserve of branching potential.' },
      { id: 'vob-q10', type: 'multiple-choice', question: 'A direct applied use of branching biology is:', options: ['Ignoring canopy geometry in orchards', 'Pruning and training to optimize light and yield', 'Eliminating all lateral buds genetically', 'Avoiding rootstock selection'], correctAnswer: 1, explanation: 'Pruning and architecture management are core agronomic applications.' },
    ],
  },
};
