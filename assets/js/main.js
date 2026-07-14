/* ===== DATA ===== */
/* Journey registry — safe onclick without inline JSON */
const _reg=[];
function regJourney(j){const id=_reg.length;_reg.push(j);return id;}
function getJourney(id){return _reg[id];}

const DESTINATIONS=[
  {name:"Maasai Mara",tag:"Big Five",img:"assets/dest-mara.jpg",season:"Jul – Oct",note:"Great Migration heartland"},
  {name:"Amboseli",tag:"Elephants",img:"assets/dest-amboseli.jpg",season:"Jun – Oct",note:"Kilimanjaro views"},
  {name:"Diani Beach",tag:"Coast",img:"assets/dest-diani.jpg",season:"Dec – Mar",note:"Turquoise Indian Ocean"},
  {name:"Mount Kenya",tag:"Summit",img:"assets/dest-mtkenya.jpg",season:"Jan – Feb",note:"Africa's second peak"},
  {name:"Lake Nakuru",tag:"Birdlife",img:"assets/dest-nakuru.jpg",season:"All year",note:"Flamingo mirror lakes"},
  {name:"Samburu",tag:"Rare game",img:"assets/dest-samburu.jpg",season:"Jun – Oct",note:"The Northern Five"}
];

const DEST_ITINERARIES={
  "Maasai Mara":[
    {title:"3-Day Classic Maasai Mara Safari",duration:"3 Days",description:"A concise first safari packed with big-game action and a taste of Maasai culture.",highlights:["Big Five game drives","Sunrise safari experience","Luxury camp accommodation","Maasai cultural visit"],price:"On request",img:"assets/dest-mara.jpg"},
    {title:"5-Day Great Migration Experience",duration:"5 Days",description:"Time your journey with the wildebeest and witness the drama of the river crossings.",highlights:["Migration viewing","Mara River crossings","Full-day game drives","Professional guide"],price:"On request",img:"assets/dest-mara.jpg"},
    {title:"7-Day Luxury Mara Experience",duration:"7 Days",description:"Our most indulgent Mara journey — premium lodges, private drives and a dawn balloon flight.",highlights:["Premium lodges","Balloon safari","Private game drives","Bush breakfast experience"],price:"On request",img:"assets/dest-mara.jpg"}
  ],
  "Amboseli":[
    {title:"3-Day Amboseli Explorer",duration:"3 Days",description:"Elephant herds framed by the snows of Kilimanjaro — a photographer's dream.",highlights:["Elephant encounters","Kilimanjaro viewpoints","Wildlife photography"],price:"On request",img:"assets/dest-amboseli.jpg"},
    {title:"5-Day Amboseli & Tsavo Circuit",duration:"5 Days",description:"Pair Amboseli's giants with the wild, red-earth expanses of the Tsavo parks.",highlights:["Amboseli National Park","Tsavo East","Tsavo West","Diverse wildlife habitats"],price:"On request",img:"assets/dest-amboseli.jpg"},
    {title:"Luxury Amboseli Retreat",duration:"4 Days",description:"Slow, exclusive days at a premium lodge with private drives and fine dining.",highlights:["Premium safari lodge","Exclusive game drives","Fine dining experiences"],price:"On request",img:"assets/dest-amboseli.jpg"}
  ],
  "Diani Beach":[
    {title:"3-Day Beach Escape",duration:"3 Days",description:"Unwind on powder-white sand with the warm Indian Ocean at your doorstep.",highlights:["White sand beaches","Ocean activities","Luxury resort stay"],price:"On request",img:"assets/dest-diani.jpg"},
    {title:"5-Day Coastal Adventure",duration:"5 Days",description:"Reefs, marine parks and dolphins for those who like their beach days active.",highlights:["Snorkelling","Marine park excursions","Dolphin experiences"],price:"On request",img:"assets/dest-diani.jpg"},
    {title:"7-Day Luxury Coastal Retreat",duration:"7 Days",description:"The ultimate coastal indulgence — private beach, spa days and sunset sails.",highlights:["Private beach experiences","Spa treatments","Sunset dhow cruises"],price:"On request",img:"assets/dest-diani.jpg"}
  ],
  "Mount Kenya":[
    {title:"3-Day Nature Experience",duration:"3 Days",description:"Forest trails and scenic viewpoints at the foot of Africa's second-highest peak.",highlights:["Forest trails","Scenic viewpoints","Wildlife encounters"],price:"On request",img:"assets/dest-mtkenya.jpg"},
    {title:"5-Day Mount Kenya Trek",duration:"5 Days",description:"A guided ascent through moorland and alpine scenery with comfortable mountain camps.",highlights:["Guided trekking","Mountain camps","Alpine scenery"],price:"On request",img:"assets/dest-mtkenya.jpg"},
    {title:"7-Day Ultimate Mount Kenya Expedition",duration:"7 Days",description:"Go for the summit with professional guides and endless photographic reward.",highlights:["Summit experience","Photography opportunities","Professional mountain guides"],price:"On request",img:"assets/dest-mtkenya.jpg"}
  ],
  "Lake Nakuru":[
    {title:"2-Day Flamingo Safari",duration:"2 Days",description:"Shimmering flocks of flamingo and a thriving rhino sanctuary in one short break.",highlights:["Flamingo viewing","Rhino sanctuary","Scenic landscapes"],price:"On request",img:"assets/dest-nakuru.jpg"},
    {title:"4-Day Rift Valley Explorer",duration:"4 Days",description:"String together the jewels of the Rift Valley lakes and Hell's Gate gorges.",highlights:["Lake Nakuru","Lake Naivasha","Hell's Gate"],price:"On request",img:"assets/dest-nakuru.jpg"},
    {title:"Luxury Wildlife Escape",duration:"4 Days",description:"Premium lodge comfort with private drives and superb birdwatching.",highlights:["Premium lodge stay","Private safari experience","Birdwatching excursions"],price:"On request",img:"assets/dest-nakuru.jpg"}
  ],
  "Samburu":[
    {title:"3-Day Samburu Discovery",duration:"3 Days",description:"Meet the rare northern species and the proud Samburu people of the frontier.",highlights:["Unique northern wildlife","Samburu culture","Scenic landscapes"],price:"On request",img:"assets/dest-samburu.jpg"},
    {title:"5-Day Northern Kenya Adventure",duration:"5 Days",description:"A deeper immersion into the Samburu ecosystem and its rare wildlife.",highlights:["Samburu ecosystem","Rare wildlife species","Cultural immersion"],price:"On request",img:"assets/dest-samburu.jpg"},
    {title:"Luxury Samburu Safari",duration:"4 Days",description:"Exclusive conservancies, luxury camps and guided encounters off the beaten track.",highlights:["Exclusive conservancies","Luxury accommodation","Guided wildlife encounters"],price:"On request",img:"assets/dest-samburu.jpg"}
  ]
};

