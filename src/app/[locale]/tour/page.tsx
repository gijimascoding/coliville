"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { properties } from "@/data/properties";

export default function TourPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const t = useTranslations("tour");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    property: "",
    date: "",
    time: "",
    notes: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/send-tour-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        // Fire Google Ads conversion event for tour request
        if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
          (window as any).gtag("event", "conversion", {
            send_to: "AW-17953956338/tour_request",
            value: 0.5,
            currency: "CAD",
          });
        }
        setSubmitted(true);
      } else {
        setError(data.message || "Failed to send tour request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting tour request:", error);
      setError("Failed to send tour request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#7FB685]/20">
            <svg className="h-10 w-10 text-[#7FB685]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#1A1A2E] mb-3">{t("successTitle")}</h1>
          <p className="text-gray-500 text-lg mb-8">{t("successSubtitle")}</p>
          <Link
            href="/"
            className="inline-block rounded-xl bg-[#5B6BF0] px-8 py-3 text-white font-semibold hover:bg-[#4455D4] transition-colors"
          >
            {t("backHome")}
          </Link>
        </div>
      </div>
    );
  }

  const expectItems = [t("expect1"), t("expect2"), t("expect3"), t("expect4")];

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Header */}
      <section className="pt-20 pb-12 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A2E] mb-4">
          {t("title")}
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          {t("subtitle")}
        </p>
      </section>

      {/* Two-Column Layout */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left Column - Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 space-y-6"
            >
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
                    {t("firstName")}
                  </label>
                  <input
                    type="text" id="firstName" name="firstName" required
                    value={form.firstName} onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[#1A1A2E] placeholder-gray-400 focus:border-[#5B6BF0] focus:outline-none focus:ring-1 focus:ring-[#5B6BF0] transition-colors"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
                    {t("lastName")}
                  </label>
                  <input
                    type="text" id="lastName" name="lastName" required
                    value={form.lastName} onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[#1A1A2E] placeholder-gray-400 focus:border-[#5B6BF0] focus:outline-none focus:ring-1 focus:ring-[#5B6BF0] transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
                  {t("email")}
                </label>
                <input
                  type="email" id="email" name="email" required
                  value={form.email} onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[#1A1A2E] placeholder-gray-400 focus:border-[#5B6BF0] focus:outline-none focus:ring-1 focus:ring-[#5B6BF0] transition-colors"
                  placeholder="jane@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
                  {t("phone")}
                </label>
                <input
                  type="tel" id="phone" name="phone"
                  value={form.phone} onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[#1A1A2E] placeholder-gray-400 focus:border-[#5B6BF0] focus:outline-none focus:ring-1 focus:ring-[#5B6BF0] transition-colors"
                  placeholder="+1 (514) 555-0123"
                />
              </div>

              {/* Property Dropdown */}
              <div>
                <label htmlFor="property" className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
                  {t("whichLocation")}
                </label>
                <select
                  id="property" name="property" required
                  value={form.property} onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[#1A1A2E] bg-white focus:border-[#5B6BF0] focus:outline-none focus:ring-1 focus:ring-[#5B6BF0] transition-colors appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%239ca3af' viewBox='0 0 16 16'%3E%3Cpath d='M4.646 5.646a.5.5 0 0 1 .708 0L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                  }}
                >
                  <option value="">{t("selectLocation")}</option>
                  {properties.map((p) => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

              {/* Preferred Date */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
                  {t("preferredDate")}
                </label>
                <input
                  type="date" id="date" name="date" required
                  value={form.date} onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[#1A1A2E] focus:border-[#5B6BF0] focus:outline-none focus:ring-1 focus:ring-[#5B6BF0] transition-colors"
                />
              </div>

              {/* Preferred Time */}
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
                  {t("preferredTime")}
                </label>
                <select
                  id="time" name="time" required
                  value={form.time} onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[#1A1A2E] bg-white focus:border-[#5B6BF0] focus:outline-none focus:ring-1 focus:ring-[#5B6BF0] transition-colors appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%239ca3af' viewBox='0 0 16 16'%3E%3Cpath d='M4.646 5.646a.5.5 0 0 1 .708 0L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                  }}
                >
                  <option value="">{t("selectTime")}</option>
                  <option value="morning">{t("morning")}</option>
                  <option value="afternoon">{t("afternoon")}</option>
                  <option value="evening">{t("evening")}</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
                  {t("anythingElse")}
                </label>
                <textarea
                  id="notes" name="notes" rows={4}
                  value={form.notes} onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[#1A1A2E] placeholder-gray-400 focus:border-[#5B6BF0] focus:outline-none focus:ring-1 focus:ring-[#5B6BF0] transition-colors resize-none"
                  placeholder={t("placeholder")}
                />
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
                className="w-full rounded-xl bg-[#5B6BF0] py-3.5 text-white font-semibold text-lg hover:bg-[#4455D4] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending..." : t("submit")}
              </button>
            </form>
          </div>

          {/* Right Column - Info Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Card 1: What to expect */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5B6BF0]/10">
                  <svg className="h-5 w-5 text-[#5B6BF0]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#1A1A2E]">{t("whatToExpect")}</h3>
              </div>
              <ul className="space-y-3">
                {expectItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-[#7FB685] mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2: Virtual tour */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7FB685]/10">
                  <svg className="h-5 w-5 text-[#7FB685]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#1A1A2E]">{t("cantMakeIt")}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{t("virtualTour")}</p>
            </div>

            {/* Card 3: Contact info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1A1A2E]/10">
                  <svg className="h-5 w-5 text-[#1A1A2E]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#1A1A2E]">{t("questions")}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {t("reachUs")}{" "}
                <a href="mailto:info@coliville.com" className="text-[#5B6BF0] font-medium hover:underline">
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
