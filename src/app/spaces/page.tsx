import Image from "next/image";
import Link from "next/link";
import { properties, getLowestPrice } from "@/data/properties";

export const metadata = {
  title: "Our Spaces | Coliville",
  description:
    "Explore 10 coliving homes across Montreal's best neighborhoods. All furnished, all inclusive. Find your perfect space with Coliville.",
};

export default function SpacesPage() {
  const globalLowest = Math.min(...properties.map((p) => getLowestPrice(p)));

  return (
    <div className="min-h-screen bg-background">
      {/* ── Page Header ── */}
      <section className="px-6 pt-32 pb-12 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold tracking-tight text-secondary sm:text-5xl lg:text-6xl">
            Our Spaces
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl">
            10 coliving homes across Montreal&apos;s best neighborhoods.
            <br className="hidden sm:block" />
            All furnished. All inclusive.
          </p>
        </div>
      </section>

      {/* ── Filter / Sort Bar (decorative) ── */}
      <section className="px-6 pb-8 sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card-bg px-4 py-2 text-sm font-medium text-secondary">
            All Neighborhoods
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="text-text-muted"
            >
              <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <span className="inline-flex items-center rounded-full border border-border-light bg-background px-4 py-2 text-sm text-text-muted">
            From C${globalLowest}/week
          </span>

          <span className="ml-auto hidden text-sm text-text-muted sm:block">
            {properties.length} properties
          </span>
        </div>
      </section>

      {/* ── Property Cards Grid ── */}
      <section className="px-6 pb-24 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => {
            const lowestPrice = getLowestPrice(property);
            const roomCount = property.rooms.length;

            return (
              <Link
                key={property.id}
                href={`/spaces/${property.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border-light bg-card-bg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
              >
                {/* Card Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-border-light">
                  <Image
                    src={property.heroImage}
                    alt={property.name}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col gap-3 p-5">
                  {/* Property Name */}
                  <h2 className="text-xl font-semibold text-secondary">
                    {property.name}
                  </h2>

                  {/* Area */}
                  <p className="text-sm text-text-muted">{property.area}</p>

                  {/* Neighborhood Badge */}
                  <span className="inline-flex w-fit items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent-dark">
                    {property.neighborhood}
                  </span>

                  {/* Price + Room Types */}
                  <div className="mt-auto flex items-end justify-between pt-4 border-t border-border-light">
                    <div>
                      <p className="text-lg font-bold text-primary">
                        From C${lowestPrice}/week
                      </p>
                    </div>
                    <p className="text-sm text-text-muted">
                      {roomCount} room type{roomCount !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="border-t border-border-light bg-card-bg px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-secondary sm:text-3xl">
            Can&apos;t decide? Let us help.
          </h2>
          <p className="mt-3 max-w-md text-text-secondary">
            Book a free tour and we&apos;ll walk you through the spaces that
            match your vibe, budget, and schedule.
          </p>
          <Link
            href="/tour"
            className="mt-8 inline-flex items-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white transition-colors duration-200 hover:bg-primary-dark"
          >
            Book a Tour
          </Link>
        </div>
      </section>
    </div>
  );
}