/* ===== FEATURED TOURS (default "All" view per region) ===== */
const TOURS_BY_REGION={
  kenya:[
    {title:"Mara & Serengeti Signature",duration:"8 Days",price:"$4,850",category:"Luxury Safaris",destination:"Maasai Mara",highlights:["Private guide","Mara conservancy","Balloon safari"],img:"assets/dest-mara.jpg"},
    {title:"Elephants of Amboseli",duration:"5 Days",price:"$2,690",category:"Wildlife Safaris",destination:"Amboseli",highlights:["Kilimanjaro vistas","Tortilis Camp","Cultural visit"],img:"assets/dest-amboseli.jpg"},
    {title:"Bush & Beach Honeymoon",duration:"10 Days",price:"$6,120",category:"Beach Escapes",destination:"Diani Beach",highlights:["Mara + Diani","Private plunge pool","Dhow sunset"],img:"assets/dest-diani.jpg"},
    {title:"Northern Frontier Expedition",duration:"7 Days",price:"$3,940",category:"Wildlife Safaris",destination:"Samburu",highlights:["Samburu & Laikipia","Rhino tracking","Fly-in camps"],img:"assets/dest-samburu.jpg"}
  ],
  tanzania:[
    {title:"Serengeti Migration Safari",duration:"6 Days",price:"$4,800",category:"Wildlife Safaris",destination:"Serengeti",highlights:["Great Migration","Big Five","Luxury tented camp"],img:"assets/dest-mara.jpg"},
    {title:"Ngorongoro Crater Experience",duration:"4 Days",price:"$3,600",category:"Wildlife Safaris",destination:"Ngorongoro",highlights:["Crater floor drive","Rhino sighting","Maasai boma"],img:"assets/dest-amboseli.jpg"},
    {title:"Zanzibar Beach & Spice Tour",duration:"6 Days",price:"$2,900",category:"Beach Escapes",destination:"Zanzibar",highlights:["Stone Town","Spice tour","White sand beaches"],img:"assets/dest-diani.jpg"},
    {title:"Kilimanjaro Climb — Machame",duration:"8 Days",price:"$3,400",category:"Mountain Adventures",destination:"Mount Kilimanjaro",highlights:["Machame route","Summit night","Uhuru Peak"],img:"assets/dest-mtkenya.jpg"}
  ],
  combo:[
    {title:"Kenya & Tanzania Grand Safari",duration:"12 Days",price:"$8,900",category:"Wildlife Safaris",destination:"Mara & Serengeti",highlights:["Mara conservancy","Serengeti crossings","Ngorongoro Crater"],img:"assets/dest-mara.jpg"},
    {title:"Migration Trail: Mara to Serengeti",duration:"10 Days",price:"$7,600",category:"Wildlife Safaris",destination:"Mara — Serengeti",highlights:["Follow the herds","Cross-border flight","Luxury lodges"],img:"assets/exp-migration.jpg"},
    {title:"Ultimate East Africa: Bush, Peak & Beach",duration:"14 Days",price:"$10,200",category:"Luxury Safaris",destination:"Kenya & Tanzania",highlights:["Amboseli","Ngorongoro","Serengeti","Zanzibar"],img:"assets/dest-diani.jpg"},
    {title:"East Africa Honeymoon Escape",duration:"9 Days",price:"$8,400",category:"Luxury Safaris",destination:"Mara — Crater — Zanzibar",highlights:["Private drives","Crater sundowner","Beach villa"],img:"assets/exp-balloon.jpg"}
  ]
};

