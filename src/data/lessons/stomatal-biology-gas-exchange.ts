import type { Lesson } from '../../types';

export const stomatalBiologyGasExchange: Lesson = {
  id: 'stomatal-biology-gas-exchange',
  title: 'Stomatal Biology and Gas Exchange Regulation',
  slug: 'stomatal-biology-gas-exchange',
  description: 'Examine stomatal development, guard-cell signaling, and how plants regulate carbon uptake and water loss under fluctuating light, vapor pressure deficit, and stress.',
  category: 'physiology',
  difficulty: 'advanced',
  estimatedMinutes: 23,
  icon: '💧',
  color: 'sky',
  prerequisites: ['photosynthesis', 'water-transport'],
  order: 100,
  sections: [
    {
      id: 'stomata-role',
      title: 'Stomata as a Carbon-Water Control Valve',
      content: [
        { type: 'text', text: 'Stomata regulate the central tradeoff of terrestrial plant life: acquiring CO2 for photosynthesis while limiting transpirational water loss. Their density, size, and dynamic aperture behavior jointly determine leaf conductance and water-use efficiency.' },
        { type: 'key-term', term: 'Stomatal conductance', definition: 'A measure of gas diffusion capacity through stomata, commonly used to quantify exchange of water vapor and CO2 between leaf and atmosphere.' },
      ],
    },
    {
      id: 'development-patterning',
      title: 'Stomatal Development and Epidermal Patterning',
      content: [
        { type: 'text', text: 'Stomata arise from specialized epidermal lineages controlled by developmental regulators and spacing rules. The one-cell spacing pattern reduces direct stomatal clustering and supports efficient local diffusion fields.' },
        { type: 'list', items: [
          'Meristemoid lineages generate guard-cell precursors.',
          'Key transcriptional modules define lineage transitions.',
          'Peptide signaling and receptor kinases enforce spacing.',
          'Environment can shift final stomatal density and size.',
        ] },
      ],
    },
    {
      id: 'guard-cell-signaling',
      title: 'Guard Cell Ion Transport and Aperture Control',
      content: [
        { type: 'text', text: 'Opening and closing are driven by ion transport, osmotic potential changes, and turgor modulation in paired guard cells. Blue light often promotes opening through proton-pump activation and K+ uptake, while ABA and high vapor pressure deficit favor closure through anion release, membrane depolarization, and K+ efflux.' },
        { type: 'key-term', term: 'ABA-mediated closure', definition: 'A drought-responsive signaling process where abscisic acid promotes guard-cell ion efflux and turgor loss, reducing stomatal aperture and water loss.' },
        { type: 'callout', title: 'Dynamic Limitation', text: 'Stomatal responses are not instantaneous; response speed can constrain photosynthetic efficiency under rapidly fluctuating light.', variant: 'info' },
      ],
    },
    {
      id: 'environmental-controls',
      title: 'Environmental Drivers: Light, CO2, VPD, and Temperature',
      content: [
        { type: 'text', text: 'Stomatal behavior integrates multiple external signals: light intensity and spectrum, intercellular CO2, humidity gradients, wind, and temperature. High VPD typically increases closure tendency, while elevated atmospheric CO2 can reduce baseline conductance in many species.' },
        { type: 'list', items: [
          'Blue light strongly stimulates opening in many species.',
          'Rising VPD increases hydraulic risk and closure pressure.',
          'Elevated CO2 often lowers conductance but effects vary by genotype.',
          'Heat waves can force competing cooling versus conservation priorities.',
        ] },
      ],
    },
    {
      id: 'wue-and-modeling',
      title: 'Water-Use Efficiency and Predictive Modeling',
      content: [
        { type: 'text', text: 'Intrinsic water-use efficiency links assimilation to conductance, but field-level efficiency also depends on canopy architecture, soil water dynamics, and phenology. Stomatal models are increasingly integrated with crop simulation to forecast drought responses and irrigation outcomes.' },
        { type: 'regional-example', prompt: 'On a warm dry day, compare midday leaf posture and wilting tendency between two cultivars. Conservative stomatal behavior may preserve water but can reduce carbon gain if too restrictive.' },
      ],
    },
    {
      id: 'breeding-and-engineering',
      title: 'Breeding and Engineering Stomatal Traits',
      content: [
        { type: 'text', text: 'Breeding targets include stomatal density, size, kinetics, and ABA sensitivity. The objective is context-specific optimization: rapid opening under favorable light, rapid closure under water stress, and improved seasonal yield stability.' },
      ],
    },
  ],
  quiz: {
    id: 'stomatal-biology-gas-exchange-quiz',
    title: 'Stomatal Biology and Gas Exchange Quiz',
    passingScore: 70,
    questions: [
      { id: 'sbge-q1', type: 'multiple-choice', question: 'Stomata primarily regulate:', options: ['Root gravitropism only', 'CO2 uptake and water vapor loss', 'Seed coat lignification only', 'Pollen compatibility only'], correctAnswer: 1, explanation: 'Stomata control the major carbon-water exchange interface in leaves.' },
      { id: 'sbge-q2', type: 'true-false', question: 'Blue light commonly promotes stomatal opening.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Blue-light signaling often activates opening pathways in guard cells.' },
      { id: 'sbge-q3', type: 'multiple-choice', question: 'ABA generally causes stomata to:', options: ['Open wider', 'Close under drought signaling', 'Become permanent', 'Stop developing entirely'], correctAnswer: 1, explanation: 'ABA promotes closure to reduce transpirational loss under stress.' },
      { id: 'sbge-q4', type: 'multiple-choice', question: 'High vapor pressure deficit usually pushes stomata toward:', options: ['Greater opening', 'Closure tendency', 'No response ever', 'Cell division only'], correctAnswer: 1, explanation: 'High VPD increases evaporative demand and closure pressure.' },
      { id: 'sbge-q5', type: 'ordering', question: 'Order a common closure sequence under drought:', options: ['ABA signaling in guard cells', 'Ion efflux from guard cells', 'Guard-cell turgor decline', 'Reduced stomatal aperture'], correctAnswer: [0, 1, 2, 3], explanation: 'Signal transduction leads to ion loss, turgor reduction, and closing.' },
      { id: 'sbge-q6', type: 'true-false', question: 'Stomatal kinetics can limit carbon gain in fluctuating light.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Slow dynamics create lags between light environment and gas exchange capacity.' },
      { id: 'sbge-q7', type: 'multiple-choice', question: 'One-cell spacing rules in stomatal development help:', options: ['Increase pathogen abundance', 'Avoid excessive clustering and diffusion interference', 'Eliminate epidermal cells', 'Stop leaf expansion'], correctAnswer: 1, explanation: 'Spacing improves epidermal pattern function and gas exchange geometry.' },
      { id: 'sbge-q8', type: 'multiple-choice', question: 'Elevated atmospheric CO2 often causes baseline conductance to:', options: ['Increase strongly in all species', 'Decrease in many species', 'Become irrelevant', 'Oscillate randomly'], correctAnswer: 1, explanation: 'Many plants reduce conductance under higher ambient CO2, with variation.' },
      { id: 'sbge-q9', type: 'true-false', question: 'Improved water-use efficiency always means higher yield under every condition.', options: ['True', 'False'], correctAnswer: 1, explanation: 'Overly conservative stomata can reduce carbon gain; context matters.' },
      { id: 'sbge-q10', type: 'multiple-choice', question: 'A major breeding objective is:', options: ['Eliminate all stomata', 'Optimize density, size, and response kinetics', 'Ignore ABA sensitivity', 'Fix one universal aperture'], correctAnswer: 1, explanation: 'Trait optimization targets environment-specific performance tradeoffs.' },
    ],
  },
};
