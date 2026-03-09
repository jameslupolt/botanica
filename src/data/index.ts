import { plantCells } from './lessons/plant-cells';
import { photosynthesis } from './lessons/photosynthesis';
import { taxonomy } from './lessons/taxonomy';
import { plantStructures } from './lessons/plant-structures';
import { reproduction } from './lessons/reproduction';
import { ecology } from './lessons/ecology';
import { waterTransport } from './lessons/water-transport';
import { plantTissues } from './lessons/plant-tissues';
import { respiration } from './lessons/respiration';
import { plantHormones } from './lessons/plant-hormones';
import { genetics } from './lessons/genetics';
import { seedlessPlants } from './lessons/seedless-plants';
import { gymnosperms } from './lessons/gymnosperms';
import { angiospermDiversity } from './lessons/angiosperm-diversity';
import { soilNutrition } from './lessons/soil-nutrition';
import { plantGrowth } from './lessons/plant-growth';
import { fungiInteractions } from './lessons/fungi-interactions';
import { meiosisLifeCycles } from './lessons/meiosis-life-cycles';
import { roots } from './lessons/roots';
import { leaves } from './lessons/leaves';
import { stems } from './lessons/stems';
import { algae } from './lessons/algae';
import { plantEvolution } from './lessons/plant-evolution';
import { plantsAndPeople } from './lessons/plants-and-people';
import { plantAdaptations } from './lessons/plant-adaptations';
import { flowersFruitsSeeds } from './lessons/flowers-fruits-seeds';
import { plantBiotechnology } from './lessons/plant-biotechnology';
import { secondaryMetabolism } from './lessons/secondary-metabolism';
import { fungiBiology } from './lessons/fungi-biology';
import { globalEcology } from './lessons/global-ecology';
import { plantBiochemistry } from './lessons/plant-biochemistry';
import { membraneTransport } from './lessons/membrane-transport';
import { lightSignaling } from './lessons/light-signaling';
import { plantStress } from './lessons/plant-stress';
import { prokaryotesViruses } from './lessons/prokaryotes-viruses';
import { evolutionSpeciation } from './lessons/evolution-speciation';
import { cellWalls } from './lessons/cell-walls';
import { angiospermFamilies } from './lessons/angiosperm-families';
import { molecularGenetics } from './lessons/molecular-genetics';
import { phloemTransport } from './lessons/phloem-transport';
import { embryogenesisGermination } from './lessons/embryogenesis-germination';
import { secondaryGrowth } from './lessons/secondary-growth';
import { bryophytes } from './lessons/bryophytes';
import { fernsLycophytes } from './lessons/ferns-lycophytes';
import { pollinationBiology } from './lessons/pollination-biology';
import { plantDevelopment } from './lessons/plant-development';
import { mineralAssimilation } from './lessons/mineral-assimilation';
import { angiospermOrigins } from './lessons/angiosperm-origins';
import { ethnobotany } from './lessons/ethnobotany';
import { aquaticPlants } from './lessons/aquatic-plants';
import { cropScience } from './lessons/crop-science';
import { plantBreeding } from './lessons/plant-breeding';
import { horticulture } from './lessons/horticulture';
import { forestry } from './lessons/forestry';
import { postHarvest } from './lessons/post-harvest';
import { soilFormation } from './lessons/soil-formation';
import { soilClassification } from './lessons/soil-classification';
import { soilBiology } from './lessons/soil-biology';
import { soilChemistry } from './lessons/soil-chemistry';
import { soilDegradation } from './lessons/soil-degradation';
import { climateChangePlants } from './lessons/climate-change-plants';
import { plantConservation } from './lessons/plant-conservation';
import { restorationEcology } from './lessons/restoration-ecology';
import { invasivePlants } from './lessons/invasive-plants';
import { dichotomousKeys } from './lessons/dichotomous-keys';
import { botanicalTerminology } from './lessons/botanical-terminology';
import { herbariumTechniques } from './lessons/herbarium-techniques';
import { fieldDocumentation } from './lessons/field-documentation';
import { fossilRecordPlants } from './lessons/fossil-record-plants';
import { earlyLandPlants } from './lessons/early-land-plants';
import { coalAgeForests } from './lessons/coal-age-forests';
import { mesozoicCenozoicFlora } from './lessons/mesozoic-cenozoic-flora';
import { plantDiseaseIntro } from './lessons/plant-disease-intro';
import { fungalDiseases } from './lessons/fungal-diseases';
import { bacterialViralDiseases } from './lessons/bacterial-viral-diseases';
import { diseaseManagement } from './lessons/disease-management';
import { kelpSeaweed } from './lessons/kelp-seaweed';
import { seagrassPhytoplankton } from './lessons/seagrass-phytoplankton';
import { blueCarbon } from './lessons/blue-carbon';
import { fiberTextilePlants } from './lessons/fiber-textile-plants';
import { essentialOilsSpices } from './lessons/essential-oils-spices';
import { biofuelsIndustrial } from './lessons/biofuels-industrial';
import { plantGenomics } from './lessons/plant-genomics';
import { sequencePhylogenomics } from './lessons/sequence-phylogenomics';
import { transcriptomics } from './lessons/transcriptomics';
import { signalTransduction } from './lessons/signal-transduction';
import { floweringPhotoperiodism } from './lessons/flowering-photoperiodism';
import { senescenceCellDeath } from './lessons/senescence-cell-death';
import { phylogeneticMethods } from './lessons/phylogenetic-methods';
import { monocotFamilies } from './lessons/monocot-families';
import { eudicotFamilies } from './lessons/eudicot-families';
import { biomesPlantGeography } from './lessons/biomes-plant-geography';
import { ecologicalSuccession } from './lessons/ecological-succession';
import { plantTropismsCircadian } from './lessons/plant-tropisms-circadian';
import { vegetativeOrganogenesisAxis } from './lessons/vegetative-organogenesis-axis';
import { vegetativeOrganogenesisBranching } from './lessons/vegetative-organogenesis-branching';
import { reproductivePhysiologyFruitSet } from './lessons/reproductive-physiology-fruit-set';
import { plantImmunityBioticInteractions } from './lessons/plant-immunity-biotic-interactions';
import { bioenergeticsPlants } from './lessons/bioenergetics-plants';
import { stomatalBiologyGasExchange } from './lessons/stomatal-biology-gas-exchange';
import { phylogeneticSystematicsDrilldown } from './lessons/phylogenetic-systematics-drilldown';
import { ptiEtiSignaling } from './lessons/pti-eti-signaling';
import { systemicAcquiredResistance } from './lessons/systemic-acquired-resistance';
import { microbiomeImmuneDialogue } from './lessons/microbiome-immune-dialogue';
import { reproductiveStressYieldStability } from './lessons/reproductive-stress-yield-stability';
import { chronoculturePlantClocks } from './lessons/chronoculture-plant-clocks';
import { reticulateEvolutionConflict } from './lessons/reticulate-evolution-conflict';
import { defenseGrowthAllocation } from './lessons/defense-growth-allocation';
import type { Lesson, Module } from '../types';