/* ===== CATEGORY DATA PER REGION ===== */
const CATEGORIES_BY_REGION={
  kenya:{
    "Wildlife Safaris":[
      {title:"Maasai Mara Big Five Safari",destination:"Maasai Mara",category:"Wildlife Safaris",duration:"5 Days",highlights:["Big Five","River crossings","Expert tracker"],price:"$3,600",img:"assets/dest-mara.jpg"},
      {title:"Amboseli Elephant Safari",destination:"Amboseli",category:"Wildlife Safaris",duration:"4 Days",highlights:["Giant tuskers","Kili backdrop","Photo blinds"],price:"$2,800",img:"assets/dest-amboseli.jpg"},
      {title:"Samburu Wildlife Expedition",destination:"Samburu",category:"Wildlife Safaris",duration:"4 Days",highlights:["Grevy's zebra","Reticulated giraffe","Gerenuk"],price:"$3,000",img:"assets/dest-samburu.jpg"},
      {title:"Tsavo East Explorer",destination:"Tsavo East",category:"Wildlife Safaris",duration:"3 Days",highlights:["Red elephants","Galana River","Mudanda Rock"],price:"$1,800",img:"assets/dest-amboseli.jpg"},
      {title:"Tsavo West & Mzima Springs",destination:"Tsavo West",category:"Wildlife Safaris",duration:"3 Days",highlights:["Mzima Springs","Shetani lava","Rhino sanctuary"],price:"$1,900",img:"assets/dest-nakuru.jpg"},
      {title:"Lake Nakuru Flamingo Safari",destination:"Lake Nakuru",category:"Wildlife Safaris",duration:"2 Days",highlights:["Flamingo spectacle","Rhino sanctuary","Baboon cliff"],price:"$1,400",img:"assets/dest-nakuru.jpg"}
    ],
    "Beach Escapes":[
      {title:"Diani Beach Getaway",destination:"Diani Beach",category:"Beach Escapes",duration:"5 Days",highlights:["White sand","Reef snorkelling","Kite surf"],price:"$2,100",img:"assets/dest-diani.jpg"},
      {title:"Watamu Marine Adventure",destination:"Watamu",category:"Beach Escapes",duration:"4 Days",highlights:["Marine park","Dolphin swim","Turtle nesting"],price:"$1,850",img:"assets/dest-diani.jpg"},
      {title:"Malindi Coastal Retreat",destination:"Malindi",category:"Beach Escapes",duration:"4 Days",highlights:["Vasco da Gama pillar","Deep-sea fishing","Coral gardens"],price:"$1,700",img:"assets/dest-diani.jpg"},
      {title:"Lamu Island Escape",destination:"Lamu",category:"Beach Escapes",duration:"5 Days",highlights:["Swahili houses","Donkey lanes","Sunset dhow"],price:"$2,400",img:"assets/dest-diani.jpg"}
    ],
    "Mountain Adventures":[
      {title:"Mount Kenya Climb — Sirimon-Chogoria",destination:"Mount Kenya",category:"Mountain Adventures",duration:"6 Days",highlights:["Point Lenana","Alpine tarns","Chogoria route"],price:"$2,400",img:"assets/dest-mtkenya.jpg"},
      {title:"Mount Kenya Nature Trek",destination:"Mount Kenya",category:"Mountain Adventures",duration:"3 Days",highlights:["Forest trails","Scenic viewpoints","Wildlife encounters"],price:"$1,200",img:"assets/dest-mtkenya.jpg"},
      {title:"Aberdare Ranges Expedition",destination:"Aberdare Ranges",category:"Mountain Adventures",duration:"3 Days",highlights:["Karuru Falls","Bamboo forest","Moorland hike"],price:"$1,500",img:"assets/dest-mtkenya.jpg"}
    ],
    "Cultural Experiences":[
      {title:"Maasai Cultural Immersion",destination:"Maasai Mara",category:"Cultural Experiences",duration:"3 Days",highlights:["Village stay","Warrior training","Beadwork"],price:"$1,400",img:"assets/exp-culture.jpg"},
      {title:"Samburu Cultural Journey",destination:"Samburu",category:"Cultural Experiences",duration:"3 Days",highlights:["Singing wells","Elder stories","Craft market"],price:"$1,500",img:"assets/exp-culture.jpg"},
      {title:"Lamu Heritage Tour",destination:"Lamu",category:"Cultural Experiences",duration:"4 Days",highlights:["UNESCO stone town","Swahili cuisine","Dhow building"],price:"$1,900",img:"assets/dest-diani.jpg"}
    ],
    "Luxury Safaris":[
      {title:"Maasai Mara Luxury Safari",destination:"Maasai Mara",category:"Luxury Safaris",duration:"6 Days",highlights:["Private guide","Conservancy stays","Balloon safari"],price:"$5,200",img:"assets/dest-mara.jpg"},
      {title:"Amboseli Luxury Retreat",destination:"Amboseli",category:"Luxury Safaris",duration:"4 Days",highlights:["Kilimanjaro views","Tortilis Camp","Sundowners"],price:"$3,900",img:"assets/dest-amboseli.jpg"},
      {title:"Lewa Conservancy Experience",destination:"Lewa",category:"Luxury Safaris",duration:"5 Days",highlights:["Black rhino tracking","Private conservancy","Horseback safari"],price:"$5,800",img:"assets/dest-samburu.jpg"}
    ]
  },
  tanzania:{
    "Wildlife Safaris":[
      {title:"Serengeti Migration Safari",destination:"Serengeti",category:"Wildlife Safaris",duration:"6 Days",highlights:["Great Migration","Big Five","Luxury tented camp"],price:"$4,800",img:"assets/dest-mara.jpg"},
      {title:"Ngorongoro Crater Explorer",destination:"Ngorongoro",category:"Wildlife Safaris",duration:"4 Days",highlights:["Crater floor drive","Black rhino","25,000 animals"],price:"$3,600",img:"assets/dest-amboseli.jpg"},
      {title:"Tarangire Elephant Safari",destination:"Tarangire",category:"Wildlife Safaris",duration:"3 Days",highlights:["Elephant herds","Baobab landscape","Tree-climbing lions"],price:"$2,200",img:"assets/dest-samburu.jpg"},
      {title:"Lake Manyara Tree-top Safari",destination:"Lake Manyara",category:"Wildlife Safaris",duration:"2 Days",highlights:["Tree-climbing lions","Flamingo flocks","Canopy walkway"],price:"$1,600",img:"assets/dest-nakuru.jpg"},
      {title:"Ruaha Wilderness Safari",destination:"Ruaha",category:"Wildlife Safaris",duration:"5 Days",highlights:["Wild dog packs","Remote wilderness","Walking safari"],price:"$4,500",img:"assets/dest-samburu.jpg"},
      {title:"Nyerere (Selous) River Safari",destination:"Nyerere",category:"Wildlife Safaris",duration:"4 Days",highlights:["Boat safari","Walking safari","Rufiji River"],price:"$3,800",img:"assets/dest-nakuru.jpg"}
    ],
    "Beach Escapes":[
      {title:"Zanzibar Beach & Stone Town",destination:"Zanzibar",category:"Beach Escapes",duration:"6 Days",highlights:["Stone Town","Spice tour","Crystal waters"],price:"$2,900",img:"assets/dest-diani.jpg"},
      {title:"Nungwi Beach Paradise",destination:"Nungwi Beach",category:"Beach Escapes",duration:"5 Days",highlights:["Sunset point","Dhow sailing","Mnarani turtles"],price:"$2,400",img:"assets/dest-diani.jpg"},
      {title:"Paje Beach Kite & Dive",destination:"Paje Beach",category:"Beach Escapes",duration:"4 Days",highlights:["Kite surfing","Jozani forest","Blue lagoon"],price:"$2,100",img:"assets/dest-diani.jpg"},
      {title:"Matemwe Reef Retreat",destination:"Matemwe Beach",category:"Beach Escapes",duration:"5 Days",highlights:["Mnemba atoll snorkelling","Local fishing village","Sunrise beach"],price:"$2,600",img:"assets/dest-diani.jpg"},
      {title:"Mafia Island Diving Expedition",destination:"Mafia Island",category:"Beach Escapes",duration:"5 Days",highlights:["Whale shark season","Marine park diving","Remote island"],price:"$3,200",img:"assets/dest-diani.jpg"}
    ],
    "Mountain Adventures":[
      {title:"Kilimanjaro Climb — Machame Route",destination:"Mount Kilimanjaro",category:"Mountain Adventures",duration:"8 Days",highlights:["Machame route","Summit night","Uhuru Peak"],price:"$3,400",img:"assets/dest-mtkenya.jpg"},
      {title:"Kilimanjaro — Lemosho Route",destination:"Mount Kilimanjaro",category:"Mountain Adventures",duration:"9 Days",highlights:["Lemosho route","High acclimatisation","Scenic ridge walk"],price:"$3,800",img:"assets/dest-mtkenya.jpg"},
      {title:"Mount Meru Trek",destination:"Mount Meru",category:"Mountain Adventures",duration:"4 Days",highlights:["Arusha National Park","Socialist Peak","Giraffe encounters"],price:"$1,800",img:"assets/dest-mtkenya.jpg"},
      {title:"Usambara Mountains Hiking",destination:"Usambara Mountains",category:"Mountain Adventures",duration:"3 Days",highlights:["Lush rainforest","Village walks","Viewpoint hikes"],price:"$1,200",img:"assets/dest-mtkenya.jpg"}
    ],
    "Cultural Experiences":[
      {title:"Maasai Cultural Experience",destination:"Arusha",category:"Cultural Experiences",duration:"2 Days",highlights:["Boma visit","Cattle ceremony","Traditional dance"],price:"$800",img:"assets/exp-culture.jpg"},
      {title:"Hadzabe Tribe Experience",destination:"Lake Eyasi",category:"Cultural Experiences",duration:"3 Days",highlights:["Hunter-gatherer walk","Bow & arrow hunt","Cave paintings"],price:"$1,600",img:"assets/exp-culture.jpg"},
      {title:"Datoga Cultural Tour",destination:"Lake Eyasi",category:"Cultural Experiences",duration:"2 Days",highlights:["Blacksmith workshop","Traditional jewellery","Tribal stories"],price:"$1,100",img:"assets/exp-culture.jpg"},
      {title:"Stone Town Heritage Tour",destination:"Zanzibar",category:"Cultural Experiences",duration:"3 Days",highlights:["UNESCO old town","Slave trade history","Freddie Mercury house"],price:"$1,400",img:"assets/dest-diani.jpg"}
    ],
    "Luxury Safaris":[
      {title:"Serengeti Luxury Safari",destination:"Serengeti",category:"Luxury Safaris",duration:"6 Days",highlights:["Private mobile camp","Balloon safari","Bush dining"],price:"$7,200",img:"assets/dest-mara.jpg"},
      {title:"Ngorongoro Luxury Retreat",destination:"Ngorongoro",category:"Luxury Safaris",duration:"4 Days",highlights:["Crater-rim lodge","Private crater drive","Maasai sundowner"],price:"$5,400",img:"assets/dest-amboseli.jpg"},
      {title:"Zanzibar Luxury Escape",destination:"Zanzibar",category:"Luxury Safaris",duration:"5 Days",highlights:["Private beach villa","Sunset dhow cruise","Spa & wellness"],price:"$4,800",img:"assets/dest-diani.jpg"}
    ]
  },
  combo:{
    "Wildlife Safaris":[
      {title:"Maasai Mara & Serengeti Migration Safari",destination:"Mara & Serengeti",category:"Wildlife Safaris",duration:"10 Days",highlights:["Cross-border migration","Big Five","River crossings both sides"],price:"$7,600",img:"assets/dest-mara.jpg"},
      {title:"Kenya & Tanzania Big Five Safari",destination:"Amboseli — Ngorongoro — Serengeti",category:"Wildlife Safaris",duration:"9 Days",highlights:["Amboseli elephants","Ngorongoro Crater","Serengeti plains"],price:"$6,800",img:"assets/dest-amboseli.jpg"},
      {title:"Amboseli & Ngorongoro Explorer",destination:"Amboseli & Ngorongoro",category:"Wildlife Safaris",duration:"7 Days",highlights:["Kilimanjaro views","Crater descent","Cross-border transfer"],price:"$5,200",img:"assets/dest-amboseli.jpg"}
    ],
    "Beach Escapes":[
      {title:"Diani & Zanzibar Escape",destination:"Diani — Zanzibar",category:"Beach Escapes",duration:"10 Days",highlights:["Kenya coast","Zanzibar spice","Two Indian Ocean gems"],price:"$4,800",img:"assets/dest-diani.jpg"},
      {title:"Kenya Coast & Zanzibar Experience",destination:"Watamu — Zanzibar",category:"Beach Escapes",duration:"8 Days",highlights:["Watamu marine park","Stone Town","Nungwi sunset"],price:"$4,200",img:"assets/dest-diani.jpg"}
    ],
    "Mountain Adventures":[
      {title:"Mount Kenya & Kilimanjaro Expedition",destination:"Mt Kenya — Mt Kilimanjaro",category:"Mountain Adventures",duration:"14 Days",highlights:["Point Lenana","Uhuru Peak","Two-summit challenge"],price:"$6,200",img:"assets/dest-mtkenya.jpg"},
      {title:"East Africa Peaks Adventure",destination:"Mt Kenya — Mt Meru — Kilimanjaro",category:"Mountain Adventures",duration:"18 Days",highlights:["Three-peak journey","Alpine to tropical","Ultimate endurance"],price:"$7,800",img:"assets/dest-mtkenya.jpg"}
    ],
    "Cultural Experiences":[
      {title:"Kenya & Tanzania Cultural Discovery",destination:"Mara — Eyasi — Zanzibar",category:"Cultural Experiences",duration:"10 Days",highlights:["Maasai warriors","Hadzabe hunters","Stone Town heritage"],price:"$5,400",img:"assets/exp-culture.jpg"},
      {title:"Maasai Heritage Journey",destination:"Kenya & Tanzania Maasailand",category:"Cultural Experiences",duration:"6 Days",highlights:["Kenya Maasai boma","Tanzania Maasai village","Cross-border culture"],price:"$3,200",img:"assets/exp-culture.jpg"}
    ],
    "Luxury Safaris":[
      {title:"Ultimate East Africa Luxury Safari",destination:"Mara — Serengeti — Ngorongoro — Zanzibar",category:"Luxury Safaris",duration:"14 Days",highlights:["Fly-in transfers","5-star lodges","Private guide throughout"],price:"$12,500",img:"assets/dest-mara.jpg"},
      {title:"Kenya, Tanzania & Zanzibar Premium",destination:"Amboseli — Serengeti — Zanzibar",category:"Luxury Safaris",duration:"12 Days",highlights:["Amboseli luxury lodge","Serengeti mobile camp","Zanzibar beach villa"],price:"$10,200",img:"assets/dest-diani.jpg"}
    ]
  }
};

