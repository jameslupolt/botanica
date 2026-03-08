import type { Lesson } from '../../types';

export const seagrassPhytoplankton: Lesson = {
  id: 'seagrass-phytoplankton',
  title: 'Seagrasses & Phytoplankton',
  slug: 'seagrass-phytoplankton',
  description:
    'Explore the photosynthetic organisms of the ocean \u2014 true seagrasses that are flowering plants returned to the sea, and the microscopic phytoplankton that produce half of Earth\'s oxygen.',
  category: 'ecology',
  difficulty: 'intermediate',
  estimatedMinutes: 22,
  icon: '\uD83D\uDC1A',
  color: 'sky',
  prerequisites: ['kelp-seaweed'],
  order: 78,
  sections: [
    // \u2500\u2500 Section 1: Seagrass Biology \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      id: 'seagrass-biology',
      title: 'Seagrass Biology',
      content: [
        {
          type: 'text',
          text: 'Seagrasses are the only flowering plants (angiosperms) that have fully returned to life in the sea. Unlike seaweeds, which are algae, seagrasses are monocotyledonous plants with true roots, stems, leaves, and flowers. They evolved from terrestrial ancestors that recolonized marine environments roughly 100 million years ago. Today about 60\u201370 species are recognized worldwide, belonging to four families within the order Alismatales.',
        },
        { type: 'heading', text: 'Major Genera' },
        {
          type: 'list',
          items: [
            'Zostera (eelgrass) \u2014 the most widespread genus in temperate waters of the Northern Hemisphere. Zostera marina forms extensive meadows in shallow coastal waters of the North Atlantic and North Pacific, providing critical habitat for fish, invertebrates, and migratory waterfowl.',
            'Posidonia (Neptune grass) \u2014 dominant in the Mediterranean Sea, where Posidonia oceanica meadows are recognized as priority habitats under European conservation directives. Individual Posidonia clones may be thousands of years old, making them among the oldest living organisms on Earth.',
            'Thalassia (turtle grass) \u2014 the dominant seagrass in tropical Atlantic and Caribbean waters. Thalassia testudinum forms dense beds in shallow lagoons and is a primary food source for green sea turtles (Chelonia mydas) and manatees.',
            'Halophila \u2014 a pantropical genus with small, delicate leaves, often found at greater depths than other seagrasses due to its low light requirements. Some Halophila species colonize disturbed areas rapidly and are considered pioneer species.',
          ],
        },
        {
          type: 'key-term',
          term: 'Seagrass',
          definition:
            'A marine flowering plant (angiosperm) that lives fully submerged in shallow coastal waters. Seagrasses have true roots, rhizomes, leaves, and flowers, distinguishing them from seaweeds (marine algae). They are the only angiosperms to have returned completely to the marine environment.',
        },
        {
          type: 'callout',
          title: 'Not Seaweed',
          text: 'Despite their name and superficial resemblance, seagrasses are not grasses in the family Poaceae, nor are they seaweeds. They belong to the order Alismatales and are more closely related to terrestrial lilies and aroids than to lawn grasses. Their grass-like appearance is an example of convergent evolution shaped by the demands of life in a flowing aquatic medium.',
          variant: 'info',
        },
      ],
    },

    // \u2500\u2500 Section 2: Angiosperms Returned to the Sea \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      id: 'angiosperms-returned',
      title: 'Angiosperms Returned to the Sea',
      content: [
        {
          type: 'text',
          text: 'The evolutionary journey of seagrasses is remarkable: their ancestors left the ocean, colonized land, evolved the full suite of terrestrial adaptations \u2014 roots, vascular tissue, stomata, cuticle, flowers, seeds \u2014 and then returned to the sea. This return required abandoning or radically modifying many of those hard-won terrestrial features.',
        },
        { type: 'heading', text: 'Adaptations for Marine Life' },
        {
          type: 'list',
          items: [
            'Reduced or absent stomata \u2014 since gas exchange occurs directly across thin leaf surfaces bathed in seawater, stomata are unnecessary and are absent or vestigial in most seagrasses',
            'Thin cuticle \u2014 unlike terrestrial plants that use a waxy cuticle to prevent water loss, seagrasses have a minimal cuticle to allow dissolved CO\u2082, bicarbonate ions, and nutrients to diffuse directly into leaf cells',
            'Salt tolerance \u2014 seagrasses must cope with seawater salinity (roughly 35 parts per thousand). They manage this through ion regulation, compartmentalization of salts in vacuoles, and exclusion of excess sodium and chloride ions',
            'Rhizome anchoring \u2014 extensive horizontal rhizomes anchor the plant in soft sediments and enable vegetative spread, often forming vast clonal meadows from a single genetic individual',
            'Aerenchyma \u2014 internal gas channels transport oxygen from photosynthesizing leaves to roots buried in anoxic marine sediments, just as in freshwater aquatic plants',
          ],
        },
        { type: 'heading', text: 'Underwater Pollination' },
        {
          type: 'text',
          text: 'Seagrasses are among the very few angiosperms to achieve true submarine pollination (hydrophily). In Zostera, pollen grains are elongated and filamentous \u2014 thread-like rather than spherical \u2014 allowing them to drift through the water column and tangle around feathery stigmas. In Thalassia, pollen is released in mucilaginous strands that float on the surface. Some species, such as Enhalus acoroides, release male flowers that detach and float to the surface, where pollination occurs before fertilized flowers are pulled back underwater. These diverse pollination strategies reflect multiple independent evolutionary solutions to the problem of reproduction in a submerged environment.',
        },
        {
          type: 'key-term',
          term: 'Hydrophily',
          definition:
            'Pollination mediated by water. In seagrasses, pollen is transported by water currents either at the surface or below it. Pollen grains are often filamentous or released in mucilaginous strands to increase the chance of contact with receptive stigmas. Hydrophily is extremely rare among angiosperms.',
        },
        {
          type: 'callout',
          title: 'Ancient Clones',
          text: 'A single clone of Posidonia oceanica in the Mediterranean has been estimated to span over 15 kilometers and may be more than 100,000 years old, potentially making it one of the oldest and largest living organisms on Earth. These ancient meadows grow slowly \u2014 just a few centimeters of rhizome extension per year \u2014 meaning that once destroyed, recovery takes centuries.',
          variant: 'fact',
        },
      ],
    },

    // \u2500\u2500 Section 3: Seagrass Meadow Ecology \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      id: 'seagrass-meadow-ecology',
      title: 'Seagrass Meadow Ecology',
      content: [
        {
          type: 'text',
          text: 'Seagrass meadows are among the most productive and ecologically valuable ecosystems on Earth. They rival tropical rainforests in the number of species they support per unit area and provide services that extend far beyond their immediate footprint. Despite covering less than 0.2% of the ocean floor, seagrass meadows are disproportionately important in coastal marine systems.',
        },
        { type: 'heading', text: 'Ecosystem Services' },
        {
          type: 'list',
          items: [
            'Nursery habitat \u2014 dense seagrass canopies shelter juvenile fish, shrimp, crabs, and other invertebrates from predators. Many commercially important fisheries species depend on seagrass meadows during early life stages.',
            'Sediment stabilization \u2014 the root-rhizome mat and leaf canopy trap sediment, reduce wave energy, and prevent coastal erosion. Without seagrass, fine sediments resuspend, increasing turbidity and reducing light penetration.',
            'Carbon sequestration (blue carbon) \u2014 seagrass meadows capture and store carbon in their biomass and in the sediments beneath them at rates up to 40 times faster per hectare than terrestrial forests. This buried carbon can remain locked in marine sediments for millennia.',
            'Water quality \u2014 seagrass leaves filter suspended particles, absorb nutrients, and support epiphytic organisms that further remove dissolved nutrients from the water column.',
            'Biodiversity support \u2014 seagrass meadows host a complex community of epiphytes (algae and invertebrates growing on leaves), infauna (organisms living within sediments), and mobile fauna including fish, seahorses, sea turtles, dugongs, and manatees.',
          ],
        },
        {
          type: 'key-term',
          term: 'Blue carbon',
          definition:
            'Carbon captured and stored by coastal and marine ecosystems, particularly seagrass meadows, mangrove forests, and salt marshes. Seagrass sediments accumulate organic carbon over millennia because low-oxygen conditions inhibit decomposition, making these ecosystems globally significant carbon sinks.',
        },
        {
          type: 'callout',
          title: 'A Meadow Food Web',
          text: 'Seagrass meadows support both grazing and detrital food webs. Relatively few animals eat living seagrass tissue directly \u2014 green sea turtles, dugongs, manatees, some urchins, and certain fish are exceptions. Most energy flows through the detrital pathway: dead seagrass leaves are broken down by bacteria and fungi, consumed by detritivores, and passed up through the food chain. The epiphytic algae coating seagrass blades are often more nutritious than the grass itself and support a large community of small grazers.',
          variant: 'info',
        },
        {
          type: 'regional-example',
          prompt:
            'Does your region have coastal seagrass meadows? In temperate zones, look for eelgrass (Zostera) in sheltered bays and estuaries. In tropical areas, look for turtle grass (Thalassia) or manatee grass (Syringodium) in shallow lagoons. Consider how local water quality, boat traffic, and coastal development may be affecting these habitats.',
        },
      ],
    },

    // \u2500\u2500 Section 4: Phytoplankton Diversity \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      id: 'phytoplankton-diversity',
      title: 'Phytoplankton Diversity',
      content: [
        {
          type: 'text',
          text: 'Phytoplankton are microscopic photosynthetic organisms that drift in the sunlit upper layers of oceans, lakes, and rivers. Despite their invisibility to the naked eye, they are the foundation of aquatic food webs and produce roughly half of all the oxygen generated on Earth each year. Phytoplankton are not a single taxonomic group but a functional category encompassing organisms from several domains of life.',
        },
        { type: 'heading', text: 'Major Groups' },
        {
          type: 'list',
          items: [
            'Diatoms (Bacillariophyta) \u2014 single-celled or colonial algae enclosed in ornate silica cell walls called frustules. Diatoms are the dominant phytoplankton in nutrient-rich temperate and polar waters, responsible for an estimated 20\u201325% of global photosynthesis. When diatoms die, their silica frustules sink and accumulate as diatomaceous earth on the ocean floor.',
            'Dinoflagellates (Dinophyta) \u2014 mostly single-celled organisms with two flagella that produce a characteristic spinning motion. Many are photosynthetic, though some are heterotrophic or mixotrophic. Certain dinoflagellates (Symbiodinium/Symbiodiniaceae) live as endosymbionts within coral tissue, providing their hosts with photosynthetic products. Other species are responsible for harmful algal blooms (red tides).',
            'Coccolithophores (Haptophyta) \u2014 single-celled algae covered in intricate calcium carbonate plates called coccoliths. The species Emiliania huxleyi forms massive blooms visible from space, turning surface waters a milky turquoise. When coccolithophores die, their coccoliths sink and over geological time have formed vast chalk deposits, including the White Cliffs of Dover.',
            'Cyanobacteria \u2014 prokaryotic photosynthesizers (not true algae) that were the first organisms to produce oxygen through photosynthesis over 2.4 billion years ago. Marine cyanobacteria such as Prochlorococcus are the most abundant photosynthetic organisms on Earth, with populations estimated at 10\u00B2\u2077 cells in the global ocean. Trichodesmium and other genera fix atmospheric nitrogen, providing a critical nutrient input to oligotrophic (nutrient-poor) ocean waters.',
          ],
        },
        {
          type: 'key-term',
          term: 'Frustule',
          definition:
            'The rigid silica (SiO\u2082) cell wall of a diatom, composed of two interlocking halves (valves) that fit together like a petri dish. Frustules exhibit species-specific patterns of pores, ridges, and ornamentation and are highly resistant to decomposition, accumulating in ocean sediments over millions of years.',
        },
        {
          type: 'callout',
          title: 'Prochlorococcus: The Invisible Giant',
          text: 'Prochlorococcus, discovered only in 1986, is the smallest known photosynthetic organism (0.5\u20130.7 \u00B5m in diameter) and the most abundant. It dominates the phytoplankton of tropical and subtropical oceans, thriving in nutrient-poor waters where larger phytoplankton cannot compete. A single liter of surface seawater may contain over 100,000 Prochlorococcus cells. Collectively, this tiny cyanobacterium produces an estimated 5\u201310% of all global oxygen.',
          variant: 'fact',
        },
      ],
    },

    // \u2500\u2500 Section 5: Primary Production & Marine Food Webs \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      id: 'primary-production-food-webs',
      title: 'Primary Production & Marine Food Webs',
      content: [
        {
          type: 'text',
          text: 'Phytoplankton are the primary producers of the open ocean, converting sunlight and dissolved CO\u2082 into organic matter through photosynthesis. This process, termed marine primary production, fuels virtually all ocean life and plays a central role in global biogeochemical cycles. The total net primary production of marine phytoplankton is estimated at roughly 50 gigatonnes of carbon per year \u2014 comparable to all terrestrial plant production combined.',
        },
        { type: 'heading', text: 'Factors Controlling Production' },
        {
          type: 'list',
          items: [
            'Light \u2014 photosynthesis is restricted to the euphotic zone (typically the upper 50\u2013200 meters of the ocean, depending on water clarity). Below this depth, light is insufficient for net photosynthetic production.',
            'Nutrients \u2014 nitrogen, phosphorus, silica (for diatoms), and iron are the key limiting nutrients. Phytoplankton blooms occur where nutrient-rich deep water is brought to the surface by upwelling, river runoff, or seasonal mixing.',
            'Temperature \u2014 warmer surface waters generally have lower nutrient concentrations because thermal stratification inhibits mixing with nutrient-rich deeper water. Climate warming is intensifying this stratification, potentially reducing ocean productivity.',
            'Grazing \u2014 zooplankton (copepods, krill, protists) consume phytoplankton and exert top-down control on populations. The balance between phytoplankton growth and grazing determines standing biomass.',
          ],
        },
        { type: 'heading', text: 'The Biological Pump' },
        {
          type: 'text',
          text: 'When phytoplankton die or are consumed and excreted as fecal pellets, organic carbon sinks from the surface to the deep ocean. This process, called the biological pump, transfers atmospheric CO\u2082 into long-term ocean storage. Diatoms and coccolithophores are particularly effective at driving the biological pump because their dense mineral shells (silica and calcium carbonate, respectively) cause them to sink rapidly. The biological pump is a critical component of the global carbon cycle and a natural mechanism for regulating atmospheric CO\u2082 levels.',
        },
        {
          type: 'key-term',
          term: 'Biological pump',
          definition:
            'The suite of biological processes that transport carbon from the ocean surface to the deep sea. Phytoplankton fix CO\u2082 through photosynthesis; this organic carbon then sinks as dead cells, fecal pellets, and aggregates, sequestering carbon in deep-water sediments for centuries to millennia.',
        },
        {
          type: 'callout',
          title: 'Iron Fertilization',
          text: 'In vast areas of the Southern Ocean, equatorial Pacific, and subarctic Pacific, phytoplankton growth is limited not by nitrogen or phosphorus but by iron. These are called HNLC (high-nutrient, low-chlorophyll) regions. Experimental iron fertilization \u2014 adding dissolved iron to surface waters \u2014 has triggered massive phytoplankton blooms, demonstrating that trace-metal availability can control ocean productivity. However, proposals to use iron fertilization for geoengineering carbon sequestration remain controversial due to unpredictable ecological side effects.',
          variant: 'info',
        },
      ],
    },

    // \u2500\u2500 Section 6: Harmful Algal Blooms & Threats to Seagrass \u2500\u2500\u2500\u2500\u2500
    {
      id: 'blooms-threats',
      title: 'Harmful Algal Blooms & Threats to Seagrass',
      content: [
        {
          type: 'text',
          text: 'The same photosynthetic organisms that sustain marine ecosystems can become destructive when conditions push their populations out of balance. Harmful algal blooms (HABs) and the decline of seagrass meadows are interconnected problems, both driven largely by nutrient pollution from human activities.',
        },
        { type: 'heading', text: 'Harmful Algal Blooms' },
        {
          type: 'text',
          text: 'Harmful algal blooms occur when certain species of phytoplankton or cyanobacteria proliferate rapidly, often in response to excess nutrients (eutrophication). Some HABs produce potent toxins that accumulate in shellfish and fish, causing illness or death in marine mammals, seabirds, and humans who consume contaminated seafood.',
        },
        {
          type: 'list',
          items: [
            'Red tides \u2014 blooms of dinoflagellates such as Karenia brevis that discolor the water and produce brevetoxins, which cause massive fish kills and respiratory irritation in humans along coastlines. The name "red tide" is a misnomer \u2014 not all HABs are red, and not all red-colored water is harmful.',
            'Paralytic shellfish poisoning (PSP) \u2014 caused by saxitoxins produced by dinoflagellates of the genus Alexandrium. Filter-feeding shellfish concentrate the toxin; human consumption can cause paralysis and death.',
            'Cyanobacterial blooms \u2014 freshwater and brackish-water blooms of cyanobacteria (e.g., Microcystis, Anabaena) produce hepatotoxins (microcystins) and neurotoxins that contaminate drinking water supplies and kill livestock and wildlife.',
          ],
        },
        { type: 'heading', text: 'Threats to Seagrass Meadows' },
        {
          type: 'list',
          items: [
            'Eutrophication \u2014 the single greatest threat to seagrass worldwide. Excess nitrogen and phosphorus from agricultural runoff, sewage, and urban stormwater stimulate the growth of epiphytic algae on seagrass leaves and phytoplankton in the water column, both of which block light. Seagrasses have high light requirements and cannot survive prolonged shading.',
            'Dredging and coastal development \u2014 dredging for navigation channels, port construction, and coastal development physically destroys seagrass beds and resuspends sediments, increasing turbidity and smothering surviving plants.',
            'Boat damage \u2014 propeller scarring from motorboats creates long, slow-healing furrows through seagrass meadows. In shallow tropical waters, repeated scarring can fragment and eventually eliminate entire beds.',
            'Climate change \u2014 rising sea temperatures cause heat stress and die-offs in some seagrass species. Marine heat waves have triggered catastrophic losses, particularly in temperate species near the warm edge of their range. Ocean acidification may benefit seagrasses (by increasing dissolved CO\u2082 availability) but harms the calcifying organisms within the meadow community.',
            'Disease \u2014 the wasting disease caused by the marine slime mold Labyrinthula zosterae devastated Zostera marina populations across the North Atlantic in the 1930s and continues to cause localized outbreaks today.',
          ],
        },
        {
          type: 'key-term',
          term: 'Eutrophication',
          definition:
            'The enrichment of a body of water with excess nutrients, particularly nitrogen and phosphorus, typically from agricultural runoff, sewage, or urban stormwater. Eutrophication stimulates excessive algal growth, which reduces water clarity, depletes dissolved oxygen, and degrades habitats such as seagrass meadows.',
        },
        {
          type: 'callout',
          title: 'Global Seagrass Decline',
          text: 'An estimated 29% of the world\'s seagrass area has been lost since the late 19th century, with rates of decline accelerating since the 1980s. This loss is comparable in scale to the destruction of tropical rainforests and coral reefs. Because seagrass meadows store enormous quantities of blue carbon in their sediments, their destruction releases this stored carbon back into the atmosphere, creating a feedback loop that worsens climate change.',
          variant: 'warning',
        },
        {
          type: 'regional-example',
          prompt:
            'Has your region experienced harmful algal blooms or seagrass decline? Look for news about red tides, shellfish harvest closures, or beach advisories caused by algal toxins. If you live near the coast, investigate whether local seagrass beds are being monitored and what restoration efforts are underway.',
        },
      ],
    },
  ],

  quiz: {
    id: 'seagrass-phytoplankton-quiz',
    title: 'Seagrasses & Phytoplankton Quiz',
    passingScore: 70,
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question:
          'What distinguishes seagrasses from seaweeds?',
        options: [
          'Seagrasses are larger than seaweeds',
          'Seagrasses are flowering plants (angiosperms) with true roots, stems, and leaves',
          'Seagrasses live in freshwater while seaweeds live in saltwater',
          'Seagrasses are prokaryotic organisms',
        ],
        correctAnswer: 1,
        explanation:
          'Seagrasses are true angiosperms (flowering plants) that have returned to the marine environment. They possess roots, rhizomes, leaves, and flowers \u2014 features that seaweeds (marine algae) lack. Seaweeds are algae without true vascular tissue or flowers.',
      },
      {
        id: 'q2',
        type: 'true-false',
        question:
          'Seagrasses retain fully functional stomata on their submerged leaves for gas exchange.',
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation:
          'False. Seagrasses have reduced or absent stomata on their submerged leaves. Gas exchange occurs directly across the thin leaf epidermis in contact with seawater, making stomata unnecessary.',
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question:
          'Which seagrass genus dominates tropical Atlantic and Caribbean waters and is a primary food source for green sea turtles?',
        options: [
          'Zostera',
          'Posidonia',
          'Thalassia',
          'Halophila',
        ],
        correctAnswer: 2,
        explanation:
          'Thalassia testudinum (turtle grass) is the dominant seagrass in tropical Atlantic and Caribbean waters. It is named for its importance as a food source for green sea turtles (Chelonia mydas) and manatees.',
      },
      {
        id: 'q4',
        type: 'multiple-choice',
        question:
          'What is "blue carbon" in the context of marine ecology?',
        options: [
          'Carbon dissolved as bicarbonate ions in seawater',
          'Carbon captured and stored by coastal ecosystems such as seagrass meadows, mangroves, and salt marshes',
          'Carbon contained within the blue-green pigments of cyanobacteria',
          'Carbon released by the burning of marine fossil fuels',
        ],
        correctAnswer: 1,
        explanation:
          'Blue carbon refers to carbon captured and stored by coastal and marine ecosystems, particularly seagrass meadows, mangrove forests, and salt marshes. These habitats sequester carbon in biomass and sediments at rates far exceeding those of most terrestrial ecosystems.',
      },
      {
        id: 'q5',
        type: 'multiple-choice',
        question:
          'Which group of phytoplankton has ornate silica cell walls called frustules and is responsible for an estimated 20\u201325% of global photosynthesis?',
        options: [
          'Dinoflagellates',
          'Coccolithophores',
          'Diatoms',
          'Cyanobacteria',
        ],
        correctAnswer: 2,
        explanation:
          'Diatoms (Bacillariophyta) are enclosed in rigid silica cell walls called frustules. They are the dominant phytoplankton in nutrient-rich temperate and polar waters and contribute roughly 20\u201325% of total global photosynthesis.',
      },
      {
        id: 'q6',
        type: 'true-false',
        question:
          'Prochlorococcus, a cyanobacterium discovered in 1986, is the most abundant photosynthetic organism on Earth.',
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation:
          'True. Prochlorococcus is the smallest known photosynthetic organism (0.5\u20130.7 \u00B5m) and the most abundant, with global populations estimated at 10\u00B2\u2077 cells. It dominates the phytoplankton of tropical and subtropical oceans and produces an estimated 5\u201310% of all global oxygen.',
      },
      {
        id: 'q7',
        type: 'multiple-choice',
        question:
          'What is the biological pump?',
        options: [
          'The active transport of nutrients from deep water to the surface by upwelling',
          'The process by which phytoplankton actively pump CO\u2082 into their cells',
          'The suite of biological processes that transport carbon from the ocean surface to the deep sea',
          'The mechanism by which seagrasses pump oxygen to their roots through aerenchyma',
        ],
        correctAnswer: 2,
        explanation:
          'The biological pump is the collection of biological processes by which carbon fixed by phytoplankton at the surface sinks to the deep ocean as dead cells, fecal pellets, and aggregates, sequestering carbon in deep-water sediments for centuries to millennia.',
      },
      {
        id: 'q8',
        type: 'multiple-choice',
        question:
          'What is the single greatest threat to seagrass meadows worldwide?',
        options: [
          'Overharvesting by humans',
          'Eutrophication from nutrient pollution',
          'Predation by invasive species',
          'Ocean acidification',
        ],
        correctAnswer: 1,
        explanation:
          'Eutrophication \u2014 excess nitrogen and phosphorus from agricultural runoff, sewage, and urban stormwater \u2014 is the single greatest threat to seagrass. It stimulates the growth of epiphytic algae and phytoplankton that block the light seagrasses need to survive.',
      },
      {
        id: 'q9',
        type: 'true-false',
        question:
          'Coccolithophores are covered in calcium carbonate plates, and their accumulated remains over geological time formed the White Cliffs of Dover.',
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation:
          'True. Coccolithophores are single-celled algae covered in calcium carbonate plates called coccoliths. When they die, the coccoliths sink to the ocean floor and over millions of years accumulate into thick chalk deposits, including the famous White Cliffs of Dover.',
      },
      {
        id: 'q10',
        type: 'ordering',
        question:
          'Arrange the steps of the biological pump in the correct sequence:',
        options: [
          'Phytoplankton fix CO\u2082 through photosynthesis in surface waters',
          'Phytoplankton die or are consumed by zooplankton',
          'Organic carbon sinks as dead cells, fecal pellets, and aggregates',
          'Carbon is buried and stored in deep-sea sediments for centuries to millennia',
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation:
          'The biological pump begins with phytoplankton fixing CO\u2082 at the surface through photosynthesis. When these organisms die or are consumed, their remains (dead cells, fecal pellets, aggregates) sink through the water column. This organic carbon is eventually deposited in deep-sea sediments, where it can be stored for centuries to millennia, effectively removing carbon from the atmosphere.',
      },
    ],
  },
};
