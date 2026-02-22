"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { properties, getLowestPrice } from "@/data/properties";

export default function LandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAF7]" />}>
      <LandingPageContent />
    </Suspense>
  );
}

function LandingPageContent() {
  const searchParams = useSearchParams();
  const propertySlug = searchParams.get("property");
  const utm = {
    source: searchParams.get("utm_source") ?? "",
    medium: searchParams.get("utm_medium") ?? "",
    campaign: searchParams.get("utm_campaign") ?? "",
    content: searchParams.get("utm_content") ?? "",
  };

  // If a specific property is targeted, show that; otherwise show all
  const targetProperty = properties.find((p) => p.slug === propertySlug);

  const applyUrl = targetProperty
    ? `/en/apply?property=${targetProperty.slug}&utm_source=${utm.source}&utm_medium=${utm.medium}&utm_campaign=${utm.campaign}&utm_content=${utm.content}`
    : `/en/apply?utm_source=${utm.source}&utm_medium=${utm.medium}&utm_campaign=${utm.campaign}&utm_content=${utm.content}`;

  const whatsappText = targetProperty
    ? `Hi, I'm interested in a room at ${targetProperty.name} (Coliville)`
    : "Hi, I'm interested in a room at Coliville";

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Slim Top Bar — no nav, just logo */}
      <div className="bg-white border-b border-gray-100 px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xl font-bold text-[#1A1A2E] tracking-tight">Coliville</span>
          <a
            href={applyUrl}
            className="rounded-full bg-[#5B6BF0] px-6 py-2 text-sm font-semibold text-white hover:bg-[#4455D4] transition-colors"
          >
            Apply Now
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-16 sm:py-24 px-6 bg-[#1A1A2E] text-white overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-sm uppercase tracking-[0.2em] text-white/60 mb-4">
            Furnished Rooms in Montreal
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Move in for <span className="text-[#7FB685]">$800/month.</span>
            <br />
            Everything included.
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Private furnished rooms with WiFi, utilities, and flexible leases.
            No furniture shopping. No hidden bills. No credit history required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={applyUrl}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#5B6BF0] text-white font-semibold rounded-full hover:bg-[#4455D4] transition-all hover:scale-105 text-base"
            >
              Apply Now — It&apos;s Free
            </a>
            <a
              href={`https://wa.me/12029329201?text=${encodeURIComponent(whatsappText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#1da851] transition-all hover:scale-105 text-base"
            >
              <svg viewBox="0 0 32 32" className="w-5 h-5 fill-white">
                <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958a15.9 15.9 0 008.832 2.672C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.302 22.602c-.392 1.106-1.942 2.024-3.182 2.292-.848.18-1.956.324-5.684-1.222-4.772-1.978-7.834-6.832-8.072-7.148-.228-.316-1.918-2.554-1.918-4.87s1.214-3.456 1.646-3.928c.432-.472.942-.59 1.256-.59.314 0 .628.004.902.016.29.014.678-.11 1.06.808.392.944 1.334 3.26 1.452 3.498.118.236.196.512.04.828-.158.316-.236.512-.472.788-.236.276-.498.616-.71.828-.236.236-.482.492-.208.964.276.472 1.224 2.018 2.628 3.268 1.808 1.608 3.332 2.106 3.804 2.342.472.236.748.196 1.024-.118.276-.316 1.178-1.374 1.492-1.846.314-.472.628-.394 1.06-.236.432.158 2.746 1.296 3.218 1.532.472.236.786.354.904.55.118.196.118 1.128-.274 2.234z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Value Props — Product-First */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "$800/mo", desc: "All-inclusive. No hidden fees.", icon: "💰" },
              { title: "Fully Furnished", desc: "Bed, desk, storage. Move in with a suitcase.", icon: "🛏️" },
              { title: "Utilities Included", desc: "WiFi, hydro, heating. One bill.", icon: "⚡" },
              { title: "Flexible Leases", desc: "3, 6, or 12 months. Your schedule.", icon: "📅" },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 text-center"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-[#1A1A2E] text-lg mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1A1A2E] text-center mb-4">
            2 Locations Across Montreal
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-lg mx-auto">
            Near Concordia, McGill, UQAM, and UdeM. Walk to the metro.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {properties.map((property) => {
              const lowestPrice = getLowestPrice(property);
              const isHighlighted = targetProperty?.id === property.id;
              return (
                <div
                  key={property.id}
                  className={`rounded-2xl overflow-hidden border ${
                    isHighlighted
                      ? "border-[#5B6BF0] ring-2 ring-[#5B6BF0]/30"
                      : "border-gray-100"
                  }`}
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={property.heroImage}
                      alt={property.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    {isHighlighted && (
                      <div className="absolute top-3 left-3 bg-[#5B6BF0] text-white text-xs font-bold px-3 py-1 rounded-full">
                        Selected
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[#1A1A2E] text-lg">{property.name}</h3>
                    <p className="text-gray-500 text-sm mb-2">{property.neighborhood}</p>
                    <p className="text-[#5B6BF0] font-semibold">
                      From C${lowestPrice}/week
                    </p>
                    <ul className="mt-3 space-y-1">
                      {property.nearbyLandmarks.map((l) => (
                        <li key={l} className="text-xs text-gray-400 flex items-center gap-1.5">
                          <span className="w-1 h-1 bg-gray-300 rounded-full" />
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1A1A2E] text-center mb-10">
            What residents say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                text: "The all-inclusive pricing is a game changer. No surprise bills, no dealing with Hydro-Quebec. Just one payment.",
                name: "James L.",
                sub: "Concordia '25",
              },
              {
                text: "Moving to Montreal from Toronto was scary, but Coliville made it feel like home from day one.",
                name: "Sarah M.",
                sub: "McGill '26",
              },
              {
                text: "I was only supposed to stay for one semester but I ended up staying for two years. The community here is special.",
                name: "Amelie P.",
                sub: "UdeM '24",
              },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <p className="text-sm font-medium text-[#1A1A2E]">{t.name}</p>
                <p className="text-xs text-gray-400">{t.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 bg-[#5B6BF0]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Your room is ready.
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
            150 rooms across 2 locations. Apply in 2 minutes. Hear back within 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={applyUrl}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-[#5B6BF0] font-semibold rounded-full hover:bg-gray-100 transition-all hover:scale-105 text-base"
            >
              Apply Now
            </a>
            <a
              href={`https://wa.me/12029329201?text=${encodeURIComponent(whatsappText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/30 hover:bg-white/20 transition-all hover:scale-105 text-base"
            >
              <svg viewBox="0 0 32 32" className="w-5 h-5 fill-white">
                <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958a15.9 15.9 0 008.832 2.672C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.302 22.602c-.392 1.106-1.942 2.024-3.182 2.292-.848.18-1.956.324-5.684-1.222-4.772-1.978-7.834-6.832-8.072-7.148-.228-.316-1.918-2.554-1.918-4.87s1.214-3.456 1.646-3.928c.432-.472.942-.59 1.256-.59.314 0 .628.004.902.016.29.014.678-.11 1.06.808.392.944 1.334 3.26 1.452 3.498.118.236.196.512.04.828-.158.316-.236.512-.472.788-.236.276-.498.616-.71.828-.236.236-.482.492-.208.964.276.472 1.224 2.018 2.628 3.268 1.808 1.608 3.332 2.106 3.804 2.342.472.236.748.196 1.024-.118.276-.316 1.178-1.374 1.492-1.846.314-.472.628-.394 1.06-.236.432.158 2.746 1.296 3.218 1.532.472.236.786.354.904.55.118.196.118 1.128-.274 2.234z" />
              </svg>
              Chat First
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="bg-[#1A1A2E] py-6 px-6 text-center">
        <p className="text-white/40 text-sm">
          Coliville &middot; Montreal, QC &middot; info@coliville.com
        </p>
      </div>
    </div>
  );
}