/* ===== DYNAMIC STATE ===== */
let activeRegion='kenya';
let CATEGORY_JOURNEYS=CATEGORIES_BY_REGION.kenya;
let TOURS=TOURS_BY_REGION.kenya;
let ALL_JOURNEYS=Object.values(CATEGORY_JOURNEYS).flat();
const FILTERS=["All","Wildlife Safaris","Beach Escapes","Mountain Adventures","Cultural Experiences","Luxury Safaris"];
const REGION_LABELS={kenya:"Kenya Tours",tanzania:"Tanzania Tours",combo:"East Africa Combo Tours"};
const EXPERIENCES=[
  {title:"The Great Migration",copy:"Witness a million wildebeest thunder across the Mara River between July and October.",img:"assets/exp-migration.jpg"},
  {title:"Balloon at First Light",copy:"Drift silently over the plains at dawn and land to a champagne bush breakfast.",img:"assets/exp-balloon.jpg"},
  {title:"Under Canvas, Above Standard",copy:"Sleep in hand-picked tented camps and lodges chosen for craft, comfort and conscience.",img:"assets/exp-lodge.jpg"},
  {title:"Meet the Maasai",copy:"Share an evening with elders, warriors and storytellers on their own land.",img:"assets/exp-culture.jpg"}
];
const REASONS=[
  {icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',title:"Local Expertise",copy:"Nairobi-based team, born and raised on Kenyan roads and rivers."},
  {icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>',title:"Licensed Guides",copy:"KPSGA silver & gold guides with a decade in the bush, minimum."},
  {icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>',title:"Best-Price Promise",copy:"Direct with camps and lodges. No middlemen, no markup surprises."},
  {icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 17 3.5s1.5 7 4.8 8.8a4.9 4.9 0 0 1-2.6 8.5c-2.1.3-4-.5-5.2-1.8"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',title:"Conservation First",copy:"Every journey contributes to conservancies and community schools."}
];
const TESTIMONIALS=[
  {name:"Venerandah M",from:"Copenhagen, Denmark",quote:"My experience with Kedi Trail Adventures was nothing short of amazing! If you're planning your next gateaway, don't think twice, go for Kedi Trail Adventures. You'll love every moment.",rating:5},
  {name:"Agnes & Family",from:"London, UK",quote:"The best part of our trip to Meru National Park was a surprising walking safari. It was amazing to see all animals from the ground. If you want a fun adventure, definitely contact Kedi Trail.",rating:5},
  {name:"Priya M.",from:"Mumbai, India",quote:"Solo, safe, spectacular. I felt looked after from the moment I landed to the moment I flew home. Highly recommend Kedi Trail Adventures.",rating:5}
];

/* ===== STATE ===== */
let searchActive=false,activeFilter="All",searchWhenValue="";

/* ===== SVG HELPERS ===== */
const arrowSVG='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';
const heartSVG='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>';
const starSVG='<svg width="16" height="16" viewBox="0 0 24 24" fill="var(--gold)" stroke="var(--gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
const closeSVG='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';

/* ===== RENDER FUNCTIONS ===== */
function renderDestinations(){
  const g=document.getElementById('destinationsGrid');
  g.innerHTML=DESTINATIONS.map(d=>`
    <article class="group" role="button" tabindex="0" onclick="openDestPanel('${d.name}')" onkeydown="if(event.key==='Enter')openDestPanel('${d.name}')" style="position:relative;cursor:pointer;overflow:hidden;border-radius:1.5rem;background:rgba(0,0,0,.4)">
      <div class="aspect-4-5" style="width:100%;overflow:hidden">
        <img src="${d.img}" alt="${d.name}" loading="lazy" width="1200" height="1500" class="img-zoom" style="width:100%;height:100%;object-fit:cover" />
      </div>
      <div style="position:absolute;inset:0;background:linear-gradient(to top,var(--charcoal),rgba(0,0,0,.4) 50%,transparent)"></div>
      <div style="position:absolute;inset:0 0 auto 0;display:flex;align-items:center;justify-content:space-between;padding:1.25rem">
        <span class="glass" style="border-radius:999px;padding:0.25rem 0.75rem;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em">${d.tag}</span>
        <span style="border-radius:999px;background:var(--gold);padding:0.25rem 0.75rem;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--charcoal)">${d.season}</span>
      </div>
      <div style="position:absolute;inset:auto 0 0 0;padding:1.5rem">
        <h3 class="font-serif" style="font-size:1.875rem;font-weight:500;line-height:1">${d.name}</h3>
        <p style="margin-top:0.5rem;font-size:.875rem;color:rgba(255,255,255,.75)">${d.note}</p>
        <span style="margin-top:1.25rem;display:flex;align-items:center;gap:0.5rem;font-size:.875rem;font-weight:600;color:var(--gold)">Explore itineraries ${arrowSVG}</span>
      </div>
    </article>
  `).join('');
}

function renderTourCard(t,idx,isSearch){
  const highlighted=isSearch&&idx<2;
  return `
    <article class="group card-hover" style="overflow:hidden;border-radius:1.5rem;background:var(--card);box-shadow:0 20px 60px -30px rgba(30,77,43,.35);transition:all .3s${highlighted?';outline:2px solid var(--gold);outline-offset:2px':''}">
      <div class="aspect-16-10" style="position:relative;overflow:hidden">
        <img src="${t.img}" alt="${t.title}" loading="lazy" class="img-zoom" style="width:100%;height:100%;object-fit:cover" />
        <button aria-label="Save" class="glass" style="position:absolute;right:1rem;top:1rem;width:2.5rem;height:2.5rem;border-radius:999px;display:grid;place-items:center;color:white;transition:all .2s">${heartSVG}</button>
        <div style="position:absolute;left:1rem;top:1rem;display:flex;flex-wrap:wrap;gap:0.5rem">
          <span style="border-radius:999px;background:var(--gold);padding:0.25rem 0.75rem;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--charcoal)">${t.category}</span>
          <span class="glass-dark" style="border-radius:999px;padding:0.25rem 0.75rem;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:white">${t.duration}</span>
          ${highlighted?'<span style="border-radius:999px;background:var(--sunset);padding:0.25rem 0.75rem;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:white">Best match</span>':''}
        </div>
      </div>
      <div style="padding:1.75rem">
        <div style="display:flex;align-items:center;gap:0.25rem;color:var(--gold)">${starSVG.repeat(5)}<span style="margin-left:0.5rem;font-size:.875rem;font-weight:500;color:var(--muted-foreground)">${t.destination}</span></div>
        <h3 class="font-serif" style="margin-top:0.75rem;font-size:1.5rem;font-weight:500;color:var(--forest)">${t.title}</h3>
        <div style="margin-top:1rem;display:flex;flex-wrap:wrap;gap:0.5rem;font-size:0.75rem;color:var(--muted-foreground)">${t.highlights.map(h=>`<span style="border-radius:999px;background:var(--muted);padding:0.25rem 0.75rem">${h}</span>`).join('')}</div>
        <div style="margin-top:1.5rem;display:flex;align-items:flex-end;justify-content:space-between;gap:1rem">
          <div><div style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted-foreground)">From</div><div class="font-serif" style="font-size:1.875rem;font-weight:600;color:var(--charcoal)">${t.price}<span style="font-size:.875rem;font-weight:400;color:var(--muted-foreground)"> / person</span></div></div>
          <button onclick='openEnquiryModal(${JSON.stringify(t).replace(/'/g,"&#39;")})' class="btn-primary" style="font-size:.875rem">Enquire ${arrowSVG}</button>
        </div>
      </div>
    </article>`;
}

function renderTours(){
  const g=document.getElementById('toursGrid');
  const s=document.getElementById('searchStatus');
  let pool;
  if(searchActive){
    const dest=document.getElementById('searchDest').value;
    const trav=document.getElementById('searchTrav').value;
    const scored=ALL_JOURNEYS.map(j=>({j,s:scoreJourney(j,dest,trav)})).sort((a,b)=>b.s-a.s);
    const strong=scored.filter(x=>x.s>=8);
    pool=(strong.length?strong:scored).slice(0,6).map(x=>x.j);
    s.style.display='flex';
    s.innerHTML=`<div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;color:var(--forest)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg><span style="font-weight:600">${pool.length}</span><span style="color:var(--muted-foreground)">matching journeys for "${dest}" · ${trav}${searchWhenValue?' · '+searchWhenValue:''}</span></div><button onclick="resetFilters()" style="font-size:0.75rem;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--gold)">Reset</button>`;
  }else if(activeFilter!=='All'){
    pool=(CATEGORY_JOURNEYS[activeFilter]||[]).slice(0,6);
    s.style.display='flex';
    s.innerHTML=`<div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;color:var(--forest)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg><span style="font-weight:600">${pool.length}</span><span style="color:var(--muted-foreground)">journeys in ${activeFilter}</span></div><button onclick="resetFilters()" style="font-size:0.75rem;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--gold)">Reset</button>`;
  }else{
    pool=TOURS;
    s.style.display='none';
  }
  g.innerHTML=pool.map((t,i)=>renderTourCard(t,i,searchActive)).join('');
}

function renderFilterBtns(){
  const g=document.getElementById('filterBtns');
  g.innerHTML=FILTERS.map(f=>{
    const active=activeFilter===f&&!searchActive;
    return `<button onclick="setFilter('${f}')" style="border-radius:999px;border:1px solid ${active?'var(--forest)':'var(--border)'};padding:0.5rem 1rem;transition:all .2s;background:${active?'var(--forest)':'var(--card)'};color:${active?'var(--ivory)':'inherit'}">${f}</button>`;
  }).join('');
}

function renderExperiences(){
  const g=document.getElementById('experiencesGrid');
  g.innerHTML=EXPERIENCES.map((e,i)=>`
    <article class="exp-card${i%2===1?' reverse':''}">
      <div class="exp-img-wrap" style="position:relative;overflow:hidden;border-radius:1rem"><div class="aspect-16-11"><img src="${e.img}" alt="${e.title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;transition:transform 1400ms" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" /></div></div>
      <div style="display:flex;flex-direction:column;justify-content:center;padding:1.5rem">
        <span class="eyebrow">0${i+1} · Experience</span>
        <h3 class="font-serif" style="margin-top:1rem;font-size:clamp(1.5rem,4vw,2.25rem);font-weight:500;color:var(--forest)">${e.title}</h3>
        <p style="margin-top:1.25rem;font-size:1.125rem;line-height:1.8;color:var(--muted-foreground)">${e.copy}</p>
        <a href="#contact" class="gold-underline" style="margin-top:2rem;display:inline-flex;width:fit-content;align-items:center;gap:0.5rem;font-size:.875rem;font-weight:600;color:var(--forest)">Design this experience ${arrowSVG}</a>
      </div>
    </article>
  `).join('');
}

function renderReasons(){
  const g=document.getElementById('reasonsGrid');
  g.innerHTML=REASONS.map(r=>`
    <div class="glass" style="border-radius:1rem;padding:1.5rem">
      <div style="display:grid;width:2.75rem;height:2.75rem;place-items:center;border-radius:0.75rem;background:var(--gold);color:var(--charcoal)">${r.icon}</div>
      <h3 class="font-serif" style="margin-top:1.25rem;font-size:1.25rem;font-weight:500">${r.title}</h3>
      <p style="margin-top:0.5rem;font-size:.875rem;color:rgba(255,255,255,.75)">${r.copy}</p>
    </div>
  `).join('');
}

function renderTestimonials(){
  const g=document.getElementById('testimonialsGrid');
  g.innerHTML=TESTIMONIALS.map(t=>`
    <figure style="display:flex;height:100%;flex-direction:column;border-radius:1.5rem;border:1px solid var(--border);background:var(--card);padding:2rem">
      <div style="display:flex;align-items:center;gap:0.25rem;color:var(--gold)">${starSVG.repeat(t.rating)}</div>
      <blockquote class="font-serif" style="margin-top:1.25rem;font-size:1.25rem;line-height:1.4;color:var(--charcoal)">\u201C${t.quote}\u201D</blockquote>
      <figcaption style="margin-top:auto;padding-top:2rem">
        <div style="font-weight:600;color:var(--forest)">${t.name}</div>
        <div style="font-size:.875rem;color:var(--muted-foreground)">${t.from}</div>
      </figcaption>
    </figure>
  `).join('');
}

/* ===== SCORING ===== */
const KENYA_DESTS=/maasai mara|amboseli|samburu|tsavo|nakuru|diani|watamu|malindi|lamu|mount kenya|aberdare|naivasha|hell.s gate|chyulu/i;
const TANZANIA_DESTS=/serengeti|ngorongoro|tarangire|manyara|ruaha|nyerere|selous|zanzibar|nungwi|paje|matemwe|mafia|kilimanjaro|mount meru|usambara/i;
const COMBO_DESTS=/mara.*serengeti|kenya.*tanzania|diani.*zanzibar|mt kenya.*kilimanjaro|east africa/i;

function detectRegion(dest){
  const d=dest.toLowerCase();
  if(d==='anywhere'||d==='anywhere in east africa')return null;
  if(COMBO_DESTS.test(d))return 'combo';
  if(TANZANIA_DESTS.test(d))return 'tanzania';
  return 'kenya';
}

function scoreJourney(j,dest,trav){
  let s=0;const d=dest.toLowerCase().trim(),t=trav.toLowerCase();
  const hay=(j.title+' '+j.destination+' '+j.category+' '+j.highlights.join(' ')).toLowerCase();
  if(d&&d!=='anywhere'&&d!=='anywhere in east africa'){
    if(hay.includes(d))s+=10;
    /* partial matches */
    if(d==='tsavo'&&/tsavo/i.test(hay))s+=10;
    if(d==='zanzibar'&&/zanzibar|nungwi|paje|matemwe|stone town/i.test(hay))s+=8;
    if(d==='kilimanjaro'&&/kilimanjaro/i.test(hay))s+=10;
    if(d==='beach'&&/diani|watamu|malindi|lamu|zanzibar|nungwi|paje|matemwe|mafia|coast/i.test(hay))s+=8;
    if(d==='mountain'&&/mount kenya|kilimanjaro|meru|aberdare|usambara|hiking|climb/i.test(hay))s+=8;
  }else{s+=1;}
  if(t.includes('family')&&/family/i.test(j.category+j.title))s+=6;
  if(t.includes('solo')&&/cultural|adventure|wildlife/i.test(j.category))s+=2;
  if(t.includes('group')&&/adventure|cultural|wildlife/i.test(j.category))s+=3;
  if(t.includes('honeymoon')&&/honeymoon|luxury/i.test(j.category))s+=8;
  if(t.includes('luxury')&&/luxury|honeymoon/i.test(j.category))s+=6;
  return s;
}

/* ===== INTERACTIONS ===== */
function openMobileMenu(){document.getElementById('mobileMenu').style.display='block';document.body.classList.add('locked')}
function closeMobileMenu(){document.getElementById('mobileMenu').style.display='none';document.body.classList.remove('locked')}

function handleSearch(e){
  e.preventDefault();
  const dest=document.getElementById('searchDest').value;
  const region=detectRegion(dest);
  /* Auto-switch region — or search all if 'anywhere' */
  if(region){setRegion(region);}
  else{
    /* "Anywhere" — pool from all regions */
    ALL_JOURNEYS=[].concat(
      Object.values(CATEGORIES_BY_REGION.kenya).flat(),
      Object.values(CATEGORIES_BY_REGION.tanzania).flat(),
      Object.values(CATEGORIES_BY_REGION.combo).flat()
    );
  }
  searchActive=true;activeFilter='All';
  searchWhenValue=document.getElementById('whenDisplay').textContent;
  if(searchWhenValue==='Any month')searchWhenValue='';
  renderFilterBtns();renderTours();
  setTimeout(()=>document.getElementById('tours').scrollIntoView({behavior:'smooth',block:'start'}),60);
}

function setFilter(f){searchActive=false;activeFilter=f;renderFilterBtns();if(f!=='All'){openCategoryPanel(f)}renderTours()}

function resetFilters(){searchActive=false;activeFilter='All';renderFilterBtns();renderTours()}

/* ===== DESTINATION PANEL ===== */
function openDestPanel(name){
  const p=document.getElementById('destinationPanel');
  const its=DEST_ITINERARIES[name]||[];
  p.style.display='block';document.body.classList.add('locked');
  p.innerHTML=`<button aria-label="Close" onclick="closeDestPanel()" class="overlay-bg" style="width:100%;height:100%;border:none"></button>
    <aside class="slide-panel" role="dialog" style="display:flex;flex-direction:column;overflow:hidden">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:1rem;border-bottom:1px solid var(--border);padding:1.25rem 1.5rem">
        <div><span class="eyebrow">Destination</span><h3 class="font-serif" style="margin-top:0.25rem;font-size:clamp(1.25rem,4vw,1.875rem);color:var(--forest)">${name} Itineraries</h3></div>
        <button aria-label="Close" onclick="closeDestPanel()" style="width:2.5rem;height:2.5rem;border-radius:999px;border:1px solid var(--border);display:grid;place-items:center;transition:all .2s">${closeSVG}</button>
      </div>
      <div style="flex:1;overflow-y:auto;padding:1.5rem">
        <div style="display:flex;flex-direction:column;gap:1.25rem">${its.map(it=>`
          <article class="group card-hover" style="overflow:hidden;border-radius:1rem;border:1px solid var(--border);background:var(--card);transition:border-color .3s">
            <div class="aspect-16-9" style="position:relative;overflow:hidden"><img src="${it.img}" alt="${it.title}" loading="lazy" class="img-zoom" style="width:100%;height:100%;object-fit:cover"/><span class="glass-dark" style="position:absolute;left:1rem;top:1rem;border-radius:999px;padding:0.25rem 0.75rem;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:white">${it.duration}</span></div>
            <div style="padding:1.25rem">
              <h4 class="font-serif" style="font-size:1.25rem;color:var(--forest)">${it.title}</h4>
              <p style="margin-top:0.5rem;font-size:.875rem;line-height:1.6;color:var(--muted-foreground)">${it.description}</p>
              <div style="margin-top:1rem;display:flex;flex-wrap:wrap;gap:0.375rem;font-size:0.75rem;color:var(--muted-foreground)">${it.highlights.map(h=>`<span style="border-radius:999px;background:var(--muted);padding:0.25rem 0.75rem">${h}</span>`).join('')}</div>
              <div style="margin-top:1.25rem;display:flex;align-items:flex-end;justify-content:space-between;gap:1rem">
                <div><div style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted-foreground)">From</div><div class="font-serif" style="font-size:1.25rem;font-weight:600;color:var(--charcoal)">${it.price}<span style="font-size:.875rem;font-weight:400;color:var(--muted-foreground)"> / person</span></div></div>
                <button onclick='closeDestPanel();openEnquiryModal(${JSON.stringify({title:it.title,destination:name,category:name+" Itinerary",duration:it.duration,highlights:it.highlights,price:it.price,img:it.img}).replace(/'/g,"&#39;")})' class="btn-primary" style="font-size:.875rem">Enquire Now ${arrowSVG}</button>
              </div>
            </div>
          </article>
        `).join('')}</div>
      </div>
    </aside>`;
  document.addEventListener('keydown',destEscHandler);
}
function closeDestPanel(){document.getElementById('destinationPanel').style.display='none';document.body.classList.remove('locked');document.removeEventListener('keydown',destEscHandler)}
function destEscHandler(e){if(e.key==='Escape')closeDestPanel()}

