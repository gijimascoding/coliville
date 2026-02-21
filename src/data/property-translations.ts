type PropertyTranslation = {
  shortDescription: string;
  description: string;
  neighborhood: string;
  amenities: string[];
  nearbyLandmarks: string[];
  rooms: Record<string, { name: string; features: string[] }>;
};

export const propertyTranslations: Record<string, Record<string, PropertyTranslation>> = {
  en: {
    gramercy: {
      shortDescription: "Centrally located between Concordia and the Forum.",
      description: "The Gramercy sits in the vibrant Shaughnessy Village, one of Montreal's most walkable neighborhoods. You're minutes from Concordia, steps from Atwater Market, and surrounded by some of the city's best restaurants and bars.",
      neighborhood: "Shaughnessy Village",
      amenities: ["High-Speed WiFi", "Furnished", "Shared Kitchen", "Common Areas"],
      nearbyLandmarks: ["Concordia University", "Atwater Market", "Guy-Concordia Metro"],
      rooms: {
        "flex-basic-gramercy": {
          name: "Flex Basic",
          features: ["Shared room", "Furnished", "WiFi included"]
        },
        "flex-plus-gramercy": {
          name: "Flex Plus",
          features: ["More space", "Furnished", "WiFi included"]
        },
        "deluxe-gramercy": {
          name: "Deluxe Room",
          features: ["Premium space", "Furnished", "WiFi included"]
        }
      }
    },
    sherwin: {
      shortDescription: "Chill vibes in one of Montreal's most beloved residential areas.",
      description: "The Sherwin offers the most affordable rooms in our collection, set in the charming Notre-Dame-de-Grâce neighborhood. Known for its leafy streets, local pubs, and tight-knit community feel — it's the perfect spot for those who want a quieter pace without sacrificing city access.",
      neighborhood: "NDG / Westmount-Adjacent",
      amenities: ["High-Speed WiFi", "Furnished", "Shared Kitchen", "Common Areas"],
      nearbyLandmarks: ["Vendôme Metro", "Loyola Campus", "Monkland Village"],
      rooms: {
        "flex-basic-sherwin": {
          name: "Flex Basic",
          features: ["Most affordable", "Furnished", "WiFi included"]
        },
        "flex-balcony-sherwin": {
          name: "Flex Basic + Balcony",
          features: ["Private balcony", "Furnished", "WiFi included"]
        },
        "deluxe-sherwin": {
          name: "Deluxe Room",
          features: ["Premium space", "Furnished", "WiFi included"]
        },
        "master-ensuite-sherwin": {
          name: "Master + Ensuite Bath",
          features: ["Private bathroom", "Largest room", "Furnished", "WiFi included"]
        }
      }
    }
  },
  fr: {
    gramercy: {
      shortDescription: "Idéalement situé entre Concordia et le Forum.",
      description: "The Gramercy se trouve dans le vibrant Village Shaughnessy, l'un des quartiers les plus accessibles à pied de Montréal. Vous êtes à quelques minutes de Concordia, à deux pas du marché Atwater, et entouré de certains des meilleurs restaurants et bars de la ville.",
      neighborhood: "Village Shaughnessy",
      amenities: ["WiFi haute vitesse", "Meublé", "Cuisine partagée", "Espaces communs"],
      nearbyLandmarks: ["Université Concordia", "Marché Atwater", "Métro Guy-Concordia"],
      rooms: {
        "flex-basic-gramercy": {
          name: "Flex Basic",
          features: ["Chambre partagée", "Meublé", "WiFi inclus"]
        },
        "flex-plus-gramercy": {
          name: "Flex Plus",
          features: ["Plus d'espace", "Meublé", "WiFi inclus"]
        },
        "deluxe-gramercy": {
          name: "Deluxe Room",
          features: ["Espace premium", "Meublé", "WiFi inclus"]
        }
      }
    },
    sherwin: {
      shortDescription: "Une ambiance décontractée dans l'un des quartiers résidentiels les plus aimés de Montréal.",
      description: "The Sherwin offre les chambres les plus abordables de notre collection, situées dans le charmant quartier Notre-Dame-de-Grâce. Connu pour ses rues verdoyantes, ses pubs locaux et son esprit de communauté soudée — c'est l'endroit parfait pour ceux qui veulent un rythme plus tranquille sans sacrifier l'accès à la ville.",
      neighborhood: "NDG / Adjacent à Westmount",
      amenities: ["WiFi haute vitesse", "Meublé", "Cuisine partagée", "Espaces communs"],
      nearbyLandmarks: ["Métro Vendôme", "Campus Loyola", "Village Monkland"],
      rooms: {
        "flex-basic-sherwin": {
          name: "Flex Basic",
          features: ["Le plus abordable", "Meublé", "WiFi inclus"]
        },
        "flex-balcony-sherwin": {
          name: "Flex Basic + Balcony",
          features: ["Balcon privé", "Meublé", "WiFi inclus"]
        },
        "deluxe-sherwin": {
          name: "Deluxe Room",
          features: ["Espace premium", "Meublé", "WiFi inclus"]
        },
        "master-ensuite-sherwin": {
          name: "Master + Ensuite Bath",
          features: ["Salle de bain privée", "Plus grande chambre", "Meublé", "WiFi inclus"]
        }
      }
    }
  }
};
