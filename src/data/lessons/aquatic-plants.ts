import type { Lesson } from '../../types';

export const aquaticPlants: Lesson = {
  id: 'aquatic-plants',
  title: 'Aquatic & Wetland Plants',
  slug: 'aquatic-plants',
  description:
    'Discover how plants have adapted to life in and around water, from submerged pondweeds to mangrove swamps. Explore aquatic plant classification, morphological and physiological adaptations, wetland ecology, ecosystem services, invasive species, and conservation challenges.',
  category: 'ecology',
  difficulty: 'intermediate',
  estimatedMinutes: 22,
  icon: '\u{1FAB7}',
  color: 'leaf',
  prerequisites: ['plant-adaptations', 'ecology'],
  order: 50,
  sections: [
    // ── Section 1: Classification of Aquatic Plants ──────────────
    {
      id: 'classification',
      title: 'Classification of Aquatic Plants',
      content: [
        {
          type: 'text',
          text: 'Aquatic plants (hydrophytes) are plants adapted to living in water or in soil that is permanently or periodically saturated. They occupy habitats ranging from fully submerged lake bottoms to seasonally flooded marshes. Rather than forming a single taxonomic group, hydrophytes span many families and are classified by their growth form and position relative to the water surface.',
        },
        { type: 'heading', text: 'Growth-Form Categories' },
        {
          type: 'list',
          items: [
            'Emergent plants \u2014 rooted in the substrate with stems and leaves extending above the water surface. Examples include cattails (Typha spp.), bulrushes (Schoenoplectus spp.), and common reed (Phragmites australis). They dominate the margins of ponds and marshes, forming the transition zone between open water and dry land.',
            'Floating-leaved plants \u2014 rooted in the bottom sediment with leaves that float on the water surface. Water lilies (Nymphaea) are the classic example. Their broad, flat leaves shade the water below, limiting light availability for submerged species and eventually choking out bottom-dwelling plants during pond succession.',
            'Submerged plants \u2014 entirely underwater, rooted or unrooted. Examples include pondweeds (Potamogeton), watermilfoil (Myriophyllum), and eelgrass (Vallisneria). Their leaves are thin, finely dissected, or ribbon-shaped to maximize surface area for gas exchange and light capture in a medium where both CO\u2082 and light are limited.',
            'Free-floating plants \u2014 not anchored to the substrate; float freely on or just below the water surface. Duckweeds (Lemna) are among the smallest flowering plants; water hyacinth (Eichhornia crassipes) and Salvinia are larger free-floating species. Free-floating plants can reproduce vegetatively at extraordinary rates and cover entire water bodies.',
          ],
        },
        {
          type: 'key-term',
          term: 'Hydrophyte',
          definition:
            'A plant adapted to growing in water or in waterlogged soil. Hydrophytes exhibit structural and physiological modifications \u2014 such as aerenchyma, reduced vascular tissue, and thin cuticles \u2014 that enable them to thrive where most terrestrial plants cannot survive.',
        },
        {
          type: 'callout',
          title: 'Competitive Exclusion in Duckweeds',
          text: 'The Raven textbook describes a striking competition experiment between two duckweed species: Lemna gibba and L. polyrhiza. When grown separately, L. polyrhiza grew faster. But in mixed culture, L. gibba always won because its air-filled sacs enabled it to float above L. polyrhiza, cutting off the light. The shaded L. polyrhiza invariably died out \u2014 a clear demonstration of the competitive exclusion principle among aquatic plants.',
          variant: 'fact',
        },
      ],
    },

    // ── Section 2: Morphological Adaptations ─────────────────────
    {
      id: 'morphological-adaptations',
      title: 'Morphological Adaptations',
      content: [
        {
          type: 'text',
          text: 'Life in water presents fundamentally different challenges from life on land. Water provides physical support, so structural rigidity is less important, but it limits gas exchange, attenuates light rapidly, and creates anaerobic conditions in submerged substrates. Aquatic plants have evolved a suite of morphological adaptations to these constraints.',
        },
        { type: 'heading', text: 'Aerenchyma: Gas Channels for Survival' },
        {
          type: 'text',
          text: 'Perhaps the most critical adaptation of aquatic and wetland plants is aerenchyma \u2014 tissue with large, interconnected gas-filled intercellular spaces. Aerenchyma provides internal pathways for oxygen to diffuse from aerial leaves and stems down to submerged roots growing in anaerobic sediments, and it simultaneously provides buoyancy. Aerenchyma is well documented in emergent species like cattails and rice, as well as in many wetland trees.',
        },
        {
          type: 'key-term',
          term: 'Aerenchyma',
          definition:
            'Parenchyma tissue containing large, continuous intercellular air spaces. Found in roots, stems, and petioles of aquatic and wetland plants, aerenchyma facilitates the transport of oxygen from aerial parts to submerged or buried organs and provides buoyancy.',
        },
        { type: 'heading', text: 'Leaf Modifications' },
        {
          type: 'list',
          items: [
            'Thin, dissected, or ribbon-like submerged leaves \u2014 maximize surface area for absorption of dissolved gases and minerals directly from the water, compensating for the absence of a root-based uptake system in many submerged species',
            'Reduced or absent stomata on submerged surfaces \u2014 stomata are unnecessary where gas exchange occurs across the entire leaf surface in direct contact with water; floating leaves retain stomata only on the upper (adaxial) surface',
            'Reduced cuticle \u2014 submerged leaves have a very thin or absent waxy cuticle, allowing direct diffusion of water, dissolved CO\u2082, and mineral nutrients across the epidermis',
            'Reduced xylem \u2014 because water is available on all surfaces, the water-conducting xylem tissue is greatly reduced; mechanical strength is provided by water pressure rather than lignified cell walls',
          ],
        },
        { type: 'heading', text: 'Heterophylly' },
        {
          type: 'text',
          text: 'Many aquatic plants exhibit heterophylly \u2014 the production of two distinctly different leaf forms on the same individual. Submerged leaves are typically finely divided or linear, maximizing gas exchange underwater, while aerial leaves are broader with a more typical terrestrial form including a waxy cuticle and functional stomata. The Raven textbook notes that some aquatic plants have "two distinctly different leaf types, those submerged and those in the air." This developmental plasticity allows a single plant to function effectively in both environments.',
        },
        {
          type: 'key-term',
          term: 'Heterophylly',
          definition:
            'The occurrence of distinctly different leaf forms on the same plant, typically in response to environmental conditions. In aquatic plants, submerged leaves are narrow or finely dissected, while aerial or floating leaves are broad and have stomata and a cuticle.',
        },
        {
          type: 'callout',
          title: 'Pneumatophores',
          text: 'Some wetland trees, particularly mangroves (Avicennia, Rhizophora), produce pneumatophores \u2014 spongy roots that project above the waterline. These specialized aerial roots have abundant lenticels and aerenchyma that facilitate the absorption of atmospheric oxygen for root respiration in waterlogged, anaerobic soils.',
          variant: 'info',
        },
      ],
    },

    // ── Section 3: Physiological Adaptations ─────────────────────
    {
      id: 'physiological-adaptations',
      title: 'Physiological Adaptations',
      content: [
        {
          type: 'text',
          text: 'Beyond structural changes, aquatic plants have evolved physiological mechanisms to cope with the unique chemical environment of water \u2014 particularly the limited availability of CO\u2082, the attenuation of light with depth, and anaerobic root-zone conditions.',
        },
        { type: 'heading', text: 'Carbon Acquisition Underwater' },
        {
          type: 'text',
          text: 'In aquatic environments, CO\u2082 diffuses roughly 10,000 times more slowly through water than through air, making carbon acquisition a major challenge. Submerged plants have evolved several strategies to overcome this limitation:',
        },
        {
          type: 'list',
          items: [
            'Bicarbonate (HCO\u2083\u207b) utilization \u2014 many submerged angiosperms and algae can actively take up dissolved bicarbonate ions and convert them to CO\u2082 internally using carbonic anhydrase, supplementing the limited dissolved CO\u2082 supply',
            'CAM photosynthesis in aquatic species \u2014 some submerged plants, notably the lycophyte Isoetes (quillworts), use Crassulacean Acid Metabolism (CAM) underwater: they fix CO\u2082 at night into organic acids and release it during the day for the Calvin cycle, taking advantage of the higher nighttime CO\u2082 concentrations in water',
            'Thin boundary layers \u2014 finely dissected leaves and flexible forms that move with the current reduce the stagnant boundary layer at the leaf surface, enhancing diffusion of dissolved gases',
          ],
        },
        { type: 'heading', text: 'Light Attenuation' },
        {
          type: 'text',
          text: 'Water absorbs and scatters light rapidly with increasing depth. Red wavelengths are absorbed first, leaving blue-green light at greater depths. Submerged plants are restricted to the photic zone \u2014 typically the uppermost meters of a water body, depending on turbidity. Many submerged species maximize light capture with broad, thin leaves oriented perpendicular to the incoming light, and some concentrate chloroplasts near the upper cell surfaces.',
        },
        {
          type: 'key-term',
          term: 'Photic zone',
          definition:
            'The uppermost layer of a body of water that receives sufficient light for photosynthesis. Its depth varies from centimeters in turbid waters to tens of meters in clear lakes or oceans. Submerged aquatic plants are restricted to this zone.',
        },
        {
          type: 'callout',
          title: 'Anaerobic Root Metabolism',
          text: 'When oxygen supply through aerenchyma is insufficient, the roots of some wetland plants can temporarily switch to anaerobic (fermentative) metabolism. However, this produces ethanol and depletes energy reserves rapidly. The ability to maintain at least partial aerobic respiration via internal gas transport is therefore critical for long-term survival in flooded soils.',
          variant: 'tip',
        },
      ],
    },

    // ── Section 4: Reproductive Adaptations ──────────────────────
    {
      id: 'reproductive-adaptations',
      title: 'Reproductive Adaptations',
      content: [
        {
          type: 'text',
          text: 'Reproduction in aquatic environments requires adaptations for pollination, seed dispersal, and seedling establishment in conditions that differ markedly from terrestrial habitats. Many aquatic plants rely heavily on vegetative reproduction, but sexual reproduction remains important for genetic diversity and colonization of new habitats.',
        },
        { type: 'heading', text: 'Hydrophily: Water Pollination' },
        {
          type: 'text',
          text: 'While most aquatic plants are pollinated above the water surface by wind or insects, a small number of species have evolved true hydrophily \u2014 pollination mediated by water. In eelgrass (Vallisneria), male flowers detach and float to the surface, drifting to female flowers. In Zostera (seagrass), filamentous pollen grains are released into the water and carried by currents to receptive stigmas. Hydrophily is relatively rare because water is a less efficient pollen vector than wind or animals.',
        },
        { type: 'heading', text: 'Vegetative Reproduction' },
        {
          type: 'text',
          text: 'Vegetative (asexual) reproduction is exceptionally common in aquatic plants and is often their primary means of spread. Mechanisms include fragmentation (where broken stem or leaf pieces regenerate into new plants), production of specialized vegetative propagules such as turions (overwintering buds), stolons, rhizomes, and tubers. This capacity for rapid clonal growth is what makes many aquatic species such effective colonizers \u2014 and, in some cases, aggressive invaders.',
        },
        {
          type: 'key-term',
          term: 'Hydrophily',
          definition:
            'Pollination mediated by water. Pollen is transported on or beneath the water surface to reach female flowers. Found in relatively few genera, including Vallisneria, Zostera, and Ceratophyllum. Most aquatic plants are actually pollinated above water by wind (anemophily) or insects (entomophily).',
        },
        {
          type: 'callout',
          title: 'Seed Dormancy in Aquatic Environments',
          text: 'Many aquatic and wetland plants produce seeds with remarkable dormancy and longevity. Seeds may remain viable in saturated sediments for years or decades, germinating only when conditions change \u2014 such as when water levels drop and expose the sediment to light and oxygen. This persistent seed bank is essential for wetland recovery after disturbance and is a key consideration in wetland restoration projects.',
          variant: 'info',
        },
      ],
    },

    // ── Section 5: Wetland Ecology ───────────────────────────────
    {
      id: 'wetland-ecology',
      title: 'Wetland Ecology',
      content: [
        {
          type: 'text',
          text: 'Wetlands are ecosystems where the water table is at or near the surface for enough of the year to support hydrophytic vegetation. They are among the most productive ecosystems on Earth. The Raven textbook emphasizes that tropical swamps and wetlands have "some of the highest rates of annual production of organic matter." Wetlands are classified by hydrology, vegetation, and water chemistry into several major types.',
        },
        { type: 'heading', text: 'Major Wetland Types' },
        {
          type: 'list',
          items: [
            'Freshwater marshes \u2014 characterized by emergent herbaceous vegetation such as cattails (Typha), sedges (Carex), rushes (Juncus), and grasses. They develop along rivers, lakeshores, and in poorly drained lowlands. Highly productive and species-rich.',
            'Swamps \u2014 forested wetlands dominated by trees and shrubs, such as bald cypress (Taxodium distichum) swamps of the southeastern United States or red maple swamps of the northeast. Standing water is present for much or all of the year.',
            'Mangrove wetlands \u2014 coastal tropical and subtropical forests dominated by salt-tolerant trees including Rhizophora (red mangrove) and Avicennia (black mangrove). Mangroves have aerial prop roots or pneumatophores and salt glands or salt-exclusion mechanisms to manage the saline environment.',
            'Salt marshes \u2014 coastal wetlands dominated by salt-tolerant grasses and rushes (e.g., Spartina, Juncus), found in temperate and higher-latitude shorelines. Regularly flooded by tides, these marshes form important nursery habitat for marine organisms.',
            'Bogs \u2014 acidic, nutrient-poor wetlands with waterlogged soils, dominated by Sphagnum (peat moss) and ericaceous shrubs. Decomposition is severely limited by acidity and low oxygen, leading to deep accumulations of peat. The Raven textbook notes that peat moss is "a traditional fuel in Ireland and a staple of the horticultural industry."',
            'Fens \u2014 peatlands that receive mineral-rich groundwater in addition to precipitation, making them less acidic and more nutrient-rich than bogs. Fens support a more diverse flora, including sedges, grasses, and wildflowers.',
          ],
        },
        {
          type: 'key-term',
          term: 'Peatland',
          definition:
            'A wetland in which incompletely decomposed plant material (peat) accumulates because waterlogging and low oxygen inhibit decomposition. Bogs and fens are the two main types of peatland. Peatlands store enormous quantities of carbon and are globally significant for climate regulation.',
        },
        {
          type: 'callout',
          title: 'Succession in Wetlands',
          text: 'The Raven textbook describes how glacial lakes gradually fill with sediment and organic debris: emerging vegetation grows along the edge of a pond, floating-leaved plants like water lily (Nymphaea odorata) spread across the surface, and marsh grasses, sedges, and cattails (Typha spp.) grow on the old pond bed. Over thousands of years, open water is transformed into marsh, then perhaps forest \u2014 a classic example of primary succession.',
          variant: 'fact',
        },
        {
          type: 'regional-example',
          prompt:
            'What aquatic or wetland habitats exist in your region? Think about local ponds, lakes, rivers, bogs, or coastal marshes. What emergent, floating, or submerged plants can you find growing there? Look for cattails, water lilies, duckweeds, or sedges along the margins.',
        },
      ],
    },

    // ── Section 6: Ecosystem Services & Invasive Species ─────────
    {
      id: 'ecosystem-services-invasives',
      title: 'Ecosystem Services & Invasive Aquatic Plants',
      content: [
        {
          type: 'text',
          text: 'Wetlands provide ecosystem services far out of proportion to their area. They filter pollutants, buffer floods, store carbon, cycle nutrients, and provide critical habitat for wildlife. At the same time, aquatic ecosystems are among the most vulnerable to invasion by non-native plants, which can overwhelm native communities and degrade these services.',
        },
        { type: 'heading', text: 'Ecosystem Services of Wetlands' },
        {
          type: 'list',
          items: [
            'Water filtration \u2014 wetland plants and associated microbes remove sediment, excess nutrients (nitrogen and phosphorus), and pollutants from water before it reaches streams, rivers, and groundwater aquifers',
            'Flood control \u2014 wetlands act as natural sponges, absorbing excess water during storms and releasing it slowly, reducing downstream flood damage',
            'Carbon sequestration \u2014 wetlands, especially peatlands, accumulate organic matter under waterlogged, low-oxygen conditions where decomposition is inhibited. The Raven textbook notes that such accumulations of organic matter in the distant past were "transformed into the coal, lignite, oil, and gas that are mined today"',
            'Habitat \u2014 wetlands support a disproportionately high number of species, including many that are found nowhere else; they serve as breeding and nursery grounds for fish, amphibians, waterfowl, and invertebrates',
            'Nutrient cycling \u2014 microbial communities in wetland soils drive the nitrogen cycle (nitrification and denitrification) and decompose organic matter, recycling nutrients back into the ecosystem',
          ],
        },
        { type: 'heading', text: 'Invasive Aquatic Plants' },
        {
          type: 'text',
          text: 'Some of the world\'s most destructive invasive species are aquatic plants. Their rapid vegetative reproduction, ability to spread by fragmentation, and tolerance of a wide range of conditions make them exceptionally difficult to control once established.',
        },
        {
          type: 'list',
          items: [
            'Water hyacinth (Eichhornia crassipes) \u2014 a free-floating plant native to South America that has invaded tropical and subtropical waterways worldwide. It reproduces vegetatively at extraordinary rates, forming dense mats that block light, deplete dissolved oxygen, impede navigation, and clog irrigation systems. The Raven textbook illustrates water hyacinths playing a role in pond succession in warmer climates.',
            'Hydrilla (Hydrilla verticillata) \u2014 a submerged plant from the Old World that has invaded freshwater systems across the southeastern United States and beyond. It forms dense underwater canopies that displace native vegetation and alter aquatic food webs.',
            'Giant salvinia (Salvinia molesta) \u2014 a free-floating fern native to Brazil that can double its biomass in days under favorable conditions. It forms thick mats on still and slow-moving water, blocking light and gas exchange.',
            'Purple loosestrife (Lythrum salicaria) \u2014 an aggressive European invader of wetlands in the eastern United States. The Raven textbook describes how biological control using the leaf-feeding chrysomelid beetle Galerucella calmariensis has shown success in reducing populations of this species, which displaces native cattails and sedges.',
          ],
        },
        {
          type: 'key-term',
          term: 'Biological control',
          definition:
            'The use of living organisms (predators, parasites, or pathogens) to suppress populations of pest species. In aquatic systems, biological control of invasive plants involves introducing host-specific herbivorous insects from the pest\'s native range. Careful testing is required to ensure the control agent does not attack native species.',
        },
        {
          type: 'callout',
          title: 'Why Are Aquatic Invaders So Successful?',
          text: 'Aquatic invasive plants share several traits: prolific vegetative reproduction (a single fragment can start a new colony), tolerance of wide environmental conditions, rapid growth rates, and escape from their native herbivores and diseases. Water itself serves as an efficient dispersal vector, carrying fragments to new sites. Prevention \u2014 inspecting and cleaning boats and equipment \u2014 remains the most effective strategy.',
          variant: 'warning',
        },
      ],
    },

    // ── Section 7: Conservation & Restoration ────────────────────
    {
      id: 'conservation-restoration',
      title: 'Wetland Conservation & Restoration',
      content: [
        {
          type: 'text',
          text: 'Despite their ecological importance, wetlands have been among the most heavily impacted ecosystems worldwide. Draining for agriculture, filling for development, pollution, and water diversion have destroyed vast areas of wetland habitat. The Stern textbook documents the large-scale destruction of wetlands as a pressing environmental concern. Recognizing this loss, conservation and restoration efforts have expanded significantly in recent decades.',
        },
        { type: 'heading', text: 'Wetland Loss and Threats' },
        {
          type: 'list',
          items: [
            'Agricultural conversion \u2014 draining wetlands for farmland has been the single largest cause of wetland loss historically, driven by the fertility of organic wetland soils',
            'Urban and suburban development \u2014 filling wetlands for construction has eliminated large areas, particularly in coastal zones and floodplains',
            'Altered hydrology \u2014 dams, levees, water diversions, and groundwater extraction change the water regimes on which wetlands depend',
            'Pollution \u2014 nutrient runoff (eutrophication), pesticides, heavy metals, and sedimentation degrade water quality and alter plant communities',
            'Climate change \u2014 changing precipitation patterns, rising sea levels, and increased temperatures threaten wetlands; peatlands are especially vulnerable because warming accelerates peat decomposition, potentially releasing stored carbon as CO\u2082 and methane',
          ],
        },
        { type: 'heading', text: 'Conservation Efforts' },
        {
          type: 'text',
          text: 'The Ramsar Convention (1971) is the oldest global intergovernmental treaty dedicated to the conservation of a single ecosystem type. It provides a framework for the conservation and wise use of wetlands and their resources. Signatory nations designate Wetlands of International Importance (Ramsar Sites) and commit to maintaining their ecological character. Restoration ecology \u2014 the science and practice of repairing damaged ecosystems \u2014 has become increasingly important for wetlands, focusing on re-establishing hydrology, removing invasive species, and replanting native vegetation.',
        },
        {
          type: 'key-term',
          term: 'Ramsar Convention',
          definition:
            'An international treaty for the conservation and sustainable use of wetlands, signed in Ramsar, Iran, in 1971. It is the only global environmental treaty focused on a single ecosystem type. Participating countries designate Ramsar Sites \u2014 wetlands of international importance \u2014 and commit to their long-term protection.',
        },
        {
          type: 'callout',
          title: 'Peatlands and Climate',
          text: 'Peatlands cover only a small fraction of the land surface but store an enormous proportion of terrestrial carbon. The Raven textbook explains that dead biomass accumulation is "most pronounced in wetlands and swamps," especially in northern bogs where high water content limits oxygen and allows organic matter to accumulate. Draining or warming these peatlands releases stored carbon, making their conservation a global climate priority.',
          variant: 'warning',
        },
        {
          type: 'regional-example',
          prompt:
            'Are there any wetland conservation or restoration projects near you? Look for local organizations working on stream restoration, marsh protection, or invasive species removal. Consider visiting a nearby wetland, nature reserve, or Ramsar Site and observing the plant communities that have established or been replanted.',
        },
      ],
    },
  ],

  quiz: {
    id: 'aquatic-plants-quiz',
    title: 'Aquatic Plants Quiz',
    passingScore: 70,
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question:
          'Which category of aquatic plants is rooted in the substrate with leaves floating on the surface?',
        options: [
          'Emergent plants',
          'Floating-leaved plants',
          'Submerged plants',
          'Free-floating plants',
        ],
        correctAnswer: 1,
        explanation:
          'Floating-leaved plants are rooted in the bottom sediment but produce leaves that float on the water surface. Water lilies (Nymphaea) are the classic example. Free-floating plants, by contrast, are not anchored to the substrate at all.',
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question:
          'What is the primary function of aerenchyma in aquatic and wetland plants?',
        options: [
          'Storing excess water in times of drought',
          'Providing internal gas channels for oxygen transport and buoyancy',
          'Producing defensive chemicals against herbivores',
          'Absorbing dissolved minerals from the water',
        ],
        correctAnswer: 1,
        explanation:
          'Aerenchyma is tissue with large, interconnected air spaces that provides a pathway for oxygen to diffuse from aerial parts to roots in anaerobic sediments. It also contributes to buoyancy in stems and petioles of floating species.',
      },
      {
        id: 'q3',
        type: 'true-false',
        question:
          'Submerged aquatic leaves typically have a thick waxy cuticle to prevent water loss.',
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation:
          'False. Submerged leaves have a reduced or absent cuticle. Since they are surrounded by water, preventing water loss is unnecessary. Instead, a thin cuticle facilitates the direct diffusion of dissolved CO\u2082 and minerals across the leaf surface.',
      },
      {
        id: 'q4',
        type: 'multiple-choice',
        question:
          'Which aquatic organism uses CAM photosynthesis underwater to fix CO\u2082 at night?',
        options: [
          'Water hyacinth (Eichhornia)',
          'Water lily (Nymphaea)',
          'Quillwort (Isoetes)',
          'Duckweed (Lemna)',
        ],
        correctAnswer: 2,
        explanation:
          'Isoetes (quillworts) are lycophytes that use CAM photosynthesis underwater: they fix CO\u2082 at night into organic acids and release it during the day for the Calvin cycle, taking advantage of higher nighttime dissolved CO\u2082 concentrations.',
      },
      {
        id: 'q5',
        type: 'multiple-choice',
        question:
          'What is heterophylly in the context of aquatic plants?',
        options: [
          'The ability to photosynthesize using both C\u2083 and C\u2084 pathways',
          'The production of two distinctly different leaf forms on the same plant',
          'The development of roots that grow both in water and in air',
          'The capacity to reproduce both sexually and asexually',
        ],
        correctAnswer: 1,
        explanation:
          'Heterophylly is the production of distinctly different leaf types on the same individual. In aquatic plants, submerged leaves are typically finely divided or ribbon-like for underwater gas exchange, while aerial leaves are broader with stomata and a cuticle.',
      },
      {
        id: 'q6',
        type: 'true-false',
        question:
          'Hydrophily (water pollination) is the dominant mode of pollination among aquatic flowering plants.',
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation:
          'False. True hydrophily is relatively rare among aquatic plants. Most aquatic angiosperms raise their flowers above the water surface and are pollinated by wind (anemophily) or insects (entomophily). Only a few genera, such as Vallisneria and Zostera, rely on water as a pollen vector.',
      },
      {
        id: 'q7',
        type: 'multiple-choice',
        question:
          'In the Raven textbook\'s duckweed competition experiment, why did Lemna gibba outcompete L. polyrhiza in mixed culture?',
        options: [
          'L. gibba produced allelopathic chemicals that poisoned L. polyrhiza',
          'L. gibba grew much faster than L. polyrhiza',
          'L. gibba had air-filled sacs that let it float above and shade L. polyrhiza',
          'L. gibba had deeper roots that absorbed more nutrients',
        ],
        correctAnswer: 2,
        explanation:
          'Lemna gibba has air-filled sacs that enable it to form a floating mass above L. polyrhiza, cutting off the light. Even though L. polyrhiza grew faster in pure culture, it was shaded out and died in mixed culture \u2014 a demonstration of competitive exclusion.',
      },
      {
        id: 'q8',
        type: 'multiple-choice',
        question:
          'Which invasive aquatic plant has been partially controlled using the chrysomelid beetle Galerucella calmariensis?',
        options: [
          'Water hyacinth (Eichhornia crassipes)',
          'Hydrilla (Hydrilla verticillata)',
          'Purple loosestrife (Lythrum salicaria)',
          'Giant salvinia (Salvinia molesta)',
        ],
        correctAnswer: 2,
        explanation:
          'The Raven textbook describes how purple loosestrife (Lythrum salicaria), an aggressive invader of eastern US wetlands, is being controlled by the introduction of the European leaf-feeding chrysomelid beetle Galerucella calmariensis, which significantly reduces but does not completely exterminate populations of the plant.',
      },
      {
        id: 'q9',
        type: 'true-false',
        question:
          'Peatlands accumulate organic matter primarily because high acidity and low oxygen conditions inhibit decomposition.',
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation:
          'True. In bogs and other peatlands, waterlogged conditions create low-oxygen (anaerobic) environments, and the acidic pH produced by Sphagnum moss further inhibits microbial decomposition. As a result, dead plant material accumulates as peat rather than being fully broken down.',
      },
      {
        id: 'q10',
        type: 'ordering',
        question:
          'Arrange the stages of pond succession in the correct temporal order:',
        options: [
          'Open water with submerged aquatic plants',
          'Floating-leaved plants spread across the surface',
          'Emergent marsh grasses, sedges, and cattails colonize',
          'Terrestrial vegetation (shrubs, trees) establishes on the filled site',
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation:
          'As described in the Raven textbook, pond succession progresses from open water with submerged plants, to floating-leaved plants (like water lilies) covering the surface and choking out bottom-dwellers, to marsh grasses, sedges, and cattails (Typha) growing on the old pond bed, and eventually to terrestrial vegetation as the site fills completely with sediment and organic matter.',
      },
    ],
  },
};
