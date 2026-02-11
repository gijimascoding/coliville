import { properties, type Property } from "./properties";
import { propertyTranslations } from "./property-translations";

export function getLocalizedProperty(
  property: Property,
  locale: string
): Property {
  const translations = propertyTranslations[locale]?.[property.id];
  if (!translations) return property;

  return {
    ...property,
    shortDescription: translations.shortDescription,
    description: translations.description,
    neighborhood: translations.neighborhood,
    amenities: translations.amenities,
    nearbyLandmarks: translations.nearbyLandmarks,
    rooms: property.rooms.map((room) => {
      const roomTrans = translations.rooms[room.id];
      if (!roomTrans) return room;
      return {
        ...room,
        name: roomTrans.name,
        features: roomTrans.features,
      };
    }),
  };
}

export function getLocalizedProperties(locale: string): Property[] {
  return properties.map((p) => getLocalizedProperty(p, locale));
}

export function getLocalizedPropertyBySlug(
  slug: string,
  locale: string
): Property | undefined {
  const property = properties.find((p) => p.slug === slug);
  if (!property) return undefined;
  return getLocalizedProperty(property, locale);
}
