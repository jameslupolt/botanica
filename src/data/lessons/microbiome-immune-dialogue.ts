import type { Lesson } from '../../types';

export const microbiomeImmuneDialogue: Lesson = {
  id: 'microbiome-immune-dialogue',
  title: 'Plant Microbiome and Immune Dialogue',
  slug: 'microbiome-immune-dialogue',
  description: 'Explore how plants filter, recruit, and regulate microbial communities while maintaining immunity against pathogens and tolerance toward beneficial symbionts.',
  category: 'ecology',
  difficulty: 'advanced',
  estimatedMinutes: 23,
  icon: '🦠',
  color: 'petal',
  prerequisites: ['plant-immunity-biotic-interactions', 'systemic-acquired-resistance'],
  order: 104,
  sections: [
    {
      id: 'microbiome-zones',
      title: 'Rhizosphere, Endosphere, and Phyllosphere',
      content: [
        { type: 'text', text: 'Plant-associated microbiomes are spatially structured. Root exudates shape rhizosphere assembly, host barriers regulate endosphere entry, and the phyllosphere supports distinct microbial networks exposed to strong abiotic fluctuations.' },
        { type: 'key-term', term: 'Endosphere', definition: 'Internal plant compartments colonized by microbes that pass host filtering barriers and interact directly with host tissues.' },
      ],
    },
    {
      id: 'immune-filtering',
      title: 'Immune Filtering and Selective Tolerance',
      content: [
        { type: 'text', text: 'Plants do not simply suppress immunity for symbiosis. Instead, they tune receptor thresholds, local signaling intensity, and nutrient exchange controls to discriminate beneficial partners from threats.' },
        { type: 'list', items: [
          'Basal immune surveillance remains active during mutualism.',
          'Local suppression can be transient and spatially confined.',
          'Host genotype strongly influences microbiome composition.',
          'Nutrient status reshapes immune-microbiome equilibrium.',
        ] },
      ],
    },
    {
      id: 'microbe-derived-benefits',
      title: 'How Beneficial Microbes Improve Plant Performance',
      content: [
        { type: 'text', text: 'Beneficial microbes contribute to nutrient mobilization, stress buffering, and induced resistance. Effects can be direct (resource access) or indirect (defense priming, hormone modulation, pathogen suppression).' },
        { type: 'callout', title: 'Context Dependence', text: 'A strain that is beneficial in one soil and cultivar context may be neutral or costly in another.', variant: 'warning' },
      ],
    },
    {
      id: 'dysbiosis-risk',
      title: 'Dysbiosis and Disease Risk',
      content: [
        { type: 'text', text: 'Microbiome imbalance (dysbiosis) can increase susceptibility by reducing niche competition and protective functions. Intensive management, repeated disturbance, and broad-spectrum antimicrobials can destabilize protective communities.' },
      ],
    },
    {
      id: 'engineering-microbiomes',
      title: 'Engineering Microbiomes in Crop Systems',
      content: [
        { type: 'text', text: 'Applied approaches include inoculants, substrate amendments, rotation design, and rootstock selection. Stable outcomes usually require ecological compatibility rather than one-off inoculation.' },
        { type: 'regional-example', prompt: 'Compare root health between fields using cover-crop rotations and fields with long monoculture. Differences in root disease pressure often track microbial community resilience.' },
      ],
    },
    {
      id: 'monitoring-and-deployment',
      title: 'Monitoring and Deployment Strategy',
      content: [
        { type: 'text', text: 'Reliable deployment pairs microbiome interventions with disease scouting, environmental tracking, and cultivar-specific baselines. Adaptive management outperforms static input programs in variable seasons.' },
      ],
    },
  ],
  quiz: {
    id: 'microbiome-immune-dialogue-quiz',
    title: 'Plant Microbiome and Immune Dialogue Quiz',
    passingScore: 70,
    questions: [
      { id: 'mid-q1', type: 'multiple-choice', question: 'The rhizosphere is best defined as:', options: ['Only root xylem tissue', 'Soil zone influenced by roots and exudates', 'Leaf cuticle microbes only', 'A pathogen-free region'], correctAnswer: 1, explanation: 'Root exudates and root activity define rhizosphere ecology.' },
      { id: 'mid-q2', type: 'true-false', question: 'Plants must fully disable immunity to host beneficial microbes.', options: ['True', 'False'], correctAnswer: 1, explanation: 'Plants usually tune immunity selectively rather than fully turning it off.' },
      { id: 'mid-q3', type: 'multiple-choice', question: 'A major reason inoculant performance varies is:', options: ['Microbes ignore soil context', 'Host-soil-environment interactions differ', 'All strains are genetically identical', 'Plants never affect microbiomes'], correctAnswer: 1, explanation: 'Context strongly determines colonization and function.' },
      { id: 'mid-q4', type: 'multiple-choice', question: 'Dysbiosis most likely means:', options: ['Balanced, resilient community', 'Community imbalance that can raise disease risk', 'Guaranteed yield increase', 'Complete sterility of soil'], correctAnswer: 1, explanation: 'Dysbiosis reduces protective ecological functions.' },
      { id: 'mid-q5', type: 'ordering', question: 'Order a practical deployment workflow:', options: ['Baseline system assessment', 'Intervention design', 'Field implementation', 'Monitoring and adaptive adjustment'], correctAnswer: [0, 1, 2, 3], explanation: 'Interventions are strongest when designed from baseline and iteratively managed.' },
      { id: 'mid-q6', type: 'true-false', question: 'Host genotype can shape microbiome composition.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Genetic background influences recruitment and filtering.' },
      { id: 'mid-q7', type: 'multiple-choice', question: 'One common microbiome-mediated benefit is:', options: ['Higher pathogen virulence', 'Induced resistance priming', 'Loss of nutrient uptake', 'Permanent stomatal closure'], correctAnswer: 1, explanation: 'Beneficial microbes can prime host immunity.' },
      { id: 'mid-q8', type: 'multiple-choice', question: 'A robust microbiome strategy usually includes:', options: ['No scouting after inoculation', 'Integration with agronomic and disease monitoring', 'Single input with fixed annual timing forever', 'Elimination of rotation'], correctAnswer: 1, explanation: 'Monitoring and integration increase reliability.' },
      { id: 'mid-q9', type: 'true-false', question: 'Phyllosphere and rhizosphere microbial communities are always identical.', options: ['True', 'False'], correctAnswer: 1, explanation: 'Different compartments impose different selection pressures.' },
      { id: 'mid-q10', type: 'multiple-choice', question: 'Cover-crop and rotation effects on health are often mediated by:', options: ['Only wind speed changes', 'Microbial community structure and resilience', 'Leaf color genetics only', 'Elimination of all fungi'], correctAnswer: 1, explanation: 'Cropping history can alter microbial function and disease suppression.' },
    ],
  },
};