/* ===== CATEGORY PANEL ===== */
function openCategoryPanel(cat){
  const p=document.getElementById('categoryPanel');
  const js=CATEGORY_JOURNEYS[cat]||[];
  p.style.display='block';document.body.classList.add('locked');
  p.innerHTML=`<button aria-label="Close" onclick="closeCatPanel()" class="overlay-bg" style="width:100%;height:100%;border:none"></button>
    <aside class="slide-panel panel-wide" role="dialog" style="display:flex;flex-direction:column;overflow:hidden">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:1rem;border-bottom:1px solid var(--border);padding:1.25rem 1.5rem">
        <div><span class="eyebrow">Category</span><h3 class="font-serif" style="margin-top:0.25rem;font-size:clamp(1.25rem,4vw,1.875rem);color:var(--forest)">${cat}</h3></div>
        <button aria-label="Close" onclick="closeCatPanel()" style="width:2.5rem;height:2.5rem;border-radius:999px;border:1px solid var(--border);display:grid;place-items:center;transition:all .2s">${closeSVG}</button>
      </div>
      <div style="flex:1;overflow-y:auto;padding:1.5rem">
        <div class="cat-panel-body">
          <div style="display:flex;flex-direction:column;gap:1.25rem">${js.map(j=>`
          <article class="panel-card group card-hover">
            <div style="position:relative;overflow:hidden;border-radius:0.75rem"><div class="aspect-4-3" style="overflow:hidden"><img src="${j.img}" alt="${j.title}" loading="lazy" class="img-zoom" style="width:100%;height:100%;object-fit:cover"/></div></div>
            <div style="display:flex;flex-direction:column">
              <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted-foreground)"><span style="border-radius:999px;background:var(--muted);padding:0.125rem 0.5rem;color:var(--forest)">${j.destination}</span><span>\u00B7 ${j.duration}</span></div>
              <h4 class="font-serif" style="margin-top:0.5rem;font-size:1.125rem;color:var(--forest)">${j.title}</h4>
              <div style="margin-top:0.5rem;display:flex;flex-wrap:wrap;gap:0.375rem;font-size:0.75rem;color:var(--muted-foreground)">${j.highlights.slice(0,3).map(h=>`<span style="border-radius:999px;background:var(--muted);padding:0.125rem 0.5rem">${h}</span>`).join('')}</div>
              <div style="margin-top:auto;display:flex;align-items:center;justify-content:space-between;padding-top:0.75rem">
                <div class="font-serif" style="font-size:1.125rem;font-weight:600;color:var(--charcoal)">${j.price}<span style="font-size:0.75rem;font-weight:400;color:var(--muted-foreground)"> / pp</span></div>
                <button onclick='closeCatPanel();openEnquiryModal(${JSON.stringify(j).replace(/'/g,"&#39;")})' class="btn-primary" style="font-size:0.75rem;padding:0.5rem 1rem">Enquire ${arrowSVG}</button>
              </div>
            </div>
          </article>
        `).join('')}</div>
          <div class="pkg-sidebar">${renderPkgInfo()}</div>
        </div>
      </div>
    </aside>`;
}
function closeCatPanel(){document.getElementById('categoryPanel').style.display='none';document.body.classList.remove('locked')}

