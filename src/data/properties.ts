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
