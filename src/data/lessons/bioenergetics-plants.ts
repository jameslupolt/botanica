import type { Lesson } from '../../types';

export const bioenergeticsPlants: Lesson = {
  id: 'bioenergetics-plants',
  title: 'Bioenergetics in Plants: Thermodynamics and Energy Budgets',
  slug: 'bioenergetics-plants',
  description: 'Connect thermodynamic principles to ATP coupling, redox balance, and whole-plant carbon-energy budgeting across photosynthesis, respiration, and stress adaptation.',
  category: 'physiology',
  difficulty: 'advanced',
  estimatedMinutes: 23,
  icon: '🔋',
  color: 'sky',
  prerequisites: ['photosynthesis', 'respiration'],
  order: 99,
  sections: [
    {
      id: 'thermo-basics',
      title: 'Thermodynamic Foundations for Plant Biology',
      content: [
        { type: 'text', text: 'Plant systems obey the same thermodynamic constraints as all living systems. The first law governs energy conservation, while the second law governs directionality and efficiency limits. Metabolic organization does not violate entropy principles; instead, plants maintain local order by coupling unfavorable processes to favorable energy transformations.' },
        { type: 'key-term', term: 'Gibbs free energy', definition: 'A state function (delta G) describing the usable energy change of a process at constant temperature and pressure; negative delta G indicates thermodynamic spontaneity.' },
      ],
    },
    {
      id: 'atp-and-coupling',
      title: 'ATP Coupling and Electrochemical Gradients',
      content: [
        { type: 'text', text: 'ATP hydrolysis is a central coupling currency, but plants also rely heavily on proton motive force across thylakoid and mitochondrial membranes. Coupling links exergonic electron transfer to endergonic transport and biosynthesis through chemiosmotic mechanisms.' },
        { type: 'list', items: [
          'Thylakoid proton gradients drive chloroplast ATP synthase.',
          'Mitochondrial gradients drive oxidative phosphorylation.',
          'Membrane transporters consume or harness electrochemical energy.',
          'Energy coupling constrains flux through biosynthetic pathways.',
        ] },
      ],
    },
    {
      id: 'photosynthesis-respiration-balance',
      title: 'Balancing Photosynthetic Input and Respiratory Demand',
      content: [
        { type: 'text', text: 'Net carbon gain emerges from balancing light capture, carbon fixation, photorespiration costs, and respiratory demand across tissues. Source leaves and sink organs operate under different energetic priorities; growth efficiency depends on allocation strategy as much as gross photosynthetic rate.' },
        { type: 'callout', title: 'Common Misread', text: 'High instantaneous photosynthesis does not guarantee high yield if sink limitation, respiration burden, or stress costs dominate season-long budgets.', variant: 'warning' },
      ],
    },
    {
      id: 'energy-under-stress',
      title: 'Energy Tradeoffs Under Stress',
      content: [
        { type: 'text', text: 'Abiotic and biotic stresses reallocate energy toward protection, repair, and signaling. Antioxidant systems, osmotic adjustment, and defense compound production all carry energetic costs. Tolerance often reflects how efficiently a genotype maintains ATP/redox homeostasis during disruption.' },
        { type: 'key-term', term: 'Energy-use efficiency', definition: 'The proportion of acquired energy that is converted into desired biological outputs such as biomass, reproduction, or stress resilience.' },
      ],
    },
    {
      id: 'whole-plant-budgets',
      title: 'Whole-Plant and Crop Energy Budgets',
      content: [
        { type: 'text', text: 'At field scale, energy budgeting integrates canopy architecture, radiation interception, respiration fractions, and partitioning to harvestable tissues. Models that combine physiology with environment can identify when performance is source-limited versus sink-limited.' },
        { type: 'regional-example', prompt: 'Compare shaded and unshaded plants of the same species in warm weather. The shaded plant may lower heat stress costs but also reduce carbon input; the net effect depends on total budget, not one process alone.' },
      ],
    },
    {
      id: 'measurement-tools',
      title: 'Measurement and Modeling Tools',
      content: [
        { type: 'text', text: 'Gas exchange, chlorophyll fluorescence, isotope tracing, and metabolic flux analysis provide complementary views of plant energy status. Coupling these with phenomics and weather data improves prediction of genotype-by-environment performance.' },
      ],
    },
  ],
  quiz: {
    id: 'bioenergetics-plants-quiz',
    title: 'Bioenergetics in Plants Quiz',
    passingScore: 70,
    questions: [
      { id: 'bp-q1', type: 'multiple-choice', question: 'A negative delta G indicates:', options: ['Thermodynamic non-spontaneity', 'Spontaneous direction under given conditions', 'No coupling needed ever', 'Zero entropy change'], correctAnswer: 1, explanation: 'Negative Gibbs free energy indicates favorable directionality under stated conditions.' },
      { id: 'bp-q2', type: 'true-false', question: 'Plants maintain order by coupling unfavorable processes to favorable energy transformations.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Biological organization depends on energetically coupled processes.' },
      { id: 'bp-q3', type: 'multiple-choice', question: 'Chemiosmotic ATP production relies on:', options: ['Only cytoskeletal tension', 'Proton motive force across membranes', 'Spontaneous ATP formation in cytosol', 'DNA replication energy'], correctAnswer: 1, explanation: 'Proton gradients across membranes power ATP synthase.' },
      { id: 'bp-q4', type: 'multiple-choice', question: 'Net productivity is most strongly determined by:', options: ['Gross photosynthesis alone', 'Balance of gains, respiration, and allocation', 'Leaf color only', 'Soil pH only'], correctAnswer: 1, explanation: 'Whole-system balance determines realized productivity.' },
      { id: 'bp-q5', type: 'ordering', question: 'Order a simplified energy-flow path:', options: ['Light capture and photochemistry', 'ATP/NADPH generation', 'Carbon fixation and metabolism', 'Growth and storage allocation'], correctAnswer: [0, 1, 2, 3], explanation: 'Energy conversion proceeds from capture to biochemical currency to carbon assimilation and allocation.' },
      { id: 'bp-q6', type: 'true-false', question: 'Stress responses are energetically free if they improve survival.', options: ['True', 'False'], correctAnswer: 1, explanation: 'Defense and repair require substantial energetic investment.' },
      { id: 'bp-q7', type: 'multiple-choice', question: 'An example of sink limitation is:', options: ['High photosynthetic leaves with poor storage/use capacity', 'No light availability at all', 'Zero transpiration', 'Complete ATP absence'], correctAnswer: 0, explanation: 'Carbon input can exceed capacity to use/store it effectively.' },
      { id: 'bp-q8', type: 'multiple-choice', question: 'A direct method for measuring photosynthetic flux is:', options: ['Gas exchange analysis', 'Seed color scoring', 'Petiole length only', 'Root odor profiling'], correctAnswer: 0, explanation: 'Gas exchange provides direct physiological flux measurements.' },
      { id: 'bp-q9', type: 'true-false', question: 'Energy budgets can differ strongly between source leaves and developing fruits.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Different organs have distinct energetic roles and costs.' },
      { id: 'bp-q10', type: 'multiple-choice', question: 'A major value of energy-budget modeling is to:', options: ['Replace all experiments permanently', 'Identify source versus sink constraints', 'Eliminate environmental variability', 'Ignore respiration'], correctAnswer: 1, explanation: 'Models help diagnose limiting processes and guide interventions.' },
    ],
  },
};