/* ===== ENQUIRY MODAL ===== */
function openEnquiryModal(j){
  const m=document.getElementById('enquiryModal');
  m.style.display='flex';document.body.classList.add('locked');
  m.innerHTML=`<button aria-label="Close" onclick="closeEnquiryModal()" class="overlay-bg" style="width:100%;height:100%;border:none;position:absolute;inset:0"></button>
    <div class="modal-content">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;border-bottom:1px solid var(--border);background:var(--forest);padding:1.25rem 1.5rem;color:var(--ivory)">
        <div><span style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.22em;color:var(--gold-soft)">Request Safari</span><h3 class="font-serif" style="margin-top:0.25rem;font-size:1.25rem">${j.title}</h3></div>
        <button aria-label="Close" onclick="closeEnquiryModal()" style="width:2.5rem;height:2.5rem;flex-shrink:0;border-radius:999px;border:1px solid rgba(255,255,255,.25);display:grid;place-items:center;color:var(--ivory)">${closeSVG}</button>
      </div>
      <form id="enquiryForm" onsubmit="submitEnquiry(event,'${j.title.replace(/'/g,"\\'")}','${j.destination}','${j.duration}')" style="flex:1;overflow-y:auto;padding:1.5rem">
        <div style="display:grid;gap:0.75rem;border-radius:1rem;background:var(--muted);padding:1rem;font-size:0.75rem;grid-template-columns:repeat(2,1fr)">
          <div><div style="text-transform:uppercase;letter-spacing:0.1em;color:var(--muted-foreground)">Journey</div><div style="font-weight:600;color:var(--forest)">${j.title}</div></div>
          <div><div style="text-transform:uppercase;letter-spacing:0.1em;color:var(--muted-foreground)">Destination</div><div style="font-weight:600;color:var(--forest)">${j.destination}</div></div>
          <div><div style="text-transform:uppercase;letter-spacing:0.1em;color:var(--muted-foreground)">Category</div><div style="font-weight:600;color:var(--forest)">${j.category}</div></div>
          <div><div style="text-transform:uppercase;letter-spacing:0.1em;color:var(--muted-foreground)">Duration</div><div style="font-weight:600;color:var(--forest)">${j.duration}</div></div>
        </div>
        <div class="form-grid" style="margin-top:1.25rem">
          <label style="display:flex;flex-direction:column;gap:0.25rem;font-size:.875rem"><span style="color:var(--muted-foreground)">Full name <span style="color:var(--sunset)">*</span></span><input required placeholder="Jane Doe" style="border-radius:0.75rem;border:1px solid var(--input);background:var(--card);padding:0.75rem 1rem;font-size:.875rem;outline:none" /></label>
          <label style="display:flex;flex-direction:column;gap:0.25rem;font-size:.875rem"><span style="color:var(--muted-foreground)">Email <span style="color:var(--sunset)">*</span></span><input type="email" required placeholder="you@email.com" style="border-radius:0.75rem;border:1px solid var(--input);background:var(--card);padding:0.75rem 1rem;font-size:.875rem;outline:none" /></label>
          <label style="display:flex;flex-direction:column;gap:0.25rem;font-size:.875rem"><span style="color:var(--muted-foreground)">Phone / WhatsApp</span><input placeholder="+44 …" style="border-radius:0.75rem;border:1px solid var(--input);background:var(--card);padding:0.75rem 1rem;font-size:.875rem;outline:none" /></label>
          <label style="display:flex;flex-direction:column;gap:0.25rem;font-size:.875rem"><span style="color:var(--muted-foreground)">Country</span><input placeholder="United Kingdom" style="border-radius:0.75rem;border:1px solid var(--input);background:var(--card);padding:0.75rem 1rem;font-size:.875rem;outline:none" /></label>
          <label style="display:flex;flex-direction:column;gap:0.25rem;font-size:.875rem"><span style="color:var(--muted-foreground)">Travel dates</span><input placeholder="Aug 2026" style="border-radius:0.75rem;border:1px solid var(--input);background:var(--card);padding:0.75rem 1rem;font-size:.875rem;outline:none" /></label>
          <label style="display:flex;flex-direction:column;gap:0.25rem;font-size:.875rem"><span style="color:var(--muted-foreground)">Group size</span><input placeholder="2 adults" style="border-radius:0.75rem;border:1px solid var(--input);background:var(--card);padding:0.75rem 1rem;font-size:.875rem;outline:none" /></label>
          <label class="full" style="display:flex;flex-direction:column;gap:0.25rem;font-size:.875rem"><span style="color:var(--muted-foreground)">Additional information</span><textarea rows="3" placeholder="Custom itinerary ideas, safari preferences…" style="border-radius:0.75rem;border:1px solid var(--input);background:var(--card);padding:0.75rem 1rem;font-size:.875rem;outline:none;resize:vertical"></textarea></label>
        </div>
        <button type="submit" class="btn-primary" style="margin-top:1.5rem;width:100%">Request Safari ${arrowSVG}</button>
        <p style="margin-top:0.75rem;text-align:center;font-size:0.75rem;color:var(--muted-foreground)">We reply within 24 hours. Your details stay with us.</p>
      </form>
    </div>`;
}
function closeEnquiryModal(){document.getElementById('enquiryModal').style.display='none';document.body.classList.remove('locked')}
function submitEnquiry(e,title,dest,dur){
  e.preventDefault();
  const m=document.getElementById('enquiryModal').querySelector('.modal-content form');
  m.innerHTML=`<div style="display:flex;flex:1;flex-direction:column;align-items:center;justify-content:center;gap:1rem;padding:3.5rem 2rem;text-align:center">
    <div style="display:grid;width:3.5rem;height:3.5rem;place-items:center;border-radius:999px;background:var(--gold);color:var(--charcoal)"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg></div>
    <h4 class="font-serif" style="font-size:1.5rem;color:var(--forest)">Enquiry received</h4>
    <p style="max-width:28rem;font-size:.875rem;color:var(--muted-foreground)">Thank you — a senior travel designer will reply within 24 hours about <span style="font-weight:600;color:var(--forest)">${title}</span> (${dest}, ${dur}).</p>
    <button type="button" onclick="closeEnquiryModal()" class="btn-primary" style="margin-top:0.5rem;font-size:.875rem">Close</button>
  </div>`;
}