export const ALL_LESSONS: Lesson[] = [
  plantCells,
  photosynthesis,
  taxonomy,
  plantStructures,
  reproduction,
  ecology,
  waterTransport,
  plantTissues,
  respiration,
  plantHormones,
  genetics,
  seedlessPlants,
  gymnosperms,
  angiospermDiversity,
  soilNutrition,
  plantGrowth,
  fungiInteractions,
  meiosisLifeCycles,
  roots,
  leaves,
  stems,
  algae,
  plantEvolution,
  plantsAndPeople,
  plantAdaptations,
  flowersFruitsSeeds,
  plantBiotechnology,
  secondaryMetabolism,
  fungiBiology,
  globalEcology,
  plantBiochemistry,
  membraneTransport,
  lightSignaling,
  plantStress,
  prokaryotesViruses,
  evolutionSpeciation,
  cellWalls,
  angiospermFamilies,
  molecularGenetics,
  phloemTransport,
  embryogenesisGermination,
  secondaryGrowth,
  bryophytes,
  fernsLycophytes,
  pollinationBiology,
  plantDevelopment,
  mineralAssimilation,
  angiospermOrigins,
  ethnobotany,
  aquaticPlants,
  cropScience,
  plantBreeding,
  horticulture,
  forestry,
  postHarvest,
  soilFormation,
  soilClassification,
  soilBiology,
  soilChemistry,
  soilDegradation,
  climateChangePlants,
  plantConservation,
  restorationEcology,
  invasivePlants,
  dichotomousKeys,
  botanicalTerminology,
  herbariumTechniques,
  fieldDocumentation,
  fossilRecordPlants,
  earlyLandPlants,
  coalAgeForests,
  mesozoicCenozoicFlora,
  plantDiseaseIntro,
  fungalDiseases,
  bacterialViralDiseases,
  diseaseManagement,
  kelpSeaweed,
  seagrassPhytoplankton,
  blueCarbon,
  fiberTextilePlants,
  essentialOilsSpices,
  biofuelsIndustrial,
  plantGenomics,
  sequencePhylogenomics,
  transcriptomics,
  signalTransduction,
  floweringPhotoperiodism,
  senescenceCellDeath,
  phylogeneticMethods,
  monocotFamilies,
  eudicotFamilies,
  biomesPlantGeography,
  ecologicalSuccession,
  plantTropismsCircadian,
  vegetativeOrganogenesisAxis,
  vegetativeOrganogenesisBranching,
  reproductivePhysiologyFruitSet,
  plantImmunityBioticInteractions,
  bioenergeticsPlants,
  stomatalBiologyGasExchange,
  phylogeneticSystematicsDrilldown,
  ptiEtiSignaling,
  systemicAcquiredResistance,
  microbiomeImmuneDialogue,
  reproductiveStressYieldStability,
  chronoculturePlantClocks,
  reticulateEvolutionConflict,
  defenseGrowthAllocation,
].sort((a, b) => a.order - b.order);

export function getLessonBySlug(slug: string): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.slug === slug);
}

export function getLessonById(id: string): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.id === id);
}

export function getLessonsByCategory(category: string): Lesson[] {
  return ALL_LESSONS.filter((l) => l.category === category);
}

export function searchLessons(query: string): Lesson[] {
  const q = query.toLowerCase();
  return ALL_LESSONS.filter(
    (l) =>
      l.title.toLowerCase().includes(q) ||
      l.description.toLowerCase().includes(q) ||
      l.category.toLowerCase().includes(q),
  );
}

export function getModuleLessons(mod: Module) {
  return mod.lessonIds.map((id) => getLessonById(id)).filter(Boolean) as NonNullable<
    ReturnType<typeof getLessonById>
  >[];
}
