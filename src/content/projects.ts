import type { Project } from "@/lib/schema";

/**
 * Real Madane Design Workshop portfolio, generated from the studio's project
 * catalogue (MADANE_SORTED/_CATALOG/projects.json). Images live under
 * /public/assets/projects/<slug>/. NOTE: `year` is a placeholder spread (not
 * present in the source data), confirm with the studio before publishing.
 */
export const projects: Project[] = [
  {
    slug: "rudra-villa",
    name: "Rudra Villa",
    type: "Architecture",
    category: "Villas",
    client: "Private residence",
    location: "Alibaug, Maharashtra",
    city: "Alibaug",
    year: 2025,
    area: "8,000 sq.ft.",
    status: "Under construction",
    scope: ["Architecture", "Interiors and landscape", "Design and execution"],
    services: ["Architecture", "Interior"],
    cover: "/assets/projects/rudra-villa/cover.jpg",
    coverAlt: "Front elevation render of the villa with perforated terracotta jaali facade, flat-roof massing and a car in the porte-cochere.",
    gridCover: "/assets/projects/rudra-villa/cover.png",
    screenVideo: "/assets/video/homepage-hero.mp4",
    narrative: {
      brief: "An 18,000 sq.ft. weekend villa in Alibag where contemporary architecture meets Indian craft, jaali screens, brass accents and sea views across every room.",
      site: "Residential commission in Alibag, Maharashtra. Ongoing.",
      response: "Rudra Villa is an ongoing 18,000 sq.ft. weekend retreat in Alibag, with Madane Design Workshop handling architecture, interiors and landscape end to end. The 3D-rendered scheme pairs a clean modern shell, flat-roof massing, perforated terracotta jaali facade, full-height glazing, with warm Indian detailing: a sunburst metal entry door, deity wall art, patterned tile floors, swing seats and a pool court. Bedrooms, lounges, a games room and multiple themed bathrooms all open toward greenery and the sea horizon.",
    },
    gallery: [
      { src: "/assets/projects/rudra-villa/g01.jpg", alt: "Swimming pool court with timber pergola cabana, water spouts and a sculptural mermaid figure amid lush planting.", span: "full" },
      { src: "/assets/projects/rudra-villa/g02.jpg", alt: "Grand entry portal with a dramatic circular sunburst metal door framed by stone walls.", span: "half" },
      { src: "/assets/projects/rudra-villa/g03.jpg", alt: "Games room with a full-size pool table under an exposed timber-truss roof and tropical botanical wall art.", span: "half" },
      { src: "/assets/projects/rudra-villa/g04.jpg", alt: "Serene master suite under a timber-truss ceiling with carved poster bed, arched niches and sea-facing balcony.", span: "wide" },
      { src: "/assets/projects/rudra-villa/g05.jpg", alt: "Double-height living hall with sculptural wall discs, a sunken seating pit and views to the rear lounge.", span: "half" },
      { src: "/assets/projects/rudra-villa/g06.jpg", alt: "Stair and lift core with a carved Buddha-face feature wall, water body and floating treads beside a green court.", span: "tall" },
      { src: "/assets/projects/rudra-villa/g07.jpg", alt: "Open-plan dining area with eight-seat table, ceiling fans and full-height glazing to a landscaped court.", span: "half" },
      { src: "/assets/projects/rudra-villa/g08.jpg", alt: "Family living room with concrete feature wall, mounted TV, layered seating and a bold figurative artwork.", span: "wide" },
      { src: "/assets/projects/rudra-villa/g09.jpg", alt: "Modern kitchen with marble island, breakfast bar stools and panoramic windows over the skyline.", span: "full" },
      { src: "/assets/projects/rudra-villa/g10.jpg", alt: "Powder room with floral mosaic feature wall, dark tiling and brass fixtures.", span: "full" },
    ],
    featured: true,
    order: 0,
    seo: { title: "Rudra Villa, Architecture", description: "An 18,000 sq.ft. weekend villa in Alibag where contemporary architecture meets Indian craft, jaali screens, brass accents and sea views across every room." },
  },
  {
    slug: "sun-petrochemicals-pvt-ltd-corporate-office",
    name: "Sun Petrochemicals Pvt. Ltd., Corporate Office",
    type: "Interior",
    category: "Corporate Offices",
    client: "Sun Petrochemicals Pvt. Ltd.",
    location: "ATL Corporate Park, Mumbai",
    city: "Mumbai",
    year: 2024,
    area: "12,000 sq.ft.",
    status: "completed",
    scope: ["Commercial interior fit-out", "Reception", "Lobby", "Cabins", "Meeting/boardrooms"],
    services: ["Interior", "Turnkey"],
    cover: "/assets/projects/sun-petrochemicals-pvt-ltd-corporate-office/cover.jpg",
    coverAlt: "Reception with glossy black desk and illuminated 'sun Petrochemicals' logo on a warm tan wall, lounge seating beyond.",
    gridCover: "/assets/projects/sun-petrochemicals-pvt-ltd-corporate-office/cover.png",
    narrative: {
      brief: "A crisp, light-filled corporate office for Sun Petrochemicals, balancing clean white minimalism with warm wood, terracotta accents and a polished branded reception.",
      site: "Corporate office (petrochemical / industrial) commission in India. completed.",
      response: "A full corporate-office fit-out for Sun Petrochemicals Pvt. Ltd., anchored by a glossy black reception desk carrying the illuminated \"sun Petrochemicals\" logo against a warm tan feature wall. The palette pairs marble-effect flooring and bright white minimalist ceilings with wood-panelled cabins, terracotta curved volumes and frosted-glass meeting rooms. The programme spans reception and lounge, a marble lift lobby with a small shrine, multiple meeting and boardrooms, open and cubicle workstations, executive cabins and a playful branded cafeteria.",
    },
    gallery: [
      { src: "/assets/projects/sun-petrochemicals-pvt-ltd-corporate-office/g01.jpg", alt: "Boardroom with long black table, tan leather chairs, circular cove ceiling and framed abstract art.", span: "full" },
      { src: "/assets/projects/sun-petrochemicals-pvt-ltd-corporate-office/g02.jpg", alt: "Cafeteria with olive coffered ceiling, terrazzo floor, yellow chairs and graphic 'sun' branded wall.", span: "half" },
      { src: "/assets/projects/sun-petrochemicals-pvt-ltd-corporate-office/g03.jpg", alt: "Bright waiting lounge under a layered circular ceiling cove, with frosted-glass meeting rooms lining the corridor.", span: "half" },
      { src: "/assets/projects/sun-petrochemicals-pvt-ltd-corporate-office/g04.jpg", alt: "Marble-clad lift lobby with dark stone elevator surrounds and a small illuminated shrine niche.", span: "wide" },
      { src: "/assets/projects/sun-petrochemicals-pvt-ltd-corporate-office/g05.jpg", alt: "Wood-lined breakout alcove with a curved canopy and dark accent chairs along a circulation spine.", span: "half" },
      { src: "/assets/projects/sun-petrochemicals-pvt-ltd-corporate-office/g06.jpg", alt: "Open-plan workstation hall with white benching desks, wall-mounted screen and city views through ribbon windows.", span: "tall" },
      { src: "/assets/projects/sun-petrochemicals-pvt-ltd-corporate-office/g07.jpg", alt: "Grey cubicle workstation area with grid ceiling and overhead storage units.", span: "half" },
      { src: "/assets/projects/sun-petrochemicals-pvt-ltd-corporate-office/g08.jpg", alt: "Executive cabin with white desk, patterned wood feature wall, sofa and a sculptural pendant light.", span: "wide" },
      { src: "/assets/projects/sun-petrochemicals-pvt-ltd-corporate-office/g09.jpg", alt: "Compact meeting room with wood-panelled wall, white table, tan chairs and wall-mounted display.", span: "full" },
    ],
    featured: true,
    order: 1,
    seo: { title: "Sun Petrochemicals Pvt. Ltd., Corporate Office, Interior", description: "A crisp, light-filled corporate office for Sun Petrochemicals, balancing clean white minimalism with warm wood, terracotta accents and a polished branded r" },
  },
  {
    slug: "akasa-kolkata",
    name: "Akasa, Kolkata",
    type: "Interior",
    category: "Coworking",
    client: "Akasa Business Center",
    location: "Salt Lake City, Kolkata",
    city: "Kolkata",
    year: 2023,
    area: "15,000 sq.ft.",
    status: "Completed",
    scope: ["Commercial interior fit-out: reception", "Private cabins", "Meeting and conference rooms", "Open workstations", "Breakout cafeteria"],
    services: ["Interior", "Turnkey"],
    cover: "/assets/projects/akasa-kolkata/cover.jpg",
    coverAlt: "Reception viewed through bronze-fluted glazed doors, with backlit AKASA signage and an inverted black-marble desk.",
    gridCover: "/assets/projects/akasa-kolkata/cover.png",
    narrative: {
      brief: "A polished Akasa managed-office and coworking floor in Kolkata where a dramatic inverted-marble reception sets the tone for cabins, meeting rooms and a playful cafe.",
      site: "Coworking commission in Kolkata, West Bengal. Completed.",
      response: "Akasa Kolkata is a completed commercial-interior fit-out for a managed-office / coworking operator, anchored by a striking reception with an inverted black-marble desk, backlit AKASA signage and bronze-fluted glazed entry doors. The floor mixes private cabins and tan-leather conference rooms with open workstation suites, frosted-glass partitions, geometric carpet and timber-batten ceilings, plus a velvet upholstered breakout nook. A bright cafeteria with bold abstract wall graphics, curved-timber ceiling and warm pendant lighting rounds out the amenity offer.",
    },
    gallery: [
      { src: "/assets/projects/akasa-kolkata/g01.jpg", alt: "Boardroom with long table, tan-leather Eames-style chairs, acoustic panels and warm timber ceiling.", span: "full" },
      { src: "/assets/projects/akasa-kolkata/g02.jpg", alt: "Corridor breakout nook with a sculpted blue velvet upholstered bench and barn-door glazed cabins.", span: "half" },
      { src: "/assets/projects/akasa-kolkata/g03.jpg", alt: "Cafe seating with bar counter, warm pendants, sculpted timber ceiling and colourful mural backdrop.", span: "half" },
      { src: "/assets/projects/akasa-kolkata/g04.jpg", alt: "Training / presentation room with tan-leather chairs, timber-slat ceiling and wall-mounted screen.", span: "wide" },
      { src: "/assets/projects/akasa-kolkata/g05.jpg", alt: "Compact private cabin with desk, orange task chairs and a cream sofa against white panelled walls.", span: "half" },
      { src: "/assets/projects/akasa-kolkata/g06.jpg", alt: "Small meeting room with grey table, white mesh chairs and wall-mounted display on a dark panel.", span: "tall" },
      { src: "/assets/projects/akasa-kolkata/g07.jpg", alt: "Workstation suite with white desks, green mesh chairs, storage cabinetry and frosted-glass partition.", span: "half" },
      { src: "/assets/projects/akasa-kolkata/g08.jpg", alt: "Cafeteria with bold abstract wall graphic, curved-timber ceiling, pendant lights and timber chairs.", span: "wide" },
    ],
    featured: true,
    order: 2,
    seo: { title: "Akasa, Kolkata, Interior", description: "A polished Akasa managed-office and coworking floor in Kolkata where a dramatic inverted-marble reception sets the tone for cabins, meeting rooms and a pla" },
  },
  {
    slug: "semac-consultants-pvt-ltd-office",
    name: "Semac Consultants Pvt. Ltd. Office",
    type: "Interior",
    category: "Corporate Offices",
    client: "Semac Consultants Pvt. Ltd.",
    location: "India",
    city: "India",
    year: 2022,
    area: "",
    status: "Completed",
    scope: ["Corporate office interior fit-out: reception", "Open workstations", "Breakout and circulation zones", "Storage and pooja niche"],
    services: ["Interior", "Turnkey"],
    cover: "/assets/projects/semac-consultants-pvt-ltd-office/cover.jpg",
    coverAlt: "Reception viewed through glass doors, with the backlit white sculptural desk and SEMAC logo on a curved timber backwall flanked by green velvet sofas.",
    gridCover: "/assets/projects/semac-consultants-pvt-ltd-office/cover.png",
    narrative: {
      brief: "A warm, India-themed corporate office for Semac Consultants where arched timber portals, epic murals and curved workstations frame a high-rise city skyline.",
      site: "Engineering consultancy commission in India. Completed.",
      response: "A completed corporate office interior for engineering consultancy Semac Consultants Pvt. Ltd., set on an upper floor with sweeping high-rise city views. The design layers warm wood-tone arches, green velvet reception seating and curved bamboo-topped workstation clusters against dramatic Indian mythological murals, Devanagari wall quotes and a jewel-toned pooja niche. Exposed services ceilings, track lighting and a muted carpet palette give it a contemporary yet culturally rooted character.",
    },
    gallery: [
      { src: "/assets/projects/semac-consultants-pvt-ltd-office/g01.jpg", alt: "Symmetrical curved workstation pods framing a central carpeted aisle, bracketed by glowing riverscape murals.", span: "full" },
      { src: "/assets/projects/semac-consultants-pvt-ltd-office/g02.jpg", alt: "Sweeping curved workstation island beside a dramatic golden mythological mural, overlooking high-rise towers.", span: "half" },
      { src: "/assets/projects/semac-consultants-pvt-ltd-office/g03.jpg", alt: "Open-plan workstation zone at dusk, curved bamboo desks wrapping around planted trees with the city skyline through full-height glazing.", span: "half" },
      { src: "/assets/projects/semac-consultants-pvt-ltd-office/g04.jpg", alt: "Reception lounge with green velvet seating and a Devanagari Bhagavad Gita quote spotlit on the wall beside the fluted desk.", span: "wide" },
      { src: "/assets/projects/semac-consultants-pvt-ltd-office/g05.jpg", alt: "Arched timber portal framing the office depth, flanked by vivid night-riverscape murals above desk runs.", span: "half" },
      { src: "/assets/projects/semac-consultants-pvt-ltd-office/g06.jpg", alt: "Workstation cluster with a large epic-battle mural column and illuminated riverscape walls under linear lighting.", span: "tall" },
      { src: "/assets/projects/semac-consultants-pvt-ltd-office/g07.jpg", alt: "Grey triangular cubby storage units against wood paneling, with arched openings leading into adjacent work areas.", span: "half" },
      { src: "/assets/projects/semac-consultants-pvt-ltd-office/g08.jpg", alt: "View through a timber arch to grid storage shelving and an informal timber chair seating nook.", span: "wide" },
      { src: "/assets/projects/semac-consultants-pvt-ltd-office/g09.jpg", alt: "Jewel-toned pooja niche with a pink and blue Rajasthani-style arch motif framed within a tall timber portal.", span: "full" },
    ],
    featured: true,
    order: 3,
    seo: { title: "Semac Consultants Pvt. Ltd. Office, Interior", description: "A warm, India-themed corporate office for Semac Consultants where arched timber portals, epic murals and curved workstations frame a high-rise city skyline" },
  },
  {
    slug: "john-cockerill-office-aurum-parc-ghansoli",
    name: "John Cockerill Office, Aurum Parc Ghansoli",
    type: "Interior",
    category: "Corporate Offices",
    client: "John Cockerill",
    location: "Aurum Parc, Ghansoli, Navi Mumbai",
    city: "Navi Mumbai",
    year: 2021,
    area: "Large-format single-floor office plate (open-plan workstations + conference + reception)",
    status: "Design / proposal stage (3D renders)",
    scope: ["Corporate office interior fit-out: reception", "Conference cabins", "Large open-plan workstation floor", "Breakout/collaboration zones", "Lockers and pantry"],
    services: ["Interior", "Turnkey"],
    cover: "/assets/projects/john-cockerill-office-aurum-parc-ghansoli/cover.jpg",
    coverAlt: "Reception with John Cockerill logo wall, rust banquettes and a glass meeting room beyond.",
    gridCover: "/assets/projects/john-cockerill-office-aurum-parc-ghansoli/cover.png",
    narrative: {
      brief: "A bright, biophilic corporate workplace for engineering group John Cockerill at Aurum Parc, Ghansoli, balancing vast open-plan workstations with green-and-blue collaboration pods.",
      site: "Corporate / engineering (industrial) commission in Aurum Parc, Ghansoli, Navi Mumbai. Design / proposal stage (3D renders).",
      response: "A full corporate office fit-out for the engineering group John Cockerill at Aurum Parc in Ghansoli, Navi Mumbai. The scheme pairs a clean white-and-charcoal reception carrying the John Cockerill logo with expansive open-plan workstation floors wrapped in floor-to-ceiling glazing and hill views, punctuated by green and blue acoustic pods, planter screens and brand-history graphic walls. Drum and dome pendants, exposed services ceilings, and breakout banquettes give the engineering workplace a warm, biophilic, collaborative character. All assets are photorealistic 3D renders from the design stage.",
    },
    gallery: [
      { src: "/assets/projects/john-cockerill-office-aurum-parc-ghansoli/g01.jpg", alt: "Expansive open-plan workstation floor with green accent column, planter spines and panoramic glazing.", span: "full" },
      { src: "/assets/projects/john-cockerill-office-aurum-parc-ghansoli/g02.jpg", alt: "Sunlit corner workstation cluster with red-flowering planters, green column and sweeping window views.", span: "half" },
      { src: "/assets/projects/john-cockerill-office-aurum-parc-ghansoli/g03.jpg", alt: "Conference cabin with blue acoustic-panel wall, framed product graphics and a long boardroom table open to the workfloor.", span: "half" },
      { src: "/assets/projects/john-cockerill-office-aurum-parc-ghansoli/g04.jpg", alt: "Breakout collaboration bar with planter-topped counter, swivel stools and green/blue acoustic columns.", span: "wide" },
      { src: "/assets/projects/john-cockerill-office-aurum-parc-ghansoli/g05.jpg", alt: "Twin conference rooms with oval ceiling rafts and blue panelled feature walls, shown as a split/mirrored render.", span: "half" },
      { src: "/assets/projects/john-cockerill-office-aurum-parc-ghansoli/g06.jpg", alt: "Workfloor edge with a blue Mercury Marine brand-history timeline graphic wall behind the desks.", span: "tall" },
      { src: "/assets/projects/john-cockerill-office-aurum-parc-ghansoli/g07.jpg", alt: "Open workstations with a teal focus booth and green planter screens dividing the floor.", span: "half" },
      { src: "/assets/projects/john-cockerill-office-aurum-parc-ghansoli/g08.jpg", alt: "Collaboration table under drum pendants beside a blue/green acoustic pod with mountain views.", span: "wide" },
      { src: "/assets/projects/john-cockerill-office-aurum-parc-ghansoli/g09.jpg", alt: "Activity-based work zone mixing a meeting table, orange-lit drum pendants and an upholstered lounge sofa.", span: "full" },
      { src: "/assets/projects/john-cockerill-office-aurum-parc-ghansoli/g10.jpg", alt: "Wide biophilic workfloor lined with flowering planters, low workstations and panoramic glazing.", span: "full" },
    ],
    featured: true,
    order: 4,
    seo: { title: "John Cockerill Office, Aurum Parc Ghansoli, Interior", description: "A bright, biophilic corporate workplace for engineering group John Cockerill at Aurum Parc, Ghansoli, balancing vast open-plan workstations with green-and-" },
  },
  {
    slug: "kushal-wallstreet",
    name: "Kushal Wallstreet",
    type: "Architecture",
    category: "Commercial",
    client: "Kushal Landmark",
    location: "Fergusson College Road, Pune",
    city: "Pune",
    year: 2020,
    area: "1,50,000 sq.ft.",
    status: "Completed",
    scope: ["Architecture and facade development"],
    services: ["Architecture"],
    cover: "/assets/projects/kushal-wallstreet/cover.jpg",
    coverAlt: "Dusk three-quarter street view of the illuminated glass-and-fin office tower with adjacent low-rise context and traffic light trails.",
    gridCover: "/assets/projects/kushal-wallstreet/cover.png",
    narrative: {
      brief: "A Gr+10 commercial office tower in Pune wrapped in vertical metallic fins, full-height glazing and stacked sky-gardens, branded around a Wall Street bull motif.",
      site: "Commercial office commission in Pune, India. Under construction (2nd floor in progress).",
      response: "Kushal Wallstreet is a ground-plus-ten storey commercial office building in Pune, designed as a sleek glazed tower with vertical metallic fins for solar shading and a dynamic facade. Renders show a finance-themed retail and office podium, complete with a Wall Street charging-bull sculpture and prominent \"Kushal Wallstreet\" signage, topped by stacked planted terraces and corporate tenant frontages. The scheme is currently in construction, with architectural and facade development as the core scope.",
    },
    gallery: [
      { src: "/assets/projects/kushal-wallstreet/g01.jpg", alt: "Twilight street-level hero of the tower's corner, glowing metallic fins and the finance-themed retail podium with the charging-bull branding.", span: "full" },
      { src: "/assets/projects/kushal-wallstreet/g02.jpg", alt: "Daytime upward corner view showing the full tower, podium glazing and the 'Kushal Wallstreet' entrance signage with the Wall Street bull mural.", span: "half" },
      { src: "/assets/projects/kushal-wallstreet/g03.jpg", alt: "Frontal elevation render of the full glazed monobloc with mid-height planted terraces and rooftop signage against the city skyline.", span: "half" },
      { src: "/assets/projects/kushal-wallstreet/g04.jpg", alt: "Pedestrian-level view along the podium showing tenant frontages (Tommy, Piaget, Verte, Finance) behind a green-clad arcade.", span: "wide" },
    ],
    featured: true,
    order: 5,
    seo: { title: "Kushal Wallstreet, Architecture", description: "A Gr+10 commercial office tower in Pune wrapped in vertical metallic fins, full-height glazing and stacked sky-gardens, branded around a Wall Street bull m" },
  },
  {
    slug: "lodha-1-office",
    name: "Lodha 1 Office",
    type: "Interior",
    category: "Corporate Offices",
    client: "Lodha",
    location: "India",
    city: "India",
    year: 2019,
    area: "",
    status: "design / visualization",
    scope: ["Interior design and fit-out of corporate office (workstations", "Conference cabin", "Reception", "Mandir", "Circulation)"],
    services: ["Interior", "Turnkey"],
    cover: "/assets/projects/lodha-1-office/cover.jpg",
    coverAlt: "Signature wide view: flowing LED light-lines, burgundy chairs, marble desks and arched brass cabin under a wave ceiling.",
    gridCover: "/assets/projects/lodha-1-office/cover.png",
    narrative: {
      brief: "A sculptural corporate office where flowing LED light-trails, arched brass portals and marble worktops turn an open floorplate into a fluid, premium workspace.",
      site: "Corporate office commission. design / visualization.",
      response: "A fully-rendered commercial office interior for Lodha, presented in two design directions: a teal-and-walnut scheme and an \"optimized\" variant using burgundy seating with dramatic veined-marble feature walls. The design language centres on ribbon-like white LED lines that sweep across dark flooring, curved arched openings, brass-mesh partition screens, slatted/acoustic ceilings and marble-topped workstations, with a Ganesh mandir niche anchoring the entry. All assets are CGI renders plus one top-down plan; no built photography or external branding is present.",
    },
    gallery: [
      { src: "/assets/projects/lodha-1-office/g01.jpg", alt: "Open workstation cluster with marble desk, teal task chairs and arched portals framing the conference cabin beyond.", span: "full" },
      { src: "/assets/projects/lodha-1-office/g02.jpg", alt: "Optimized open office across a veined-marble counter, acoustic wave ceiling and brass-screened meeting pod.", span: "half" },
      { src: "/assets/projects/lodha-1-office/g03.jpg", alt: "Conference cabin with a black-marble boardroom table, tan leather chairs, molecule-style linear chandelier and walnut wall.", span: "half" },
      { src: "/assets/projects/lodha-1-office/g04.jpg", alt: "Entry/reception view with a sculpted brass desk and white LED light-lines curving across the dark floor.", span: "wide" },
      { src: "/assets/projects/lodha-1-office/g05.jpg", alt: "Arched lounge with curved bouclé sofa, niche shelving and a Ganesh mandir, opening to the meeting room (teal scheme).", span: "half" },
      { src: "/assets/projects/lodha-1-office/g06.jpg", alt: "Mandir niche with Ganesh idol on marble plinth beside an arched view into the open office (teal scheme).", span: "tall" },
      { src: "/assets/projects/lodha-1-office/g07.jpg", alt: "Wide-angle workspace with slatted wood ceiling, curved glazing and the conference cabin visible through a brass screen.", span: "half" },
      { src: "/assets/projects/lodha-1-office/g08.jpg", alt: "Workstation pod under sculpted oval light fixtures with marble desk, teal chairs and walnut storage wall.", span: "wide" },
      { src: "/assets/projects/lodha-1-office/g09.jpg", alt: "Desk cluster with potted olive trees, ribbed ceiling and the meeting cabin framed through an arched opening.", span: "full" },
      { src: "/assets/projects/lodha-1-office/g10.jpg", alt: "Optimized conference cabin: black-marble table, tan chairs and a dramatic veined-marble feature wall (near-duplicate viewpoint).", span: "full" },
    ],
    featured: true,
    order: 6,
    seo: { title: "Lodha 1 Office, Interior", description: "A sculptural corporate office where flowing LED light-trails, arched brass portals and marble worktops turn an open floorplate into a fluid, premium worksp" },
  },
  {
    slug: "raymond-office",
    name: "Raymond Office",
    type: "Interior",
    category: "Corporate Offices",
    client: "Raymond Ltd.",
    location: "Kolshet Road, Thane",
    city: "Thane",
    year: 2018,
    area: "21,000 sq.ft.",
    status: "completed",
    scope: ["Corporate office interior fit-out: reception", "Boardrooms", "Meeting rooms and breakout lounge"],
    services: ["Interior", "Turnkey"],
    cover: "/assets/projects/raymond-office/cover.jpg",
    coverAlt: "Reception with vibrant vertical multi-colour striped feature wall, red neon brand logo, illuminated front desk and concentric linear ceiling profile.",
    gridCover: "/assets/projects/raymond-office/gridcover.png",
    narrative: {
      brief: "A polished corporate office for Raymond, anchored by a bold multi-colour striped reception and sculptural boardroom ceilings.",
      site: "Corporate office commission. completed.",
      response: "Corporate office interior fit-out for the apparel and textile brand Raymond, photographed on completion. The scheme pairs a vibrant vertical multi-colour striped feature wall and red neon logo at reception with refined wood-panelled and pixel-graphic boardrooms. Sculptural baffle and recessed-trench lighting, glass-partitioned cabins and a soft-toned breakout lounge round out the space.",
    },
    gallery: [
      { src: "/assets/projects/raymond-office/g01.jpg", alt: "Large meeting room featuring a sculptural wave-form baffle ceiling above a long table and a blue pixel-pattern acoustic feature wall.", span: "full" },
      { src: "/assets/projects/raymond-office/g02.jpg", alt: "Boardroom with long white conference table, executive black leather chairs, warm wood-panelled wall and grid-recessed linear lighting.", span: "half" },
      { src: "/assets/projects/raymond-office/g03.jpg", alt: "Breakout lounge with terracotta-toned glass cabin, wood-floor inset seating zone, planters and a curved floating ceiling with cove lighting.", span: "half" },
    ],
    featured: true,
    order: 7,
    seo: { title: "Raymond Office, Interior", description: "A polished corporate office for Raymond, anchored by a bold multi-colour striped reception and sculptural boardroom ceilings." },
  },
  {
    slug: "hero-electric-manufacturing-facility",
    name: "Hero Electric Manufacturing Facility",
    type: "Architecture",
    category: "Industrial",
    client: "Hero Electric",
    location: "Ludhiana, Punjab",
    city: "Ludhiana",
    year: 2017,
    area: "Ground + 1 structure",
    status: "Under construction",
    scope: ["Architecture"],
    services: ["Architecture"],
    cover: "/assets/projects/hero-electric-manufacturing-facility/cover.jpg",
    coverAlt: "Corner approach render of the Hero Electric facility showing the two-storey panelised facade, glazed upper office volume and circular red logo, with landscaped palms and a sports car at the entry.",
    narrative: {
      brief: "A bold industrial facility for Hero Electric in Ludhiana, where crisp panelised facades meet a sweeping red branded canopy.",
      site: "Industrial commission in Ludhiana, Punjab, India. Under construction.",
      response: "Architectural design for a Ground + 1 manufacturing and office facility for Hero Electric in Ludhiana, Punjab. The renders show a long, clean-lined structure clad in light precast-style panels punctuated by tall black vertical fenestration, anchored by a dramatic red angular canopy and prominent Hero Electric branding. The complex houses machinery and offices and is currently under construction.",
    },
    gallery: [
      { src: "/assets/projects/hero-electric-manufacturing-facility/g01.jpg", alt: "Street-level perspective along the long panelised elevation, with rhythmic black vertical glazing leading the eye to the cantilevered red Hero Electric canopy.", span: "full" },
      { src: "/assets/projects/hero-electric-manufacturing-facility/g02.jpg", alt: "Wide three-quarter render of the full massing under a bright sky, showing the gabled volume, the red angular entrance canopy and the open ground-floor frontage.", span: "half" },
    ],
    featured: true,
    order: 8,
    seo: { title: "Hero Electric Manufacturing Facility, Architecture", description: "A bold industrial facility for Hero Electric in Ludhiana, where crisp panelised facades meet a sweeping red branded canopy." },
  },
  {
    slug: "ufo-moviez-cinema-complex",
    name: "UFO Moviez Cinema Complex",
    type: "Architecture",
    category: "Commercial",
    client: "UFO Moviez / NOVA Cinemaz",
    location: "Gujarat, India",
    city: "India",
    year: 2025,
    area: "",
    status: "Design stage",
    scope: ["Architecture and interior design for a 3-screen theatre complex"],
    services: ["Architecture", "Interior"],
    cover: "/assets/projects/ufo-moviez-cinema-complex/cover.jpg",
    coverAlt: "NOVA Cinemaz lobby render with reflective black floor, circuit-line ceiling, poster wall and a row of red sofas.",
    narrative: {
      brief: "A bold 3-screen cinema complex wrapping a mosaic-coloured facade around dramatic red-lit auditoriums and a lounge-style foyer.",
      site: "Hospitality commission in Gujarat, India. Design stage.",
      response: "Design-stage proposal for a three-screen multiplex in Gujarat, developed for UFO Moviez under the NOVA Cinemaz brand. The renders show a two-storey building topped by a vivid pixelated multi-colour facade band, paired with auditorium interiors driven by sculptural red light-lines and a sleek black-floored lobby lined with backlit film posters and a snack counter. The scheme covers both the building architecture and the cinema interiors.",
    },
    gallery: [
      { src: "/assets/projects/ufo-moviez-cinema-complex/g01.jpg", alt: "Three-quarter massing render of the two-storey cinema with its vivid mosaic-coloured upper facade and landscaped entry.", span: "full" },
      { src: "/assets/projects/ufo-moviez-cinema-complex/g02.jpg", alt: "Cinema auditorium render with red recliner seating and sculptural red light-line accents wrapping the acoustic walls and ceiling.", span: "half" },
      { src: "/assets/projects/ufo-moviez-cinema-complex/g03.jpg", alt: "UFO-branded foyer with backlit film posters, illuminated ceiling rings, red lounge seating and a glowing concession display.", span: "half" },
      { src: "/assets/projects/ufo-moviez-cinema-complex/g04.jpg", alt: "Screen-facing view of an auditorium framed by curving red neon light-lines against grey acoustic panelling.", span: "wide" },
      { src: "/assets/projects/ufo-moviez-cinema-complex/g05.jpg", alt: "Front elevation showing the multiplex topped by a pixelated multi-colour facade band over a recessed grey base.", span: "half" },
      { src: "/assets/projects/ufo-moviez-cinema-complex/g06.jpg", alt: "Corner exterior massing view emphasising the floating coloured-tile volume above a white cantilevered base.", span: "tall" },
    ],
    featured: true,
    order: 9,
    seo: { title: "UFO Moviez Cinema Complex, Architecture", description: "A bold 3-screen cinema complex wrapping a mosaic-coloured facade around dramatic red-lit auditoriums and a lounge-style foyer." },
  },
  {
    slug: "advait-126-136",
    name: "Advait 126 + 136",
    type: "Architecture",
    category: "Residential",
    client: "Advait Builders + Tater Group",
    location: "Kurla, Mumbai",
    city: "Mumbai",
    year: 2024,
    area: "Ground + 17 storeys",
    status: "Under construction",
    scope: ["Architecture", "Landscape and interiors", "Architectural planning and detailing"],
    services: ["Architecture", "Interior"],
    cover: "/assets/projects/advait-126-136/cover.jpg",
    coverAlt: "Twin towers 126 and 136 shown side by side against a bright blue sky, capturing the full development at a glance.",
    narrative: {
      brief: "A pair of Ground+17 residential towers in Mumbai, clad in warm earthy tones with crisp vertical fins and slim balcony lines.",
      site: "Residential commission in Mumbai, India. Under construction (plinth in progress).",
      response: "Advait 126 + 136 is a twin high-rise residential development in Mumbai, designed as two slender Ground+17 towers identified by their \"126\" and \"136\" facade numbering. The 3D renders show a restrained contemporary language: tall vertical fins crowning the buildings, warm beige-and-brown stone-toned cladding, and stacked balconies framed by clean horizontal banding. The project is currently in the construction stage with the plinth in progress, and Madane's scope covers architecture, landscape and interiors including architectural planning and detailing.",
    },
    gallery: [
      { src: "/assets/projects/advait-126-136/g01.jpg", alt: "Street-level render of the 126 tower with its crowning vertical fins, warm cladding and stacked balconies.", span: "full" },
      { src: "/assets/projects/advait-126-136/g02.jpg", alt: "Angled exterior view of the tower set among neighbouring high-rises, showing the slim massing and balcony rhythm.", span: "half" },
    ],
    featured: false,
    order: 10,
    seo: { title: "Advait 126 + 136, Architecture", description: "A pair of Ground+17 residential towers in Mumbai, clad in warm earthy tones with crisp vertical fins and slim balcony lines." },
  },
  {
    slug: "akasa-noida",
    name: "Akasa, Noida",
    type: "Interior",
    category: "Coworking",
    client: "Pooja Fin Lease",
    location: "Noida, Uttar Pradesh",
    city: "Noida",
    year: 2023,
    area: "",
    status: "Mixed, built spaces photographed, some areas shown as design renders",
    scope: ["Corporate office interior fit-out", "Reception lobby", "Cabins", "Meeting/boardrooms", "Open workstations"],
    services: ["Interior", "Turnkey"],
    cover: "/assets/projects/akasa-noida/cover.jpg",
    coverAlt: "Double-height reception lobby render with curved bronze desk, 'Pooja Fin Lease' branding, lounge seating and full-height curtain-wall glazing.",
    narrative: {
      brief: "A corporate office fit-out in Noida for NBFC Pooja Fin Lease, pairing a double-height marble lobby with warm, material-rich boardrooms and bright open workspaces.",
      site: "NBFC commission in Noida, Uttar Pradesh. Mixed, built spaces photographed, some areas shown as design renders.",
      response: "Commercial-interior project for Pooja Fin Lease at Akasa, Noida, spanning a double-height reception lobby, executive cabins, multiple meeting and boardrooms, and open workstation areas. The package combines completed-site photography (marble conference room, timber-and-fabric boardroom, teal and turquoise workstation bays) with photoreal design renders of the branded lobby, green-toned bullpen and grey executive cabin. The palette mixes natural stone, wood veneer, geometric carpet and accent colour to balance a premium client-facing front with functional staff zones.",
    },
    gallery: [
      { src: "/assets/projects/akasa-noida/g01.jpg", alt: "Boardroom render with long black conference table, indoor trees behind glass, fluted drapery and geometric multicolour carpet.", span: "full" },
      { src: "/assets/projects/akasa-noida/g02.jpg", alt: "Executive cabin render in grey tones with sculptural desk, display shelving, planter and abstract artwork over timber flooring.", span: "half" },
      { src: "/assets/projects/akasa-noida/g03.jpg", alt: "Compact discussion room render with round table, tan leather chairs, wood-slat wall, wall-mounted screen and circular ceiling light.", span: "half" },
    ],
    featured: false,
    order: 11,
    seo: { title: "Akasa, Noida, Interior", description: "A corporate office fit-out in Noida for NBFC Pooja Fin Lease, pairing a double-height marble lobby with warm, material-rich boardrooms and bright open work" },
  },
  {
    slug: "arcelormittal-construction-office",
    name: "ArcelorMittal Construction Office",
    type: "Interior",
    category: "Corporate Offices",
    client: "ArcelorMittal Construction",
    location: "L&T Seawoods, Navi Mumbai",
    city: "Navi Mumbai",
    year: 2022,
    area: "9,000 sq.ft.",
    status: "design / render stage",
    scope: ["Commercial interior design and fit-out: reception", "Open-plan workstations", "Private cabins", "Breakout/lounge"],
    services: ["Interior", "Turnkey"],
    cover: "/assets/projects/arcelormittal-construction-office/cover.jpg",
    coverAlt: "Branded reception with timber feature wall, ArcelorMittal Construction signage, grey desk and yellow sofas.",
    narrative: {
      brief: "A high-rise corporate office fit-out for ArcelorMittal Construction, blending warm wood-and-orange branding with an industrial exposed-ceiling palette.",
      site: "Corporate office commission in India. design / render stage.",
      response: "Design renders for an ArcelorMittal Construction corporate office occupying an upper floor of a high-rise tower, with floor-to-ceiling city views throughout. The scheme pairs the brand's red/orange identity with timber paneling, exposed services ceilings, and grey carpet, spanning a branded reception, open workstation bays, private cabins, and an informal breakout lounge with a foosball table and ring pendant lights.",
    },
    gallery: [
      { src: "/assets/projects/arcelormittal-construction-office/g01.jpg", alt: "Open-plan workstation bays with branded screens, a central potted tree and a colourful pixel accent wall.", span: "full" },
      { src: "/assets/projects/arcelormittal-construction-office/g02.jpg", alt: "Breakout lounge with yellow modular seating, ring pendant lights, planters and floor-to-ceiling skyline glazing.", span: "half" },
      { src: "/assets/projects/arcelormittal-construction-office/g03.jpg", alt: "Private corner cabin in blue paneling with two-seat desk, framed warehouse artwork and panoramic city views.", span: "half" },
      { src: "/assets/projects/arcelormittal-construction-office/g04.jpg", alt: "Workstation floor viewed from a breakout zone with foosball table and glazed meeting rooms along the corridor.", span: "wide" },
    ],
    featured: false,
    order: 12,
    seo: { title: "ArcelorMittal Construction Office, Interior", description: "A high-rise corporate office fit-out for ArcelorMittal Construction, blending warm wood-and-orange branding with an industrial exposed-ceiling palette." },
  },
  {
    slug: "ca-office-andheri-west",
    name: "CA Office, Andheri West",
    type: "Interior",
    category: "Corporate Offices",
    client: "Chartered Accountancy Firm (name withheld, \"Company Logo\" placeholder shown)",
    location: "Andheri West, Mumbai",
    city: "Mumbai",
    year: 2021,
    area: "",
    status: "design / 3D visualization",
    scope: ["Commercial interior design and fit-out of a chartered accountant office: reception/lobby", "Open-plan workstation bays", "And meeting/cabin areas."],
    services: ["Interior", "Turnkey"],
    cover: "/assets/projects/ca-office-andheri-west/cover.jpg",
    coverAlt: "Warm reception corridor with green glass conference room, slatted wood wall and framed abstract art.",
    narrative: {
      brief: "A compact Andheri West chartered-accountancy office where typographic feature walls and bold colour accents energise tight, efficient workstation bays.",
      site: "Professional services commission in Andheri West, Mumbai. design / 3D visualization.",
      response: "A set of 3D design renders for a chartered accountant's office in Andheri West, Mumbai. The scheme pairs warm wood-clad reception desks (branded with a placeholder \"Company Logo\") and tinted geometric-etched glass partitions with linear workstation bays accented in green, yellow and black. Playful \"Order of Operations\" and \"Success formula\" typographic murals reinforce the accountancy theme across the workspace.",
    },
    gallery: [
      { src: "/assets/projects/ca-office-andheri-west/g01.jpg", alt: "Bright workstation room framed by green glass, with a 'Success formula' typographic feature wall.", span: "full" },
      { src: "/assets/projects/ca-office-andheri-west/g02.jpg", alt: "Dramatic dark lobby with bright blue sofa, blue-yellow pendant and wood logo reception wall.", span: "half" },
      { src: "/assets/projects/ca-office-andheri-west/g03.jpg", alt: "Reception with white bench seating, geometric-etched glass and wood logo wall under a blue-yellow pendant.", span: "half" },
      { src: "/assets/projects/ca-office-andheri-west/g04.jpg", alt: "Workstation bay with yellow accent panel and bold 'Order of Operations' graphic banner.", span: "wide" },
      { src: "/assets/projects/ca-office-andheri-west/g05.jpg", alt: "Narrow workstation bay with green accent splashbacks and monochrome typographic mural wall.", span: "half" },
      { src: "/assets/projects/ca-office-andheri-west/g06.jpg", alt: "Black-and-white 'Order of Operations' banners over yellow-backed desks in a compact work bay.", span: "tall" },
      { src: "/assets/projects/ca-office-andheri-west/g07.jpg", alt: "Reception view with stone desk, etched-glass partitions and a small meeting table beyond.", span: "half" },
      { src: "/assets/projects/ca-office-andheri-west/g08.jpg", alt: "Workstation room seen through glass partition, with typographic banners and a cabin doorway beyond.", span: "wide" },
    ],
    featured: false,
    order: 13,
    seo: { title: "CA Office, Andheri West, Interior", description: "A compact Andheri West chartered-accountancy office where typographic feature walls and bold colour accents energise tight, efficient workstation bays." },
  },
  {
    slug: "ceat",
    name: "CEAT",
    type: "Architecture",
    category: "Industrial",
    client: "CEAT",
    location: "Ambarnath, Maharashtra",
    city: "Ambarnath",
    year: 2020,
    area: "50,000 sq.ft.",
    status: "Under construction",
    scope: ["Architecture"],
    services: ["Architecture"],
    cover: "/assets/projects/ceat/cover.jpg",
    coverAlt: "Front elevation render of the CEAT facility with the branded white volume meeting a glazed office block, framed by palms.",
    gridCover: "/assets/projects/ceat/cover.png",
    narrative: {
      brief: "A clean, low-slung industrial facility for CEAT pairing a solid branded volume with a glazed office block.",
      site: "Industrial commission in Ambernath, Mumbai. Under construction.",
      response: "Architectural design for a CEAT industrial facility in Ambernath, Mumbai, comprising a Ground + 1 structure housing machinery and offices. The renders show a minimal white volume carrying the CEAT branding, set against a fully glazed two-storey office wing with an external steel stair. The scheme is currently under construction.",
    },
    gallery: [
      { src: "/assets/projects/ceat/g01.jpg", alt: "Three-quarter view of the glazed two-storey office wing with external steel staircase and CEAT signage on the side wall.", span: "full" },
      { src: "/assets/projects/ceat/g02.jpg", alt: "Corner render showing the long white industrial volume with ribbon glazing wrapping to the branded glazed entrance.", span: "half" },
    ],
    featured: false,
    order: 14,
    seo: { title: "CEAT, Architecture", description: "A clean, low-slung industrial facility for CEAT pairing a solid branded volume with a glazed office block." },
  },
  {
    slug: "eatigo-office",
    name: "eatigo Office",
    type: "Interior",
    category: "Corporate Offices",
    client: "eatigo",
    location: "Hubtown, Andheri, Mumbai",
    city: "Mumbai",
    year: 2019,
    area: "",
    status: "Design / Concept (3D renders)",
    scope: ["Commercial interior design and workplace fit-out: open-plan workstations", "Meeting cabins", "Branded reception wall", "And breakout/cafeteria zones"],
    services: ["Interior", "Turnkey"],
    cover: "/assets/projects/eatigo-office/cover.jpg",
    coverAlt: "Sunlit eye-level view of workstations beside the red eatigo brick wall",
    gridCover: "/assets/projects/eatigo-office/cover.png",
    narrative: {
      brief: "A bright, open-plan office fit-out for tech brand eatigo, anchored by a red-on-white-brick logo wall and rows of warm-wood workstations.",
      site: "IT commission. Design / Concept (3D renders).",
      response: "A set of 3D visualisations for the eatigo workplace interior, showing an open-plan floor of bench-style wooden workstations with orange acoustic screens, glass-partitioned meeting cabins, and a casual breakout area with bean bags, bar stools and a whiteboard. The scheme centres on a white exposed-brick feature wall carrying the eatigo logo in red, paired with blue/orange accent panels and warm timber flooring. All assets are concept renders, including several aerial cutaway floor plans of the full layout.",
    },
    gallery: [
      { src: "/assets/projects/eatigo-office/g01.jpg", alt: "Aerial perspective focused on the eatigo brand wall and desk clusters", span: "full" },
      { src: "/assets/projects/eatigo-office/g02.jpg", alt: "Frontal eye-level view of workstations against the eatigo logo wall", span: "half" },
      { src: "/assets/projects/eatigo-office/g03.jpg", alt: "Interior view of bench workstations with laptops and mesh task chairs", span: "half" },
      { src: "/assets/projects/eatigo-office/g04.jpg", alt: "Breakout zone with bar stools, bean bags, whiteboard and high tables", span: "wide" },
      { src: "/assets/projects/eatigo-office/g05.jpg", alt: "Top-down cutaway render of the workstation floor and meeting cabins", span: "half" },
      { src: "/assets/projects/eatigo-office/g06.jpg", alt: "Aerial cutaway showing bench desks, breakout seating and cafeteria zone", span: "tall" },
      { src: "/assets/projects/eatigo-office/g07.jpg", alt: "Angled aerial cutaway of the full office layout with workstation rows", span: "half" },
      { src: "/assets/projects/eatigo-office/g08.jpg", alt: "Perspective cutaway of open-plan desks and a blue-walled meeting room", span: "wide" },
      { src: "/assets/projects/eatigo-office/g09.jpg", alt: "Angled aerial render highlighting workstation clusters and cabins", span: "full" },
      { src: "/assets/projects/eatigo-office/g10.jpg", alt: "Distant top-down render of the floor plan, sparsely furnished", span: "full" },
    ],
    featured: false,
    order: 15,
    seo: { title: "eatigo Office, Interior", description: "A bright, open-plan office fit-out for tech brand eatigo, anchored by a red-on-white-brick logo wall and rows of warm-wood workstations." },
  },
  {
    slug: "evos-sales-office",
    name: "Evos Sales Office",
    type: "Interior",
    category: "Corporate Offices",
    client: "Evos",
    location: "India",
    city: "India",
    year: 2018,
    area: "",
    status: "Design / Visualization (3D renders)",
    scope: ["Interior design for a real-estate sales / experience office", "Including reception", "Waiting lounge", "Model-display area", "Cabins"],
    services: ["Interior"],
    cover: "/assets/projects/evos-sales-office/cover.jpg",
    coverAlt: "Curved marble reception desk framed by fluted stone wall panels and the backlit evos logo, with a circular marble floor inlay.",
    gridCover: "/assets/projects/evos-sales-office/cover.png",
    narrative: {
      brief: "A sculptural, fluted-stone sales office for the Evos brand, organised around a sweeping reception and a central architectural model display.",
      site: "Real estate commission. Design / Visualization (3D renders).",
      response: "A real-estate sales and experience office designed for the Evos brand, presented as a set of polished 3D renders plus a fully annotated floor plan. The space is defined by undulating, ribbed stone-textured wall panels, marble flooring with inlaid circular patterns, and a wood-slat ceiling, with sculptural copper-line pendant fixtures as a recurring motif. Spaces include a curved reception desk under the backlit \"evos\" logo, a model-display table with a bonsai water feature, a lounge with green accent chairs opening to a garden, and a glazed meeting room.",
    },
    gallery: [
      { src: "/assets/projects/evos-sales-office/g01.jpg", alt: "Open lounge with green accent chairs and curved sofas around the model-display feature, sculptural pendants overhead and garden views beyond.", span: "full" },
      { src: "/assets/projects/evos-sales-office/g02.jpg", alt: "Glazed meeting room with timber table and green chairs, viewed between undulating fluted-stone columns over marble flooring.", span: "half" },
      { src: "/assets/projects/evos-sales-office/g03.jpg", alt: "Annotated furniture floor plan showing reception, model stable, waiting lounge, cabins, meeting and conference rooms, plus a residential wing.", span: "half" },
    ],
    featured: false,
    order: 16,
    seo: { title: "Evos Sales Office, Interior", description: "A sculptural, fluted-stone sales office for the Evos brand, organised around a sweeping reception and a central architectural model display." },
  },
  {
    slug: "fedbank-financial-services-kanakia-wallstreet",
    name: "Fedbank Financial Services, Kanakia Wallstreet",
    type: "Interior",
    category: "Banking & Finance",
    client: "Fedbank Financial Services Limited (Federal Bank group)",
    location: "Kanakia Wallstreet, Mumbai",
    city: "Mumbai",
    year: 2017,
    area: "30,000 sq.ft.",
    status: "Design / visualization stage",
    scope: ["Corporate office interior fit-out", "Reception", "Cabins", "Meeting rooms and gallery passage"],
    services: ["Interior", "Turnkey"],
    cover: "/assets/projects/fedbank-financial-services-kanakia-wallstreet/cover.jpg",
    coverAlt: "Reception with a lush green living wall and backlit FEDBANK signage above a sculpted white desk.",
    gridCover: "/assets/projects/fedbank-financial-services-kanakia-wallstreet/cover.png",
    narrative: {
      brief: "A polished corporate banking office for Fedbank at Kanakia Wallstreet, blending a living-wall reception with refined dark-and-timber meeting suites.",
      site: "Banking commission in Kanakia Wallstreet, Andheri, Mumbai. Design / visualization stage.",
      response: "A set of 3D visualizations for Fedbank Financial Services Limited's office interiors at Kanakia Wallstreet, Mumbai. The design pairs a green living-wall reception carrying backlit FEDBANK branding with a series of neutral and timber-clad meeting rooms, a private cabin, and a dramatic black-panelled gallery passage lined with framed heritage Bombay artwork. The palette leans on warm wood, charcoal, soft greys and accents of teal and ochre for a calm, premium banking environment.",
    },
    gallery: [
      { src: "/assets/projects/fedbank-financial-services-kanakia-wallstreet/g01.jpg", alt: "Dramatic black-panelled gallery passage lined with framed heritage Bombay prints and a glossy stone floor.", span: "full" },
      { src: "/assets/projects/fedbank-financial-services-kanakia-wallstreet/g02.jpg", alt: "Manager's cabin with timber feature wall, L-shaped desk and a teal tub-chair discussion nook.", span: "half" },
      { src: "/assets/projects/fedbank-financial-services-kanakia-wallstreet/g03.jpg", alt: "Meeting room with warm timber-top table, fabric-panel walls and projection screen.", span: "half" },
      { src: "/assets/projects/fedbank-financial-services-kanakia-wallstreet/g04.jpg", alt: "Boardroom with dark stone table, neutral panelled walls and pull-down projection screen.", span: "wide" },
      { src: "/assets/projects/fedbank-financial-services-kanakia-wallstreet/g05.jpg", alt: "Conference room with playful coloured acoustic-tile feature wall and white meeting table.", span: "half" },
    ],
    featured: false,
    order: 17,
    seo: { title: "Fedbank Financial Services, Kanakia Wallstreet, Interior", description: "A polished corporate banking office for Fedbank at Kanakia Wallstreet, blending a living-wall reception with refined dark-and-timber meeting suites." },
  },
  {
    slug: "fox-mandal-the-capital",
    name: "Fox Mandal, The Capital",
    type: "Interior",
    category: "Corporate Offices",
    client: "Fox Mandal Solicitors & Advocates",
    location: "The Capital, BKC, Mumbai",
    city: "Mumbai",
    year: 2025,
    area: "",
    status: "Design / visualization (3D renders)",
    scope: ["Commercial office interior fit-out", "Reception", "Open-plan workstations", "Conference/meeting rooms and washrooms"],
    services: ["Interior", "Turnkey"],
    cover: "/assets/projects/fox-mandal-the-capital/cover.jpg",
    coverAlt: "Reception with grey marble feature wall, Fox Mandal Solicitors & Advocates signage and FM monogram.",
    gridCover: "/assets/projects/fox-mandal-the-capital/cover.png",
    narrative: {
      brief: "A restrained, marble-and-walnut office fit-out for law firm Fox Mandal Solicitors & Advocates at The Capital.",
      site: "Legal commission in The Capital. Design / visualization (3D renders).",
      response: "Interior design visualization for the Fox Mandal Solicitors & Advocates office at The Capital, presented as a set of 3D renders. The scheme pairs a grey marble reception feature wall carrying the firm's \"FM\" monogram with walnut-veneer overhead storage, white worktop desks and grey carpet tiles across open-plan workstation bays. Supporting spaces include glazed conference and meeting rooms and travertine-and-marble washrooms.",
    },
    gallery: [
      { src: "/assets/projects/fox-mandal-the-capital/g01.jpg", alt: "Reception desk and FM marble wall with accreditation frames and warm cove lighting.", span: "full" },
      { src: "/assets/projects/fox-mandal-the-capital/g02.jpg", alt: "Long axial view down a row of workstations framed by walnut storage and grey carpet tiles.", span: "half" },
      { src: "/assets/projects/fox-mandal-the-capital/g03.jpg", alt: "Boardroom with long white table, grey upholstered chairs, cove lighting and wall display.", span: "half" },
      { src: "/assets/projects/fox-mandal-the-capital/g04.jpg", alt: "Open-plan workstation bay with white desks, mesh task chairs and walnut overhead storage.", span: "wide" },
      { src: "/assets/projects/fox-mandal-the-capital/g05.jpg", alt: "Travertine-tiled washroom with marble vanity, wall-hung urinal and dark stone floor.", span: "half" },
      { src: "/assets/projects/fox-mandal-the-capital/g06.jpg", alt: "Washroom with glass shower, wall-hung WC, vessel basin and travertine walls.", span: "tall" },
    ],
    featured: false,
    order: 18,
    seo: { title: "Fox Mandal, The Capital, Interior", description: "A restrained, marble-and-walnut office fit-out for law firm Fox Mandal Solicitors & Advocates at The Capital." },
  },
  {
    slug: "indiana-business",
    name: "Indiana Business",
    type: "Interior",
    category: "Corporate Offices",
    client: "Indiana Business",
    location: "India",
    city: "India",
    year: 2024,
    area: "",
    status: "Concept / design visualization",
    scope: ["Commercial office interior design"],
    services: ["Interior"],
    cover: "/assets/projects/indiana-business/cover.jpg",
    coverAlt: "Long open-plan workstation bay with rows of iMac desks, mesh task chairs, and suspended green light troughs beneath an exposed services ceiling.",
    gridCover: "/assets/projects/indiana-business/cover.png",
    narrative: {
      brief: "A bright, green-accented open-plan office where exposed-services ceilings meet rows of long-bench workstations.",
      site: "IT commission. Concept / design visualization.",
      response: "Two interior renders of the Indiana Business open office, showing a long, daylit floor plate lined with linear desking and ergonomic task chairs under an exposed concrete ceiling with painted services. The scheme runs a crisp green-grey-white palette, with green portal frames, suspended green light troughs, and a graphic wall mural that lends the corporate workspace a clean, energetic identity.",
    },
    gallery: [
      { src: "/assets/projects/indiana-business/g01.jpg", alt: "Circulation spine alongside the open office, featuring a white-and-grey storage credenza, a green figural wall mural, and green portal-framed openings.", span: "full" },
    ],
    featured: false,
    order: 19,
    seo: { title: "Indiana Business, Interior", description: "A bright, green-accented open-plan office where exposed-services ceilings meet rows of long-bench workstations." },
  },
  {
    slug: "jagasara-duplex",
    name: "Jagasara Duplex",
    type: "Architecture",
    category: "Villas",
    client: "Jagasara Duplex Row Houses",
    location: "Odisha",
    city: "Odisha",
    year: 2023,
    area: "3,000 sq.ft.",
    status: "Under construction",
    scope: ["Architecture", "Interiors and landscape", "Design and execution"],
    services: ["Architecture", "Interior"],
    cover: "/assets/projects/jagasara-duplex/cover.jpg",
    coverAlt: "Street-level render of the full row of duplex houses showing the repeating louvered facade, planted balconies and boundary walls with a parked car.",
    gridCover: "/assets/projects/jagasara-duplex/cover.png",
    narrative: {
      brief: "A row of contemporary duplex houses in Odisha defined by vertical louvered screens, cantilevered volumes and terraced greenery.",
      site: "Residential commission in Odisha, India. Ongoing.",
      response: "Jagasara is an ongoing residential development of duplex row houses in Odisha, with Madane handling architecture, interiors and landscape as a single design-and-execution mandate over roughly 5,000 sq.ft. The rendered design language pairs warm taupe and beige massing with tall vertical fins and slatted screens, planted balconies, and a stacked play of solid and recessed volumes. Floor plans reveal a ground-level portico, drawing and kitchen, first-floor bedrooms with a puja room, and a terrace level featuring a jacuzzi, viewing deck and seating corner.",
    },
    gallery: [
      { src: "/assets/projects/jagasara-duplex/g01.jpg", alt: "Perspective render down the row of duplexes with deep balcony planters and stepped louvered bays receding along the street.", span: "full" },
      { src: "/assets/projects/jagasara-duplex/g02.jpg", alt: "Corner three-quarter render of an end unit emphasising the massing of solid taupe blocks against slatted screens and cascading greenery.", span: "half" },
      { src: "/assets/projects/jagasara-duplex/g03.jpg", alt: "Frontal render of a single duplex unit framed by trees, highlighting the vertical fin screens, cantilevered top volume and green balcony planters.", span: "half" },
      { src: "/assets/projects/jagasara-duplex/g04.jpg", alt: "Massing development diagram showing the progression from solid block to carved voids, inserted volumes and final louvered facade.", span: "wide" },
    ],
    featured: false,
    order: 20,
    seo: { title: "Jagasara Duplex, Architecture", description: "A row of contemporary duplex houses in Odisha defined by vertical louvered screens, cantilevered volumes and terraced greenery." },
  },
  {
    slug: "omkar-techinvention",
    name: "Omkar Techinvention",
    type: "Interior",
    category: "Corporate Offices",
    client: "Omkar Techinvention",
    location: "India",
    city: "India",
    year: 2022,
    area: "",
    status: "Design / Render",
    scope: ["Commercial office interior design"],
    services: ["Interior"],
    cover: "/assets/projects/omkar-techinvention/cover.jpg",
    coverAlt: "Pantry and coffee-bar lounge with green-accented stools, suspended pendant planters and a panoramic night-time city view.",
    gridCover: "/assets/projects/omkar-techinvention/cover.png",
    narrative: {
      brief: "A high-rise corporate office interior pairing a motivational glass-walled meeting room with a vibrant city-view coffee bar.",
      site: "IT commission. Design / Render.",
      response: "Design renders for the Omkar Techinvention office, a contemporary corporate workplace set high above a city skyline. The scheme features a glass-partitioned meeting room with a typographic \"Creative Teamwork Innovate\" feature wall, and a bright pantry-cafe zone with green-accented furniture, pendant lighting and panoramic glazing. The palette mixes monochrome carpeting and ceilings with lime-green highlights and natural-wood seating.",
    },
    gallery: [
      { src: "/assets/projects/omkar-techinvention/g01.jpg", alt: "Glass-walled meeting room with a typographic 'Creative Teamwork Innovate' feature wall and black executive chairs.", span: "full" },
    ],
    featured: false,
    order: 21,
    seo: { title: "Omkar Techinvention, Interior", description: "A high-rise corporate office interior pairing a motivational glass-walled meeting room with a vibrant city-view coffee bar." },
  },
  {
    slug: "reynaers-aluminium-office-5th-floor-oberoi-garden",
    name: "Reynaers Aluminium Office, 5th Floor, Oberoi Garden",
    type: "Interior",
    category: "Corporate Offices",
    client: "Reynaers Aluminium",
    location: "Oberoi Garden City, Mumbai",
    city: "Mumbai",
    year: 2021,
    area: "",
    status: "Design visualization (3D renders)",
    scope: ["Commercial interior fit-out and design", "Reception", "Open-plan workstations", "Breakout/collaboration zones", "Glazed meeting rooms"],
    services: ["Interior", "Turnkey"],
    cover: "/assets/projects/reynaers-aluminium-office-5th-floor-oberoi-garden/cover.jpg",
    coverAlt: "Reception lounge with curved white desk and the branded REYNAERS aluminium frosted-glass screen, video wall and waiting seating.",
    narrative: {
      brief: "A bright, glass-and-aluminium corporate office for Reynaers on the 5th floor at Oberoi Garden, branded around the company's signature blue.",
      site: "Corporate office commission in Oberoi Garden, Mumbai. Design visualization (3D renders).",
      response: "A full commercial interior design for Reynaers Aluminium occupying the 5th floor of Oberoi Garden. The scheme pairs a high-gloss white floor and grey-brick feature walls with the brand's signature blue accents, most visibly in the frosted-glass reception screen carrying the REYNAERS aluminium logo, the blue-framed glazing display, and graphic \"MEETING 01/02\" glass partitions. Spaces shown include the reception lounge, open-plan workstations, padded breakout pods, and enclosed boardrooms, all presented as polished 3D visualizations.",
    },
    gallery: [
      { src: "/assets/projects/reynaers-aluminium-office-5th-floor-oberoi-garden/g01.jpg", alt: "Wide reception view linking the branded desk, glass meeting room and waiting lounge in one bright open volume.", span: "full" },
      { src: "/assets/projects/reynaers-aluminium-office-5th-floor-oberoi-garden/g02.jpg", alt: "Glazed display vitrines framed in brand-blue showcasing aluminium window systems along a bright corridor.", span: "half" },
      { src: "/assets/projects/reynaers-aluminium-office-5th-floor-oberoi-garden/g03.jpg", alt: "Open-plan workstations with blue-accented desks, timber-slat wall and linear ceiling lighting.", span: "half" },
      { src: "/assets/projects/reynaers-aluminium-office-5th-floor-oberoi-garden/g04.jpg", alt: "Breakout/collaboration zone with upholstered high-back pods and pendant drum lights beside the open workspace.", span: "wide" },
      { src: "/assets/projects/reynaers-aluminium-office-5th-floor-oberoi-garden/g05.jpg", alt: "Glazed boardrooms with bold 'MEETING 01 / 02' graphic film on the partition glass.", span: "half" },
    ],
    featured: false,
    order: 22,
    seo: { title: "Reynaers Aluminium Office, 5th Floor, Oberoi Garden, Interior", description: "A bright, glass-and-aluminium corporate office for Reynaers on the 5th floor at Oberoi Garden, branded around the company's signature blue." },
  },
  {
    slug: "reynaers-office",
    name: "Reynaers Office",
    type: "Interior",
    category: "Corporate Offices",
    client: "Reynaers Aluminium",
    location: "Boomerang, Chandivali, Mumbai",
    city: "Mumbai",
    year: 2020,
    area: "",
    status: "Design / visualization stage",
    scope: ["Commercial interior design and fit-out of a corporate office: reception", "Open-plan workstations", "Meeting rooms", "Breakout/lounge zones"],
    services: ["Interior", "Turnkey"],
    cover: "/assets/projects/reynaers-office/cover.jpg",
    coverAlt: "Reception with backlit desk, concrete pendant, project video-wall and the etched Reynaers R logo on the glass partition.",
    narrative: {
      brief: "A sleek corporate office fit-out for aluminium-systems brand Reynaers, blending a backlit reception, glass-walled meeting rooms and a green-accented open-plan floor on a curved \"boomerang\" plate.",
      site: "Corporate office commission. Design / visualization stage.",
      response: "A set of polished 3D visualizations for a Reynaers corporate office, identifiable by the brand \"R\" mark etched on the reception glass partition. The scheme pairs a crisp white-and-grey palette with warm timber accents, signature red linear-light reflections across exposed ceilings, and planted timber benches that bring greenery into the open-plan workstation areas. Key zones include a backlit reception with video-wall, multiple glass-enclosed meeting rooms with light-timber boardroom tables, and informal breakout pods. The bird's-eye render reveals the building's distinctive curved, boomerang-shaped floor plate.",
    },
    gallery: [
      { src: "/assets/projects/reynaers-office/g01.jpg", alt: "Open-plan floor framed by black folding glass partitions, leading to workstations and a meeting room with greenery.", span: "full" },
      { src: "/assets/projects/reynaers-office/g02.jpg", alt: "Boardroom with timber conference table, white leather chairs, recessed cove lighting and a blue back-painted glass feature.", span: "half" },
      { src: "/assets/projects/reynaers-office/g03.jpg", alt: "Open-plan office with planted timber bench, white desks and warm wood storage wall against floor-to-ceiling glazing.", span: "half" },
      { src: "/assets/projects/reynaers-office/g04.jpg", alt: "Cutaway bird's-eye render of the full office plan on its curved boomerang-shaped floor plate, showing reception, workstations and meeting zones.", span: "wide" },
      { src: "/assets/projects/reynaers-office/g05.jpg", alt: "Glass-walled breakout pod with timber-and-orange bench seating amid dark-framed glazed partitions and red ceiling accents.", span: "half" },
      { src: "/assets/projects/reynaers-office/g06.jpg", alt: "Open-plan workstation bays with white benching desks, iMacs and potted trees under red-accented linear lighting.", span: "tall" },
      { src: "/assets/projects/reynaers-office/g07.jpg", alt: "Glass-enclosed boardroom seen through partitions, with light-timber table, white Eames-style chairs and wall display.", span: "half" },
      { src: "/assets/projects/reynaers-office/g08.jpg", alt: "Bright reception lounge with curved white desk, lounge seating and a glazed meeting room beyond; Reynaers logo on glass.", span: "wide" },
      { src: "/assets/projects/reynaers-office/g09.jpg", alt: "Workstation zone with planted timber benches, white desks and warm wood accent wall under red linear lighting.", span: "full" },
    ],
    featured: false,
    order: 23,
    seo: { title: "Reynaers Office, Interior", description: "A sleek corporate office fit-out for aluminium-systems brand Reynaers, blending a backlit reception, glass-walled meeting rooms and a green-accented open-p" },
  },
  {
    slug: "semac-office-l-and-t-seawoods",
    name: "SEMAC Office, L&T Seawoods",
    type: "Interior",
    category: "Corporate Offices",
    client: "Semac Consultants Pvt. Ltd.",
    location: "L&T Seawoods Grand Central, Navi Mumbai",
    city: "Navi Mumbai",
    year: 2019,
    area: "",
    status: "design / render stage",
    scope: ["Commercial interior fit-out", "Reception", "Open-plan workstations", "Meeting room", "Breakout and biophilic zones"],
    services: ["Interior", "Turnkey"],
    cover: "/assets/projects/semac-office-l-and-t-seawoods/cover.jpg",
    coverAlt: "SEMAC reception with a sculptural white curved desk, arched wood portals, sacred statuary and green lounge seating over terrazzo flooring.",
    narrative: {
      brief: "A warm, biophilic corporate office for SEMAC at L&T Seawoods, defined by sculptural arched wood portals, Indian mythological murals and lush greenery.",
      site: "Engineering consultancy / corporate office commission in L&T Seawoods Grand Central, Navi Mumbai. design / render stage.",
      response: "A set of 3D design renders for SEMAC's office interior at L&T Seawoods, Navi Mumbai. The scheme pairs a curved sculptural reception desk (branded SEMAC) with arched wood-veneer portals, terrazzo-patterned flooring, abundant indoor planting, and Indian mythological wall art and textual murals. Open-plan workstation clusters, a glass-enclosed conference room, and green-upholstered lounge seating round out a warm, culturally-rooted corporate environment.",
    },
    gallery: [
      { src: "/assets/projects/semac-office-l-and-t-seawoods/g01.jpg", alt: "Wide open-office view with bench desking, illuminated arch niche, biophilic greenery and a patterned terrazzo runner.", span: "full" },
      { src: "/assets/projects/semac-office-l-and-t-seawoods/g02.jpg", alt: "Workstation cluster with a dramatic mythological archer mural, arched wood passage and lush indoor trees.", span: "half" },
      { src: "/assets/projects/semac-office-l-and-t-seawoods/g03.jpg", alt: "View from reception into the open-plan workstation bay, framed by arched wood portals, planting and green lounge chairs.", span: "half" },
      { src: "/assets/projects/semac-office-l-and-t-seawoods/g04.jpg", alt: "Glass-walled conference room with a long white table, leather chairs, wall display and stained-glass-style art panels.", span: "wide" },
      { src: "/assets/projects/semac-office-l-and-t-seawoods/g05.jpg", alt: "Workstation desks beside a botanical chinoiserie feature wall and textured stone surface, with arched wood portal beyond.", span: "half" },
    ],
    featured: false,
    order: 24,
    seo: { title: "SEMAC Office, L&T Seawoods, Interior", description: "A warm, biophilic corporate office for SEMAC at L&T Seawoods, defined by sculptural arched wood portals, Indian mythological murals and lush greenery." },
  },
  {
    slug: "sus-residential-development",
    name: "Sus Residential Development",
    type: "Architecture",
    category: "Residential",
    client: "Sus, Pune",
    location: "Sus, Pune",
    city: "Pune",
    year: 2018,
    area: "G+13 residential towers",
    status: "Design stage",
    scope: ["Architecture and landscape design"],
    services: ["Architecture"],
    cover: "/assets/projects/sus-residential-development/cover.jpg",
    coverAlt: "Aerial view of the U-shaped tower cluster framing a landscaped podium courtyard with pool and palm rows.",
    narrative: {
      brief: "A G+13 residential township in Sus, Pune, wrapping landscaped courtyards and a pool deck within a crisp white modernist tower cluster.",
      site: "Residential commission in Sus, Pune, India. Design stage.",
      response: "A large-scale residential development in Sus, Pune, comprising multiple G+13 towers with clean white facades and a regular grid of recessed balconies. The renders showcase a generous central courtyard with palm-lined walkways, circular tree planters with seating, and a swimming pool atop a podium. The project is at the design stage, with architecture and landscape both within the studio's scope.",
    },
    gallery: [
      { src: "/assets/projects/sus-residential-development/g01.jpg", alt: "Street-level elevation of the white G+13 towers with rhythmic balconies above a landscaped green frontage.", span: "full" },
      { src: "/assets/projects/sus-residential-development/g02.jpg", alt: "Tower base and amphitheatre-style landscaped deck lined with date palms and a pool edge.", span: "half" },
      { src: "/assets/projects/sus-residential-development/g03.jpg", alt: "Ground-level courtyard render with circular tree planters and seating, residents relaxing beneath shade trees.", span: "half" },
    ],
    featured: false,
    order: 25,
    seo: { title: "Sus Residential Development, Architecture", description: "A G+13 residential township in Sus, Pune, wrapping landscaped courtyards and a pool deck within a crisp white modernist tower cluster." },
  },
  {
    slug: "swastik-group-residential-towers",
    name: "Swastik Group Residential Towers",
    type: "Architecture",
    category: "Residential",
    client: "Swastik Group",
    location: "Mumbai, Maharashtra (Mulund / Pantnagar, along the Eastern Express Highway)",
    city: "Mumbai",
    year: 2017,
    area: "Swastik Platinum terrace carpet area approx. 4,130 sq.ft (per terrace plan); full project areas not specified",
    status: "design / render stage (proposed)",
    scope: ["Architecture and amenity / terrace landscape design across multiple residential towers (Swastik Platinum", "Pearl", "Divine and Pantnagar)"],
    services: ["Architecture"],
    cover: "/assets/projects/swastik-group-residential-towers/cover.jpg",
    coverAlt: "Hero daytime render of the full Swastik Platinum tower with a textured grille facade and planted podium.",
    narrative: {
      brief: "A family of high-rise residential towers for the Swastik Group, lifting landscaped play decks, infinity pools and sky lounges onto the Mumbai skyline.",
      site: "Residential commission in Mumbai, Maharashtra (Mulund / Pantnagar, along the Eastern Express Highway). design / render stage (proposed).",
      response: "This folder collects architecture and amenity-deck design work for several Swastik Group residential high-rises in Mumbai - Swastik Platinum, Pearl, Divine (Mulund) and Pantnagar - sited along the Eastern Express Highway. The renders show tall, slender towers with grilled facades and a planted entrance canopy, paired with elevated terrace amenities including an infinity pool, a colourful children's play deck, a turfed cricket / jogging track and shaded outdoor dining lounges. A large supporting set of colour terrace and amenity-floor plans documents the layout of these rooftop recreation decks (one noted at ~4,130 sq.ft).",
    },
    gallery: [
      { src: "/assets/projects/swastik-group-residential-towers/g01.jpg", alt: "Elevated infinity pool deck with timber flooring, loungers and open skyline views at dusk.", span: "full" },
      { src: "/assets/projects/swastik-group-residential-towers/g02.jpg", alt: "Street-level render of the Platinum tower base with a planted entrance canopy and concentric-motif entry portal.", span: "half" },
      { src: "/assets/projects/swastik-group-residential-towers/g03.jpg", alt: "Detailed Pantnagar terrace plan with jogging track, slides, trampoline, swings and elders' night-gazing seating.", span: "half" },
      { src: "/assets/projects/swastik-group-residential-towers/g04.jpg", alt: "Apartment balcony with timber ceiling, vertical garden and lounge seating overlooking the highway and open landscape.", span: "wide" },
      { src: "/assets/projects/swastik-group-residential-towers/g05.jpg", alt: "Dusk render of the tower's lit balconies and a screened sky-deck crown above a green setting.", span: "half" },
      { src: "/assets/projects/swastik-group-residential-towers/g06.jpg", alt: "Rooftop children's play deck with pastel disc canopies, sculpted mounds and a sunset skyline backdrop.", span: "tall" },
      { src: "/assets/projects/swastik-group-residential-towers/g07.jpg", alt: "Aerial view of the tower complex set within landscaped grounds and surrounding greenery.", span: "half" },
      { src: "/assets/projects/swastik-group-residential-towers/g08.jpg", alt: "Indoor multipurpose sports corridor with turf cricket pitch, net enclosure and slatted wall detailing.", span: "wide" },
      { src: "/assets/projects/swastik-group-residential-towers/g09.jpg", alt: "Landscaped terrace dining lounge with sculptural light columns, mature trees and curved walking paths.", span: "full" },
    ],
    featured: false,
    order: 26,
    seo: { title: "Swastik Group Residential Towers, Architecture", description: "A family of high-rise residential towers for the Swastik Group, lifting landscaped play decks, infinity pools and sky lounges onto the Mumbai skyline." },
  },
  {
    slug: "tata-elxsi",
    name: "Tata Elxsi",
    type: "Architecture",
    category: "Commercial",
    client: "Tata Elxsi",
    location: "Bangalore, Karnataka",
    city: "Bangalore",
    year: 2025,
    area: "18 floors",
    status: "Proposed",
    scope: ["Architectural planning and detailing"],
    services: ["Architecture"],
    cover: "/assets/projects/tata-elxsi/cover.jpg",
    coverAlt: "Frontal street-level render of the office tower, glazed fin facade cantilevered over a palm-lined drop-off and entrance.",
    narrative: {
      brief: "An 18-storey commercial office tower in Bangalore, capped by a dramatic cantilevered glass-and-fin upper volume floating over a screened podium.",
      site: "IT / commercial development commission in Bangalore, India. Design stage.",
      response: "A design-stage commercial development for Tata Elxsi in Bangalore comprising an 18-floor office building. The architecture pairs a fritted vertical-fin curtain-wall upper block, cantilevered over a louvered podium with a landscaped forecourt and palm-lined drop-off. Supporting diagrams work through site massing, circulation, green-space planning, and a sectional study showing two basement levels and a refuge floor.",
    },
    gallery: [
      { src: "/assets/projects/tata-elxsi/g01.jpg", alt: "Side elevation render emphasizing the floating upper glass volume over the ribbed podium and screened ground floor.", span: "full" },
      { src: "/assets/projects/tata-elxsi/g02.jpg", alt: "Three-quarter dusk render of the cantilevered tower with vertical fins, set among low neighbouring blocks and landscaping.", span: "half" },
      { src: "/assets/projects/tata-elxsi/g03.jpg", alt: "Building section through the tower showing two basement levels and a labelled refuge floor against the streetscape.", span: "half" },
      { src: "/assets/projects/tata-elxsi/g04.jpg", alt: "Site programming diagram with icons for greenery, pedestrian access and office use over the plot footprint.", span: "wide" },
      { src: "/assets/projects/tata-elxsi/g05.jpg", alt: "Massing build-up diagram showing the twin floored volumes rising with a green roof terrace and view orientation.", span: "half" },
      { src: "/assets/projects/tata-elxsi/g06.jpg", alt: "Early massing study of two solid blocks on the site with the landscaped strip and access road.", span: "tall" },
      { src: "/assets/projects/tata-elxsi/g07.jpg", alt: "Vehicular circulation diagram tracing the entry/exit loop around the building footprint.", span: "half" },
    ],
    featured: false,
    order: 27,
    seo: { title: "Tata Elxsi, Architecture", description: "An 18-storey commercial office tower in Bangalore, capped by a dramatic cantilevered glass-and-fin upper volume floating over a screened podium." },
  },
  {
    slug: "ve-commercial-vehicles-volvo-eicher-office",
    name: "VE Commercial Vehicles (Volvo Eicher) Office",
    type: "Interior",
    category: "Corporate Offices",
    client: "VE Commercial Vehicles (VECV)",
    location: "India",
    city: "India",
    year: 2024,
    area: "",
    status: "Design visualization (3D renders)",
    scope: ["Commercial interior fit-out", "Reception", "Open-plan workstations", "Cabins and meeting rooms"],
    services: ["Interior", "Turnkey"],
    cover: "/assets/projects/ve-commercial-vehicles-volvo-eicher-office/cover.jpg",
    coverAlt: "Open-plan workfloor with linear pendant lighting, exposed services ceiling, green living wall and panoramic city-view glazing.",
    gridCover: "/assets/projects/ve-commercial-vehicles-volvo-eicher-office/cover.png",
    narrative: {
      brief: "A crisp, brand-led corporate office for VE Commercial Vehicles, balancing an open high-rise workfloor with a clean white reception.",
      site: "Automotive commission. Design visualization (3D renders).",
      response: "A commercial-interior design for VE Commercial Vehicles (the Volvo Eicher joint venture), presented as 3D renders. The scheme pairs a bright, minimal white reception and waiting lounge, accented with red-and-blue brand-coloured artwork, with a large open-plan workfloor featuring linear pendant lighting, an exposed services ceiling, a green living wall and panoramic city-view glazing. Glass-partitioned meeting rooms and cabins extend the clean, contemporary corporate language.",
    },
    gallery: [
      { src: "/assets/projects/ve-commercial-vehicles-volvo-eicher-office/g01.jpg", alt: "Minimal white reception with VE Commercial Vehicles signage, grey desk, cassette AC ceiling and brand-coloured wall art.", span: "full" },
      { src: "/assets/projects/ve-commercial-vehicles-volvo-eicher-office/g02.jpg", alt: "Waiting lounge with grey sofa, marble coffee table and bold red-blue brand artwork, beside glass-partitioned meeting rooms.", span: "half" },
    ],
    featured: false,
    order: 28,
    seo: { title: "VE Commercial Vehicles (Volvo Eicher) Office, Interior", description: "A crisp, brand-led corporate office for VE Commercial Vehicles, balancing an open high-rise workfloor with a clean white reception." },
  },
  {
    slug: "vinay-savargi-c-a-office-andheri",
    name: "Vinay Savargi C.A. Office, Andheri",
    type: "Interior",
    category: "Corporate Offices",
    client: "Vinay Savargi (Chartered Accountant)",
    location: "Andheri, Mumbai",
    city: "Mumbai",
    year: 2023,
    area: "",
    status: "design / visualization stage",
    scope: ["Commercial interior design and space planning for a chartered accountant's office"],
    services: ["Interior"],
    cover: "/assets/projects/vinay-savargi-c-a-office-andheri/cover.jpg",
    coverAlt: "Cutaway render foregrounding the conference cabin and workstation bay, with the wooden circulation corridor sweeping across the upper left.",
    gridCover: "/assets/projects/vinay-savargi-c-a-office-andheri/cover.png",
    narrative: {
      brief: "A compact chartered accountant's office in Andheri, space-planned into private cabins, open workstations and meeting zones through clean 3D cutaway renders.",
      site: "Professional services (chartered accountant office) commission in Andheri, Mumbai. design / visualization stage.",
      response: "Interior design for Vinay Savargi's chartered accountant practice in Andheri, presented entirely as 3D cutaway dollhouse renders showing the full floor layout from four angles. The plan organizes the space into glass-partitioned private cabins, a row of open workstations, a round-table meeting/conference area, and a long wood-floored circulation/reception corridor. The scheme uses a neutral grey-and-white palette with dark glass partitions and warm wooden flooring to define the public spine.",
    },
    gallery: [
      { src: "/assets/projects/vinay-savargi-c-a-office-andheri/g01.jpg", alt: "3D cutaway showing the meeting cabin with display screen, clustered cabins and the long wood-floored reception passage.", span: "full" },
      { src: "/assets/projects/vinay-savargi-c-a-office-andheri/g02.jpg", alt: "Top-down 3D cutaway from an alternate angle, highlighting the cafeteria/breakout seating, cabins and the wood-floored reception spine.", span: "half" },
      { src: "/assets/projects/vinay-savargi-c-a-office-andheri/g03.jpg", alt: "3D cutaway render of the office showing open workstations, glass cabins and the round meeting table, with the wooden-floored corridor along the right.", span: "half" },
    ],
    featured: false,
    order: 29,
    seo: { title: "Vinay Savargi C.A. Office, Andheri, Interior", description: "A compact chartered accountant's office in Andheri, space-planned into private cabins, open workstations and meeting zones through clean 3D cutaway renders" },
  },
  {
    slug: "wonese-world-networking-services-office",
    name: "Wonese, World Networking Services Office",
    type: "Interior",
    category: "Corporate Offices",
    client: "Wonese (World Networking Services)",
    location: "India",
    city: "India",
    year: 2022,
    area: "",
    status: "Design visualisation / render",
    scope: ["Commercial office interior design and fit-out"],
    services: ["Interior", "Turnkey"],
    cover: "/assets/projects/wonese-world-networking-services-office/cover.jpg",
    coverAlt: "Reception with bold red WONESE branding on a dark wood feature wall above a crisp white desk, framed by a glazed meeting cabin.",
    gridCover: "/assets/projects/wonese-world-networking-services-office/cover.png",
    narrative: {
      brief: "An industrial-modern office fit-out for an IT networking firm, blending exposed red services overhead with warm wood and a bold red-on-black brand identity.",
      site: "IT commission. Design visualisation / render.",
      response: "A set of 3D visualisations for Wonese (World Networking Services), an IT/networking company office interior. The design pairs an exposed-ceiling industrial aesthetic, bare concrete soffits, ductwork and signature red conduit runs, with warm timber workstations, glazed cabin partitions and a striking red-and-black branded reception. Spaces shown include the entrance facade/glass storefront, reception, open-plan workstation floors with iMac desks and a motivational graphic wall, and a private cabin with city views.",
    },
    gallery: [
      { src: "/assets/projects/wonese-world-networking-services-office/g01.jpg", alt: "Private director's cabin with a warm timber desk, dark lounge sofa, board-formed concrete wall and floor-to-ceiling city views.", span: "full" },
      { src: "/assets/projects/wonese-world-networking-services-office/g02.jpg", alt: "Open-plan workstation floor with iMac desks, exposed red-conduit ceiling and a 'struggle today' motivational graphic wall.", span: "half" },
      { src: "/assets/projects/wonese-world-networking-services-office/g03.jpg", alt: "Industrial open office with timber-topped iMac benches, glazed cabins and signature exposed red services overhead.", span: "half" },
      { src: "/assets/projects/wonese-world-networking-services-office/g04.jpg", alt: "Glazed storefront entrance with frosted glass doors and the red WONESE, World Networking Services logo on a wood-clad pier.", span: "wide" },
    ],
    featured: false,
    order: 30,
    seo: { title: "Wonese, World Networking Services Office, Interior", description: "An industrial-modern office fit-out for an IT networking firm, blending exposed red services overhead with warm wood and a bold red-on-black brand identity" },
  },
  {
    slug: "icici-bank",
    name: "ICICI Bank",
    type: "Interior",
    category: "Banking & Finance",
    client: "ICICI Bank Ltd.",
    location: "Arihant Aura, Navi Mumbai",
    city: "Navi Mumbai",
    year: 2024,
    area: "1,03,000 sq.ft.",
    status: "Completed",
    scope: ["Commercial interior fit-out across four floors", "Reception", "Open workstations", "Cabins", "Boardroom", "Breakout"],
    services: ["Interior", "Turnkey"],
    cover: "/assets/projects/icici-bank/cover.jpg",
    coverAlt: "Reception with a backlit ICICI Bank logo on a stone-clad desk under a timber-batten ceiling, beside a perforated screen wall.",
    gridCover: "/assets/projects/icici-bank/cover.png",
    narrative: {
      brief: "A 1,03,000 sq.ft., four-floor ICICI Bank workplace at Arihant Aura, Navi Mumbai, IGBC Platinum rated, with a warm timber reception and bright, planted open-plan floors.",
      site: "Banking workplace commission at Arihant Aura, Navi Mumbai. IGBC Platinum.",
      response: "A 1,03,000 sq.ft. ICICI Bank workplace spread across four floors at Arihant Aura, Navi Mumbai, certified IGBC Platinum. A warm reception with a backlit ICICI Bank logo over a stone desk and timber-batten ceiling opens onto bright open-plan floors, where timber benching, green planter dividers and orange task chairs sit under linear lighting. The programme adds glass-partitioned cabins, a boardroom with red and blue acoustic panelling, and a planted breakout lounge.",
    },
    gallery: [
      { src: "/assets/projects/icici-bank/g01.jpg", alt: "Open-plan workstation bay with orange task chairs, timber benching and a soft lounge corner under a slatted ceiling.", span: "full" },
      { src: "/assets/projects/icici-bank/g02.jpg", alt: "Open office with timber-clad benching desks, green planter dividers and a central spine of pendant lighting.", span: "half" },
      { src: "/assets/projects/icici-bank/g03.jpg", alt: "Glass-walled boardroom with a timber table, red and blue acoustic panelling and a wall-mounted display.", span: "half" },
      { src: "/assets/projects/icici-bank/g04.jpg", alt: "Open workstation floor behind a glass partition, with patterned carpet and ribbon lighting.", span: "wide" },
      { src: "/assets/projects/icici-bank/g05.jpg", alt: "Breakout lounge with low seating, a perforated feature wall and potted greenery under a circular light cove.", span: "half" },
      { src: "/assets/projects/icici-bank/g06.jpg", alt: "Bright open-plan floor with white benching desks, orange chairs and full-height glazing.", span: "tall" },
    ],
    featured: false,
    order: 31,
    seo: { title: "ICICI Bank, Interior", description: "A 1,03,000 sq.ft., four-floor ICICI Bank workplace at Arihant Aura, Navi Mumbai, IGBC Platinum rated, with a warm timber reception and bright, planted open-plan floors." },
  },
  {
    slug: "dcb-bank",
    name: "DCB Bank",
    type: "Interior",
    category: "Banking & Finance",
    client: "DCB Bank",
    location: "Hubtown Solaris, Andheri East, Mumbai",
    city: "Mumbai",
    year: 2025,
    area: "10,000 sq.ft.",
    status: "Completed",
    scope: ["Commercial interior fit-out", "Reception", "Open workstations", "Cabins", "Boardroom", "Breakout cafe"],
    services: ["Interior", "Turnkey"],
    cover: "/assets/projects/dcb-bank/cover.jpg",
    coverAlt: "Reception with the blue DCB Bank logo wall, a navy sofa and a marble-topped desk under recessed lighting.",
    gridCover: "/assets/projects/dcb-bank/cover.png",
    narrative: {
      brief: "A 10,000 sq.ft. DCB Bank office at Hubtown Solaris, Andheri East, completed in 2025, with a crisp blue-and-white identity from reception through to the workstation floors.",
      site: "Banking workplace commission at Hubtown Solaris, Andheri East, Mumbai. Completed 2025.",
      response: "A 10,000 sq.ft. DCB Bank office at Hubtown Solaris, Andheri East, completed in 2025. The blue-and-white brand identity runs from a reception with the DCB Bank logo wall and a navy sofa through to open-plan floors with white benching, blue task chairs and patterned blue carpet. Glazed cabins, a boardroom and DCB-branded meeting rooms are balanced by a warm-toned breakout cafe with an arched feature wall.",
    },
    gallery: [
      { src: "/assets/projects/dcb-bank/g01.jpg", alt: "Boardroom and open workstations behind glass, with blue accents and a slatted ceiling.", span: "full" },
      { src: "/assets/projects/dcb-bank/g02.jpg", alt: "Compact meeting room with a dark table, leather chairs and the DCB Bank logo on a blue panel.", span: "half" },
      { src: "/assets/projects/dcb-bank/g03.jpg", alt: "Open-plan floor with white benching desks, blue task chairs and patterned blue carpet.", span: "half" },
      { src: "/assets/projects/dcb-bank/g04.jpg", alt: "Warm breakout cafe with an arched orange feature wall, communal tables and bistro seating.", span: "wide" },
      { src: "/assets/projects/dcb-bank/g05.jpg", alt: "Private cabins along a glazed corridor with blue carpet and timber-trimmed partitions.", span: "half" },
      { src: "/assets/projects/dcb-bank/g06.jpg", alt: "Meeting room with a marble table, dark chairs and a blue acoustic-panel wall.", span: "tall" },
    ],
    featured: false,
    order: 32,
    seo: { title: "DCB Bank, Interior", description: "A 10,000 sq.ft. DCB Bank office at Hubtown Solaris, Andheri East, completed in 2025, with a crisp blue-and-white identity from reception through to the workstation floors." },
  },
  {
    slug: "shriram-wealth",
    name: "Shriram Wealth",
    type: "Interior",
    category: "Banking & Finance",
    client: "Shriram Wealth",
    location: "The Capital, BKC, Mumbai",
    city: "Mumbai",
    year: 2024,
    area: "",
    status: "Completed",
    scope: ["Commercial interior fit-out", "Reception", "Cabins", "Boardroom", "Open workstations", "Breakout"],
    services: ["Interior", "Turnkey"],
    cover: "/assets/projects/shriram-wealth/cover.jpg",
    coverAlt: "Reception with backlit Shriram Wealth signage on a stone-clad desk, warm timber ceiling and potted greenery.",
    gridCover: "/assets/projects/shriram-wealth/cover.png",
    narrative: {
      brief: "An IGBC Gold rated Shriram Wealth office at The Capital, BKC, with a warm, premium palette of timber, stone and greenery from the branded reception to the boardroom.",
      site: "Wealth-management workplace commission at The Capital, BKC, Mumbai. IGBC Gold.",
      response: "An IGBC Gold rated workplace for Shriram Wealth at The Capital, BKC. A reception with backlit Shriram signage over a stone desk and a warm timber ceiling sets a premium tone carried through glass meeting rooms, open workstations with green planter dividers, a long boardroom and an arched, warm-toned breakout cafe. Timber, stone and greenery run throughout.",
    },
    gallery: [
      { src: "/assets/projects/shriram-wealth/g01.jpg", alt: "Long boardroom with a white table, leather chairs and a timber-slat ceiling under linear lighting.", span: "full" },
      { src: "/assets/projects/shriram-wealth/g02.jpg", alt: "Glass-walled meeting room with a compact table, mesh chairs and planting along the corridor.", span: "half" },
      { src: "/assets/projects/shriram-wealth/g03.jpg", alt: "Open workstations with timber benching, green planter dividers and warm pendant lighting.", span: "half" },
      { src: "/assets/projects/shriram-wealth/g04.jpg", alt: "Breakout cafe with an arched terracotta-toned alcove, communal table and soft lighting.", span: "wide" },
      { src: "/assets/projects/shriram-wealth/g05.jpg", alt: "Glazed cabin and meeting room with warm wood detailing off the main circulation.", span: "half" },
      { src: "/assets/projects/shriram-wealth/g06.jpg", alt: "Private cabin finished in warm timber with a city-facing window.", span: "tall" },
    ],
    featured: false,
    order: 33,
    seo: { title: "Shriram Wealth, Interior", description: "An IGBC Gold rated Shriram Wealth office at The Capital, BKC, with a warm, premium palette of timber, stone and greenery from the branded reception to the boardroom." },
  },
  {
    slug: "moneyboxx",
    name: "Moneyboxx Finance",
    type: "Interior",
    category: "Banking & Finance",
    client: "Moneyboxx Finance Ltd.",
    location: "Kanakia Wall Street, Andheri East, Mumbai",
    city: "Mumbai",
    year: 2024,
    area: "",
    status: "Completed",
    scope: ["Commercial interior fit-out", "Reception", "Lounge", "Open workstations", "Cabins", "Boardroom", "Cafeteria"],
    services: ["Interior", "Turnkey"],
    cover: "/assets/projects/moneyboxx/cover.jpg",
    coverAlt: "Breakout lounge with a round sofa, warm timber floor and a bold framed artwork beside the open office.",
    gridCover: "/assets/projects/moneyboxx/cover.png",
    narrative: {
      brief: "A bright, colourful NBFC head office for Moneyboxx Finance at Kanakia Wall Street, Mumbai, pairing exposed-ceiling open floors with a vivid, art-led breakout lounge.",
      site: "NBFC head-office commission at Kanakia Wall Street, Mumbai.",
      response: "A Mumbai head office for NBFC Moneyboxx Finance at Kanakia Wall Street. Glass-partitioned meeting cabins open onto a vivid breakout lounge with a round sofa, warm timber floor and bold wall art. Open-plan workstations sit under an exposed services ceiling, balanced by a boardroom, warm private cabins and a glazed cafeteria with greenery.",
    },
    gallery: [
      { src: "/assets/projects/moneyboxx/g01.jpg", alt: "Glass-partitioned meeting cabins with dark frames and a display screen off the open floor.", span: "full" },
      { src: "/assets/projects/moneyboxx/g02.jpg", alt: "Open-plan workstations under an exposed services ceiling, with warm lounge seating along the windows.", span: "half" },
      { src: "/assets/projects/moneyboxx/g03.jpg", alt: "Boardroom with a long table, leather chairs and planting behind a glazed partition.", span: "half" },
      { src: "/assets/projects/moneyboxx/g04.jpg", alt: "Workstation bay with white benching, mesh chairs and a warm timber accent wall.", span: "wide" },
      { src: "/assets/projects/moneyboxx/g05.jpg", alt: "Private cabins along a glazed corridor with patterned carpet and warm lighting.", span: "half" },
      { src: "/assets/projects/moneyboxx/g06.jpg", alt: "Cafeteria with communal tables, bistro chairs and full-height glazing to the city.", span: "tall" },
    ],
    featured: false,
    order: 34,
    seo: { title: "Moneyboxx Finance, Interior", description: "A bright, colourful NBFC head office for Moneyboxx Finance at Kanakia Wall Street, Mumbai, pairing exposed-ceiling open floors with a vivid, art-led breakout lounge." },
  },
  {
    slug: "policy-bazaar",
    name: "Policy Bazaar",
    type: "Interior",
    category: "Banking & Finance",
    client: "Policy Bazaar",
    location: "Infinity Tower, Malad East, Mumbai",
    city: "Mumbai",
    year: 2024,
    area: "50,000 sq.ft.",
    status: "Completed",
    scope: ["Commercial interior fit-out", "Reception", "Open workstations"],
    services: ["Interior", "Turnkey"],
    cover: "/assets/projects/policy-bazaar/cover.jpg",
    coverAlt: "Reception lounge with a living green wall, the Policy Bazaar logo and warm leather seating under a slatted ceiling.",
    gridCover: "/assets/projects/policy-bazaar/gridcover.png",
    narrative: {
      brief: "A 50,000 sq.ft. carpet-area workplace for Policy Bazaar at Infinity Tower, Malad East, with a green-walled reception lounge and bright, art-accented open floors.",
      site: "Insurance and fintech workplace commission at Infinity Tower, Malad East, Mumbai.",
      response: "A 50,000 sq.ft. carpet-area workplace for Policy Bazaar at Infinity Tower, Malad East. A reception lounge with a living green wall, the Policy Bazaar logo and warm leather seating gives way to expansive open-plan floors, where timber planter dividers and a bold geometric mural line the circulation.",
    },
    gallery: [
      { src: "/assets/projects/policy-bazaar/g01.jpg", alt: "Expansive open-plan workstation floor with timber planter dividers, blue task chairs and a geometric mural along the corridor.", span: "full" },
    ],
    featured: false,
    order: 35,
    seo: { title: "Policy Bazaar, Interior", description: "A 50,000 sq.ft. carpet-area workplace for Policy Bazaar at Infinity Tower, Malad East, with a green-walled reception lounge and bright, art-accented open floors." },
  },
  {
    "slug": "aadiarpan-nx-residences",
    "name": "Aadiarpan & Nx Residences",
    "type": "Exterior",
    "category": "Residential",
    "client": "Aadishikhar Developers",
    "location": "Sion, Mumbai",
    "city": "Mumbai",
    "area": "",
    "status": "Under construction",
    "scope": [
      "Architecture",
      "Luxury residential boutique apartments"
    ],
    "services": [
      "Architecture"
    ],
    "cover": "/assets/projects/aadiarpan-nx-residences/cover.jpg",
    "coverAlt": "Design render of a slim luxury apartment tower at Sion wrapped in vertical greenery, with stacked terraces and balconies.",
    "narrative": {
      "brief": "A luxury boutique residential development at Sion, Mumbai, with terraces and balconies layered across a slim tower wrapped in vertical greenery.",
      "site": "Sion, Mumbai, Under construction.",
      "response": "Aadiarpan & Nx is a luxury boutique residential development for Aadishikhar Developers at Sion, Mumbai. The scheme is a slim apartment tower with terraces and balconies and planted landscaping at its base, shown both as a design render and as on-site construction photographs of the rising structure. The project is currently at construction stage."
    },
    "gallery": [
      {
        "src": "/assets/projects/aadiarpan-nx-residences/g01.jpg",
        "alt": "Construction-stage photograph of the residential tower wrapped in green safety netting and scaffolding.",
        "span": "full"
      },
      {
        "src": "/assets/projects/aadiarpan-nx-residences/g02.jpg",
        "alt": "On-site photo of the apartment tower under construction, its frame clad in green protective netting.",
        "span": "half"
      },
      {
        "src": "/assets/projects/aadiarpan-nx-residences/g03.jpg",
        "alt": "Low-angle construction photo of the slim residential tower sheathed in green safety netting against a clear sky.",
        "span": "half"
      }
    ],
    "featured": false,
    "order": 36,
    "seo": {
      "title": "Aadiarpan & Nx Residences, Architecture",
      "description": "A luxury boutique residential development at Sion, Mumbai, with terraces and balconies layered across a slim tower wrapped in vertical greenery."
    }
  },
  {
    "slug": "carter-road",
    "name": "Carter Road Project",
    "type": "Exterior",
    "category": "Residential",
    "location": "Carter Road, Bandra West, Mumbai",
    "city": "Mumbai",
    "area": "",
    "status": "",
    "scope": [
      "Architecture",
      "Sea-facing residential development"
    ],
    "services": [
      "Architecture"
    ],
    "cover": "/assets/projects/carter-road/cover.jpg",
    "coverAlt": "Dusk render of a sea-facing residential tower on Carter Road with stacked, deep-curved balconies.",
    "narrative": {
      "brief": "A sea-facing, ultra-luxury bespoke residential development on Carter Road, Bandra West, with curved balconies framing views across the Arabian Sea.",
      "site": "Carter Road, Bandra West, Mumbai.",
      "response": "The Carter Road project is a sea-facing, ultra-luxury bespoke residential development on Carter Road, Bandra West, Mumbai, planned over two basement levels. Renders show a sculpted apartment tower with deep curved balconies and planted terraces, set above a landscaped pool deck with sweeping views out to the sea at sunset."
    },
    "gallery": [
      {
        "src": "/assets/projects/carter-road/g01.jpg",
        "alt": "Dusk render close-up of the apartment building's stacked curved balconies.",
        "span": "full"
      },
      {
        "src": "/assets/projects/carter-road/g02.jpg",
        "alt": "Daytime render of the residential facade with planted, glass-railed balconies.",
        "span": "half"
      },
      {
        "src": "/assets/projects/carter-road/g03.jpg",
        "alt": "Daytime full-elevation render of the slender white residential tower.",
        "span": "half"
      },
      {
        "src": "/assets/projects/carter-road/g04.jpg",
        "alt": "Dusk render of the residential tower rising above its podium base.",
        "span": "wide"
      }
    ],
    "featured": false,
    "order": 37,
    "seo": {
      "title": "Carter Road Project, Architecture",
      "description": "A sea-facing, ultra-luxury bespoke residential development on Carter Road, Bandra West, with curved balconies framing views across the Arabian Sea."
    }
  },
  {
    "slug": "palatial-heights",
    "name": "Palatial Heights",
    "type": "Exterior",
    "category": "Residential",
    "client": "Srujan",
    "location": "Bandstand, Mumbai",
    "city": "Mumbai",
    "area": "",
    "status": "Concept and schematic",
    "scope": [
      "Architecture",
      "Sea-shore luxury residential apartments"
    ],
    "services": [
      "Architecture"
    ],
    "cover": "/assets/projects/palatial-heights/cover.jpg",
    "coverAlt": "Dusk render of a slim sea-shore residential tower at Bandstand with an illuminated bronze-toned crown.",
    "narrative": {
      "brief": "A sea-shore luxury residential tower at Bandstand, Mumbai, designed so that 75% of rooms open to terraces with extended views over the sea.",
      "site": "Bandstand, Mumbai, Concept and schematic.",
      "response": "Palatial Heights is a sea-shore luxury boutique residential project for Srujan at Bandstand, Mumbai, at the concept and schematic stage. The brief targets extended sea views from terraces in 75% of rooms. Renders present a slim residential tower with an illuminated bronze-toned crown and podium, shown at dusk and in full daytime elevation."
    },
    "gallery": [
      {
        "src": "/assets/projects/palatial-heights/g01.jpg",
        "alt": "Dusk render of the slim sea-shore residential tower.",
        "span": "full"
      },
      {
        "src": "/assets/projects/palatial-heights/g02.jpg",
        "alt": "Daytime full-height render of the white residential tower against the sky.",
        "span": "half"
      }
    ],
    "featured": false,
    "order": 38,
    "seo": {
      "title": "Palatial Heights, Architecture",
      "description": "A sea-shore luxury residential tower at Bandstand, Mumbai, designed so that 75% of rooms open to terraces with extended views over the sea."
    }
  },
  {
    "slug": "lumax",
    "name": "Lumax",
    "type": "Turnkey",
    "category": "Industrial",
    "client": "Lumax",
    "location": "Gurgaon, Haryana",
    "city": "Gurgaon",
    "area": "",
    "status": "Under construction",
    "scope": [
      "Architecture",
      "B+G+2 structure with offices",
      "In collaboration with SEMAC Consultants Pvt. Ltd."
    ],
    "services": [
      "Architecture"
    ],
    "cover": "/assets/projects/lumax/cover.jpg",
    "coverAlt": "Fitted-out reception carrying the red Lumax branding in the new Gurgaon office building.",
    "narrative": {
      "brief": "A B+G+2 office and facility building for auto-component maker Lumax in Gurgaon, delivered in collaboration with SEMAC Consultants.",
      "site": "Gurgaon, Haryana, Under construction.",
      "response": "Lumax is a basement-plus-ground-plus-two-storey building with offices for the auto-component manufacturer Lumax in Gurgaon, Haryana, delivered in collaboration with SEMAC Consultants Pvt. Ltd. and currently under construction. Documentation pairs a fitted-out reception carrying the red Lumax branding with on-site photographs of the open office floors during construction and fit-out."
    },
    "gallery": [
      {
        "src": "/assets/projects/lumax/g01.jpg",
        "alt": "Office floor under construction with exposed-services ceiling, scaffolding and workers.",
        "span": "full"
      },
      {
        "src": "/assets/projects/lumax/g02.jpg",
        "alt": "Empty fitted-out office floor with grey flooring and regularly spaced structural columns.",
        "span": "half"
      },
      {
        "src": "/assets/projects/lumax/g03.jpg",
        "alt": "Open office floor awaiting fit-out, lined with bare structural columns.",
        "span": "half"
      },
      {
        "src": "/assets/projects/lumax/g04.jpg",
        "alt": "Interior under construction showing structural columns and overhead ceiling services.",
        "span": "wide"
      }
    ],
    "featured": false,
    "order": 39,
    "seo": {
      "title": "Lumax, Architecture",
      "description": "A B+G+2 office and facility building for auto-component maker Lumax in Gurgaon, delivered in collaboration with SEMAC Consultants."
    }
  },
  {
    "slug": "new-tulshi-baug",
    "name": "New Tulshi Baug",
    "type": "Exterior",
    "category": "Commercial",
    "client": "Motoshree Estates",
    "location": "Tulsi Baug, Pune",
    "city": "Pune",
    "area": "",
    "status": "Working stage",
    "scope": [
      "Architecture",
      "Luxury boutique showrooms and commercial spaces",
      "Facade development"
    ],
    "services": [
      "Architecture"
    ],
    "cover": "/assets/projects/new-tulshi-baug/cover.jpg",
    "coverAlt": "Dusk render of the New Tulshi Baug showroom building with its illuminated, lace-like perforated facade.",
    "narrative": {
      "brief": "A luxury boutique-showroom and commercial building at Tulsi Baug, Pune, wrapped in an intricate white filigree-patterned facade.",
      "site": "Tulsi Baug, Pune, Working stage.",
      "response": "New Tulshi Baug is a luxury boutique-showroom and commercial development for Motoshree Estates at Tulsi Baug, Pune, at working stage. The building's signature is an ornate, lace-like perforated facade screen below regularly fenestrated upper floors, with ground-level retail frontages and brand signage, shown illuminated at dusk."
    },
    "gallery": [
      {
        "src": "/assets/projects/new-tulshi-baug/g01.jpg",
        "alt": "Daytime render of the boutique-showroom building with its perforated patterned facade and ground-floor retail frontage.",
        "span": "full"
      }
    ],
    "featured": false,
    "order": 40,
    "seo": {
      "title": "New Tulshi Baug, Architecture",
      "description": "A luxury boutique-showroom and commercial building at Tulsi Baug, Pune, wrapped in an intricate white filigree-patterned facade."
    }
  },
  {
    "slug": "juna-deesa-institute",
    "name": "Juna Deesa Institute",
    "type": "Architecture",
    "category": "Institutional",
    "location": "Juna Deesa, Gujarat",
    "city": "Deesa",
    "area": "340,000 sq.ft.",
    "status": "Design and under construction",
    "scope": [
      "Architecture",
      "Gr+4 institute development"
    ],
    "services": [
      "Architecture"
    ],
    "cover": "/assets/projects/juna-deesa-institute/cover.jpg",
    "coverAlt": "Render of the Juna Deesa institute's long, low red-brick academic block fronted by landscaping.",
    "gridCover": "/assets/projects/juna-deesa-institute/cover.png",
    "narrative": {
      "brief": "A 340,000 sq.ft. Gr+4 institutional campus at Juna Deesa, Gujarat, organised behind a long horizontal red-brick facade.",
      "site": "Juna Deesa, Gujarat, Design and under construction.",
      "response": "Juna Deesa Institute is a 340,000 sq.ft., ground-plus-four institutional development at Juna Deesa, Gujarat, in design and under construction. Renders show a long, low red-brick academic block with strongly horizontal massing fronted by landscaping and approach roads, alongside an adjacent large hall covered by a white tensile/space-frame roof."
    },
    "gallery": [
      {
        "src": "/assets/projects/juna-deesa-institute/g01.jpg",
        "alt": "Render of the institute campus showing the red-brick academic block beside a large white space-frame-roofed hall.",
        "span": "full"
      }
    ],
    "featured": false,
    "order": 42,
    "seo": {
      "title": "Juna Deesa Institute, Architecture",
      "description": "A 340,000 sq.ft. Gr+4 institutional campus at Juna Deesa, Gujarat, organised behind a long horizontal red-brick facade."
    }
  },
  {
    "slug": "ravindra-natya-mandir",
    "name": "Ravindra Natya Mandir",
    "type": "Architecture",
    "category": "Institutional",
    "client": "Eminent Developers / PWD",
    "location": "Prabhadevi, Mumbai",
    "city": "Mumbai",
    "area": "",
    "status": "Concept and schematic",
    "scope": [
      "External facade development",
      "Auditorium design"
    ],
    "services": [
      "Architecture"
    ],
    "cover": "/assets/projects/ravindra-natya-mandir/cover.jpg",
    "coverAlt": "Render of the Ravindra Natya Mandir's traditional Maharashtrian-style facade and arrival plaza at Prabhadevi.",
    "gridCover": "/assets/projects/ravindra-natya-mandir/cover.png",
    "narrative": {
      "brief": "External facade and auditorium redesign of the renowned Marathi-theatre venue Ravindra Natya Mandir at Prabhadevi, Mumbai.",
      "site": "Prabhadevi, Mumbai, Concept and schematic.",
      "response": "Ravindra Natya Mandir is the external facade development and auditorium design for the renowned Marathi-play venue at Prabhadevi, Mumbai, for Eminent Developers with the PWD, at concept and schematic stage. Renders present a traditional Maharashtrian-style facade carrying the venue's name in Devanagari, an arrival plaza, and a richly decorated auditorium with red seating, ornate side walls and a sculpted domed ceiling above a central stage."
    },
    "gallery": [
      {
        "src": "/assets/projects/ravindra-natya-mandir/g01.jpg",
        "alt": "Render of the auditorium stage with red drapes and seating beneath an ornate circular domed ceiling, a deity sculpture at centre stage.",
        "span": "full"
      },
      {
        "src": "/assets/projects/ravindra-natya-mandir/g02.jpg",
        "alt": "Wide render of the auditorium interior with rows of red seats and richly decorated side walls.",
        "span": "half"
      },
      {
        "src": "/assets/projects/ravindra-natya-mandir/g03.jpg",
        "alt": "Render looking up at the auditorium's ornate radial, fan-patterned ceiling.",
        "span": "half"
      },
      {
        "src": "/assets/projects/ravindra-natya-mandir/g04.jpg",
        "alt": "Render of the arrival plaza and forecourt steps before the temple-style facade.",
        "span": "wide"
      },
      {
        "src": "/assets/projects/ravindra-natya-mandir/g05.jpg",
        "alt": "Render of the columned entrance portico with traditional Maharashtrian detailing.",
        "span": "half"
      },
      {
        "src": "/assets/projects/ravindra-natya-mandir/g06.jpg",
        "alt": "Portrait render of the ornate traditional-style entrance facade with arched openings.",
        "span": "tall"
      }
    ],
    "featured": false,
    "order": 43,
    "seo": {
      "title": "Ravindra Natya Mandir, Architecture",
      "description": "External facade and auditorium redesign of the renowned Marathi-theatre venue Ravindra Natya Mandir at Prabhadevi, Mumbai."
    }
  },
  {
    "slug": "highmount",
    "name": "Highmount",
    "type": "Exterior",
    "category": "Residential",
    "location": "Mumbai",
    "city": "Mumbai",
    "area": "",
    "status": "Working stage",
    "scope": [
      "Architecture",
      "Interiors",
      "Residential apartments"
    ],
    "services": [
      "Architecture"
    ],
    "cover": "/assets/projects/highmount/cover.jpg",
    "coverAlt": "Dusk render of the slim Highmount residential tower in Mumbai, dramatically illuminated.",
    "gridCover": "/assets/projects/highmount/cover.png",
    "narrative": {
      "brief": "A residential apartment tower in Mumbai with terraces and balconies, paired with richly classical interior schemes.",
      "site": "Mumbai, Working stage.",
      "response": "Highmount is a residential apartment project in Mumbai, at working stage, offering apartments with terraces and balconies. Renders show a slim tower presented both in daylight and dramatically illuminated at dusk, alongside classically appointed interiors with arched niches, ornate wall art, marble floors, drapery and traditional furniture across living, dining and bedroom spaces."
    },
    "gallery": [
      {
        "src": "/assets/projects/highmount/g01.jpg",
        "alt": "Daytime render of the slim residential tower in full elevation.",
        "span": "full"
      },
      {
        "src": "/assets/projects/highmount/g02.jpg",
        "alt": "Interior render of a living room with an arched niche, marble floor, drapery and classical furniture.",
        "span": "half"
      },
      {
        "src": "/assets/projects/highmount/g03.jpg",
        "alt": "Interior render of a living room with ornate floral wall art, sofas and a ceiling fan.",
        "span": "half"
      },
      {
        "src": "/assets/projects/highmount/g04.jpg",
        "alt": "Interior render of a dining and living area with marble flooring and classical furnishings.",
        "span": "wide"
      },
      {
        "src": "/assets/projects/highmount/g05.jpg",
        "alt": "Bedroom render with classical furniture, marble floor and a ceiling fan.",
        "span": "half"
      }
    ],
    "featured": false,
    "order": 45,
    "seo": {
      "title": "Highmount, Architecture",
      "description": "A residential apartment tower in Mumbai with terraces and balconies, paired with richly classical interior schemes."
    }
  },
  {
    "slug": "c8-villa",
    "name": "C8 Villa",
    "type": "Architecture",
    "category": "Villas",
    "location": "Mumbai, Maharashtra",
    "city": "Mumbai",
    "area": "",
    "status": "Completed",
    "scope": [
      "Architecture",
      "Interiors"
    ],
    "services": [
      "Architecture"
    ],
    "cover": "/assets/projects/c8-villa/cover.jpg",
    "coverAlt": "Warm, timber-clad living room of C8 Villa with a large sectional sofa under a timber ceiling.",
    "gridCover": "/assets/projects/c8-villa/cover.png",
    "narrative": {
      "brief": "A completed residential villa in Mumbai with warm, timber-clad interiors, sculptural lighting and a modern kitchen.",
      "site": "Mumbai, Maharashtra, Completed.",
      "response": "C8 Villa is a completed residential villa project in Mumbai, Maharashtra. Photographs show richly warm, timber-panelled interiors: a spacious living room with a large sectional sofa and timber-clad ceiling, lounge nooks with curved and tub seating beneath sculptural pendants, a wood-panelled dining area, and a modern kitchen with an island and stainless appliances under night-time windows."
    },
    "gallery": [
      {
        "src": "/assets/projects/c8-villa/g01.jpg",
        "alt": "Warm timber-panelled lounge with a curved sofa beneath a sculptural pendant light.",
        "span": "full"
      },
      {
        "src": "/assets/projects/c8-villa/g02.jpg",
        "alt": "Cosy seating nook with round tub chairs, wood panelling and a chandelier.",
        "span": "half"
      },
      {
        "src": "/assets/projects/c8-villa/g03.jpg",
        "alt": "Lounge with a textured stone feature wall, framed art and upholstered sofas.",
        "span": "half"
      },
      {
        "src": "/assets/projects/c8-villa/g04.jpg",
        "alt": "Dining area with wood-panelled walls, a dining table and framed artwork.",
        "span": "wide"
      },
      {
        "src": "/assets/projects/c8-villa/g05.jpg",
        "alt": "Modern kitchen with a central island, stainless-steel fridge, dark cabinetry and night windows.",
        "span": "half"
      },
      {
        "src": "/assets/projects/c8-villa/g06.jpg",
        "alt": "Living area with a sofa set against a warm wood-panelled wall.",
        "span": "tall"
      }
    ],
    "featured": false,
    "order": 46,
    "seo": {
      "title": "C8 Villa, Architecture",
      "description": "A completed residential villa in Mumbai with warm, timber-clad interiors, sculptural lighting and a modern kitchen."
    }
  },
  {
    "slug": "women-welfare-centre",
    "name": "Women Welfare Centre",
    "type": "Architecture",
    "category": "Institutional",
    "client": "Malkapur Nagar Panchayat",
    "location": "Malkapur, Maharashtra",
    "city": "Malkapur",
    "area": "",
    "status": "Completed",
    "scope": [
      "Architecture",
      "Community development",
      "Low-maintenance design"
    ],
    "services": [
      "Architecture"
    ],
    "cover": "/assets/projects/women-welfare-centre/cover.jpg",
    "coverAlt": "The completed red-brick Women Welfare Centre at Malkapur with colonnaded verandahs around a planted courtyard.",
    "narrative": {
      "brief": "A completed, low-maintenance welfare centre for rural women's empowerment at Malkapur, built in load-bearing red brick around a planted courtyard.",
      "site": "Malkapur, Maharashtra, Completed.",
      "response": "The Women Welfare Centre is a completed community building for rural women's empowerment at Malkapur, Maharashtra, for the Malkapur Nagar Panchayat, designed for reduced maintenance. Photographs show a single-storey red-brick complex with colonnaded verandahs, red-oxide floors and a landscaped internal courtyard of flowering beds, set against the surrounding hills."
    },
    "gallery": [
      {
        "src": "/assets/projects/women-welfare-centre/g01.jpg",
        "alt": "Covered verandah walkway lined with red-brick columns over a red-oxide floor.",
        "span": "full"
      },
      {
        "src": "/assets/projects/women-welfare-centre/g02.jpg",
        "alt": "Exterior view of the red-brick community building set against a backdrop of hills.",
        "span": "half"
      },
      {
        "src": "/assets/projects/women-welfare-centre/g03.jpg",
        "alt": "Landscaped internal courtyard framed by red-brick walls and flowering garden beds.",
        "span": "half"
      }
    ],
    "featured": false,
    "order": 47,
    "seo": {
      "title": "Women Welfare Centre, Architecture",
      "description": "A completed, low-maintenance welfare centre for rural women's empowerment at Malkapur, built in load-bearing red brick around a planted courtyard."
    }
  },
  {
    "slug": "vithaldeo-library",
    "name": "Vithaldeo Library",
    "type": "Architecture",
    "category": "Institutional",
    "client": "Malkapur Nagar Panchayat",
    "location": "Malkapur, Maharashtra",
    "city": "Malkapur",
    "area": "",
    "status": "Completed",
    "scope": [
      "Architecture",
      "Gr+1 community library"
    ],
    "services": [
      "Architecture"
    ],
    "cover": "/assets/projects/vithaldeo-library/cover.jpg",
    "coverAlt": "Night view of the white Vithaldeo Library facade punctuated by brightly coloured projecting window boxes.",
    "gridCover": "/assets/projects/vithaldeo-library/cover.png",
    "narrative": {
      "brief": "A completed ground-plus-one community library at Malkapur, its white facade animated by brightly coloured projecting window boxes.",
      "site": "Malkapur, Maharashtra, Completed.",
      "response": "Vithaldeo Library is a completed ground-plus-one community library at Malkapur, Maharashtra, for the Malkapur Nagar Panchayat. Photographs show a crisp white-massed building whose illuminated facade is punctuated by colourful projecting window boxes at night, with a fully glazed reading-room entrance opening to the landscaped grounds."
    },
    "gallery": [
      {
        "src": "/assets/projects/vithaldeo-library/g01.jpg",
        "alt": "Glazed reading-room entrance with full-height glass doors and an orange curtain, a tree visible beyond.",
        "span": "full"
      }
    ],
    "featured": false,
    "order": 48,
    "seo": {
      "title": "Vithaldeo Library, Architecture",
      "description": "A completed ground-plus-one community library at Malkapur, its white facade animated by brightly coloured projecting window boxes."
    }
  },
  {
    "slug": "seclore",
    "name": "Seclore",
    "type": "Turnkey",
    "category": "Corporate Offices",
    "client": "Seclore",
    "location": "R Square, Andheri East, Mumbai",
    "city": "Mumbai",
    "year": 2025,
    "area": "20,000 sq.ft.",
    "status": "Completed",
    "scope": [
      "Commercial interior design",
      "Design and build"
    ],
    "services": [
      "Interior",
      "Turnkey"
    ],
    "cover": "/assets/projects/seclore/cover.jpg",
    "coverAlt": "Curved backlit reception of the Seclore office under a warm wood-slat ceiling.",
    "narrative": {
      "brief": "A 20,000 sq.ft. design-and-build software office in Andheri East where warm wood-slat ceilings, biophilic workstations and a backlit reception set a calm, trust-driven tone.",
      "site": "R Square, Andheri East, Mumbai, Completed.",
      "response": "Completed in 2025 at R Square, the Seclore office pairs a curved backlit reception with glass-walled meeting rooms and sofa lounges. Exposed services run over planter-lined open workstations, while collaborative pods, a city-view banquette lounge and a branded cafeteria with arched niches round out the floor."
    },
    "gallery": [
      {
        "src": "/assets/projects/seclore/g01.jpg",
        "alt": "Reception waiting lounge with a beige sofa, purple bench and glass-walled meeting rooms under a wood-slat ceiling.",
        "span": "full"
      },
      {
        "src": "/assets/projects/seclore/g02.jpg",
        "alt": "Open-plan workstation area with greenery-filled planter dividers and red exposed services running across the ceiling.",
        "span": "half"
      },
      {
        "src": "/assets/projects/seclore/g03.jpg",
        "alt": "Boardroom with mesh task chairs, a wall-mounted screen on a burnt-orange accent wall and display shelving.",
        "span": "half"
      },
      {
        "src": "/assets/projects/seclore/g04.jpg",
        "alt": "Curved lounge with banquette seating, a circular recessed ceiling light feature and floor-to-ceiling city views.",
        "span": "wide"
      },
      {
        "src": "/assets/projects/seclore/g05.jpg",
        "alt": "Cafeteria with booth seating, arched niches, biophilic walls and a backlit sign.",
        "span": "half"
      },
      {
        "src": "/assets/projects/seclore/g06.jpg",
        "alt": "Breakout zone with a glass meeting pod, yellow tub chairs and a red disc pendant light.",
        "span": "tall"
      }
    ],
    "featured": false,
    "order": 49,
    "seo": {
      "title": "Seclore, Interior",
      "description": "A 20,000 sq.ft. design-and-build software office in Andheri East where warm wood-slat ceilings, biophilic workstations and a backlit reception set a calm, trust-driven tone."
    }
  },
  {
    "slug": "planetcast-media",
    "name": "Planetcast Media",
    "type": "Turnkey",
    "category": "Corporate Offices",
    "client": "Planetcast Media",
    "location": "Raheja Interface, Malad East, Mumbai",
    "city": "Mumbai",
    "year": 2024,
    "area": "",
    "status": "Completed",
    "scope": [
      "Commercial interior design",
      "Office fit-out"
    ],
    "services": [
      "Interior",
      "Turnkey"
    ],
    "cover": "/assets/projects/planetcast-media/cover.jpg",
    "coverAlt": "Green, campus-like breakout space at the Planetcast Media office in Malad with tiered seating and greenery.",
    "narrative": {
      "brief": "A media company's Malad office that turns the workplace into a green, playful campus of tiered seating, biophilic breakouts and a graphic cafeteria.",
      "site": "Raheja Interface, Malad East, Mumbai, Completed.",
      "response": "Completed in 2024 at Raheja Interface, the Planetcast Media office centres on a tiered wooden amphitheatre with artificial-grass landscaping for town-halls. Open workstations wrap a central tree, while colourful modular lounges, leaf-graphic breakout nooks and a checkerboard-floor cafeteria with a bold mural bring energy. Glass meeting rooms screened by metal-mesh curtains complete the fit-out."
    },
    "gallery": [
      {
        "src": "/assets/projects/planetcast-media/g01.jpg",
        "alt": "Tiered wooden amphitheatre seating with artificial-grass landscaping, poufs and an organic ring pendant light.",
        "span": "full"
      },
      {
        "src": "/assets/projects/planetcast-media/g02.jpg",
        "alt": "Open-plan workstations clustered around a central tree planter with yellow chairs and city views.",
        "span": "half"
      },
      {
        "src": "/assets/projects/planetcast-media/g03.jpg",
        "alt": "Lounge with a colourful green, red and orange modular sofa, poufs, planters and floor-to-ceiling windows.",
        "span": "half"
      },
      {
        "src": "/assets/projects/planetcast-media/g04.jpg",
        "alt": "Cafeteria with a black-and-white checkerboard floor, round tables, hanging plants and a colourful geometric mural.",
        "span": "wide"
      },
      {
        "src": "/assets/projects/planetcast-media/g05.jpg",
        "alt": "Breakout nook with a banana-leaf graphic wall, woven poufs and soft fabric acoustic panels.",
        "span": "half"
      },
      {
        "src": "/assets/projects/planetcast-media/g06.jpg",
        "alt": "Glass-partitioned meeting rooms screened by a metal-mesh chain curtain under warm lighting.",
        "span": "tall"
      }
    ],
    "featured": false,
    "order": 50,
    "seo": {
      "title": "Planetcast Media, Interior",
      "description": "A media company's Malad office that turns the workplace into a green, playful campus of tiered seating, biophilic breakouts and a graphic cafeteria."
    }
  },
  {
    "slug": "tata-digital",
    "name": "Tata Digital",
    "type": "Turnkey",
    "category": "Corporate Offices",
    "client": "Tata Digital",
    "location": "One International Centre, Dadar, Mumbai",
    "city": "Mumbai",
    "area": "",
    "status": "Proposal",
    "scope": [
      "Commercial interior design"
    ],
    "services": [
      "Interior",
      "Turnkey"
    ],
    "cover": "/assets/projects/tata-digital/cover.jpg",
    "coverAlt": "Grand circular reception under a star-lit dome with a backlit Tata Digital brand wall.",
    "narrative": {
      "brief": "A proposed Dadar headquarters whose domed, star-lit circular reception signals corporate gravitas balanced with biophilic, colourful collaboration spaces.",
      "site": "One International Centre, Dadar, Mumbai, Proposal.",
      "response": "Proposed for One International Centre, the Tata Digital scheme opens with a grand circular reception under a star-lit dome and a backlit brand wall. Renders show planter-divided workstations, a long boardroom with an abstract mural and a branded executive lounge. Playful breakout zones with curved banquettes and landscape murals plus a checkerboard cafeteria with red cabinetry add warmth."
    },
    "gallery": [
      {
        "src": "/assets/projects/tata-digital/g01.jpg",
        "alt": "Executive lounge with a white sofa and orange chairs beside a backlit Tata Digital branded wall under a curved black ceiling.",
        "span": "full"
      },
      {
        "src": "/assets/projects/tata-digital/g02.jpg",
        "alt": "Open-plan workstations with greenery planter dividers beneath a faceted triangular ceiling.",
        "span": "half"
      },
      {
        "src": "/assets/projects/tata-digital/g03.jpg",
        "alt": "Long boardroom with leather chairs, an abstract artwork wall and panoramic city views.",
        "span": "half"
      },
      {
        "src": "/assets/projects/tata-digital/g04.jpg",
        "alt": "Breakout lounge around a central column with a ring pendant, yellow curved banquette, blue armchairs and a purple landscape mural.",
        "span": "wide"
      },
      {
        "src": "/assets/projects/tata-digital/g05.jpg",
        "alt": "Pantry and cafeteria with a checkerboard floor, red cabinetry, communal tables and overhead hanging plants.",
        "span": "half"
      },
      {
        "src": "/assets/projects/tata-digital/g06.jpg",
        "alt": "Meeting room with a branded Tata Digital wall, blue acoustic panels and a stepped geometric ceiling.",
        "span": "tall"
      }
    ],
    "featured": false,
    "order": 51,
    "seo": {
      "title": "Tata Digital, Interior",
      "description": "A proposed Dadar headquarters whose domed, star-lit circular reception signals corporate gravitas balanced with biophilic, colourful collaboration spaces."
    }
  },
  {
    "slug": "rush-co-works",
    "name": "Rush Co-Works",
    "type": "Turnkey",
    "category": "Coworking",
    "client": "Rush Co-Works",
    "location": "Plutonium, Turbhe, Navi Mumbai",
    "city": "Navi Mumbai",
    "area": "",
    "status": "Working stage",
    "scope": [
      "Commercial interior design",
      "Coworking space"
    ],
    "services": [
      "Interior",
      "Turnkey"
    ],
    "cover": "/assets/projects/rush-co-works/cover.jpg",
    "coverAlt": "Hospitality-led co-working space at Rush Co-Works, Turbhe, with a cafe counter and communal seating.",
    "narrative": {
      "brief": "A Turbhe co-working club built around hospitality and play, with cafes, communal dining and a games arcade rather than rows of desks.",
      "site": "Plutonium, Turbhe, Navi Mumbai, Working stage.",
      "response": "At Plutonium, Turbhe, the Rush Co-Works scheme (working stage) leans into community amenities: a cafe counter, encaustic-tiled bars and a large communal dining hall under exposed industrial ceilings. A food-court-style seating zone and a recreation arcade with table tennis, foosball and gaming screens are anchored by a stone cafeteria feature wall."
    },
    "gallery": [
      {
        "src": "/assets/projects/rush-co-works/g01.jpg",
        "alt": "Communal dining hall with long shared tables, banquette seating and exposed industrial ceiling services.",
        "span": "full"
      },
      {
        "src": "/assets/projects/rush-co-works/g02.jpg",
        "alt": "Cafe counter with a coffee-bar sign on an arched wood-slat backdrop and a row of bar stools.",
        "span": "half"
      },
      {
        "src": "/assets/projects/rush-co-works/g03.jpg",
        "alt": "Games and recreation zone with table tennis, foosball, gaming screens and colourful patterned flooring.",
        "span": "half"
      },
      {
        "src": "/assets/projects/rush-co-works/g04.jpg",
        "alt": "Recreation lounge with a foosball table, casual seating and a wall of storage lockers.",
        "span": "wide"
      },
      {
        "src": "/assets/projects/rush-co-works/g05.jpg",
        "alt": "Food-court style seating hall with red columns, high communal tables and an exposed red ceiling grid.",
        "span": "half"
      },
      {
        "src": "/assets/projects/rush-co-works/g06.jpg",
        "alt": "Stone-textured cafeteria feature wall beside a vertical garden under round pendant lights.",
        "span": "tall"
      }
    ],
    "featured": false,
    "order": 52,
    "seo": {
      "title": "Rush Co-Works, Interior",
      "description": "A Turbhe co-working club built around hospitality and play, with cafes, communal dining and a games arcade rather than rows of desks."
    }
  },
  {
    "slug": "odyssey-logistics",
    "name": "Odyssey Logistics",
    "type": "Turnkey",
    "category": "Logistics",
    "client": "Odyssey Logistics",
    "location": "Gundecha Onclave, Mumbai",
    "city": "Mumbai",
    "area": "10,000 sq.ft.",
    "status": "",
    "scope": [
      "Commercial interior design",
      "Office fit-out"
    ],
    "services": [
      "Interior",
      "Turnkey"
    ],
    "cover": "/assets/projects/odyssey-logistics/cover.jpg",
    "coverAlt": "Calm reception lounge of the Odyssey Logistics office under a wood-slat ceiling with marble flooring.",
    "narrative": {
      "brief": "A compact 10,000 sq.ft. logistics head office in Gundecha Onclave dressed in warm wood, marble and brass for a refined, residential-feeling workplace.",
      "site": "Gundecha Onclave, Mumbai.",
      "response": "The Odyssey Logistics office opens with a calm reception lounge under a wood-slat ceiling, with marble flooring, beige seating and planters. A black-stone reception desk with brass and fluted-glass accents, a herringbone-floored lounge and a private cabin with a gold-mesh screen and a small shrine niche give the 10,000 sq.ft. workplace a boutique, hospitality-led character."
    },
    "gallery": [
      {
        "src": "/assets/projects/odyssey-logistics/g01.jpg",
        "alt": "Reception desk in black stone with brass detailing, fluted-glass partitions and a ring pendant light.",
        "span": "full"
      },
      {
        "src": "/assets/projects/odyssey-logistics/g02.jpg",
        "alt": "Lounge with a curved beige sofa, fluted-glass partition, dark display shelving and a herringbone wood floor.",
        "span": "half"
      },
      {
        "src": "/assets/projects/odyssey-logistics/g03.jpg",
        "alt": "Private cabin with a gold-mesh partition, dark marble desk and an arched niche holding a small shrine.",
        "span": "half"
      }
    ],
    "featured": false,
    "order": 53,
    "seo": {
      "title": "Odyssey Logistics, Interior",
      "description": "A compact 10,000 sq.ft. logistics head office in Gundecha Onclave dressed in warm wood, marble and brass for a refined, residential-feeling workplace."
    }
  },
  {
    "slug": "sgl",
    "name": "Solitaire Geological Laboratory (SGL)",
    "type": "Turnkey",
    "category": "Corporate Offices",
    "client": "Solitaire Geological Laboratory (SGL)",
    "location": "Capital, BKC, Mumbai",
    "city": "Mumbai",
    "area": "3,500 sq.ft.",
    "status": "",
    "scope": [
      "Commercial interior design",
      "Office fit-out"
    ],
    "services": [
      "Interior",
      "Turnkey"
    ],
    "cover": "/assets/projects/sgl/cover.jpg",
    "coverAlt": "Marble reception of the Solitaire Geological Laboratory office with a monolithic stone desk against a black feature wall.",
    "narrative": {
      "brief": "A 3,500 sq.ft. office for a geological laboratory at Capital, BKC, fittingly clad in dramatic stone with patterned marble floors and a sculptural black feature wall.",
      "site": "Capital, BKC, Mumbai.",
      "response": "At Capital, BKC, the Solitaire Geological Laboratory office makes stone the hero: swirling grey-marble flooring, a monolithic marble reception desk and a glossy black curved feature wall. Glass-walled boardrooms with dark marble tables sit over light wood floors, alongside a bench-seating lounge and open workstations, creating a sober, premium corporate identity."
    },
    "gallery": [
      {
        "src": "/assets/projects/sgl/g01.jpg",
        "alt": "Reception desk in patterned grey marble with an engraved logo, set against a black feature wall with framed stone art.",
        "span": "full"
      },
      {
        "src": "/assets/projects/sgl/g02.jpg",
        "alt": "Waiting lounge with bench seating, a black marble podium and glass-fronted offices over marble flooring.",
        "span": "half"
      },
      {
        "src": "/assets/projects/sgl/g03.jpg",
        "alt": "Boardroom with a dark marble table and mesh chairs enclosed in glass walls over a light wood floor.",
        "span": "half"
      },
      {
        "src": "/assets/projects/sgl/g04.jpg",
        "alt": "Glossy black curved enclosed cabin with glass doors set on dark blue-black marble flooring.",
        "span": "wide"
      },
      {
        "src": "/assets/projects/sgl/g05.jpg",
        "alt": "Conference room with a dark marble table, leather chairs and glass partitions in a dim evening setting.",
        "span": "half"
      },
      {
        "src": "/assets/projects/sgl/g06.jpg",
        "alt": "Open-plan workstations with glass partitions in low evening lighting.",
        "span": "tall"
      }
    ],
    "featured": false,
    "order": 54,
    "seo": {
      "title": "Solitaire Geological Laboratory (SGL), Interior",
      "description": "A 3,500 sq.ft. office for a geological laboratory at Capital, BKC, fittingly clad in dramatic stone with patterned marble floors and a sculptural black feature wall."
    }
  },
  {
    "slug": "talegaon-project",
    "name": "Talegaon Project",
    "type": "Exterior",
    "category": "Commercial",
    "location": "Talegaon, Pune",
    "city": "Pune",
    "area": "",
    "status": "",
    "scope": [
      "Architecture",
      "Mixed-use hotel and automobile showroom"
    ],
    "services": [
      "Architecture"
    ],
    "cover": "/assets/projects/talegaon-project/cover.jpg",
    "coverAlt": "Render of the Talegaon mixed-use hotel and showroom, a sculptural composition of angular, cantilevered volumes.",
    "gridCover": "/assets/projects/talegaon-project/cover.png",
    "narrative": {
      "brief": "A monumental mixed-use showcase pairing a hotel with an automobile showroom at Talegaon, Pune, over two basements and four floors.",
      "site": "Talegaon, Pune.",
      "response": "The Talegaon project is a monumental mixed-use development at Talegaon, Pune, combining a showcase hotel with an automobile showroom across two basement levels and four floors. Renders show a sculptural composition of angular, cantilevered volumes and a glazed showroom hall under a sweeping canopy, set within landscaped grounds with a central water channel and parking."
    },
    "gallery": [
      {
        "src": "/assets/projects/talegaon-project/g01.jpg",
        "alt": "Render of the building's sweeping cantilevered dark roof projecting over a glazed frontage.",
        "span": "full"
      },
      {
        "src": "/assets/projects/talegaon-project/g02.jpg",
        "alt": "Render of the angular, cantilevered showroom-and-hotel volume.",
        "span": "half"
      },
      {
        "src": "/assets/projects/talegaon-project/g03.jpg",
        "alt": "Aerial render of the wedge-shaped showroom building with patterned cladding and a sloping green roof.",
        "span": "half"
      },
      {
        "src": "/assets/projects/talegaon-project/g04.jpg",
        "alt": "Render of the glazed automobile showroom hall beneath a white space-frame canopy.",
        "span": "wide"
      }
    ],
    "featured": false,
    "order": 41,
    "seo": {
      "title": "Talegaon Project, Architecture",
      "description": "A monumental mixed-use showcase pairing a hotel with an automobile showroom at Talegaon, Pune, over two basements and four floors."
    }
  },
  {
    "slug": "eminent-realtors-excise-bhavan",
    "name": "Eminent Realtors Excise Bhavan",
    "type": "Turnkey",
    "category": "Institutional",
    "client": "Eminent Developers",
    "location": "Fort, Mumbai",
    "city": "Mumbai",
    "area": "",
    "status": "",
    "scope": [
      "Architecture",
      "Interiors"
    ],
    "services": [
      "Architecture"
    ],
    "cover": "/assets/projects/eminent-realtors-excise-bhavan/cover.jpg",
    "coverAlt": "Street-level view of the multi-storey Excise Bhavan government building at Fort, Mumbai.",
    "gridCover": "/assets/projects/eminent-realtors-excise-bhavan/cover.png",
    "narrative": {
      "brief": "The Excise Bhavan government building at Fort, Mumbai, with refreshed offices and excise-themed staff spaces for Eminent Developers.",
      "site": "Fort, Mumbai.",
      "response": "Excise Bhavan at Fort, Mumbai, is a government office building project for Eminent Developers. Documentation pairs a street-level view of the multi-storey building with interior views of its offices, including a staff lounge with a backlit graphic wall fitting the state-excise function, timber-panelled executive cabins and a wood-clad boardroom."
    },
    "gallery": [
      {
        "src": "/assets/projects/eminent-realtors-excise-bhavan/g01.jpg",
        "alt": "Staff lounge with a backlit graphic feature wall, wall-mounted TV, accent chair, sofa and exposed-brick niche.",
        "span": "full"
      },
      {
        "src": "/assets/projects/eminent-realtors-excise-bhavan/g02.jpg",
        "alt": "Executive cabin with timber-panelled walls, a sofa and a desk over marble flooring.",
        "span": "half"
      },
      {
        "src": "/assets/projects/eminent-realtors-excise-bhavan/g03.jpg",
        "alt": "Boardroom with a long conference table, upholstered chairs, wood panelling and a wall-mounted screen.",
        "span": "half"
      }
    ],
    "featured": false,
    "order": 44,
    "seo": {
      "title": "Eminent Realtors Excise Bhavan, Architecture",
      "description": "The Excise Bhavan government building at Fort, Mumbai, with refreshed offices and excise-themed staff spaces for Eminent Developers."
    }
  },
];
