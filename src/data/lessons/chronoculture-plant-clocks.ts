import type { Lesson } from '../../types';

export const chronoculturePlantClocks: Lesson = {
  id: 'chronoculture-plant-clocks',
  title: 'Chronoculture: Plant Clocks in Managed Systems',
  slug: 'chronoculture-plant-clocks',
  description: 'Apply circadian biology to greenhouse and field management by aligning light, irrigation, and input timing with endogenous plant rhythms.',
  category: 'physiology',
  difficulty: 'advanced',
  estimatedMinutes: 22,
  icon: '⏱️',
  color: 'sky',
  prerequisites: ['plant-tropisms-circadian'],
  order: 106,
  sections: [
    {
      id: 'clock-basics',
      title: 'Circadian Clocks and Entrainment',
      content: [
        { type: 'text', text: 'Plant circadian clocks coordinate metabolism and development with daily cycles. Entrainment by dawn, dusk, and temperature cues keeps internal phase aligned with local environment, improving efficiency and resilience.' },
        { type: 'key-term', term: 'Entrainment', definition: 'Synchronization of endogenous circadian phase to external periodic cues such as light-dark and temperature cycles.' },
      ],
    },
    {
      id: 'phase-dependent-physiology',
      title: 'Phase-Dependent Physiology',
      content: [
        { type: 'text', text: 'Photosynthetic capacity, stomatal behavior, nutrient uptake, and defense responsiveness often vary by internal clock phase. Identical treatments can produce different outcomes depending on application time.' },
        { type: 'list', items: [
          'Morning and afternoon assimilation profiles can differ.',
          'Water-use strategies vary across the diel cycle.',
          'Defense priming competence is often phase-gated.',
          'Growth allocation rhythms affect biomass partitioning.',
        ] },
      ],
    },
    {
      id: 'lighting-strategies',
      title: 'Lighting and Photoperiod Design',
      content: [
        { type: 'text', text: 'In controlled environments, photoperiod, spectral composition, and light timing can be tuned to improve morphology and productivity. Poorly timed lighting can desynchronize clocks and reduce performance even when daily light integral is unchanged.' },
      ],
    },
    {
      id: 'timed-inputs',
      title: 'Chrono-Timing of Irrigation and Inputs',
      content: [
        { type: 'text', text: 'Irrigation, fertigation, elicitors, and some crop-protection treatments can benefit from phase-aware timing. The goal is to increase efficacy while reducing stress and input waste.' },
        { type: 'callout', title: 'Operational Win', text: 'Clock-aware scheduling can improve intervention efficiency without changing product chemistry or dose.', variant: 'tip' },
      ],
    },
    {
      id: 'clock-mismatch',
      title: 'Clock Mismatch and Performance Penalties',
      content: [
        { type: 'text', text: 'When internal clocks are misaligned with local day length or management cycles, plants can lose productivity and stress tolerance. Frequent schedule shifts, irregular nighttime lighting, and abrupt climate-control changes can drive mismatch.' },
        { type: 'regional-example', prompt: 'Compare plant vigor in greenhouses with stable versus highly irregular supplemental-light schedules during winter. Rhythm stability often tracks growth consistency.' },
      ],
    },
    {
      id: 'implementation-framework',
      title: 'Implementing Chronoculture in Practice',
      content: [
        { type: 'text', text: 'Implementation starts with identifying phase-sensitive operations, testing timing windows in small blocks, and integrating environmental data with phenology. Iterative optimization is more reliable than one-time universal schedules.' },
      ],
    },
  ],
  quiz: {
    id: 'chronoculture-plant-clocks-quiz',
    title: 'Chronoculture Quiz',
    passingScore: 70,
    questions: [
      { id: 'cpc-q1', type: 'multiple-choice', question: 'Entrainment refers to:', options: ['Permanent clock shutdown', 'Synchronization of internal clock with external cycles', 'Randomized metabolism', 'Only seasonal dormancy'], correctAnswer: 1, explanation: 'Entrainment aligns circadian phase to recurring environmental cues.' },
      { id: 'cpc-q2', type: 'true-false', question: 'Treatment timing can influence efficacy even when dose is unchanged.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Phase-gated responsiveness changes intervention outcomes.' },
      { id: 'cpc-q3', type: 'multiple-choice', question: 'A likely consequence of chronic clock mismatch is:', options: ['Guaranteed yield increase', 'Reduced performance and resilience', 'Permanent disease immunity', 'Zero effect on physiology'], correctAnswer: 1, explanation: 'Desynchrony can reduce efficiency and stress tolerance.' },
      { id: 'cpc-q4', type: 'multiple-choice', question: 'Chronoculture primarily aims to:', options: ['Ignore circadian biology', 'Align management timing with plant rhythms', 'Remove photoperiod effects', 'Eliminate all stress responses'], correctAnswer: 1, explanation: 'Timing operations to biological phase improves outcomes.' },
      { id: 'cpc-q5', type: 'ordering', question: 'Order a practical chronoculture rollout:', options: ['Identify phase-sensitive operations', 'Run small timing trials', 'Measure outcomes', 'Scale best schedules'], correctAnswer: [0, 1, 2, 3], explanation: 'Iterative trials support robust deployment.' },
      { id: 'cpc-q6', type: 'true-false', question: 'Equal daily light integral always guarantees equal outcomes regardless of timing.', options: ['True', 'False'], correctAnswer: 1, explanation: 'Timing and spectral schedule can still alter physiology.' },
      { id: 'cpc-q7', type: 'multiple-choice', question: 'A phase-aware operational lever is:', options: ['Random nighttime light pulses', 'Timed irrigation windows', 'Irregular climate setpoints', 'Eliminating monitoring'], correctAnswer: 1, explanation: 'Scheduling irrigation to phase can improve efficiency.' },
      { id: 'cpc-q8', type: 'multiple-choice', question: 'Clock-aware design in controlled environments can improve:', options: ['Input efficiency', 'Only leaf color aesthetics', 'Pathogen evolution speed', 'Nutrient leaching'], correctAnswer: 0, explanation: 'Phase alignment can increase intervention efficiency.' },
      { id: 'cpc-q9', type: 'true-false', question: 'Defense responsiveness can be circadian-gated.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Immune responsiveness often varies by time of day.' },
      { id: 'cpc-q10', type: 'multiple-choice', question: 'Best implementation strategy is typically:', options: ['One fixed universal schedule forever', 'Adaptive scheduling informed by trial data', 'No baseline measurements', 'High-frequency random changes'], correctAnswer: 1, explanation: 'Data-driven adaptation outperforms static assumptions.' },
    ],
  },
};
