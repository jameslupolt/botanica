import type { Lesson } from '../../types';

export const fieldDocumentation: Lesson = {
  id: 'field-documentation',
  title: 'Field Documentation & Botanical Surveys',
  slug: 'field-documentation',
  description:
    'Learn how professional botanists document plant communities in the field \u2014 from transects and quadrats to vegetation mapping, phenology tracking, and citizen-science platforms.',
  category: 'ecology',
  difficulty: 'intermediate',
  estimatedMinutes: 20,
  icon: '\ud83d\udccb',
  color: 'leaf',
  prerequisites: ['dichotomous-keys'],
  order: 68,

  sections: [
    // ── Section 1: The Field Notebook ─────────────────────────────────
    {
      id: 'field-notebooks',
      title: 'The Field Notebook & Recording Standards',
      content: [
        {
          type: 'heading',
          text: 'Why the Field Notebook Still Matters',
        },
        {
          type: 'text',
          text: 'Despite the proliferation of digital tools, the waterproof field notebook remains the primary data-capture device for professional botanists. A well-maintained notebook is a legal document in many land-management contexts and serves as the authoritative record from which all downstream analyses are derived. Every entry should be written in permanent, waterproof ink (or pencil on waterproof paper) and should never be erased \u2014 errors are struck through with a single line so the original text remains legible.',
        },
        {
          type: 'list',
          items: [
            'Date, time, and weather conditions (temperature, cloud cover, recent precipitation)',
            'Precise locality: GPS coordinates (WGS 84 datum), elevation, aspect, slope',
            'Habitat description: substrate, surrounding land use, disturbance history',
            'Collector name(s) and unique collection number',
            'Species observed with abundance estimates and reproductive status',
            'Sketch maps showing spatial arrangement of dominant species',
          ],
        },
        {
          type: 'callout',
          title: 'Pro Tip',
          text: 'Number notebook pages before entering the field and maintain a running table of contents on the first pages. This simple habit dramatically speeds retrieval when a project spans multiple seasons.',
          variant: 'tip',
        },
        {
          type: 'key-term',
          term: 'Voucher specimen',
          definition:
            'A pressed, dried plant specimen deposited in a recognized herbarium that serves as a verifiable record linking a species name to a particular place, date, and collector. Vouchers are the gold standard for confirming identification in ecological studies.',
        },
        {
          type: 'text',
          text: 'When collecting voucher specimens, gather material that shows diagnostic features \u2014 flowers or fruits, basal and cauline leaves, and underground structures when feasible. Each specimen receives a unique collection number that cross-references the notebook entry. Permits are required in most jurisdictions, and rare species should be photographed rather than collected.',
        },
      ],
    },

    // ── Section 2: Quadrat Sampling ───────────────────────────────────
    {
      id: 'quadrat-sampling',
      title: 'Quadrat Sampling & the Braun-Blanquet Scale',
      content: [
        {
          type: 'heading',
          text: 'Quantifying Vegetation with Quadrats',
        },
        {
          type: 'text',
          text: 'A quadrat is a fixed-area sampling frame \u2014 typically square \u2014 placed within a plant community to quantify species composition, cover, density, and frequency. Standard sizes range from 0.25 m\u00b2 for bryophyte or grassland studies up to 400 m\u00b2 (20 \u00d7 20 m) for forest canopy work. The choice of quadrat size follows the species\u2013area curve: the frame must be large enough to capture the characteristic species richness of the community under study.',
        },
        {
          type: 'key-term',
          term: 'Braun-Blanquet cover-abundance scale',
          definition:
            'A semi-quantitative ordinal scale developed by Josias Braun-Blanquet for estimating the combined cover and abundance of each species within a relev\u00e9. Scores range from "r" (rare, negligible cover) through "+" (few individuals, small cover) and numeric classes 1\u20135, where 5 indicates cover of 75\u2013100 %.',
        },
        {
          type: 'list',
          items: [
            'r \u2014 Rare; one or a few individuals, negligible cover',
            '+ \u2014 Few individuals, cover < 1 %',
            '1 \u2014 Abundant but low cover, or less abundant with higher cover; 1\u20135 %',
            '2 \u2014 Very abundant, or cover 5\u201325 %',
            '3 \u2014 Cover 25\u201350 %, any number of individuals',
            '4 \u2014 Cover 50\u201375 %, any number of individuals',
            '5 \u2014 Cover 75\u2013100 %, any number of individuals',
          ],
        },
        {
          type: 'text',
          text: 'In phytosociological tradition, each quadrat placement is called a relev\u00e9. Relev\u00e9s are chosen to represent homogeneous stands of vegetation \u2014 this is a subjective, purposive placement, distinct from the random or systematic designs used in quantitative ecology. Both approaches have their place: relev\u00e9s excel at characterizing vegetation types, while randomized designs yield statistically unbiased estimates of population parameters.',
        },
        {
          type: 'callout',
          title: 'European & North American Traditions',
          text: 'The Braun-Blanquet approach underpins the European Vegetation Classification (EuroVeg) and has been used to define thousands of plant associations across the continent. In North America, the U.S. National Vegetation Classification (USNVC) employs a compatible framework.',
          variant: 'info',
        },
      ],
    },

    // ── Section 3: Transect Methods ───────────────────────────────────
    {
      id: 'transect-methods',
      title: 'Transect Methods',
      content: [
        {
          type: 'heading',
          text: 'Sampling Along Environmental Gradients',
        },
        {
          type: 'text',
          text: 'Transects are linear sampling designs that capture spatial variation along an environmental gradient \u2014 for example, from a stream bank through riparian forest into upland prairie, or from low to high elevation on a mountainside. The three most common variants are the belt transect, line-intercept transect, and point-intercept transect.',
        },
        {
          type: 'list',
          items: [
            'Belt transect: a fixed-width strip (e.g., 1 m wide) along a measured baseline; all species within the belt are recorded in contiguous quadrats.',
            'Line-intercept transect: a measuring tape is stretched and every plant canopy that crosses or overhangs the tape is recorded with start and end positions, yielding linear cover estimates.',
            'Point-intercept transect: at regular intervals along the tape a pin or laser is lowered vertically; every species touched is recorded, providing unbiased percent-cover data.',
          ],
        },
        {
          type: 'text',
          text: 'Point-intercept methods are especially valued in rangeland and grassland monitoring because they remove observer bias in cover estimation. Protocols such as the Bureau of Land Management\'s Assessment, Inventory, and Monitoring (AIM) strategy standardize pin diameter, number of points per transect (commonly 50\u2013150), and data-entry procedures so that datasets are comparable across regions and years.',
        },
        {
          type: 'callout',
          title: 'Calculating Line-Intercept Cover',
          text: 'In the line-intercept method, percent cover of a species is calculated as the sum of all intercept lengths for that species divided by the total transect length, multiplied by 100. Because canopy layers overlap, total cover across all species can exceed 100 %.',
          variant: 'fact',
        },
        {
          type: 'regional-example',
          prompt: 'Think about a long-term vegetation monitoring program in your region. What transect or quadrat methods are used to track post-fire succession, grazing impacts, or climate-driven shifts in your local plant communities?',
        },
      ],
    },

    // ── Section 4: Vegetation Mapping & GPS/GIS ───────────────────────
    {
      id: 'vegetation-mapping',
      title: 'Vegetation Mapping, GPS & GIS Fundamentals',
      content: [
        {
          type: 'heading',
          text: 'From Field Data to Spatial Products',
        },
        {
          type: 'text',
          text: 'Vegetation mapping translates field observations into spatially explicit representations of plant community distribution. Modern mapping integrates ground-truthed plot data with remotely sensed imagery (aerial photography, satellite multispectral data, or LiDAR-derived canopy models). The field botanist\'s role is to provide accurately georeferenced training data that links spectral signatures to verified community types.',
        },
        {
          type: 'key-term',
          term: 'Geographic Information System (GIS)',
          definition:
            'A framework for capturing, storing, analyzing, and displaying geographically referenced data. In botanical surveys, GIS layers commonly include species occurrence points, vegetation polygons, topographic variables, soil maps, and land-use boundaries.',
        },
        {
          type: 'text',
          text: 'Consumer-grade GPS receivers (including smartphone sensors) typically achieve horizontal accuracy of 3\u20135 m under open sky, degrading to 10\u201315 m beneath dense canopy. Differential correction using a nearby base station or satellite-based augmentation system (SBAS) can improve accuracy to sub-metre levels. For plot relocation in long-term monitoring, burying aluminium markers and recording bearings and distances from permanent landmarks supplements GPS waypoints.',
        },
        {
          type: 'callout',
          title: 'Datum Matters',
          text: 'Always record the coordinate reference system and datum (e.g., WGS 84, NAD 83) alongside GPS coordinates. A datum mismatch can introduce positional errors of tens of metres \u2014 enough to place a plot in the wrong vegetation type.',
          variant: 'warning',
        },
        {
          type: 'list',
          items: [
            'Record waypoints at each plot corner or centre and label them consistently with notebook entries.',
            'Note satellite count and estimated accuracy at the time of capture.',
            'Average multiple readings at the same point to reduce positional error.',
            'Back up raw GPS data nightly; batteries and electronics fail in the field.',
          ],
        },
      ],
    },

    // ── Section 5: Phenology & Photography ────────────────────────────
    {
      id: 'phenology-photography',
      title: 'Phenology Observation & Field Photography',
      content: [
        {
          type: 'heading',
          text: 'Tracking the Rhythms of Plant Life',
        },
        {
          type: 'key-term',
          term: 'Phenology',
          definition:
            'The study of the timing of recurring biological events \u2014 in plants, this includes bud break, leaf-out, flowering, fruiting, seed dispersal, and leaf senescence \u2014 and how these events relate to climate and other environmental drivers.',
        },
        {
          type: 'text',
          text: 'Standardized phenology protocols, such as those developed by the USA National Phenology Network (USA-NPN), assign numeric status codes to discrete phenophases. Observers visit marked individuals at regular intervals (every 2\u20134 days during peak activity, weekly otherwise) and score each phenophase as present, absent, or uncertain. Accumulated data reveal shifts in seasonal timing linked to climate change \u2014 spring leaf-out in temperate North America has advanced by roughly 1\u20132 days per decade since the mid-20th century.',
        },
        {
          type: 'text',
          text: 'Field photography serves two complementary purposes: it creates a visual voucher that supplements or replaces a physical specimen, and it communicates habitat context that pressed specimens cannot convey. Best practices include photographing the whole plant in its habitat, then moving to diagnostic close-ups of flowers (front and side views), fruits, leaf surfaces (adaxial and abaxial), stem cross-sections, and bark. A ruler or coin placed beside small structures provides scale.',
        },
        {
          type: 'callout',
          title: 'Geotagging Your Photos',
          text: 'Enable geotagging in your camera or phone settings so that GPS coordinates are embedded in each image\'s EXIF metadata. Verify the accuracy of these coordinates against your dedicated GPS unit, especially under canopy.',
          variant: 'tip',
        },
        {
          type: 'regional-example',
          prompt: 'Consider a long-running phenology study near you. How have flowering or leaf-out dates shifted over recent decades? What local botanical gardens, arboreta, or research stations track plant phenology in your region?',
        },
      ],
    },

    // ── Section 6: Citizen Science & iNaturalist ──────────────────────
    {
      id: 'citizen-science',
      title: 'Citizen Science & Digital Platforms',
      content: [
        {
          type: 'heading',
          text: 'Scaling Botanical Observation Through Community Participation',
        },
        {
          type: 'text',
          text: 'Citizen-science platforms have transformed the scale at which botanical data are generated. iNaturalist \u2014 a joint initiative of the California Academy of Sciences and the National Geographic Society \u2014 hosts hundreds of millions of observations worldwide. When an observation receives a community-consensus identification and meets quality criteria (photo evidence, date, coordinates, organism not captive), it achieves "Research Grade" status and is automatically shared with the Global Biodiversity Information Facility (GBIF), feeding continental- and global-scale analyses.',
        },
        {
          type: 'list',
          items: [
            'iNaturalist: photo-based identification with community verification and AI-assisted suggestions.',
            'USA-NPN / Nature\'s Notebook: standardized phenology monitoring with protocol training.',
            'Pl@ntNet: image-recognition tool trained on herbarium and field photographs from the botanical community.',
            'Herbaria aggregators (e.g., SERNEC, SEINet, Consortium of Pacific Northwest Herbaria): digitized specimen records accessible for mapping and analysis.',
          ],
        },
        {
          type: 'text',
          text: 'Despite their power, citizen-science datasets carry known biases. Observations cluster near roads, trails, and population centres. Charismatic species (showy wildflowers, large trees) are over-represented relative to grasses, sedges, and bryophytes. Professional botanists can mitigate these biases by contributing observations from under-surveyed habitats, verifying community identifications, and designing structured "bioblitz" events that target specific taxa or regions.',
        },
        {
          type: 'callout',
          title: 'Digital Vouchers',
          text: 'A single well-documented iNaturalist observation \u2014 sharp photos of diagnostic features, accurate coordinates, and habitat notes \u2014 can serve as a de facto digital voucher and has been cited in peer-reviewed taxonomic and ecological literature.',
          variant: 'info',
        },
        {
          type: 'callout',
          title: 'Sensitive Species',
          text: 'Many platforms automatically obscure coordinates for species flagged as threatened or sensitive. Be aware of your regional rare-plant list and manually obscure locations when appropriate, even if the platform does not do so automatically.',
          variant: 'warning',
        },
      ],
    },
  ],

  quiz: {
    id: 'field-documentation-quiz',
    title: 'Field Documentation & Botanical Surveys Quiz',
    passingScore: 70,
    questions: [
      // Q1 \u2014 multiple-choice
      {
        id: 'fd-q1',
        type: 'multiple-choice',
        question:
          'In the Braun-Blanquet cover-abundance scale, a score of "3" indicates which approximate cover range?',
        options: ['1\u20135 %', '5\u201325 %', '25\u201350 %', '50\u201375 %'],
        correctAnswer: 2,
        explanation:
          'A Braun-Blanquet score of 3 corresponds to 25\u201350 % cover, regardless of the number of individuals present.',
      },
      // Q2 \u2014 true-false
      {
        id: 'fd-q2',
        type: 'true-false',
        question:
          'In a line-intercept transect, total percent cover across all species cannot exceed 100 % because cover is measured relative to the transect length.',
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation:
          'Because canopy layers overlap vertically, multiple species can intercept the same segment of the transect line, so total cover frequently exceeds 100 %.',
      },
      // Q3 \u2014 multiple-choice
      {
        id: 'fd-q3',
        type: 'multiple-choice',
        question:
          'What is the primary advantage of the point-intercept method over visual cover estimation?',
        options: [
          'It requires fewer field visits.',
          'It eliminates the need for species identification.',
          'It reduces observer bias in cover estimates.',
          'It captures root biomass data.',
        ],
        correctAnswer: 2,
        explanation:
          'Point-intercept sampling yields objective, repeatable cover values because the presence or absence of a species at a defined point is a binary observation, removing the subjectivity inherent in visual estimation.',
      },
      // Q4 \u2014 multiple-choice
      {
        id: 'fd-q4',
        type: 'multiple-choice',
        question:
          'Which datum is most commonly specified when recording GPS coordinates for botanical field data?',
        options: ['ED 50', 'NAD 27', 'WGS 84', 'Tokyo 97'],
        correctAnswer: 2,
        explanation:
          'WGS 84 (World Geodetic System 1984) is the default datum for GPS receivers and the standard recommended by most biodiversity data-sharing networks.',
      },
      // Q5 \u2014 true-false
      {
        id: 'fd-q5',
        type: 'true-false',
        question:
          'Relev\u00e9s in the Braun-Blanquet tradition are placed randomly within the study area to ensure statistical representativeness.',
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation:
          'Relev\u00e9s are placed subjectively in homogeneous, representative stands of vegetation. Random or systematic placement is characteristic of quantitative sampling designs, not classical phytosociology.',
      },
      // Q6 \u2014 multiple-choice
      {
        id: 'fd-q6',
        type: 'multiple-choice',
        question:
          'An iNaturalist observation achieves "Research Grade" when it meets which set of criteria?',
        options: [
          'The observer holds a botany degree and uses a DSLR camera.',
          'It has photo evidence, date, coordinates, a wild organism, and community-consensus identification.',
          'It is verified by an iNaturalist staff taxonomist.',
          'It includes a pressed voucher specimen deposited in a herbarium.',
        ],
        correctAnswer: 1,
        explanation:
          'Research Grade requires photographic evidence, a date, geographic coordinates, the organism being wild (not captive/cultivated), and agreement among community identifiers. No professional credential or physical specimen is required.',
      },
      // Q7 \u2014 ordering
      {
        id: 'fd-q7',
        type: 'ordering',
        question:
          'Place the following Braun-Blanquet cover-abundance classes in order from lowest to highest cover.',
        options: [
          '+ (few individuals, < 1 %)',
          '2 (5\u201325 %)',
          'r (rare, negligible cover)',
          '4 (50\u201375 %)',
        ],
        correctAnswer: [2, 0, 1, 3],
        explanation:
          'The correct ascending order is: r (rare, negligible) \u2192 + (< 1 %) \u2192 2 (5\u201325 %) \u2192 4 (50\u201375 %).',
      },
      // Q8 \u2014 multiple-choice
      {
        id: 'fd-q8',
        type: 'multiple-choice',
        question:
          'Which of the following is the most important reason to record satellite count and estimated accuracy when logging a GPS waypoint?',
        options: [
          'To calculate the correct time zone for the observation.',
          'To assess positional reliability, especially under dense canopy where accuracy degrades.',
          'To determine the species composition of the canopy above the GPS unit.',
          'To comply with camera geotagging standards.',
        ],
        correctAnswer: 1,
        explanation:
          'Recording satellite count and accuracy allows the investigator to evaluate the reliability of each waypoint. Under dense canopy, reduced satellite reception can degrade horizontal accuracy to 10\u201315 m or worse.',
      },
      // Q9 \u2014 true-false
      {
        id: 'fd-q9',
        type: 'true-false',
        question:
          'A voucher specimen is a pressed, dried plant deposited in a recognized herbarium that serves as a verifiable record linking a species name to a specific collection event.',
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation:
          'This is the standard definition of a voucher specimen. Vouchers are essential for confirming identifications in ecological and taxonomic studies and are curated as permanent archival records.',
      },
      // Q10 \u2014 multiple-choice
      {
        id: 'fd-q10',
        type: 'multiple-choice',
        question:
          'Which field-photography practice best supports future identification and data quality?',
        options: [
          'Taking a single photograph of the most attractive flower.',
          'Photographing the whole plant in habitat, then close-ups of flowers, fruits, leaves (both surfaces), and stem, with a scale reference.',
          'Using only black-and-white photography for archival permanence.',
          'Disabling geotagging to protect location privacy for all species.',
        ],
        correctAnswer: 1,
        explanation:
          'Comprehensive photographic documentation \u2014 habitat shot, multiple diagnostic close-ups, and a scale reference \u2014 maximizes the chance of accurate identification and creates a robust visual voucher.',
      },
    ],
  },
};
