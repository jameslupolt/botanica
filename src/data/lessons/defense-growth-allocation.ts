import type { Lesson } from '../../types';

export const defenseGrowthAllocation: Lesson = {
  id: 'defense-growth-allocation',
  title: 'Defense-Growth Allocation Strategies',
  slug: 'defense-growth-allocation',
  description: 'Investigate how plants allocate carbon, nitrogen, and signaling capacity between growth and defense under variable risk, and how this tradeoff shapes management and breeding decisions.',
  category: 'ecology',
  difficulty: 'advanced',
  estimatedMinutes: 22,
  icon: '⚖️',
  color: 'leaf',
  prerequisites: ['plant-stress', 'plant-immunity-biotic-interactions'],
  order: 108,
  sections: [
    {
      id: 'allocation-principle',
      title: 'The Core Allocation Constraint',
      content: [
        { type: 'text', text: 'Plants operate under finite resource and regulatory budgets. Investment in defense compounds, signaling, and repair can protect survival but may reduce growth or reproduction under low-threat conditions.' },
        { type: 'key-term', term: 'Defense-growth tradeoff', definition: 'A resource and regulation constraint where increased defense investment can reduce growth or yield, depending on environment and genotype.' },
      ],
    },
    {
      id: 'metabolic-costs',
      title: 'Metabolic and Opportunity Costs of Defense',
      content: [
        { type: 'text', text: 'Defense synthesis and activation consume ATP, reducing power, and precursor carbon/nitrogen. Costs include both direct metabolic expenditure and opportunity costs from redirected flux away from growth processes.' },
      ],
    },
    {
      id: 'regulatory-switches',
      title: 'Hormonal and Regulatory Switching',
      content: [
        { type: 'text', text: 'Cross-talk among SA, JA, ethylene, auxin, and growth pathways enables dynamic switching between growth and defense priorities. The same genotype can show different allocation outcomes depending on developmental stage and stress stacking.' },
        { type: 'list', items: [
          'SA-dominant states often prioritize biotroph defense.',
          'JA/ethylene states often prioritize herbivore or necrotroph defense.',
          'Growth-promoting pathways can be transiently downregulated.',
          'Recovery dynamics matter as much as activation intensity.',
        ] },
      ],
    },
    {
      id: 'environmental-context',
      title: 'Context: Risk, Resources, and Timing',
      content: [
        { type: 'text', text: 'Optimal allocation is context-dependent. High pathogen pressure can make costly defense highly beneficial, while low pressure can make constitutive defense inefficient. Resource abundance, climate stress, and phenological stage all shift the optimum.' },
        { type: 'callout', title: 'No Universal Optimum', text: 'The best allocation strategy changes across locations, years, and management systems.', variant: 'info' },
      ],
    },
    {
      id: 'breeding-management',
      title: 'Breeding and Management for Better Balance',
      content: [
        { type: 'text', text: 'Crop improvement targets inducible defenses, faster recovery, and robust performance under mixed stress. Management can reduce needless defense costs by lowering baseline disease pressure and timing interventions to risk windows.' },
        { type: 'regional-example', prompt: 'Compare two cultivars under similar disease pressure: one with strong constitutive defense and one with inducible defense. Yield differences often reflect defense timing efficiency.' },
      ],
    },
    {
      id: 'decision-framework',
      title: 'Decision Framework for Deployment',
      content: [
        { type: 'text', text: 'Effective deployment uses surveillance, weather risk, cultivar traits, and economic thresholds to determine when to trigger or support defense pathways. This improves resilience while preserving productivity.' },
      ],
    },
  ],
  quiz: {
    id: 'defense-growth-allocation-quiz',
    title: 'Defense-Growth Allocation Quiz',
    passingScore: 70,
    questions: [
      { id: 'dga-q1', type: 'multiple-choice', question: 'The defense-growth tradeoff primarily reflects:', options: ['Infinite resource supply', 'Finite allocation capacity', 'Lack of gene regulation', 'Random mutation only'], correctAnswer: 1, explanation: 'Plants allocate limited resources among competing functions.' },
      { id: 'dga-q2', type: 'true-false', question: 'Constitutive high defense is always optimal regardless of risk.', options: ['True', 'False'], correctAnswer: 1, explanation: 'High constitutive defense can reduce performance under low-risk conditions.' },
      { id: 'dga-q3', type: 'multiple-choice', question: 'Opportunity cost in defense allocation means:', options: ['No metabolic effect', 'Resources used for defense cannot be used for growth', 'Only water loss', 'Only pollen defects'], correctAnswer: 1, explanation: 'Allocation to one process can reduce investment in alternatives.' },
      { id: 'dga-q4', type: 'multiple-choice', question: 'Which statement best captures allocation context?', options: ['One strategy fits all sites and years', 'Optimal balance depends on risk and resources', 'Defense and growth never interact', 'Hormones are irrelevant'], correctAnswer: 1, explanation: 'Environment and pressure determine useful allocation strategies.' },
      { id: 'dga-q5', type: 'ordering', question: 'Order a practical allocation strategy loop:', options: ['Assess risk and crop stage', 'Select cultivar/management response', 'Implement and monitor', 'Adjust strategy by outcomes'], correctAnswer: [0, 1, 2, 3], explanation: 'Allocation decisions should be iterative and evidence-based.' },
      { id: 'dga-q6', type: 'true-false', question: 'Recovery dynamics after defense activation can influence yield outcomes.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Fast recovery can preserve productivity under repeated challenges.' },
      { id: 'dga-q7', type: 'multiple-choice', question: 'A desirable breeding target is often:', options: ['Maximal constitutive defense only', 'Inducible defense with low baseline penalty', 'No immune signaling capacity', 'Permanent growth suppression'], correctAnswer: 1, explanation: 'Inducible systems can improve cost-benefit balance.' },
      { id: 'dga-q8', type: 'multiple-choice', question: 'Management can reduce unnecessary defense costs by:', options: ['Ignoring disease scouting', 'Reducing baseline pressure and timing interventions', 'Increasing random stress', 'Eliminating cultivar selection'], correctAnswer: 1, explanation: 'Risk-aware management avoids wasted allocation.' },
      { id: 'dga-q9', type: 'true-false', question: 'Hormonal cross-talk contributes to switching between growth and defense states.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Cross-talk is a core mechanism for dynamic allocation.' },
      { id: 'dga-q10', type: 'multiple-choice', question: 'Best deployment decisions are typically based on:', options: ['Single static calendar', 'Surveillance, risk forecasts, and trait context', 'No local data', 'One universal threshold'], correctAnswer: 1, explanation: 'Context-informed decisions improve resilience and productivity.' },
    ],
  },
};
