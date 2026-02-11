export interface Room {
  id: string;
  name: string;
  price: number;
  priceUnit: string;
  beds: number;
  baths: number;
  images: string[];
  features?: string[];
}

export interface Property {
  id: string;
  slug: string;
  name: string;
  area: string;
  neighborhood: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  amenities: string[];
  rooms: Room[];
  nearbyLandmarks: string[];
}

export const properties: Property[] = [
  {
    id: "drummond",
    slug: "drummond",
    name: "The Drummond",
    area: "Drummond & Sherbrooke",
    neighborhood: "Downtown / Golden Square Mile",
    shortDescription: "Steps from McGill in the heart of downtown Montreal.",
    description: "Nestled in Montreal's prestigious Golden Square Mile, The Drummond puts you right in the middle of everything. Walk to McGill campus in minutes, grab coffee on Sherbrooke, or explore the underground city when winter hits. This is city living, done right.",
    heroImage: "/buildings/drummond.png",
    amenities: ["High-Speed WiFi", "Furnished", "Shared Kitchen", "Common Areas"],
    nearbyLandmarks: ["McGill University", "Sherbrooke Metro", "Montreal Museum of Fine Arts"],
    rooms: [
      {
        id: "flex-basic-drummond",
        name: "Flex Basic",
        price: 200,
        priceUnit: "week",
        beds: 5,
        baths: 2,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-drummond-1.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-drummond-2.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-drummond-3.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-drummond-4.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-drummond-5.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-drummond-6.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-drummond-7.jpg"
        ],
        features: ["Shared room", "Furnished", "WiFi included"]
      },
      {
        id: "flex-basic-balcony-drummond",
        name: "Flex Basic + Balcony",
        price: 215,
        priceUnit: "week",
        beds: 5,
        baths: 2,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-with-balcony-drummond-1.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-with-balcony-drummond-2.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-with-balcony-drummond-3.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-with-balcony-drummond-4.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-with-balcony-drummond-5.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-with-balcony-drummond-6.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-with-balcony-drummond-7.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-with-balcony-drummond-8.jpg"
        ],
        features: ["Shared room", "Private balcony", "Furnished", "WiFi included"]
      },
      {
        id: "deluxe-drummond",
        name: "Deluxe Room",
        price: 245,
        priceUnit: "week",
        beds: 3,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-drummond-1.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-drummond-2.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-drummond-3.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-drummond-4.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-drummond-5.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-drummond-6.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-drummond-7.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-drummond-8.jpg"
        ],
        features: ["More space", "Furnished", "WiFi included"]
      },
      {
        id: "master-ensuite-drummond",
        name: "Master + Ensuite Bath",
        price: 295,
        priceUnit: "week",
        beds: 1,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-drummond-1.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-drummond-2.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-drummond-3.jpg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-drummond-4.jpg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-drummond-5.jpg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-drummond-6.jpg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-drummond-7.jpg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-drummond-8.jpg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-drummond-9.jpg"
        ],
        features: ["Private bathroom", "Largest room", "Furnished", "WiFi included"]
      }
    ]
  },
  {
    id: "sherbrooke",
    slug: "sherbrooke",
    name: "The Sherbrooke",
    area: "Sherbrooke & Saint-Laurent",
    neighborhood: "Plateau-Adjacent / Latin Quarter",
    shortDescription: "Where downtown meets the Plateau — the best of both worlds.",
    description: "Sitting at the crossroads of downtown energy and Plateau charm, The Sherbrooke gives you easy access to Montreal's most vibrant neighborhoods. Metro right outside, Saint-Laurent Boulevard a block away, and all the cafés you could ever want.",
    heroImage: "/buildings/sherbrooke.png",
    amenities: ["High-Speed WiFi", "Furnished", "Shared Kitchen", "Common Areas"],
    nearbyLandmarks: ["Sherbrooke Metro", "UQAM", "Quartier Latin"],
    rooms: [
      {
        id: "flex-basic-sherbrooke",
        name: "Flex Basic",
        price: 210,
        priceUnit: "week",
        beds: 3,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-sherbrooke-1.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-sherbrooke-2.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-sherbrooke-3.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-sherbrooke-4.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-sherbrooke-5.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-sherbrooke-6.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-sherbrooke-7.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-sherbrooke-8.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-sherbrooke-9.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-sherbrooke-10.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-sherbrooke-11.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-sherbrooke-12.jpg"
        ],
        features: ["Shared room", "Furnished", "WiFi included"]
      },
      {
        id: "flex-plus-sherbrooke",
        name: "Flex Plus",
        price: 235,
        priceUnit: "week",
        beds: 3,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-sherbrooke-1.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-sherbrooke-2.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-sherbrooke-3.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-sherbrooke-4.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-sherbrooke-5.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-sherbrooke-6.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-sherbrooke-7.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-sherbrooke-8.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-sherbrooke-9.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-sherbrooke-10.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-sherbrooke-11.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-sherbrooke-12.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-sherbrooke-13.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-sherbrooke-14.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-sherbrooke-15.jpg"
        ],
        features: ["More space", "Furnished", "WiFi included"]
      },
      {
        id: "deluxe-sherbrooke",
        name: "Deluxe Room",
        price: 260,
        priceUnit: "week",
        beds: 2,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-sherbrooke-1.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-sherbrooke-2.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-sherbrooke-3.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-sherbrooke-4.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-sherbrooke-5.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-sherbrooke-6.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-sherbrooke-7.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-sherbrooke-8.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-sherbrooke-9.jpg"
        ],
        features: ["Premium space", "Furnished", "WiFi included"]
      },
      {
        id: "deluxe-balcony-sherbrooke",
        name: "Deluxe + Balcony",
        price: 280,
        priceUnit: "week",
        beds: 2,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/deluxe-balcony-room-sherbrooke-1.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-balcony-room-sherbrooke-2.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-balcony-room-sherbrooke-3.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-balcony-room-sherbrooke-4.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-balcony-room-sherbrooke-5.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-balcony-room-sherbrooke-6.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-balcony-room-sherbrooke-7.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-balcony-room-sherbrooke-8.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-balcony-room-sherbrooke-9.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-balcony-room-sherbrooke-10.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-balcony-room-sherbrooke-11.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-balcony-room-sherbrooke-12.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-balcony-room-sherbrooke-13.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-balcony-room-sherbrooke-14.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-balcony-room-sherbrooke-15.jpg"
        ],
        features: ["Premium space", "Private balcony", "Furnished", "WiFi included"]
      },
      {
        id: "deluxe-premium-sherbrooke",
        name: "Deluxe Premium",
        price: 285,
        priceUnit: "week",
        beds: 2,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/deluxe-premium-sherbrooke-1.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-premium-sherbrooke-2.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-premium-sherbrooke-3.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-premium-sherbrooke-4.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-premium-sherbrooke-5.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-premium-sherbrooke-6.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-premium-sherbrooke-7.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-premium-sherbrooke-8.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-premium-sherbrooke-9.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-premium-sherbrooke-10.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-premium-sherbrooke-11.jpg"
        ],
        features: ["Top-tier room", "Furnished", "WiFi included"]
      },
      {
        id: "studio-sherbrooke",
        name: "Studio Apartment",
        price: 420,
        priceUnit: "week",
        beds: 1,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-sherbrooke-1.jpg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-sherbrooke-2.jpg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-sherbrooke-3.jpg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-sherbrooke-4.jpg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-sherbrooke-5.jpg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-sherbrooke-6.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-sherbrooke-7.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-sherbrooke-8.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-sherbrooke-9.jpg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-sherbrooke-10.jpg"
        ],
        features: ["Full privacy", "Own kitchen", "Furnished", "WiFi included"]
      }
    ]
  },
  {
    id: "guy-concordia",
    slug: "guy-concordia",
    name: "The Guy",
    area: "Guy & de Maisonneuve",
    neighborhood: "Concordia / Downtown West",
    shortDescription: "Right by Concordia — urban living with a campus feel.",
    description: "Located in the beating heart of Concordia University's neighborhood, The Guy is perfect for students and young professionals who want to be where the action is. Crescent Street nightlife, world-class shopping on Sainte-Catherine, and two metro lines at your feet.",
    heroImage: "/buildings/guy-concordia.png",
    amenities: ["High-Speed WiFi", "Furnished", "Shared Kitchen", "Common Areas"],
    nearbyLandmarks: ["Concordia University", "Guy-Concordia Metro", "Crescent Street"],
    rooms: [
      {
        id: "flex-plus-guy",
        name: "Flex Plus",
        price: 220,
        priceUnit: "week",
        beds: 4,
        baths: 2,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-guy-and-concordia-1.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-guy-and-concordia-2.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-guy-and-concordia-3.png",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-guy-and-concordia-4.png",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-guy-and-concordia-5.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-guy-and-concordia-6.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-guy-and-concordia-7.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-guy-and-concordia-8.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-guy-and-concordia-9.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-guy-and-concordia-10.jpg"
        ],
        features: ["Shared room", "Furnished", "WiFi included"]
      },
      {
        id: "flex-premium-guy",
        name: "Flex Premium",
        price: 225,
        priceUnit: "week",
        beds: 3,
        baths: 2,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/flex-premium-guy-and-concordia-1.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-premium-guy-and-concordia-2.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-premium-guy-and-concordia-3.png",
          "https://api.harringtonhousing.com/image/xlarge/flex-premium-guy-and-concordia-4.png",
          "https://api.harringtonhousing.com/image/xlarge/flex-premium-guy-and-concordia-5.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-premium-guy-and-concordia-6.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-premium-guy-and-concordia-7.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-premium-guy-and-concordia-8.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-premium-guy-and-concordia-9.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-premium-guy-and-concordia-10.jpg"
        ],
        features: ["Upgraded room", "Furnished", "WiFi included"]
      },
      {
        id: "deluxe-guy",
        name: "Deluxe Room",
        price: 245,
        priceUnit: "week",
        beds: 2,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-guy-and-concordia-1.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-guy-and-concordia-2.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-guy-and-concordia-3.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-guy-and-concordia-4.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-guy-and-concordia-5.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-guy-and-concordia-6.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-guy-and-concordia-7.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-guy-and-concordia-8.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-guy-and-concordia-9.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-guy-and-concordia-10.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-guy-and-concordia-11.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-guy-and-concordia-12.jpg"
        ],
        features: ["Premium space", "Furnished", "WiFi included"]
      },
      {
        id: "master-semi-ensuite-guy",
        name: "Master + Semi-Ensuite",
        price: 285,
        priceUnit: "week",
        beds: 4,
        baths: 2,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-semi-ensuite-bath-guy-and-concordia-1.jpg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-semi-ensuite-bath-guy-and-concordia-2.jpg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-semi-ensuite-bath-guy-and-concordia-3.jpg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-semi-ensuite-bath-guy-and-concordia-4.jpg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-semi-ensuite-bath-guy-and-concordia-5.jpg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-semi-ensuite-bath-guy-and-concordia-6.jpg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-semi-ensuite-bath-guy-and-concordia-7.jpg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-semi-ensuite-bath-guy-and-concordia-8.jpg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-semi-ensuite-bath-guy-and-concordia-9.jpg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-semi-ensuite-bath-guy-and-concordia-10.jpg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-semi-ensuite-bath-guy-and-concordia-11.jpg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-semi-ensuite-bath-guy-and-concordia-12.jpg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-semi-ensuite-bath-guy-and-concordia-13.jpg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-semi-ensuite-bath-guy-and-concordia-14.jpg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-semi-ensuite-bath-guy-and-concordia-15.jpg"
        ],
        features: ["Semi-private bath", "Largest room", "Furnished", "WiFi included"]
      },
      {
        id: "studio-guy",
        name: "Studio Apartment",
        price: 405,
        priceUnit: "week",
        beds: 1,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-guy-and-concordia-1.jpg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-guy-and-concordia-2.jpg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-guy-and-concordia-3.jpg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-guy-and-concordia-4.jpg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-guy-and-concordia-5.jpg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-guy-and-concordia-6.jpg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-guy-and-concordia-7.jpg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-guy-and-concordia-8.jpg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-guy-and-concordia-9.jpg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-guy-and-concordia-10.jpg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-guy-and-concordia-11.jpg"
        ],
        features: ["Full privacy", "Own kitchen", "Furnished", "WiFi included"]
      }
    ]
  },
  {
    id: "mcgill-ghetto",
    slug: "mcgill-ghetto",
    name: "The Durocher",
    area: "Durocher & Milton",
    neighborhood: "McGill Ghetto / Milton-Parc",
    shortDescription: "The quintessential student neighborhood, steps from McGill gates.",
    description: "Welcome to the legendary McGill Ghetto — the most iconic student neighborhood in Montreal. Tree-lined streets, century-old brownstones, and a five-minute walk to campus. This is where memories are made and lifelong friendships begin.",
    heroImage: "/buildings/durocher.png",
    amenities: ["High-Speed WiFi", "Furnished", "Shared Kitchen", "Common Areas"],
    nearbyLandmarks: ["McGill University", "Milton & Park", "Mont-Royal"],
    rooms: [
      {
        id: "private-basic-mcgill",
        name: "Private Basic",
        price: 210,
        priceUnit: "week",
        beds: 1,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/private-basic-mcgill-ghetto-1.jpg",
          "https://api.harringtonhousing.com/image/xlarge/private-basic-mcgill-ghetto-2.jpg",
          "https://api.harringtonhousing.com/image/xlarge/private-basic-mcgill-ghetto-3.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/private-basic-mcgill-ghetto-4.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/private-basic-mcgill-ghetto-5.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/private-basic-mcgill-ghetto-6.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/private-basic-mcgill-ghetto-7.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/private-basic-mcgill-ghetto-8.jpg",
          "https://api.harringtonhousing.com/image/xlarge/private-basic-mcgill-ghetto-9.jpg"
        ],
        features: ["Private room", "Furnished", "WiFi included"]
      },
      {
        id: "flex-balcony-mcgill",
        name: "Flex + Balcony",
        price: 240,
        priceUnit: "week",
        beds: 2,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/flex-balcony-mcgill-ghetto-1.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-balcony-mcgill-ghetto-2.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-balcony-mcgill-ghetto-3.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-balcony-mcgill-ghetto-4.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-balcony-mcgill-ghetto-5.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-balcony-mcgill-ghetto-6.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-balcony-mcgill-ghetto-7.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-balcony-mcgill-ghetto-8.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-balcony-mcgill-ghetto-9.jpg"
        ],
        features: ["Private balcony", "Furnished", "WiFi included"]
      },
      {
        id: "deluxe-mcgill",
        name: "Deluxe Room",
        price: 260,
        priceUnit: "week",
        beds: 2,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-mcgill-ghetto-1.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-mcgill-ghetto-2.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-mcgill-ghetto-3.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-mcgill-ghetto-4.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-mcgill-ghetto-5.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-mcgill-ghetto-6.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-mcgill-ghetto-7.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-mcgill-ghetto-8.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-mcgill-ghetto-9.jpg"
        ],
        features: ["Premium space", "Furnished", "WiFi included"]
      },
      {
        id: "deluxe-balcony-mcgill",
        name: "Deluxe + Balcony",
        price: 285,
        priceUnit: "week",
        beds: 2,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/deluxe-balcony-room-mcgill-ghetto-1.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-balcony-room-mcgill-ghetto-2.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-balcony-room-mcgill-ghetto-3.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-balcony-room-mcgill-ghetto-4.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-balcony-room-mcgill-ghetto-5.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-balcony-room-mcgill-ghetto-6.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-balcony-room-mcgill-ghetto-7.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-balcony-room-mcgill-ghetto-8.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-balcony-room-mcgill-ghetto-9.jpg"
        ],
        features: ["Premium space", "Private balcony", "Furnished", "WiFi included"]
      },
      {
        id: "studio-mcgill",
        name: "Studio Apartment",
        price: 420,
        priceUnit: "week",
        beds: 1,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-mcgill-ghetto-1.jpg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-mcgill-ghetto-2.jpg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-mcgill-ghetto-3.jpg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-mcgill-ghetto-4.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-mcgill-ghetto-5.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-mcgill-ghetto-6.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-mcgill-ghetto-7.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-mcgill-ghetto-8.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-mcgill-ghetto-9.jpg",
          "https://api.harringtonhousing.com/image/xlarge/studio-apartment-mcgill-ghetto-10.jpg"
        ],
        features: ["Full privacy", "Own kitchen", "Furnished", "WiFi included"]
      }
    ]
  },
  {
    id: "regency",
    slug: "regency",
    name: "The Regency",
    area: "Côte-des-Neiges & Queen Mary",
    neighborhood: "Côte-des-Neiges",
    shortDescription: "A multicultural hub with easy access to UdeM and HEC.",
    description: "Côte-des-Neiges is one of Montreal's most diverse and dynamic neighborhoods. The Regency puts you close to Université de Montréal, HEC, and Polytechnique, while surrounding you with incredible food from every corner of the globe.",
    heroImage: "/buildings/regency.png",
    amenities: ["High-Speed WiFi", "Furnished", "Shared Kitchen", "Common Areas"],
    nearbyLandmarks: ["Université de Montréal", "Côte-des-Neiges Metro", "Saint Joseph's Oratory"],
    rooms: [
      {
        id: "flex-plus-regency",
        name: "Flex Plus",
        price: 235,
        priceUnit: "week",
        beds: 3,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-regency-1.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-regency-2.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-regency-3.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-regency-4.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-regency-5.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-regency-6.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-regency-7.jpg"
        ],
        features: ["Shared room", "Furnished", "WiFi included"]
      },
      {
        id: "deluxe-regency",
        name: "Deluxe Room",
        price: 260,
        priceUnit: "week",
        beds: 2,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-regency-1.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-regency-2.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-regency-3.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-regency-4.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-regency-5.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-regency-6.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-regency-7.jpg"
        ],
        features: ["Premium space", "Furnished", "WiFi included"]
      },
      {
        id: "master-ensuite-regency",
        name: "Master + Ensuite Bath",
        price: 295,
        priceUnit: "week",
        beds: 1,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-regency-1.jpg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-regency-2.jpg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-regency-3.jpg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-regency-4.jpg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-regency-5.jpg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-regency-6.jpg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-regency-7.jpg"
        ],
        features: ["Private bathroom", "Largest room", "Furnished", "WiFi included"]
      }
    ]
  },
  {
    id: "gramercy",
    slug: "gramercy",
    name: "The Gramercy",
    area: "Lincoln & Guy",
    neighborhood: "Shaughnessy Village",
    shortDescription: "Centrally located between Concordia and the Forum.",
    description: "The Gramercy sits in the vibrant Shaughnessy Village, one of Montreal's most walkable neighborhoods. You're minutes from Concordia, steps from Atwater Market, and surrounded by some of the city's best restaurants and bars.",
    heroImage: "https://api.harringtonhousing.com/image/xlarge/flex-basic-gramercy-15.jpg",
    amenities: ["High-Speed WiFi", "Furnished", "Shared Kitchen", "Common Areas"],
    nearbyLandmarks: ["Concordia University", "Atwater Market", "Guy-Concordia Metro"],
    rooms: [
      {
        id: "flex-basic-gramercy",
        name: "Flex Basic",
        price: 205,
        priceUnit: "week",
        beds: 3,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-gramercy-1.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-gramercy-2.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-gramercy-3.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-gramercy-4.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-gramercy-5.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-gramercy-6.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-gramercy-7.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-gramercy-8.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-gramercy-9.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-gramercy-10.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-gramercy-11.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-gramercy-12.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-gramercy-13.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-gramercy-14.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-gramercy-15.jpg"
        ],
        features: ["Shared room", "Furnished", "WiFi included"]
      },
      {
        id: "flex-plus-gramercy",
        name: "Flex Plus",
        price: 225,
        priceUnit: "week",
        beds: 2,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-gramercy-1.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-gramercy-2.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-gramercy-3.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-gramercy-4.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-gramercy-5.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-gramercy-6.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-plus-gramercy-7.jpg"
        ],
        features: ["More space", "Furnished", "WiFi included"]
      },
      {
        id: "deluxe-gramercy",
        name: "Deluxe Room",
        price: 245,
        priceUnit: "week",
        beds: 2,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-gramercy-1.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-gramercy-2.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-gramercy-3.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-gramercy-4.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-gramercy-5.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-gramercy-6.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-gramercy-7.jpg"
        ],
        features: ["Premium space", "Furnished", "WiFi included"]
      }
    ]
  },
  {
    id: "dominik",
    slug: "dominik",
    name: "The Dominik",
    area: "Saint-Dominique & de Maisonneuve",
    neighborhood: "Quartier Latin / Village",
    shortDescription: "Creative energy in the heart of the Latin Quarter.",
    description: "The Dominik drops you into Montreal's creative and cultural core. The Quartier Latin is full of theatres, indie cafés, and UQAM's campus energy. It's the perfect base for anyone who thrives on urban culture and community vibes.",
    heroImage: "https://api.harringtonhousing.com/image/deluxe-room-dominik-8.png",
    amenities: ["High-Speed WiFi", "Furnished", "Shared Kitchen", "Common Areas"],
    nearbyLandmarks: ["UQAM", "Berri-UQAM Metro", "Place Émilie-Gamelin"],
    rooms: [
      {
        id: "flex-basic-dominik",
        name: "Flex Basic",
        price: 190,
        priceUnit: "week",
        beds: 3,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-room-dominik-1.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-room-dominik-2.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-room-dominik-3.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-room-dominik-4.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-room-dominik-5.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-room-dominik-6.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-room-dominik-7.png"
        ],
        features: ["Shared room", "Furnished", "WiFi included"]
      },
      {
        id: "flex-balcony-dominik",
        name: "Flex + Balcony",
        price: 220,
        priceUnit: "week",
        beds: 2,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/flex-balcony-room-dominik-1.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-balcony-room-dominik-2.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-balcony-room-dominik-3.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-balcony-room-dominik-4.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-balcony-room-dominik-5.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-balcony-room-dominik-6.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-balcony-room-dominik-7.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-balcony-room-dominik-8.png",
          "https://api.harringtonhousing.com/image/xlarge/flex-balcony-room-dominik-9.png"
        ],
        features: ["Private balcony", "Furnished", "WiFi included"]
      },
      {
        id: "deluxe-dominik",
        name: "Deluxe Room",
        price: 265,
        priceUnit: "week",
        beds: 2,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-dominik-1.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-dominik-2.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-dominik-3.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-dominik-4.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-dominik-5.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-dominik-6.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-dominik-7.png",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-dominik-8.png"
        ],
        features: ["Premium space", "Furnished", "WiFi included"]
      }
    ]
  },
  {
    id: "sherwin",
    slug: "sherwin",
    name: "The Sherwin",
    area: "Hunter & de Maisonneuve",
    neighborhood: "NDG / Westmount-Adjacent",
    shortDescription: "Chill vibes in one of Montreal's most beloved residential areas.",
    description: "The Sherwin offers the most affordable rooms in our collection, set in the charming Notre-Dame-de-Grâce neighborhood. Known for its leafy streets, local pubs, and tight-knit community feel — it's the perfect spot for those who want a quieter pace without sacrificing city access.",
    heroImage: "/buildings/sherwin.jpg",
    amenities: ["High-Speed WiFi", "Furnished", "Shared Kitchen", "Common Areas"],
    nearbyLandmarks: ["Vendôme Metro", "Loyola Campus", "Monkland Village"],
    rooms: [
      {
        id: "flex-basic-sherwin",
        name: "Flex Basic",
        price: 160,
        priceUnit: "week",
        beds: 3,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-room-sherwin-1.png",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-room-sherwin-2.png",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-room-sherwin-3.png",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-room-sherwin-4.png",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-room-sherwin-5.png",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-room-sherwin-6.png",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-room-sherwin-7.png",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-room-sherwin-8.png",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-room-sherwin-9.png",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-room-sherwin-10.png",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-room-sherwin-11.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-room-sherwin-12.png"
        ],
        features: ["Most affordable", "Furnished", "WiFi included"]
      },
      {
        id: "flex-balcony-sherwin",
        name: "Flex Basic + Balcony",
        price: 185,
        priceUnit: "week",
        beds: 3,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-with-balcony-sherwin-1.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-with-balcony-sherwin-2.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-with-balcony-sherwin-3.png",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-with-balcony-sherwin-4.png",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-with-balcony-sherwin-5.png",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-with-balcony-sherwin-6.png",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-with-balcony-sherwin-7.png",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-with-balcony-sherwin-8.png",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-with-balcony-sherwin-9.png",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-with-balcony-sherwin-10.jpg",
          "https://api.harringtonhousing.com/image/xlarge/flex-basic-with-balcony-sherwin-11.png"
        ],
        features: ["Private balcony", "Furnished", "WiFi included"]
      },
      {
        id: "deluxe-sherwin",
        name: "Deluxe Room",
        price: 230,
        priceUnit: "week",
        beds: 2,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-sherwin-1.png",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-sherwin-2.png",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-sherwin-3.png",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-sherwin-4.png",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-sherwin-5.png",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-sherwin-6.png",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-sherwin-7.png",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-sherwin-8.png",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-sherwin-9.png",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-sherwin-10.png",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-sherwin-11.jpg",
          "https://api.harringtonhousing.com/image/xlarge/deluxe-room-sherwin-12.png"
        ],
        features: ["Premium space", "Furnished", "WiFi included"]
      },
      {
        id: "master-ensuite-sherwin",
        name: "Master + Ensuite Bath",
        price: 295,
        priceUnit: "week",
        beds: 1,
        baths: 1,
        images: [
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-sherwin-1.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-sherwin-2.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-sherwin-3.jpeg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-sherwin-4.png",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-sherwin-5.png",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-sherwin-6.png",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-sherwin-7.png",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-sherwin-8.png",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-sherwin-9.png",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-sherwin-10.jpg",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-sherwin-11.png",
          "https://api.harringtonhousing.com/image/xlarge/master-room-and-ensuite-bath-sherwin-12.png"
        ],
        features: ["Private bathroom", "Largest room", "Furnished", "WiFi included"]
      }
    ]
  }
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find(p => p.slug === slug);
}

export function getLowestPrice(property: Property): number {
  return Math.min(...property.rooms.map(r => r.price));
}

export function getAllRooms(): (Room & { propertyName: string; propertySlug: string; area: string })[] {
  return properties.flatMap(p =>
    p.rooms.map(r => ({
      ...r,
      propertyName: p.name,
      propertySlug: p.slug,
      area: p.area,
    }))
  );
}
