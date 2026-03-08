import type { Lesson } from '../../types';

export const reproductiveStressYieldStability: Lesson = {
  id: 'reproductive-stress-yield-stability',
  title: 'Reproductive Stress Physiology and Yield Stability',
  slug: 'reproductive-stress-yield-stability',
  description: 'Analyze how heat, drought, and nutrient stress disrupt reproductive development from meiosis to grain or fruit filling, and how management and breeding stabilize yield.',
  category: 'reproduction',
  difficulty: 'advanced',
  estimatedMinutes: 24,
  icon: '🌾',
  color: 'petal',
  prerequisites: ['reproductive-physiology-fruit-set', 'plant-stress'],
  order: 105,
  sections: [
    {
      id: 'sensitive-stages',
      title: 'Most Vulnerable Reproductive Stages',
      content: [
        { type: 'text', text: 'Reproductive development contains narrow sensitivity windows where stress causes disproportionate yield loss. Meiosis, pollen maturation, fertilization, and early sink establishment are especially vulnerable to thermal and water deficits.' },
        { type: 'key-term', term: 'Anthesis sensitivity window', definition: 'The period around flowering when abiotic stress can strongly reduce pollination success, fertilization, and final yield components.' },
      ],
    },
    {
      id: 'male-female-failures',
      title: 'Male and Female Reproductive Failure Modes',
      content: [
        { type: 'text', text: 'Heat and drought can reduce pollen viability, alter anther dehiscence, impair stigma receptivity, and slow pollen tube growth. Female tissues can also fail through ovule abortion and disrupted embryo sac function.' },
        { type: 'list', items: [
          'Pollen viability decline under heat spikes.',
          'Reduced anther opening and pollen release.',
          'Stigma desiccation and reduced receptivity.',
          'Embryo/endosperm arrest after fertilization.',
        ] },
      ],
    },
    {
      id: 'carbon-and-hormone-context',
      title: 'Carbon Supply, Hormones, and Sink Establishment',
      content: [
        { type: 'text', text: 'Stress affects both reproduction-specific processes and whole-plant carbon economy. Inadequate assimilate supply and hormonal imbalance (ABA, ethylene, auxin, GA interactions) can shift developing reproductive structures from retention to abortion.' },
      ],
    },
    {
      id: 'grain-fruit-filling',
      title: 'Post-Set Stress: Grain and Fruit Filling Constraints',
      content: [
        { type: 'text', text: 'After set, stress alters source-sink partitioning, phloem delivery, and storage metabolism. Final yield reflects not only set rate but also filling duration and filling efficiency under fluctuating environment.' },
        { type: 'callout', title: 'Hidden Loss', text: 'A crop can show good initial set but still lose yield through shortened filling and poor sink development.', variant: 'warning' },
      ],
    },
    {
      id: 'management-tools',
      title: 'Management Levers for Reproductive Resilience',
      content: [
        { type: 'text', text: 'Practical levers include sowing-date optimization, irrigation timing, canopy microclimate management, pollination support, and stress-buffering nutrition. Forecast-guided operations around flowering windows improve stability.' },
        { type: 'regional-example', prompt: 'Compare fields with identical cultivar but different flowering-period irrigation strategies. Yield differences often trace to stress exposure during short critical windows.' },
      ],
    },
    {
      id: 'breeding-targets',
      title: 'Breeding Targets for Stable Reproductive Output',
      content: [
        { type: 'text', text: 'Breeding targets include pollen thermotolerance, flowering-time plasticity, floral architecture, carbohydrate buffering, and sustained sink strength. Multi-trait selection is usually required for stable performance across years.' },
      ],
    },
  ],
  quiz: {
    id: 'reproductive-stress-yield-stability-quiz',
    title: 'Reproductive Stress and Yield Stability Quiz',
    passingScore: 70,
    questions: [
      { id: 'rsys-q1', type: 'multiple-choice', question: 'Yield is often most sensitive to stress during:', options: ['Dormancy only', 'Flowering and fertilization windows', 'Seed storage in warehouse', 'Post-harvest processing'], correctAnswer: 1, explanation: 'Anthesis and early set windows are often critical bottlenecks.' },
      { id: 'rsys-q2', type: 'true-false', question: 'Only male reproductive tissues are affected by heat stress.', options: ['True', 'False'], correctAnswer: 1, explanation: 'Female tissues and post-fertilization development are also stress-sensitive.' },
      { id: 'rsys-q3', type: 'multiple-choice', question: 'A common heat-related reproductive failure is:', options: ['Increased root nodulation', 'Reduced pollen viability', 'Automatic fruit enlargement', 'Enhanced seed dormancy release'], correctAnswer: 1, explanation: 'Heat can strongly reduce pollen viability and function.' },
      { id: 'rsys-q4', type: 'multiple-choice', question: 'Good initial fruit or grain set does not guarantee high final yield because:', options: ['Filling phase can still fail', 'Set always determines 100% yield', 'Climate stops mattering after set', 'Transport is irrelevant'], correctAnswer: 0, explanation: 'Filling duration and sink development remain crucial.' },
      { id: 'rsys-q5', type: 'ordering', question: 'Order a typical stress-impact cascade:', options: ['Stress during sensitive stage', 'Reduced reproductive success', 'Lower sink establishment/filling', 'Final yield reduction'], correctAnswer: [0, 1, 2, 3], explanation: 'Stage-specific stress effects propagate to final yield components.' },
      { id: 'rsys-q6', type: 'true-false', question: 'Targeted management around flowering can improve yield stability.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Timing interventions to sensitive windows is highly effective.' },
      { id: 'rsys-q7', type: 'multiple-choice', question: 'One breeding target for reproductive resilience is:', options: ['Higher pollen thermotolerance', 'Lower root function', 'No flowering plasticity', 'Uniform stress sensitivity'], correctAnswer: 0, explanation: 'Thermotolerant reproduction helps maintain set under heat episodes.' },
      { id: 'rsys-q8', type: 'multiple-choice', question: 'Carbon limitation during reproduction can contribute to:', options: ['Guaranteed retention', 'Abortion of developing sinks', 'Unlimited filling', 'Permanent SAR activation'], correctAnswer: 1, explanation: 'Source-sink constraints can trigger abortion under stress.' },
      { id: 'rsys-q9', type: 'true-false', question: 'Stress forecasting has no practical value for reproductive-stage decisions.', options: ['True', 'False'], correctAnswer: 1, explanation: 'Forecast-guided decisions can protect critical reproductive windows.' },
      { id: 'rsys-q10', type: 'multiple-choice', question: 'Best strategy for stable output across seasons is usually:', options: ['Single trait focus only', 'Multi-trait genetics plus timed management', 'Ignoring environment', 'Late intervention only'], correctAnswer: 1, explanation: 'Stability requires integrated physiological and agronomic approaches.' },
    ],
  },
};
