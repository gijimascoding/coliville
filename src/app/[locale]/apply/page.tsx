"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { properties } from "@/data/properties";
import Image from "next/image";

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAF7]" />}>
      <ApplyPageContent />
    </Suspense>
  );
}

function ApplyPageContent() {
  const t = useTranslations("apply");
  const locale = useLocale();
  const searchParams = useSearchParams();

  const propertyParam = searchParams.get("property");
  const roomParam = searchParams.get("room");

  // Look up pre-selected property and room
  const selectedProperty = properties.find((p) => p.slug === propertyParam || p.id === propertyParam);
  const selectedRoom = selectedProperty?.rooms.find((r) => r.id === roomParam);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    property: selectedProperty?.name ?? "",
    roomType: selectedRoom?.name ?? "",
    moveInDate: "",
    leaseDuration: "",
    occupation: "",
    occupationDetail: "",
    aboutYou: "",
    emergencyName: "",
    emergencyPhone: "",
    howHeard: "",
  });

  // Update property/room if query params change
  useEffect(() => {
    if (selectedProperty) {
      setForm((prev) => ({
        ...prev,
        property: selectedProperty.name,
        roomType: selectedRoom?.name ?? "",
      }));
    }
  }, [selectedProperty, selectedRoom]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // When property dropdown changes, reset room
  function handlePropertyChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setForm({ ...form, property: e.target.value, roomType: "" });
  }

  const dropdownProperty = properties.find((p) => p.name === form.property);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/send-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || t("submitError"));
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setError(t("submitError"));
    } finally {
      setSubmitting(false);
    }
  }

  /* ─── Success Screen ─── */
  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAF7] px-4">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#7FB685]/20">
            <svg className="h-10 w-10 text-[#7FB685]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mb-3 text-3xl font-bold text-[#1A1A2E]">{t("successTitle")}</h1>
          <p className="mb-8 text-lg text-gray-500">{t("successSubtitle")}</p>

          {/* Next Steps */}
          <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-[#1A1A2E]">{t("nextSteps")}</h3>
            <ul className="space-y-3">
              {[t("step1"), t("step2"), t("step3")].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#5B6BF0]/10 text-xs font-bold text-[#5B6BF0]">
                    {i + 1}
                  </span>
                  <span className="text-gray-600">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/"
            className="inline-block rounded-xl bg-[#5B6BF0] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#4455D4]"
          >
            {t("backHome")}
          </Link>
        </div>
      </div>
    );
  }

  /* ─── Dropdown style helper ─── */
  const selectStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%239ca3af' viewBox='0 0 16 16'%3E%3Cpath d='M4.646 5.646a.5.5 0 0 1 .708 0L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat" as const,
    backgroundPosition: "right 1rem center",
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 px-4 py-3 text-[#1A1A2E] placeholder-gray-400 focus:border-[#5B6BF0] focus:outline-none focus:ring-1 focus:ring-[#5B6BF0] transition-colors";
  const selectClass =
    "w-full rounded-xl border border-gray-200 px-4 py-3 text-[#1A1A2E] bg-white focus:border-[#5B6BF0] focus:outline-none focus:ring-1 focus:ring-[#5B6BF0] transition-colors appearance-none";
  const labelClass = "block text-sm font-medium text-[#1A1A2E] mb-1.5";

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Header */}
      <section className="px-4 pb-12 pt-20 text-center">
        <h1 className="mb-4 text-4xl font-bold text-[#1A1A2E] md:text-5xl">{t("title")}</h1>
        <p className="mx-auto max-w-xl text-lg text-gray-500">{t("subtitle")}</p>
      </section>

      {/* Two-Column Layout */}
      <section className="mx-auto max-w-6xl px-4 pb-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          {/* Left Column — Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="space-y-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-10"
            >
              {/* ─── Section A: Personal Information ─── */}
              <div>
                <h2 className="mb-5 text-lg font-semibold text-[#1A1A2E]">{t("personalInfo")}</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className={labelClass}>{t("fullName")}</label>
                    <input
                      type="text" id="fullName" name="fullName" required
                      value={form.fullName} onChange={handleChange}
                      className={inputClass} placeholder="Jane Doe"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className={labelClass}>{t("email")}</label>
                      <input
                        type="email" id="email" name="email" required
                        value={form.email} onChange={handleChange}
                        className={inputClass} placeholder="jane@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>{t("phone")}</label>
                      <input
                        type="tel" id="phone" name="phone" required
                        value={form.phone} onChange={handleChange}
                        className={inputClass} placeholder="+1 (514) 555-0123"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="dateOfBirth" className={labelClass}>{t("dateOfBirth")}</label>
                    <input
                      type="date" id="dateOfBirth" name="dateOfBirth" required
                      value={form.dateOfBirth} onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* ─── Section B: Stay Details ─── */}
              <div>
                <h2 className="mb-5 text-lg font-semibold text-[#1A1A2E]">{t("stayDetails")}</h2>
                <div className="space-y-4">
                  {/* Show dropdowns only when no pre-selected property */}
                  {!selectedProperty && (
                    <>
                      <div>
                        <label htmlFor="property" className={labelClass}>{t("property")}</label>
                        <select
                          id="property" name="property" required
                          value={form.property} onChange={handlePropertyChange}
                          className={selectClass} style={selectStyle}
                        >
                          <option value="">{t("selectProperty")}</option>
                          {properties.map((p) => (
                            <option key={p.id} value={p.name}>{p.name}</option>
                          ))}
                        </select>
                      </div>
                      {dropdownProperty && (
                        <div>
                          <label htmlFor="roomType" className={labelClass}>{t("roomType")}</label>
                          <select
                            id="roomType" name="roomType" required
                            value={form.roomType} onChange={handleChange}
                            className={selectClass} style={selectStyle}
                          >
                            <option value="">{t("selectRoom")}</option>
                            {dropdownProperty.rooms.map((r) => (
                              <option key={r.id} value={r.name}>
                                {r.name} — C${r.price}/{r.priceUnit}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </>
                  )}

                  <div>
                    <label htmlFor="moveInDate" className={labelClass}>{t("moveInDate")}</label>
                    <input
                      type="date" id="moveInDate" name="moveInDate" required
                      value={form.moveInDate} onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="leaseDuration" className={labelClass}>{t("leaseDuration")}</label>
                    <select
                      id="leaseDuration" name="leaseDuration" required
                      value={form.leaseDuration} onChange={handleChange}
                      className={selectClass} style={selectStyle}
                    >
                      <option value="">{t("selectDuration")}</option>
                      <option value="3 months">{t("3months")}</option>
                      <option value="6 months">{t("6months")}</option>
                      <option value="12 months">{t("12months")}</option>
                      <option value="Other">{t("otherDuration")}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ─── Section C: About You ─── */}
              <div>
                <h2 className="mb-5 text-lg font-semibold text-[#1A1A2E]">{t("aboutYou")}</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="occupation" className={labelClass}>{t("occupation")}</label>
                    <select
                      id="occupation" name="occupation" required
                      value={form.occupation} onChange={handleChange}
                      className={selectClass} style={selectStyle}
                    >
                      <option value="">{t("selectOccupation")}</option>
                      <option value="Student">{t("student")}</option>
                      <option value="Working Professional">{t("professional")}</option>
                      <option value="Freelancer / Remote Worker">{t("freelancer")}</option>
                      <option value="Other">{t("otherOccupation")}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="occupationDetail" className={labelClass}>{t("occupationDetail")}</label>
                    <input
                      type="text" id="occupationDetail" name="occupationDetail"
                      value={form.occupationDetail} onChange={handleChange}
                      className={inputClass} placeholder={locale === "fr" ? "Ex. Universit\u00e9 McGill" : "E.g. McGill University"}
                    />
                  </div>
                  <div>
                    <label htmlFor="aboutYou" className={labelClass}>{t("whyColiving")}</label>
                    <textarea
                      id="aboutYou" name="aboutYou" rows={4} required
                      value={form.aboutYou} onChange={handleChange}
                      className={`${inputClass} resize-none`}
                      placeholder={t("whyColivingPlaceholder")}
                    />
                  </div>
                </div>
              </div>

              {/* ─── Section D: Additional Info (Optional) ─── */}
              <div>
                <h2 className="mb-5 text-lg font-semibold text-[#1A1A2E]">{t("additionalInfo")}</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="emergencyName" className={labelClass}>{t("emergencyName")}</label>
                      <input
                        type="text" id="emergencyName" name="emergencyName"
                        value={form.emergencyName} onChange={handleChange}
                        className={inputClass} placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="emergencyPhone" className={labelClass}>{t("emergencyPhone")}</label>
                      <input
                        type="tel" id="emergencyPhone" name="emergencyPhone"
                        value={form.emergencyPhone} onChange={handleChange}
                        className={inputClass} placeholder="+1 (514) 555-0000"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="howHeard" className={labelClass}>{t("howHeard")}</label>
                    <select
                      id="howHeard" name="howHeard"
                      value={form.howHeard} onChange={handleChange}
                      className={selectClass} style={selectStyle}
                    >
                      <option value="">{t("selectSource")}</option>
                      <option value="Instagram">{t("instagram")}</option>
                      <option value="TikTok">{t("tiktok")}</option>
                      <option value="Google">{t("google")}</option>
                      <option value="Friend">{t("friend")}</option>
                      <option value="University">{t("university")}</option>
                      <option value="Other">{t("otherSource")}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-[#5B6BF0] py-3.5 text-lg font-semibold text-white transition-all hover:bg-[#4455D4] active:scale-[0.98] disabled:opacity-60"
              >
                {submitting ? t("submitting") : t("submit")}
              </button>
            </form>
          </div>

          {/* Right Column — Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property / Room Card (if pre-selected) */}
            {selectedProperty && selectedRoom && (
              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="relative h-48 w-full">
                  <Image
                    src={selectedRoom.images[0]}
                    alt={selectedRoom.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-[#5B6BF0]">
                    {t("applyingFor")}
                  </p>
                  <h3 className="text-lg font-bold text-[#1A1A2E]">{selectedRoom.name}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedProperty.name} &middot; {selectedProperty.area}
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                    <span>{selectedRoom.beds} {selectedRoom.beds === 1 ? (locale === "fr" ? "Chambre" : "Bed") : (locale === "fr" ? "Chambres" : "Beds")}</span>
                    <span>{selectedRoom.baths} {selectedRoom.baths === 1 ? (locale === "fr" ? "Salle de bain" : "Bath") : (locale === "fr" ? "Salles de bain" : "Baths")}</span>
                  </div>
                  <div className="mt-3 rounded-lg bg-[#5B6BF0]/5 px-4 py-2.5">
                    <span className="text-xl font-bold text-[#5B6BF0]">
                      C${selectedRoom.price}
                    </span>
                    <span className="text-sm text-gray-500">{t("perWeek")}</span>
                  </div>
                </div>
              </div>
            )}

            {/* What Happens Next */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5B6BF0]/10">
                  <svg className="h-5 w-5 text-[#5B6BF0]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#1A1A2E]">{t("nextSteps")}</h3>
              </div>
              <ul className="space-y-3">
                {[t("step1"), t("step2"), t("step3")].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7FB685]/15 text-xs font-bold text-[#7FB685]">
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-600">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Card */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1A1A2E]/10">
                  <svg className="h-5 w-5 text-[#1A1A2E]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#1A1A2E]">{t("questions")}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {t("reachUs")}{" "}
                <a href="mailto:info@coliville.com" className="font-medium text-[#5B6BF0] hover:underline">
                  info@coliville.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
