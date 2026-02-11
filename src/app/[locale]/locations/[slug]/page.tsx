import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { properties, type Room } from "@/data/properties";
import { getLocalizedPropertyBySlug } from "@/data/get-property";
import { routing } from "@/i18n/routing";
import ImageCarousel from "@/components/ImageCarousel";

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    properties.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "detail" });
  const property = getLocalizedPropertyBySlug(slug, locale);
  if (!property) return { title: "Not Found | Coliville" };

  const lowestPrice = Math.min(...property.rooms.map((r) => r.price));
  return {
    title: `${property.name} | Coliville`,
    description: `${property.shortDescription} From C$${lowestPrice}/week in ${property.neighborhood}.`,
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const property = getLocalizedPropertyBySlug(slug, locale);

  if (!property) {
    notFound();
  }

  const t = await getTranslations("detail");
  const lowestPrice = Math.min(...property.rooms.map((r) => r.price));

  return (
    <div className="min-h-screen bg-background">
      {/* ─── Hero Section ─── */}
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <Image
          src={property.heroImage}
          alt={`${property.name} hero`}
          fill
          unoptimized
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-start justify-end px-6 pb-12 sm:px-12 lg:px-24">
          <div className="max-w-3xl">
            <span className="mb-4 inline-block rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-white shadow-lg">
              {t("fromPrice", { price: lowestPrice })}
            </span>
            <h1 className="mb-2 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {property.name}
            </h1>
            <p className="text-lg text-white/80 sm:text-xl">
              {property.area}&nbsp;&middot;&nbsp;{property.neighborhood}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Quick Info Bar ─── */}
      <section className="border-b border-border bg-card-bg">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-12 lg:px-24">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              {property.rooms.length}{" "}
              {property.rooms.length === 1 ? t("roomType", { count: property.rooms.length }) : t("roomTypes", { count: property.rooms.length })}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-sm font-medium text-accent-dark">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {t("amenities", { count: property.amenities.length })}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary-dark">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {property.neighborhood}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-text-secondary sm:max-w-md sm:text-right">
            {property.shortDescription}
          </p>
        </div>
      </section>

      {/* ─── Room Types Section ─── */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-12 lg:px-24">
        <h2 className="mb-2 text-3xl font-bold text-secondary sm:text-4xl">
          {t("chooseRoom")}
        </h2>
        <p className="mb-10 text-text-muted">
          {t("optionsAt", { count: property.rooms.length, name: property.name })}
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          {property.rooms.map((room) => (
            <RoomCard key={room.id} room={room} propertySlug={property.slug} locale={locale} />
          ))}
        </div>
      </section>

      {/* ─── Amenities Section ─── */}
      <section className="bg-card-bg">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-12 lg:px-24">
          <h2 className="mb-2 text-3xl font-bold text-secondary sm:text-4xl">
            {t("whatsIncluded")}
          </h2>
          <p className="mb-10 text-text-muted">
            {t("essentials", { name: property.name })}
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {property.amenities.map((amenity) => (
              <div key={amenity} className="flex items-center gap-3 rounded-xl border border-border-light bg-background px-4 py-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-text-primary">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Nearby Section ─── */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-12 lg:px-24">
        <h2 className="mb-2 text-3xl font-bold text-secondary sm:text-4xl">
          {t("inNeighborhood")}
        </h2>
        <p className="mb-10 text-text-muted">
          {t("walkTo", { name: property.name })}
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {property.nearbyLandmarks.map((landmark) => (
            <div key={landmark} className="flex items-center gap-4 rounded-xl border border-border-light bg-card-bg px-5 py-4 transition-shadow hover:shadow-md">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <span className="text-base font-medium text-text-primary">{landmark}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="bg-secondary">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-20 text-center sm:px-12 lg:px-24">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {t("readyToMoveIn")}
          </h2>
          <p className="max-w-md text-lg text-white/70">
            {t("joinProperty", { name: property.name, neighborhood: property.neighborhood })}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href={{ pathname: "/book", query: { property: property.slug, room: property.rooms[0].id } }}
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl"
            >
              {t("bookNow")}
            </Link>
            <Link
              href="/tour"
              className="inline-flex items-center justify-center rounded-full border-2 border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-all hover:border-white hover:bg-white/10"
            >
              {t("scheduleTour")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Room Card Component ─── */

function RoomCard({
  room,
  propertySlug,
  locale,
}: {
  room: Room;
  propertySlug: string;
  locale: string;
}) {
  const roomLabel = locale === "fr" ? "Chambre" : "Room";
  const roomsLabel = locale === "fr" ? "Chambres" : "Rooms";
  const bathLabel = locale === "fr" ? "Salle de bain" : "Bath";
  const bathsLabel = locale === "fr" ? "Salles de bain" : "Baths";
  const tourLabel = locale === "fr" ? "Visite" : "Tour";
  const bookLabel = locale === "fr" ? "Réserver" : "Book Now";

  return (
    <div className="group overflow-hidden rounded-2xl border border-border-light bg-card-bg shadow-sm transition-all hover:shadow-lg">
      <ImageCarousel images={room.images} alt={room.name} />
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-secondary">{room.name}</h3>
          <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
            C${room.price}/{room.priceUnit}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-text-secondary">
          <span className="inline-flex items-center gap-1.5">
            <svg className="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v4a1 1 0 001 1h16a1 1 0 001-1V7M3 12v5a1 1 0 001 1h1m14 0h1a1 1 0 001-1v-5M5 18v2m14-2v2M2 7h20M7 7V4a1 1 0 011-1h8a1 1 0 011 1v3" />
            </svg>
            {room.beds} {room.beds === 1 ? roomLabel : roomsLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg className="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16M4 12a2 2 0 01-2-2V6a4 4 0 014-4h1m13 10a2 2 0 002-2V8m-2 4v5a3 3 0 01-3 3H7a3 3 0 01-3-3v-5m4 8v2m8-2v2" />
            </svg>
            {room.baths} {room.baths === 1 ? bathLabel : bathsLabel}
          </span>
        </div>
        {room.features && room.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {room.features.map((feature) => (
              <span key={feature} className="rounded-full bg-background px-2.5 py-0.5 text-xs font-medium text-text-secondary">
                {feature}
              </span>
            ))}
          </div>
        )}
        <div className="mt-1 flex gap-3">
          <Link
            href={{ pathname: "/book", query: { property: propertySlug, room: room.id } }}
            className="flex-1 rounded-full bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            {bookLabel}
          </Link>
          <Link
            href="/tour"
            className="flex-1 rounded-full border-2 border-secondary/20 px-4 py-2.5 text-center text-sm font-semibold text-secondary transition-colors hover:border-secondary hover:bg-secondary/5"
          >
            {tourLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
