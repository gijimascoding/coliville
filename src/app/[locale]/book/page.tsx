"use client";

import { useState, useMemo, useCallback, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { properties, type Property, type Room } from "@/data/properties";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */
const SERVICE_FEE = 50;
const DEPOSIT_MULTIPLIER = 4; // deposit = 4 weeks of rent

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

/* ------------------------------------------------------------------ */
/*  Room Card Sidebar                                                  */
/* ------------------------------------------------------------------ */
function RoomSidebar({
  property,
  room,
  frequency,
}: {
  property: Property;
  room: Room;
  frequency: "biweekly" | "monthly";
}) {
  const t = useTranslations("book");
  const locale = useLocale();
  const weeklyPrice = room.price;
  const biweeklyPrice = weeklyPrice * 2;
  const monthlyPrice = weeklyPrice * 4;
  const deposit = weeklyPrice * DEPOSIT_MULTIPLIER;

  return (
    <div className="bg-white rounded-2xl overflow-visible shadow-sm sticky top-[100px]">
      {/* Room image */}
      <div className="relative h-[180px] overflow-hidden rounded-t-2xl">
        <img
          src={room.images[0]}
          alt={room.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5">
        <h3 className="text-base font-semibold text-[#1a1a1a] mb-1">
          {room.name} – {property.name}
        </h3>
        <p className="text-[13px] text-[#888] mb-3">{property.area}, Montreal</p>

        {/* Specs */}
        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-[13px] text-[#666]">
            🏠 {room.beds} {room.beds === 1 ? t("room") : t("rooms")}
          </div>
          <div className="flex items-center gap-1.5 text-[13px] text-[#666]">
            🛁 {room.baths} {room.baths === 1 ? t("bath") : t("baths")}
          </div>
        </div>

        <div className="h-px bg-[#eee] my-3" />

        {/* Pricing */}
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[13px] text-[#888]">{t("weeklyRent")}</span>
          <span className="text-lg font-bold text-[#1a1a1a]">C${weeklyPrice}</span>
        </div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[13px] text-[#888]" id="sidebarFreqLabel">
            {frequency === "biweekly" ? t("biweekly") : t("monthly")}
          </span>
          <span className="text-base font-bold text-[#1a1a1a]">
            C${frequency === "biweekly" ? biweeklyPrice : monthlyPrice}
          </span>
        </div>

        <div className="h-px bg-[#eee] my-3" />

        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[13px] text-[#888]">{t("deposit")}</span>
          <span className="text-base font-bold text-[#1a1a1a]">C${deposit}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[13px] text-[#888] flex items-center gap-1.5">
            {t("serviceFee")}
            <span className="relative group/tip">
              <span className="w-4 h-4 rounded-full bg-[#e0e0e0] text-[#666] text-[11px] inline-flex items-center justify-center font-bold italic cursor-pointer">
                i
              </span>
              <span className="hidden group-hover/tip:block absolute bottom-[calc(100%+8px)] right-0 bg-[#333] text-white text-xs font-normal not-italic p-3 rounded-[10px] w-[280px] leading-relaxed z-20 shadow-lg">
                {t("serviceFeeTooltip")}
                <span className="absolute top-full right-4 border-[6px] border-transparent border-t-[#333]" />
              </span>
            </span>
          </span>
          <span className="text-base font-bold text-[#1a1a1a]">C${SERVICE_FEE}</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Progress Bar (numbered circles with connecting lines)              */
/* ------------------------------------------------------------------ */
function ProgressBar({
  current,
  completed,
  steps,
}: {
  current: number;
  completed: boolean;
  steps: string[];
}) {
  return (
    <div className="bg-white border-b border-[#e5e5e5] py-6 px-5 sm:px-10">
      <div className="flex justify-center max-w-[700px] mx-auto relative">
        {steps.map((label, i) => {
          const isCompleted = completed || i < current;
          const isActive = !completed && i === current;

          return (
            <div key={label} className="flex-1 text-center relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div
                  className={`absolute top-[18px] left-[calc(50%+24px)] h-0.5 transition-colors duration-300 ${
                    isCompleted ? "bg-[#27ae60]" : "bg-[#e8e8e8]"
                  }`}
                  style={{ width: "calc(100% - 48px)" }}
                />
              )}

              {/* Step number */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold mx-auto mb-2 transition-all duration-300 ${
                  isCompleted
                    ? "bg-[#27ae60] text-white"
                    : isActive
                    ? "bg-primary text-white shadow-md shadow-primary/30"
                    : "bg-[#e8e8e8] text-[#999]"
                }`}
              >
                {isCompleted ? "✓" : i + 1}
              </div>

              {/* Step label */}
              <div
                className={`text-xs font-medium transition-colors duration-300 ${
                  isCompleted
                    ? "text-[#27ae60]"
                    : isActive
                    ? "text-primary font-semibold"
                    : "text-[#999]"
                }`}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */
export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center"><div className="text-[#999] text-lg">Loading...</div></div>}>
      <BookPageContent />
    </Suspense>
  );
}

function BookPageContent() {
  const t = useTranslations("book");
  const locale = useLocale();

  const STEPS = [t("selectDates"), t("paymentPlan"), t("review"), t("reserve")];

  const DAY_NAMES = locale === 'fr'
    ? ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function formatDate(date: Date): string {
    return date.toLocaleDateString(locale === 'fr' ? 'fr-CA' : 'en-CA', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  /* ---- State ---- */
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Room selection from URL query params
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState("");

  // Read property & room from URL on mount
  useEffect(() => {
    const propId = searchParams.get("property") || "";
    const roomId = searchParams.get("room") || "";
    if (propId) setSelectedPropertyId(propId);
    if (roomId) setSelectedRoomId(roomId);
  }, [searchParams]);

  // Step 1: Dates
  const [calendarYear, setCalendarYear] = useState(2026);
  const [calendarMonth, setCalendarMonth] = useState(1); // February 2026
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [customDuration, setCustomDuration] = useState("");

  // Step 2: Payment Plan
  const [frequency, setFrequency] = useState<"biweekly" | "monthly">("biweekly");
  const [planOpen, setPlanOpen] = useState(false);

  // Step 4: Payment
  const [payMethod, setPayMethod] = useState<"card" | "bank">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [country, setCountry] = useState("Canada");

  /* ---- Derived ---- */
  const selectedProperty = useMemo(
    () => properties.find((p) => p.id === selectedPropertyId) ?? null,
    [selectedPropertyId]
  );
  const selectedRoom = useMemo(
    () => selectedProperty?.rooms.find((r) => r.id === selectedRoomId) ?? null,
    [selectedProperty, selectedRoomId]
  );

  const weeklyPrice = selectedRoom?.price ?? 0;
  const biweeklyPrice = weeklyPrice * 2;
  const monthlyPrice = weeklyPrice * 4;
  const deposit = weeklyPrice * DEPOSIT_MULTIPLIER;
  const activeDuration = selectedDuration ?? (Number(customDuration) || 0);

  const moveOutDate = useMemo(() => {
    if (!selectedDate || activeDuration <= 0) return null;
    return addMonths(selectedDate, activeDuration);
  }, [selectedDate, activeDuration]);

  /* ---- Calendar logic ---- */
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const CURRENT_YEAR = today.getFullYear();
  const CURRENT_MONTH = today.getMonth();
  const isCurrentMonth = calendarYear === CURRENT_YEAR && calendarMonth === CURRENT_MONTH;

  const calendarTitle = useMemo(() => {
    const d = new Date(calendarYear, calendarMonth, 1);
    const formatted = d.toLocaleDateString(locale === 'fr' ? 'fr-CA' : 'en-CA', {
      year: 'numeric', month: 'long'
    });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }, [calendarYear, calendarMonth, locale]);

  const changeMonth = useCallback((delta: number) => {
    setCalendarMonth((m) => {
      let newMonth = m + delta;
      let newYear = calendarYear;
      if (newMonth > 11) { newMonth = 0; newYear++; }
      if (newMonth < 0) { newMonth = 11; newYear--; }
      setCalendarYear(newYear);
      return newMonth;
    });
  }, [calendarYear]);

  const selectMoveInDate = (year: number, month: number, day: number) => {
    setSelectedDate(new Date(year, month, day));
  };

  /* ---- Duration logic ---- */
  const handleDurationChip = (months: number) => {
    setSelectedDuration(months);
    setCustomDuration(String(months));
  };

  const handleCustomDurationChange = (val: string) => {
    const num = val.replace(/\D/g, "");
    setCustomDuration(num);
    const parsed = parseInt(num);
    if ([3, 6, 12].includes(parsed)) {
      setSelectedDuration(parsed);
    } else {
      setSelectedDuration(parsed > 0 ? parsed : null);
    }
  };

  const stepDuration = (delta: number) => {
    const current = parseInt(customDuration) || 0;
    const next = Math.max(1, Math.min(24, current + delta));
    setCustomDuration(String(next));
    if ([3, 6, 12].includes(next)) {
      setSelectedDuration(next);
    } else {
      setSelectedDuration(next);
    }
  };

  /* ---- Card formatting ---- */
  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, "").substring(0, 16);
    const parts = [];
    for (let i = 0; i < digits.length; i += 4) {
      parts.push(digits.substring(i, i + 4));
    }
    setCardNumber(parts.join(" "));
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").substring(0, 4);
    if (digits.length >= 2) {
      setExpiry(digits.substring(0, 2) + " / " + digits.substring(2));
    } else {
      setExpiry(digits);
    }
  };

  const formatCvc = (val: string) => {
    setCvc(val.replace(/\D/g, "").substring(0, 4));
  };

  /* ---- Navigation ---- */
  const goToStep = (s: number) => {
    if (s < 0) return;
    // Can't proceed past step 0 (dates) without date + duration
    if (s > 0 && (!selectedDate || !activeDuration)) return;

    setStep(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const completeBooking = () => {
    setCompleted(true);
    setStep(4); // Show confirmation
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const canContinueStep0 = !!selectedDate && activeDuration > 0;

  /* ================================================================ */
  /*  RENDER: Main Booking Flow                                        */
  /* ================================================================ */
  return (
    <>
      <style>{stepAnimations}</style>

      <section className="min-h-screen bg-[#f5f5f5]">
        {/* Top Navigation */}
        <div className="bg-white border-b border-[#e5e5e5] py-3.5 px-5 sm:px-10 flex items-center justify-between sticky top-0 z-50">
          <div className="text-[28px] font-bold text-[#1a1a1a] tracking-tight">
            coli<span className="text-primary">v</span>ille
          </div>
          {step > 0 && !completed ? (
            <button
              onClick={() => goToStep(step - 1)}
              className="flex items-center gap-2 text-[14px] text-[#666] hover:text-[#1a1a1a] transition-colors cursor-pointer bg-transparent border-none"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              {t("back")}
            </button>
          ) : step === 0 ? (
            <Link
              href={selectedPropertyId ? { pathname: "/locations/[slug]" as const, params: { slug: selectedPropertyId } } : "/locations"}
              className="flex items-center gap-2 text-[14px] text-[#666] hover:text-[#1a1a1a] transition-colors cursor-pointer no-underline"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              {t("changeRoom")}
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Progress Bar */}
        <ProgressBar current={step} completed={completed} steps={STEPS} />

        {/* Main Content */}
        <div className="max-w-[960px] mx-auto px-5 sm:px-10 py-8 flex gap-8 min-h-[calc(100vh-160px)]">
          {/* Left: Step Content */}
          <div className="flex-1 min-w-0">
            {/* ======== STEP 1: SELECT DATES ======== */}
            {step === 0 && !completed && (
              <div className="step-panel animate-in" key="step1">
                <div className="step-heading">{t("whenMoveIn")}</div>
                <div className="step-subheading">{t("selectDateSubtitle")}</div>

                {/* Calendar */}
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 max-w-[520px]">
                  <div className="flex justify-between items-center mb-5">
                    <button
                      onClick={() => changeMonth(-1)}
                      className="border border-[#ddd] rounded-lg bg-white px-3 py-1.5 text-lg text-[#666] cursor-pointer transition-all hover:border-primary hover:text-primary"
                    >
                      ‹
                    </button>
                    <div className="text-base font-semibold">
                      {calendarTitle}
                    </div>
                    <button
                      onClick={() => changeMonth(1)}
                      className="border border-[#ddd] rounded-lg bg-white px-3 py-1.5 text-lg text-[#666] cursor-pointer transition-all hover:border-primary hover:text-primary"
                    >
                      ›
                    </button>
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {/* Day headers */}
                    {DAY_NAMES.map((d) => (
                      <div key={d} className="text-center text-xs font-medium text-[#999] py-2">
                        {d}
                      </div>
                    ))}

                    {/* Empty slots */}
                    {Array.from({ length: getFirstDayOfMonth(calendarYear, calendarMonth) }).map((_, i) => (
                      <div key={`empty-${i}`} className="invisible" />
                    ))}

                    {/* Days */}
                    {Array.from({ length: getDaysInMonth(calendarYear, calendarMonth) }).map((_, i) => {
                      const day = i + 1;
                      const thisDate = new Date(calendarYear, calendarMonth, day);
                      const isPast = thisDate < today;
                      const isSelected = selectedDate && selectedDate.getTime() === thisDate.getTime();

                      // Current month: all non-past days selectable
                      // Future months: only 1st is selectable
                      const isAvailable = isPast
                        ? false
                        : isCurrentMonth
                        ? true
                        : day === 1;

                      if (isPast) {
                        return (
                          <div key={day} className="text-center py-2.5 text-[14px] text-[#ddd] line-through rounded-[10px]">
                            {day}
                          </div>
                        );
                      }

                      if (!isAvailable) {
                        return (
                          <div key={day} className="relative text-center py-2.5 text-[14px] text-[#ccc] rounded-[10px] cursor-not-allowed group/day">
                            {day}
                            <div className="hidden group-hover/day:block absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 bg-[#333] text-white text-[11px] py-1.5 px-2.5 rounded-md whitespace-nowrap z-10 font-normal">
                              {t("mustBeFirst")}
                              <span className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-[#333]" />
                            </div>
                          </div>
                        );
                      }

                      return (
                        <button
                          key={day}
                          onClick={() => selectMoveInDate(calendarYear, calendarMonth, day)}
                          className={`text-center py-2.5 text-[14px] rounded-[10px] font-semibold transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "bg-primary text-white shadow-md shadow-primary/30"
                              : "text-[#1a1a1a] bg-primary/5 border-2 border-primary hover:bg-primary hover:text-white hover:scale-105"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>

                  {/* Calendar note for future months */}
                  {!isCurrentMonth && (
                    <div className="flex items-start gap-2 bg-[#fffbf0] border border-[#f0e4c8] rounded-[10px] p-3 mt-4 text-[13px] text-[#8a7340]">
                      <span className="text-base flex-shrink-0 mt-px">ℹ</span>
                      <span>{t("firstOfMonth")}</span>
                    </div>
                  )}
                </div>

                {/* Duration */}
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 max-w-[520px]">
                  <div className="text-[15px] font-semibold mb-1">{t("howLong")}</div>
                  <div className="text-[13px] text-[#999] mb-4">{t("pickDuration")}</div>

                  <div className="flex gap-2.5 flex-wrap">
                    {[3, 6, 12].map((m) => (
                      <button
                        key={m}
                        onClick={() => handleDurationChip(m)}
                        className={`py-3 px-6 border-2 rounded-xl text-[15px] font-medium cursor-pointer transition-all duration-200 ${
                          selectedDuration === m
                            ? "border-primary bg-primary text-white shadow-md shadow-primary/20"
                            : "border-[#e0e0e0] bg-white text-[#666] hover:border-primary hover:text-primary"
                        }`}
                      >
                        {m} {t("months")}
                      </button>
                    ))}
                  </div>

                  {/* Custom months */}
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#f0f0f0]">
                    <label className="text-[13px] text-[#888]">{t("orEnterMonths")}</label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => stepDuration(-1)}
                        className="w-[34px] h-[34px] rounded-full border-2 border-[#ddd] bg-white text-[#666] text-lg font-semibold flex items-center justify-center cursor-pointer transition-all hover:border-primary hover:text-primary hover:bg-primary/5 active:scale-95 flex-shrink-0"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="24"
                        placeholder="4"
                        value={customDuration}
                        onChange={(e) => handleCustomDurationChange(e.target.value)}
                        className="w-[70px] py-2 px-3 border-2 border-[#e0e0e0] rounded-lg text-[15px] text-center outline-none transition-colors focus:border-primary font-inherit"
                      />
                      <button
                        onClick={() => stepDuration(1)}
                        className="w-[34px] h-[34px] rounded-full border-2 border-[#ddd] bg-white text-[#666] text-lg font-semibold flex items-center justify-center cursor-pointer transition-all hover:border-primary hover:text-primary hover:bg-primary/5 active:scale-95 flex-shrink-0"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Move-in → Move-out display */}
                  {selectedDate && activeDuration > 0 && moveOutDate && (
                    <div className="mt-4 p-3 bg-[#f8f9fa] rounded-[10px] text-[14px] text-[#555] flex items-center gap-2">
                      📅 {t("moveIn")}: <strong className="text-[#1a1a1a]">{formatDate(selectedDate)}</strong>
                      &nbsp;→&nbsp; {t("moveOut")}: <strong className="text-[#1a1a1a]">{formatDate(moveOutDate)}</strong>
                    </div>
                  )}
                </div>

                {/* Continue button */}
                <button
                  disabled={!canContinueStep0}
                  onClick={() => goToStep(1)}
                  className="btn-primary max-w-[520px]"
                >
                  {!selectedDate && !activeDuration
                    ? t("selectDateAndDuration")
                    : !selectedDate
                    ? t("selectMoveInDate")
                    : !activeDuration
                    ? t("selectMoveInDate")
                    : `${t("continue")} →`}
                </button>

                {/* Testimonial */}
                <div className="testimonial-mini">
                  <div className="testimonial-avatar">SM</div>
                  <div>
                    <div className="testimonial-text">&ldquo;{t("testimonial1")}&rdquo;</div>
                    <div className="testimonial-name">{t("testimonial1Name")}</div>
                  </div>
                </div>
              </div>
            )}

            {/* ======== STEP 2: PAYMENT PLAN ======== */}
            {step === 1 && !completed && (
              <div className="step-panel animate-in" key="step2">
                <div className="step-heading">{t("choosePaymentPlan")}</div>
                <div className="step-subheading">{t("paymentSubtitle")}</div>

                {/* Frequency options */}
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 max-w-[520px]">
                  <div className="text-[15px] font-semibold mb-1">{t("paymentFrequency")}</div>
                  <div className="text-[13px] text-[#999] mb-4">{t("chooseFrequency")}</div>

                  <div className="flex gap-3 max-w-[420px]">
                    {/* Bi-weekly */}
                    <button
                      onClick={() => setFrequency("biweekly")}
                      className={`flex-1 border-2 rounded-[14px] py-[18px] px-4 cursor-pointer transition-all text-center ${
                        frequency === "biweekly"
                          ? "border-primary bg-[#f5f6fe]"
                          : "border-[#e0e0e0] hover:border-primary"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 mx-auto mb-3 flex items-center justify-center transition-all ${
                        frequency === "biweekly" ? "border-primary" : "border-[#ccc]"
                      }`}>
                        {frequency === "biweekly" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                      </div>
                      <div className="text-2xl font-bold text-[#1a1a1a] mb-1">C${biweeklyPrice}</div>
                      <div className="text-[13px] text-[#888]">{t("biweekly")}</div>
                    </button>

                    {/* Monthly */}
                    <button
                      onClick={() => setFrequency("monthly")}
                      className={`flex-1 border-2 rounded-[14px] py-[18px] px-4 cursor-pointer transition-all text-center ${
                        frequency === "monthly"
                          ? "border-primary bg-[#f5f6fe]"
                          : "border-[#e0e0e0] hover:border-primary"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 mx-auto mb-3 flex items-center justify-center transition-all ${
                        frequency === "monthly" ? "border-primary" : "border-[#ccc]"
                      }`}>
                        {frequency === "monthly" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                      </div>
                      <div className="text-2xl font-bold text-[#1a1a1a] mb-1">C${monthlyPrice}</div>
                      <div className="text-[13px] text-[#888]">{t("monthly")}</div>
                    </button>
                  </div>
                </div>

                {/* Payment Plan Accordion */}
                <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden max-w-[520px]">
                  <button
                    onClick={() => setPlanOpen(!planOpen)}
                    className="w-full py-5 px-6 flex justify-between items-center cursor-pointer transition-colors hover:bg-[#fafafa] bg-transparent border-none text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">💰</span>
                      <span className="text-[15px] font-semibold">{t("viewPaymentPlan")}</span>
                    </div>
                    <span className={`text-[14px] text-[#999] transition-transform duration-300 ${planOpen ? "rotate-180" : ""}`}>
                      ▼
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-400 ${planOpen ? "max-h-[600px]" : "max-h-0"}`}>
                    <div className="px-6 pb-6">
                      <div className="relative pl-6">
                        {/* Timeline line */}
                        <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-[#e0e0e0]" />

                        {/* Timeline items */}
                        <div className="relative mb-5 pl-5">
                          <div className="absolute left-[-20px] top-1.5 w-3 h-3 rounded-full border-2 border-primary bg-white" />
                          <div className="text-[14px] font-semibold text-[#1a1a1a] mb-0.5">{t("todayReserve")}</div>
                          <div className="text-[13px] text-[#888]">{t("oneTimeFee")}</div>
                          <div className="text-[14px] font-semibold text-primary mt-0.5">C${SERVICE_FEE}</div>
                        </div>
                        <div className="relative mb-5 pl-5">
                          <div className="absolute left-[-20px] top-1.5 w-3 h-3 rounded-full border-2 border-primary bg-white" />
                          <div className="text-[14px] font-semibold text-[#1a1a1a] mb-0.5">{t("beforeDeposit")}</div>
                          <div className="text-[13px] text-[#888]">{t("securityDeposit")}</div>
                          <div className="text-[14px] font-semibold text-primary mt-0.5">C${deposit}</div>
                        </div>
                        <div className="relative mb-5 pl-5">
                          <div className="absolute left-[-20px] top-1.5 w-3 h-3 rounded-full border-2 border-primary bg-white" />
                          <div className="text-[14px] font-semibold text-[#1a1a1a] mb-0.5">{t("beforeRent")}</div>
                          <div className="text-[13px] text-[#888]">{t("firstPayment")}</div>
                          <div className="text-[14px] font-semibold text-primary mt-0.5">C${monthlyPrice}</div>
                        </div>
                        <div className="relative pl-5">
                          <div className="absolute left-[-20px] top-1.5 w-3 h-3 rounded-full border-2 border-primary bg-white" />
                          <div className="text-[14px] font-semibold text-[#1a1a1a] mb-0.5">
                            {t("ongoing")} — {frequency === "biweekly" ? t("biweekly") : t("monthly")}
                          </div>
                          <div className="text-[13px] text-[#888]">{t("regularPayments")}</div>
                          <div className="text-[14px] font-semibold text-primary mt-0.5">
                            C${frequency === "biweekly" ? biweeklyPrice : monthlyPrice}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6 max-w-[520px]">
                  <button onClick={() => goToStep(0)} className="btn-secondary">
                    ‹ {t("back")}
                  </button>
                  <button onClick={() => goToStep(2)} className="btn-primary flex-1">
                    {t("continue")} →
                  </button>
                </div>

                {/* Testimonial */}
                <div className="testimonial-mini">
                  <div className="testimonial-avatar">MK</div>
                  <div>
                    <div className="testimonial-text">&ldquo;{t("testimonial2")}&rdquo;</div>
                    <div className="testimonial-name">{t("testimonial2Name")}</div>
                  </div>
                </div>
              </div>
            )}

            {/* ======== STEP 3: REVIEW ======== */}
            {step === 2 && !completed && (
              <div className="step-panel animate-in" key="step3">
                <div className="step-heading">{t("reviewTitle")}</div>
                <div className="step-subheading">{t("reviewSubtitle")}</div>

                {/* Stay details */}
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-5 max-w-[520px]">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-[15px] font-semibold">{t("stayDetails")}</div>
                    <button onClick={() => goToStep(0)} className="text-[13px] text-primary font-medium cursor-pointer border-none bg-transparent py-1 px-2 rounded-md transition-colors hover:bg-primary/5">
                      {t("edit")}
                    </button>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-[#f5f5f5] text-[14px]">
                    <span className="text-[#888]">{t("moveInLabel")}</span>
                    <span className="font-semibold text-[#1a1a1a]">{selectedDate ? formatDate(selectedDate) : ""}</span>
                  </div>
                  <div className="flex justify-between py-2.5 text-[14px]">
                    <span className="text-[#888]">{t("moveOutLabel")}</span>
                    <span className="font-semibold text-[#1a1a1a]">{moveOutDate ? formatDate(moveOutDate) : ""}</span>
                  </div>
                </div>

                {/* Payment details */}
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-5 max-w-[520px]">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-[15px] font-semibold">{t("paymentDetails")}</div>
                    <button onClick={() => goToStep(1)} className="text-[13px] text-primary font-medium cursor-pointer border-none bg-transparent py-1 px-2 rounded-md transition-colors hover:bg-primary/5">
                      {t("edit")}
                    </button>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-[#f5f5f5] text-[14px]">
                    <span className="text-[#888]">{t("weeklyRent")}</span>
                    <span className="font-semibold text-[#1a1a1a]">C${weeklyPrice}</span>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-[#f5f5f5] text-[14px]">
                    <span className="text-[#888]">{t("paymentFrequency")}</span>
                    <span className="font-semibold text-[#1a1a1a]">
                      {frequency === "biweekly" ? `${t("biweekly")} (C$${biweeklyPrice})` : `${t("monthly")} (C$${monthlyPrice})`}
                    </span>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-[#f5f5f5] text-[14px]">
                    <span className="text-[#888]">{t("deposit")}</span>
                    <span className="font-semibold text-[#1a1a1a]">C${deposit}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 mt-1 border-t border-[#f5f5f5] text-[14px]">
                    <span className="text-[#888] flex items-center gap-1.5">
                      {t("serviceFee")}
                      <span className="relative group/tip">
                        <span className="w-4 h-4 rounded-full bg-[#e0e0e0] text-[#666] text-[11px] inline-flex items-center justify-center font-bold italic cursor-pointer">
                          i
                        </span>
                        <span className="hidden group-hover/tip:block absolute bottom-[calc(100%+8px)] left-0 bg-[#333] text-white text-xs font-normal not-italic p-3 rounded-[10px] w-[280px] leading-relaxed z-20 shadow-lg">
                          {t("serviceFeeTooltip")}
                          <span className="absolute top-full left-4 border-[6px] border-transparent border-t-[#333]" />
                        </span>
                      </span>
                    </span>
                    <span className="font-semibold text-[#1a1a1a]">C${SERVICE_FEE}</span>
                  </div>
                </div>

                {/* Cancellation policy */}
                <div className="flex items-center gap-2 bg-[#f0faf4] border border-[#c8e6d0] rounded-[10px] p-3 mb-5 text-[13px] text-[#2d7a4a] leading-relaxed max-w-[520px]">
                  <span className="text-base flex-shrink-0">✅</span>
                  <strong>{t("freeCancellation")}</strong>
                  <span className="relative group/cancel ml-1">
                    <span className="w-[18px] h-[18px] rounded-full bg-[#2d7a4a] text-white text-[11px] inline-flex items-center justify-center font-bold cursor-pointer flex-shrink-0">
                      i
                    </span>
                    <span className="hidden group-hover/cancel:block absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 bg-[#333] text-white text-xs font-normal p-3.5 rounded-[10px] w-[320px] leading-relaxed z-30 shadow-lg">
                      Cancelling is simple. After booking you&rsquo;ll receive access to your tenant portal. Click the cancel button there for an instant full refund. Or email <strong>booking@coliville.com</strong> within 24 hours to request cancellation. After 24 hours, our standard cancellation policy applies.
                      <span className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-[#333]" />
                    </span>
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6 max-w-[520px]">
                  <button onClick={() => goToStep(1)} className="btn-secondary">
                    ‹ {t("back")}
                  </button>
                  <button onClick={() => goToStep(3)} className="btn-primary flex-1">
                    {t("reserveFor", { fee: SERVICE_FEE })} →
                  </button>
                </div>
              </div>
            )}

            {/* ======== STEP 4: RESERVE / PAY ======== */}
            {step === 3 && !completed && (
              <div className="step-panel animate-in" key="step4">
                <div className="step-heading">{t("reserveTitle")}</div>
                <div className="step-subheading">{t("reserveSubtitle")}</div>

                <div className="bg-white rounded-2xl p-7 shadow-sm mb-6 max-w-[520px]">
                  {/* Amount hero */}
                  <div className="text-center py-6 mb-6 border-b border-[#f0f0f0]">
                    <div className="text-[13px] text-[#888] mb-1">{t("serviceFeeDueNow")}</div>
                    <div className="text-[42px] font-bold text-[#1a1a1a]">C${SERVICE_FEE}</div>
                    <div className="text-[13px] text-[#888] mt-2 max-w-[380px] mx-auto leading-relaxed">
                      {t("oncePaid")}
                    </div>
                  </div>

                  {/* Payment method tabs */}
                  <div className="flex gap-2 mb-6">
                    <button
                      onClick={() => setPayMethod("card")}
                      className={`flex-1 py-3.5 border-2 rounded-xl text-center text-[14px] font-medium cursor-pointer transition-all flex items-center justify-center gap-2 ${
                        payMethod === "card"
                          ? "border-primary bg-[#f5f6fe]"
                          : "border-[#e0e0e0] hover:border-primary"
                      }`}
                    >
                      💳 {t("card")}
                    </button>
                    <button
                      onClick={() => setPayMethod("bank")}
                      className={`flex-1 py-3.5 border-2 rounded-xl text-center text-[14px] font-medium cursor-pointer transition-all flex items-center justify-center gap-2 ${
                        payMethod === "bank"
                          ? "border-primary bg-[#f5f6fe]"
                          : "border-[#e0e0e0] hover:border-primary"
                      }`}
                    >
                      🏦 {t("bank")}
                    </button>
                  </div>

                  {/* Card form */}
                  <div className="mb-5">
                    <label className="text-[13px] font-medium text-[#555] mb-1.5 block">{t("cardNumber")}</label>
                    <input
                      type="text"
                      placeholder="1234 1234 1234 1234"
                      value={cardNumber}
                      maxLength={19}
                      onChange={(e) => formatCardNumber(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="flex gap-3 mb-5">
                    <div className="flex-1">
                      <label className="text-[13px] font-medium text-[#555] mb-1.5 block">{t("expiryDate")}</label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        value={expiry}
                        maxLength={7}
                        onChange={(e) => formatExpiry(e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-[13px] font-medium text-[#555] mb-1.5 block">{t("securityCode")}</label>
                      <input
                        type="text"
                        placeholder="CVC"
                        value={cvc}
                        maxLength={4}
                        onChange={(e) => formatCvc(e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className="text-[13px] font-medium text-[#555] mb-1.5 block">{t("country")}</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="form-input appearance-none cursor-pointer"
                    >
                      <option>Canada</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <button onClick={completeBooking} className="btn-primary mt-2">
                    🔒 {t("payAndReserve", { fee: SERVICE_FEE })}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-xs text-[#888] mt-5">
                    🔒 {t("securedByStripe")}
                  </div>
                </div>

                {/* Cancellation policy */}
                <div className="flex items-center gap-2 bg-[#f0faf4] border border-[#c8e6d0] rounded-[10px] p-3 mb-5 text-[13px] text-[#2d7a4a] leading-relaxed max-w-[520px]">
                  <span className="text-base flex-shrink-0">✅</span>
                  <strong>{t("freeCancellation")}</strong>
                  <span className="relative group/cancel ml-1">
                    <span className="w-[18px] h-[18px] rounded-full bg-[#2d7a4a] text-white text-[11px] inline-flex items-center justify-center font-bold cursor-pointer flex-shrink-0">
                      i
                    </span>
                    <span className="hidden group-hover/cancel:block absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 bg-[#333] text-white text-xs font-normal p-3.5 rounded-[10px] w-[320px] leading-relaxed z-30 shadow-lg">
                      Cancelling is simple. After booking you&rsquo;ll receive access to your tenant portal. Click the cancel button there for an instant full refund. Or email <strong>booking@coliville.com</strong> within 24 hours to request cancellation. After 24 hours, our standard cancellation policy applies.
                      <span className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-[#333]" />
                    </span>
                  </span>
                </div>

                <button onClick={() => goToStep(2)} className="btn-secondary w-full max-w-[520px]">
                  ‹ {t("backToReview")}
                </button>
              </div>
            )}

            {/* ======== CONFIRMATION ======== */}
            {completed && (
              <div className="step-panel animate-in" key="step5">
                <div className="text-center py-10 px-5">
                  {/* Success icon */}
                  <div className="w-20 h-20 bg-[#e8f5e9] rounded-full flex items-center justify-center mx-auto mb-6 text-[40px] text-[#27ae60] animate-scaleIn">
                    ✓
                  </div>
                  <div className="text-2xl font-bold text-[#1a1a1a] mb-2">{t("confirmationTitle")}</div>
                  <div className="text-[14px] text-[#888] mb-8 max-w-[400px] mx-auto leading-relaxed">
                    {t("confirmationSubtitle")}
                  </div>

                  {/* Next steps */}
                  <div className="bg-white rounded-2xl p-6 text-left shadow-sm max-w-[500px] mx-auto">
                    <div className="text-[15px] font-semibold mb-4">{t("nextSteps")}</div>

                    <div className="flex gap-3 mb-4 pb-4 border-b border-[#f5f5f5]">
                      <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-[13px] font-bold flex items-center justify-center flex-shrink-0">
                        1
                      </div>
                      <div className="text-[14px] text-[#555] leading-relaxed">
                        <strong className="text-[#1a1a1a]">{t("step1Title")}</strong> — {t("step1Desc")}
                      </div>
                    </div>
                    <div className="flex gap-3 mb-4 pb-4 border-b border-[#f5f5f5]">
                      <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-[13px] font-bold flex items-center justify-center flex-shrink-0">
                        2
                      </div>
                      <div className="text-[14px] text-[#555] leading-relaxed">
                        <strong className="text-[#1a1a1a]">{t("step2Title")}</strong> — {t("step2Desc")}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-[13px] font-bold flex items-center justify-center flex-shrink-0">
                        3
                      </div>
                      <div className="text-[14px] text-[#555] leading-relaxed">
                        <strong className="text-[#1a1a1a]">{t("step3Title", { date: selectedDate ? formatDate(selectedDate) : "" })}</strong> — {t("step3Desc")}
                      </div>
                    </div>
                  </div>

                  {/* Tenant portal section */}
                  <div className="max-w-[500px] mx-auto mt-7 text-center">
                    <div className="bg-[#f0faf4] border border-[#c8e6d3] rounded-xl p-4 text-[14px] text-[#2d6a4f] font-medium leading-relaxed mb-4">
                      🎉 {t("tenantPortal")}
                    </div>
                    <a
                      href="#"
                      className="inline-block py-3.5 px-9 bg-primary text-white border-none rounded-[14px] text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/40 active:-translate-y-px active:shadow-md active:shadow-primary/30 no-underline mb-4"
                    >
                      {t("goToPortal")} →
                    </a>
                    <div className="text-[13px] text-[#888] leading-relaxed">
                      📧 {t("emailSent")}
                    </div>
                  </div>

                  {/* Help note */}
                  <div className="text-center text-[13px] text-[#888] mt-5 max-w-[500px] mx-auto">
                    {t("needHelp")} <a href="mailto:booking@coliville.com" className="text-primary no-underline hover:underline">booking@coliville.com</a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Room Card Sidebar */}
          {selectedRoom && selectedProperty && !completed && (
            <div className="hidden lg:block w-[300px] flex-shrink-0">
              <RoomSidebar
                property={selectedProperty}
                room={selectedRoom}
                frequency={frequency}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared Styles (injected via <style> tag)                           */
/* ------------------------------------------------------------------ */
const stepAnimations = `
  .animate-in {
    animation: fadeInUp 0.4s ease both;
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-scaleIn {
    animation: scaleIn 0.5s ease both;
  }
  @keyframes scaleIn {
    from { transform: scale(0); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  .step-heading {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 6px;
    color: #1a1a1a;
  }
  .step-subheading {
    font-size: 14px;
    color: #888;
    margin-bottom: 28px;
  }

  .btn-primary {
    width: 100%;
    padding: 16px 32px;
    background: #5B6BF0;
    color: #fff;
    border: none;
    border-radius: 14px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    font-family: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .btn-primary:hover {
    background: #4455D4;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(91, 107, 240, 0.4);
  }
  .btn-primary:active {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(91, 107, 240, 0.3);
  }
  .btn-primary:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  .btn-secondary {
    padding: 14px 28px;
    background: #fff;
    color: #666;
    border: 2px solid #e0e0e0;
    border-radius: 14px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    font-family: inherit;
  }
  .btn-secondary:hover {
    border-color: #999;
    color: #333;
  }

  .form-input {
    width: 100%;
    padding: 14px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-size: 15px;
    outline: none;
    transition: border-color 0.2s;
    font-family: inherit;
    background: #fff;
    -webkit-appearance: none;
  }
  .form-input:focus {
    border-color: #5B6BF0;
  }
  .form-input::placeholder {
    color: #bbb;
  }

  .testimonial-mini {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
    background: #fafafa;
    border-radius: 12px;
    margin-top: 20px;
    max-width: 520px;
  }
  .testimonial-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #e0d5c3;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
    color: #8a7a60;
    font-weight: 600;
  }
  .testimonial-text {
    font-size: 13px;
    color: #666;
    line-height: 1.5;
    font-style: italic;
  }
  .testimonial-name {
    font-size: 12px;
    color: #999;
    margin-top: 4px;
    font-style: normal;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .step-heading { font-size: 20px; }
  }
`;