/* ===== WHEN PICKER ===== */
const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTHS_SHORT=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const WEEKDAYS=["Mo","Tu","We","Th","Fr","Sa","Su"];
let whenOpen=false,whenMode='date',whenViewYear=new Date().getFullYear(),whenViewMonth=new Date().getMonth(),whenSingle=null,whenRangeStart=null,whenRangeEnd=null;

function positionWhenPicker(){
  const wp=document.getElementById('whenPicker');
  const anchor=document.getElementById('whenPickerWrap');
  if(!wp||!anchor||wp.style.display==='none')return;
  const r=anchor.getBoundingClientRect();
  const pickerH=wp.offsetHeight;
  const viewH=window.innerHeight;
  /* Default: below the anchor */
  let top=r.bottom+8;
  let left=r.left;
  /* If it would overflow the bottom, flip above */
  if(top+pickerH>viewH-16){top=r.top-pickerH-8;}
  /* Clamp left so it doesn't overflow right edge */
  const maxLeft=window.innerWidth-wp.offsetWidth-12;
  if(left>maxLeft)left=maxLeft;
  if(left<12)left=12;
  wp.style.top=top+'px';
  wp.style.left=left+'px';
}

function toggleWhenPicker(){whenOpen=!whenOpen;renderWhenPicker()}
function renderWhenPicker(){
  const wp=document.getElementById('whenPicker');
  if(!whenOpen){wp.style.display='none';return}
  wp.style.display='block';
  let html=`<div style="margin-bottom:0.75rem;display:grid;grid-template-columns:repeat(3,1fr);gap:0.25rem;border-radius:999px;background:var(--muted);padding:0.25rem">
    ${['date','range','month'].map(m=>`<button type="button" onclick="setWhenMode('${m}')" class="when-mode-btn${whenMode===m?' active':''}">${m.charAt(0).toUpperCase()+m.slice(1)}</button>`).join('')}
  </div>`;
  if(whenMode==='month'){
    html+=`<div style="margin-bottom:0.5rem;display:flex;align-items:center;justify-content:space-between"><button type="button" onclick="whenViewYear--;renderWhenPicker()" style="width:2rem;height:2rem;border-radius:999px;display:grid;place-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg></button><span class="font-serif" style="font-size:1.125rem;font-weight:600;color:var(--forest)">${whenViewYear}</span><button type="button" onclick="whenViewYear++;renderWhenPicker()" style="width:2rem;height:2rem;border-radius:999px;display:grid;place-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg></button></div>`;
    html+=`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0.5rem">${MONTHS_SHORT.map((m,i)=>`<button type="button" onclick="commitWhen('${MONTHS[i]} ${whenViewYear}')" style="border-radius:0.75rem;padding:0.625rem;font-size:.875rem;font-weight:500;transition:all .2s;background:transparent" onmouseover="this.style.background='var(--muted)'" onmouseout="this.style.background='transparent'">${m}</button>`).join('')}</div>`;
  }else{
    html+=`<div style="margin-bottom:0.5rem;display:flex;align-items:center;justify-content:space-between"><button type="button" onclick="stepWhenMonth(-1)" style="width:2rem;height:2rem;border-radius:999px;display:grid;place-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg></button><span class="font-serif" style="font-size:1rem;font-weight:600;color:var(--forest)">${MONTHS[whenViewMonth]} ${whenViewYear}</span><button type="button" onclick="stepWhenMonth(1)" style="width:2rem;height:2rem;border-radius:999px;display:grid;place-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg></button></div>`;
    html+=`<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;text-align:center;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted-foreground)">${WEEKDAYS.map(w=>`<div style="padding:0.25rem">${w}</div>`).join('')}</div>`;
    const first=new Date(whenViewYear,whenViewMonth,1);const lead=(first.getDay()+6)%7;const count=new Date(whenViewYear,whenViewMonth+1,0).getDate();
    const today=new Date();today.setHours(0,0,0,0);
    html+=`<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px">`;
    for(let i=0;i<lead;i++)html+=`<div></div>`;
    for(let d=1;d<=count;d++){
      const dt=new Date(whenViewYear,whenViewMonth,d);
      const isToday=dt.toDateString()===today.toDateString();
      const isSel=(whenMode==='date'&&whenSingle&&dt.toDateString()===whenSingle.toDateString())||((whenRangeStart&&dt.toDateString()===whenRangeStart.toDateString())||(whenRangeEnd&&dt.toDateString()===whenRangeEnd.toDateString()));
      const inRange=whenMode==='range'&&whenRangeStart&&whenRangeEnd&&dt>whenRangeStart&&dt<whenRangeEnd;
      let cls='day-btn';if(isSel)cls+=' selected';if(inRange)cls+=' in-range';if(isToday&&!isSel)cls+=' today';
      html+=`<button type="button" onclick="pickWhenDay(${whenViewYear},${whenViewMonth},${d})" class="${cls}">${d}</button>`;
    }
    html+=`</div>`;
    if(whenMode==='range')html+=`<p style="margin-top:0.5rem;text-align:center;font-size:11px;color:var(--muted-foreground)">${whenRangeStart&&!whenRangeEnd?'Select an end date':'Select your travel dates'}</p>`;
  }
  if(searchWhenValue)html+=`<button type="button" onclick="clearWhen()" style="margin-top:0.75rem;display:flex;width:100%;align-items:center;justify-content:center;gap:0.375rem;font-size:0.75rem;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--gold)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg> Clear dates</button>`;
  wp.innerHTML=html;
  positionWhenPicker();
}
function setWhenMode(m){whenMode=m;whenSingle=null;whenRangeStart=null;whenRangeEnd=null;renderWhenPicker()}
function stepWhenMonth(dir){whenViewMonth+=dir;if(whenViewMonth<0){whenViewMonth=11;whenViewYear--}if(whenViewMonth>11){whenViewMonth=0;whenViewYear++}renderWhenPicker()}
function pickWhenDay(y,m,d){
  const dt=new Date(y,m,d);
  if(whenMode==='date'){whenSingle=dt;whenRangeStart=null;whenRangeEnd=null;commitWhen(`${d} ${MONTHS[m]} ${y}`);return}
  if(!whenRangeStart||(whenRangeStart&&whenRangeEnd)){whenRangeStart=dt;whenRangeEnd=null;renderWhenPicker();return}
  let s=whenRangeStart,e=dt;if(e<s)[s,e]=[e,s];whenRangeStart=s;whenRangeEnd=e;
  const fmt=s.getMonth()===e.getMonth()&&s.getFullYear()===e.getFullYear()?`${s.getDate()}–${e.getDate()} ${MONTHS[s.getMonth()]} ${s.getFullYear()}`:`${s.getDate()} ${MONTHS_SHORT[s.getMonth()]} – ${e.getDate()} ${MONTHS_SHORT[e.getMonth()]} ${s.getFullYear()}`;
  commitWhen(fmt);
}
function commitWhen(v){searchWhenValue=v;document.getElementById('whenDisplay').textContent=v;document.getElementById('whenDisplay').style.color='white';whenOpen=false;renderWhenPicker()}
function clearWhen(){searchWhenValue='';document.getElementById('whenDisplay').textContent='Any month';document.getElementById('whenDisplay').style.color='rgba(255,255,255,.7)';whenSingle=null;whenRangeStart=null;whenRangeEnd=null}

