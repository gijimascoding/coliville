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
    drummond: {
      shortDescription: "Steps from McGill in the heart of downtown Montreal.",
      description: "Nestled in Montreal's prestigious Golden Square Mile, The Drummond puts you right in the middle of everything. Walk to McGill campus in minutes, grab coffee on Sherbrooke, or explore the underground city when winter hits. This is city living, done right.",
      neighborhood: "Downtown / Golden Square Mile",
      amenities: ["High-Speed WiFi", "Furnished", "Shared Kitchen", "Common Areas"],
      nearbyLandmarks: ["McGill University", "Sherbrooke Metro", "Montreal Museum of Fine Arts"],
      rooms: {
        "flex-basic-drummond": {
          name: "Flex Basic",
          features: ["Shared room", "Furnished", "WiFi included"]
        },
        "flex-basic-balcony-drummond": {
          name: "Flex Basic + Balcony",
          features: ["Shared room", "Private balcony", "Furnished", "WiFi included"]
        },
        "deluxe-drummond": {
          name: "Deluxe Room",
          features: ["More space", "Furnished", "WiFi included"]
        },
        "master-ensuite-drummond": {
          name: "Master + Ensuite Bath",
          features: ["Private bathroom", "Largest room", "Furnished", "WiFi included"]
        }
      }
    },
    sherbrooke: {
      shortDescription: "Where downtown meets the Plateau — the best of both worlds.",
      description: "Sitting at the crossroads of downtown energy and Plateau charm, The Sherbrooke gives you easy access to Montreal's most vibrant neighborhoods. Metro right outside, Saint-Laurent Boulevard a block away, and all the cafés you could ever want.",
      neighborhood: "Plateau-Adjacent / Latin Quarter",
      amenities: ["High-Speed WiFi", "Furnished", "Shared Kitchen", "Common Areas"],
      nearbyLandmarks: ["Sherbrooke Metro", "UQAM", "Quartier Latin"],
      rooms: {
        "flex-basic-sherbrooke": {
          name: "Flex Basic",
          features: ["Shared room", "Furnished", "WiFi included"]
        },
        "flex-plus-sherbrooke": {
          name: "Flex Plus",
          features: ["More space", "Furnished", "WiFi included"]
        },
        "deluxe-sherbrooke": {
          name: "Deluxe Room",
          features: ["Premium space", "Furnished", "WiFi included"]
        },
        "deluxe-balcony-sherbrooke": {
          name: "Deluxe + Balcony",
          features: ["Premium space", "Private balcony", "Furnished", "WiFi included"]
        },
        "deluxe-premium-sherbrooke": {
          name: "Deluxe Premium",
          features: ["Top-tier room", "Furnished", "WiFi included"]
        },
        "studio-sherbrooke": {
          name: "Studio Apartment",
          features: ["Full privacy", "Own kitchen", "Furnished", "WiFi included"]
        }
      }
    },
    "guy-concordia": {
      shortDescription: "Right by Concordia — urban living with a campus feel.",
      description: "Located in the beating heart of Concordia University's neighborhood, The Guy is perfect for students and young professionals who want to be where the action is. Crescent Street nightlife, world-class shopping on Sainte-Catherine, and two metro lines at your feet.",
      neighborhood: "Concordia / Downtown West",
      amenities: ["High-Speed WiFi", "Furnished", "Shared Kitchen", "Common Areas"],
      nearbyLandmarks: ["Concordia University", "Guy-Concordia Metro", "Crescent Street"],
      rooms: {
        "flex-plus-guy": {
          name: "Flex Plus",
          features: ["Shared room", "Furnished", "WiFi included"]
        },
        "flex-premium-guy": {
          name: "Flex Premium",
          features: ["Upgraded room", "Furnished", "WiFi included"]
        },
        "deluxe-guy": {
          name: "Deluxe Room",
          features: ["Premium space", "Furnished", "WiFi included"]
        },
        "master-semi-ensuite-guy": {
          name: "Master + Semi-Ensuite",
          features: ["Semi-private bath", "Largest room", "Furnished", "WiFi included"]
        },
        "studio-guy": {
          name: "Studio Apartment",
          features: ["Full privacy", "Own kitchen", "Furnished", "WiFi included"]
        }
      }
    },
    "mcgill-ghetto": {
      shortDescription: "The quintessential student neighborhood, steps from McGill gates.",
      description: "Welcome to the legendary McGill Ghetto — the most iconic student neighborhood in Montreal. Tree-lined streets, century-old brownstones, and a five-minute walk to campus. This is where memories are made and lifelong friendships begin.",
      neighborhood: "McGill Ghetto / Milton-Parc",
      amenities: ["High-Speed WiFi", "Furnished", "Shared Kitchen", "Common Areas"],
      nearbyLandmarks: ["McGill University", "Milton & Park", "Mont-Royal"],
      rooms: {
        "private-basic-mcgill": {
          name: "Private Basic",
          features: ["Private room", "Furnished", "WiFi included"]
        },
        "flex-balcony-mcgill": {
          name: "Flex + Balcony",
          features: ["Private balcony", "Furnished", "WiFi included"]
        },
        "deluxe-mcgill": {
          name: "Deluxe Room",
          features: ["Premium space", "Furnished", "WiFi included"]
        },
        "deluxe-balcony-mcgill": {
          name: "Deluxe + Balcony",
          features: ["Premium space", "Private balcony", "Furnished", "WiFi included"]
        },
        "studio-mcgill": {
          name: "Studio Apartment",
          features: ["Full privacy", "Own kitchen", "Furnished", "WiFi included"]
        }
      }
    },
    regency: {
      shortDescription: "A multicultural hub with easy access to UdeM and HEC.",
      description: "Côte-des-Neiges is one of Montreal's most diverse and dynamic neighborhoods. The Regency puts you close to Université de Montréal, HEC, and Polytechnique, while surrounding you with incredible food from every corner of the globe.",
      neighborhood: "Côte-des-Neiges",
      amenities: ["High-Speed WiFi", "Furnished", "Shared Kitchen", "Common Areas"],
      nearbyLandmarks: ["Université de Montréal", "Côte-des-Neiges Metro", "Saint Joseph's Oratory"],
      rooms: {
        "flex-plus-regency": {
          name: "Flex Plus",
          features: ["Shared room", "Furnished", "WiFi included"]
        },
        "deluxe-regency": {
          name: "Deluxe Room",
          features: ["Premium space", "Furnished", "WiFi included"]
        },
        "master-ensuite-regency": {
          name: "Master + Ensuite Bath",
          features: ["Private bathroom", "Largest room", "Furnished", "WiFi included"]
        }
      }
    },
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
    dominik: {
      shortDescription: "Creative energy in the heart of the Latin Quarter.",
      description: "The Dominik drops you into Montreal's creative and cultural core. The Quartier Latin is full of theatres, indie cafés, and UQAM's campus energy. It's the perfect base for anyone who thrives on urban culture and community vibes.",
      neighborhood: "Quartier Latin / Village",
      amenities: ["High-Speed WiFi", "Furnished", "Shared Kitchen", "Common Areas"],
      nearbyLandmarks: ["UQAM", "Berri-UQAM Metro", "Place Émilie-Gamelin"],
      rooms: {
        "flex-basic-dominik": {
          name: "Flex Basic",
          features: ["Shared room", "Furnished", "WiFi included"]
        },
        "flex-balcony-dominik": {
          name: "Flex + Balcony",
          features: ["Private balcony", "Furnished", "WiFi included"]
        },
        "deluxe-dominik": {
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
    drummond: {
      shortDescription: "À deux pas de McGill, au coeur du centre-ville de Montréal.",
      description: "Niché dans le prestigieux Mille carré doré de Montréal, The Drummond vous place au centre de tout. Marchez jusqu'au campus de McGill en quelques minutes, prenez un café sur Sherbrooke ou explorez la ville souterraine quand l'hiver arrive. C'est la vie urbaine, bien faite.",
      neighborhood: "Centre-ville / Mille carré doré",
      amenities: ["WiFi haute vitesse", "Meublé", "Cuisine partagée", "Espaces communs"],
      nearbyLandmarks: ["Université McGill", "Métro Sherbrooke", "Musée des beaux-arts de Montréal"],
      rooms: {
        "flex-basic-drummond": {
          name: "Flex Basic",
          features: ["Chambre partagée", "Meublé", "WiFi inclus"]
        },
        "flex-basic-balcony-drummond": {
          name: "Flex Basic + Balcony",
          features: ["Chambre partagée", "Balcon privé", "Meublé", "WiFi inclus"]
        },
        "deluxe-drummond": {
          name: "Deluxe Room",
          features: ["Plus d'espace", "Meublé", "WiFi inclus"]
        },
        "master-ensuite-drummond": {
          name: "Master + Ensuite Bath",
          features: ["Salle de bain privée", "Plus grande chambre", "Meublé", "WiFi inclus"]
        }
      }
    },
    sherbrooke: {
      shortDescription: "Là où le centre-ville rencontre le Plateau — le meilleur des deux mondes.",
      description: "Situé au carrefour de l'énergie du centre-ville et du charme du Plateau, The Sherbrooke vous donne un accès facile aux quartiers les plus vibrants de Montréal. Le métro juste devant, le boulevard Saint-Laurent à un coin de rue, et tous les cafés dont vous pourriez rêver.",
      neighborhood: "Adjacent au Plateau / Quartier Latin",
      amenities: ["WiFi haute vitesse", "Meublé", "Cuisine partagée", "Espaces communs"],
      nearbyLandmarks: ["Métro Sherbrooke", "UQAM", "Quartier Latin"],
      rooms: {
        "flex-basic-sherbrooke": {
          name: "Flex Basic",
          features: ["Chambre partagée", "Meublé", "WiFi inclus"]
        },
        "flex-plus-sherbrooke": {
          name: "Flex Plus",
          features: ["Plus d'espace", "Meublé", "WiFi inclus"]
        },
        "deluxe-sherbrooke": {
          name: "Deluxe Room",
          features: ["Espace premium", "Meublé", "WiFi inclus"]
        },
        "deluxe-balcony-sherbrooke": {
          name: "Deluxe + Balcony",
          features: ["Espace premium", "Balcon privé", "Meublé", "WiFi inclus"]
        },
        "deluxe-premium-sherbrooke": {
          name: "Deluxe Premium",
          features: ["Chambre haut de gamme", "Meublé", "WiFi inclus"]
        },
        "studio-sherbrooke": {
          name: "Studio Apartment",
          features: ["Intimité totale", "Cuisine privée", "Meublé", "WiFi inclus"]
        }
      }
    },
    "guy-concordia": {
      shortDescription: "Juste à côté de Concordia — la vie urbaine avec une ambiance campus.",
      description: "Situé au coeur battant du quartier de l'Université Concordia, The Guy est parfait pour les étudiants et jeunes professionnels qui veulent être au centre de l'action. La vie nocturne de la rue Crescent, le magasinage de classe mondiale sur Sainte-Catherine, et deux lignes de métro à vos pieds.",
      neighborhood: "Concordia / Centre-ville Ouest",
      amenities: ["WiFi haute vitesse", "Meublé", "Cuisine partagée", "Espaces communs"],
      nearbyLandmarks: ["Université Concordia", "Métro Guy-Concordia", "Rue Crescent"],
      rooms: {
        "flex-plus-guy": {
          name: "Flex Plus",
          features: ["Chambre partagée", "Meublé", "WiFi inclus"]
        },
        "flex-premium-guy": {
          name: "Flex Premium",
          features: ["Chambre améliorée", "Meublé", "WiFi inclus"]
        },
        "deluxe-guy": {
          name: "Deluxe Room",
          features: ["Espace premium", "Meublé", "WiFi inclus"]
        },
        "master-semi-ensuite-guy": {
          name: "Master + Semi-Ensuite",
          features: ["Salle de bain semi-privée", "Plus grande chambre", "Meublé", "WiFi inclus"]
        },
        "studio-guy": {
          name: "Studio Apartment",
          features: ["Intimité totale", "Cuisine privée", "Meublé", "WiFi inclus"]
        }
      }
    },
    "mcgill-ghetto": {
      shortDescription: "Le quartier étudiant par excellence, à deux pas des portes de McGill.",
      description: "Bienvenue dans le légendaire Ghetto McGill — le quartier étudiant le plus emblématique de Montréal. Des rues bordées d'arbres, des maisons en pierre brune centenaires, et cinq minutes de marche jusqu'au campus. C'est ici que les souvenirs se créent et que les amitiés pour la vie commencent.",
      neighborhood: "Ghetto McGill / Milton-Parc",
      amenities: ["WiFi haute vitesse", "Meublé", "Cuisine partagée", "Espaces communs"],
      nearbyLandmarks: ["Université McGill", "Milton et Parc", "Mont-Royal"],
      rooms: {
        "private-basic-mcgill": {
          name: "Private Basic",
          features: ["Chambre privée", "Meublé", "WiFi inclus"]
        },
        "flex-balcony-mcgill": {
          name: "Flex + Balcony",
          features: ["Balcon privé", "Meublé", "WiFi inclus"]
        },
        "deluxe-mcgill": {
          name: "Deluxe Room",
          features: ["Espace premium", "Meublé", "WiFi inclus"]
        },
        "deluxe-balcony-mcgill": {
          name: "Deluxe + Balcony",
          features: ["Espace premium", "Balcon privé", "Meublé", "WiFi inclus"]
        },
        "studio-mcgill": {
          name: "Studio Apartment",
          features: ["Intimité totale", "Cuisine privée", "Meublé", "WiFi inclus"]
        }
      }
    },
    regency: {
      shortDescription: "Un carrefour multiculturel avec accès facile à l'UdeM et HEC.",
      description: "Côte-des-Neiges est l'un des quartiers les plus diversifiés et dynamiques de Montréal. The Regency vous place près de l'Université de Montréal, HEC et Polytechnique, tout en vous entourant d'une cuisine incroyable venue des quatre coins du monde.",
      neighborhood: "Côte-des-Neiges",
      amenities: ["WiFi haute vitesse", "Meublé", "Cuisine partagée", "Espaces communs"],
      nearbyLandmarks: ["Université de Montréal", "Métro Côte-des-Neiges", "Oratoire Saint-Joseph"],
      rooms: {
        "flex-plus-regency": {
          name: "Flex Plus",
          features: ["Chambre partagée", "Meublé", "WiFi inclus"]
        },
        "deluxe-regency": {
          name: "Deluxe Room",
          features: ["Espace premium", "Meublé", "WiFi inclus"]
        },
        "master-ensuite-regency": {
          name: "Master + Ensuite Bath",
          features: ["Salle de bain privée", "Plus grande chambre", "Meublé", "WiFi inclus"]
        }
      }
    },
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
    dominik: {
      shortDescription: "Une énergie créative au coeur du Quartier Latin.",
      description: "The Dominik vous plonge dans le coeur créatif et culturel de Montréal. Le Quartier Latin regorge de théâtres, de cafés indépendants et de l'énergie du campus de l'UQAM. C'est la base parfaite pour quiconque s'épanouit dans la culture urbaine et l'ambiance communautaire.",
      neighborhood: "Quartier Latin / Village",
      amenities: ["WiFi haute vitesse", "Meublé", "Cuisine partagée", "Espaces communs"],
      nearbyLandmarks: ["UQAM", "Métro Berri-UQAM", "Place Émilie-Gamelin"],
      rooms: {
        "flex-basic-dominik": {
          name: "Flex Basic",
          features: ["Chambre partagée", "Meublé", "WiFi inclus"]
        },
        "flex-balcony-dominik": {
          name: "Flex + Balcony",
          features: ["Balcon privé", "Meublé", "WiFi inclus"]
        },
        "deluxe-dominik": {
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