// Close when picker on outside click
document.addEventListener('mousedown',function(e){
  const wp=document.getElementById('whenPickerWrap');
  const pk=document.getElementById('whenPicker');
  if(whenOpen&&wp&&pk&&!wp.contains(e.target)&&!pk.contains(e.target)){whenOpen=false;renderWhenPicker()}
});
// Reposition picker on scroll/resize
window.addEventListener('scroll',function(){if(whenOpen)positionWhenPicker()},true);
window.addEventListener('resize',function(){if(whenOpen)positionWhenPicker()});

/* ===== SCROLL NAV ===== */
window.addEventListener('scroll',function(){
  const nav=document.getElementById('mainNav');
  if(window.scrollY>40)nav.classList.add('scrolled');else nav.classList.remove('scrolled');
});

/* ===== COUNT-UP ANIMATION ===== */
function initCountUps(){
  const els=document.querySelectorAll('[data-countup]');
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        const target=parseInt(en.target.dataset.countup);
        const span=en.target.querySelector('.count-value');
        const t0=performance.now();const dur=1600;
        function tick(t){
          const p=Math.min(1,(t-t0)/dur);const eased=1-Math.pow(1-p,3);
          span.textContent=Math.round(target*eased).toLocaleString();
          if(p<1)requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        io.unobserve(en.target);
      }
    });
  },{threshold:0.4});
  els.forEach(el=>io.observe(el));
}

/* ===== FOOTER YEAR ===== */
document.getElementById('footerYear').textContent=`© ${new Date().getFullYear()} Kedi Trail Adventures Ltd. Nairobi, Kenya. All rights reserved.`;

/* ===== MEDIA QUERY FOR SEARCH BAR BORDERS ===== */
function applySearchBorders(){
  const labels=document.querySelectorAll('#searchForm > label, #searchForm > div:not([style*="display:none"])');
  if(window.innerWidth>=768){
    labels.forEach((l,i)=>{if(i<labels.length-1)l.style.borderRight='1px solid rgba(255,255,255,.1)';else l.style.borderRight='none'});
  }else{labels.forEach(l=>l.style.borderRight='none')}
}
window.addEventListener('resize',applySearchBorders);

/* ===== HERO SLIDESHOW ===== */
(function(){
  let idx=0;
  const slides=document.querySelectorAll('.hero-slide');
  if(slides.length<2)return;
  setInterval(function(){
    slides[idx].style.opacity='0';
    idx=(idx+1)%slides.length;
    slides[idx].style.opacity='1';
  },6000);
})();

/* ===== REGION SWITCHING ===== */
function setRegion(region){
  activeRegion=region;
  CATEGORY_JOURNEYS=CATEGORIES_BY_REGION[region];
  TOURS=TOURS_BY_REGION[region];
  ALL_JOURNEYS=Object.values(CATEGORY_JOURNEYS).flat();
  searchActive=false;activeFilter='All';
  renderFilterBtns();renderTours();
  /* Update section heading */
  var h=document.getElementById('toursHeading');
  if(h)h.textContent=REGION_LABELS[region]||'Featured Journeys';
  /* Update region tabs */
  document.querySelectorAll('.region-tab').forEach(function(t){
    if(t.dataset.region===region){t.style.background='var(--gold)';t.style.color='var(--charcoal)';t.style.borderColor='var(--gold)';}
    else{t.style.background='var(--card)';t.style.color='inherit';t.style.borderColor='var(--border)';}
  });
}
function openToursRegionPanel(region){
  setRegion(region);
  setTimeout(function(){document.getElementById('tours').scrollIntoView({behavior:'smooth',block:'start'});},60);
}

/* ===== PACKAGE INCLUSIONS/EXCLUSIONS for Category Panel ===== */
const PKG_INCLUSIONS=['Accommodation as specified','Meals as per itinerary','Professional English-speaking guide','Park & conservancy entry fees','Transport during the tour','Scheduled activities & game drives','Airport transfers'];
const PKG_EXCLUSIONS=['International flights','Travel insurance','Visa fees','Personal expenses & shopping','Optional activities & extras','Tips & gratuities','Laundry services'];
function renderPkgInfo(){
  const checkSVG='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--forest)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5L20 7"/></svg>';
  const xSVG='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
  return `<div>
    <h4 class="font-serif" style="font-size:1rem;color:var(--forest);margin-bottom:1rem">What\u2019s included</h4>
    <div style="border-radius:1rem;background:color-mix(in oklab,var(--forest) 6%,white);padding:1rem;margin-bottom:1rem">
      <div style="font-size:.625rem;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:var(--forest);margin-bottom:0.625rem">Inclusions</div>
      ${PKG_INCLUSIONS.map(i=>`<div style="display:flex;align-items:flex-start;gap:0.375rem;font-size:.75rem;color:var(--charcoal);padding:0.2rem 0">${checkSVG}<span>${i}</span></div>`).join('')}
    </div>
    <div style="border-radius:1rem;background:var(--muted);padding:1rem">
      <div style="font-size:.625rem;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:var(--muted-foreground);margin-bottom:0.625rem">Exclusions</div>
      ${PKG_EXCLUSIONS.map(i=>`<div style="display:flex;align-items:flex-start;gap:0.375rem;font-size:.75rem;color:var(--muted-foreground);padding:0.2rem 0">${xSVG}<span>${i}</span></div>`).join('')}
    </div>
  </div>`;
}

/* ===== INIT ===== */
renderDestinations();renderFilterBtns();renderTours();renderExperiences();renderReasons();renderTestimonials();initCountUps();applySearchBorders();
