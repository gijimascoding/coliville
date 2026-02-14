"use client";

import { useState, useMemo } from "react";
import { properties, type Property, type Room } from "@/data/properties";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  about: string;
  isStudent: boolean;
}

const STEPS = ["Select Room", "Pick Dates", "Your Details", "Confirm"] as const;
const DURATION_OPTIONS = [3, 6, 9, 12] as const;
const SERVICE_FEE = 50;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function weeksInMonths(months: number): number {
  return Math.round((months * 365.25) / 12 / 7);
}

/* ------------------------------------------------------------------ */
/*  Progress Bar                                                       */
/* ------------------------------------------------------------------ */
function ProgressBar({ current }: { current: number }) {
  return (
    <div className="w-full mb-10">
      {/* Desktop labels */}
      <div className="hidden sm:flex justify-between mb-3">
        {STEPS.map((label, i) => (
          <span
            key={label}
            className={`text-sm font-medium transition-colors duration-300 ${
              i <= current ? "text-primary" : "text-text-muted"
            }`}
          >
            {label}
          </span>
        ))}
      </div>
      {/* Mobile label */}
      <p className="sm:hidden text-sm font-medium text-primary mb-3">
        Step {current + 1} of {STEPS.length}: {STEPS[current]}
      </p>
      {/* Bar */}
      <div className="h-2 rounded-full bg-border-light overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${((current + 1) / STEPS.length) * 100}%` }}
        />
      </div>
      {/* Dots */}
      <div className="hidden sm:flex justify-between mt-[-14px] px-[2px]">
        {STEPS.map((label, i) => (
          <div
            key={label}
            className={`w-5 h-5 rounded-full border-[3px] transition-all duration-300 ${
              i <= current
                ? "bg-primary border-primary"
                : "bg-background border-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar Summary                                                    */
/* ------------------------------------------------------------------ */
function Sidebar({
  property,
  room,
  moveIn,
  duration,
  step,
}: {
  property: Property | null;
  room: Room | null;
  moveIn: string;
  duration: number;
  step: number;
}) {
  const weeks = weeksInMonths(duration);
  const weeklyPrice = room?.price ?? 0;
  const totalRent = weeklyPrice * weeks;
  const monthlyEquivalent = duration > 0 ? Math.round(totalRent / duration) : 0;

  return (
    <div className="bg-card-bg rounded-2xl border border-border p-6 sticky top-28 shadow-sm">
      <h3 className="text-lg font-semibold text-secondary mb-4">
        Booking Summary
      </h3>

      {/* Property & Room */}
      {property && (
        <div className="flex items-start gap-3 mb-4">
          <div
            className="w-16 h-16 rounded-xl bg-cover bg-center shrink-0"
            style={{ backgroundImage: `url(${property.heroImage})` }}
          />
          <div className="min-w-0">
            <p className="font-semibold text-secondary truncate">{property.name}</p>
            <p className="text-sm text-text-muted truncate">{property.area}</p>
          </div>
        </div>
      )}

      {room && (
        <div className="pb-4 mb-4 border-b border-border-light">
          <p className="text-sm text-text-secondary">{room.name}</p>
          <p className="text-primary font-bold text-lg">
            C${room.price}
            <span className="text-sm font-normal text-text-muted">/week</span>
          </p>
        </div>
      )}

      {/* Dates */}
      {step >= 1 && moveIn && (
        <div className="pb-4 mb-4 border-b border-border-light space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Move-in</span>
            <span className="text-text-secondary font-medium">
              {formatDate(new Date(moveIn + "T00:00:00"))}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Duration</span>
            <span className="text-text-secondary font-medium">
              {duration} months
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Move-out</span>
            <span className="text-text-secondary font-medium">
              {formatDate(addMonths(new Date(moveIn + "T00:00:00"), duration))}
            </span>
          </div>
        </div>
      )}

      {/* Price breakdown */}
      {room && step >= 1 && duration > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">
              C${weeklyPrice} x {weeks} weeks
            </span>
            <span className="text-text-secondary">C${totalRent.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Monthly equivalent</span>
            <span className="text-text-secondary">
              ~C${monthlyEquivalent.toLocaleString()}/mo
            </span>
          </div>
          {step >= 3 && (
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Service fee (one-time)</span>
              <span className="text-text-secondary">C${SERVICE_FEE}</span>
            </div>
          )}
          <div className="pt-3 mt-3 border-t border-border-light flex justify-between font-semibold">
            <span className="text-secondary">Total</span>
            <span className="text-primary text-lg">
              C${(totalRent + (step >= 3 ? SERVICE_FEE : 0)).toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {!property && (
        <p className="text-sm text-text-muted italic">
          Select a property and room to see your summary.
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */
export default function BookPage() {
  /* Step state */
  const [step, setStep] = useState(0);

  /* Step 1 */
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState("");

  /* Step 2 */
  const [moveInDate, setMoveInDate] = useState("");
  const [duration, setDuration] = useState(0);
  const [customDuration, setCustomDuration] = useState("");

  /* Step 3 */
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    about: "",
    isStudent: false,
  });

  /* Step 4 */
  const [reserved, setReserved] = useState(false);

  /* Derived */
  const selectedProperty = useMemo(
    () => properties.find((p) => p.id === selectedPropertyId) ?? null,
    [selectedPropertyId]
  );
  const selectedRoom = useMemo(
    () => selectedProperty?.rooms.find((r) => r.id === selectedRoomId) ?? null,
    [selectedProperty, selectedRoomId]
  );

  const activeDuration = duration > 0 ? duration : Number(customDuration) || 0;

  const moveOutDate = useMemo(() => {
    if (!moveInDate || activeDuration <= 0) return null;
    return addMonths(new Date(moveInDate + "T00:00:00"), activeDuration);
  }, [moveInDate, activeDuration]);

  /* Validation per step */
  const canContinue = useMemo(() => {
    switch (step) {
      case 0:
        return !!selectedPropertyId && !!selectedRoomId;
      case 1:
        return !!moveInDate && activeDuration > 0;
      case 2:
        return (
          form.firstName.trim() !== "" &&
          form.lastName.trim() !== "" &&
          form.email.trim() !== "" &&
          form.phone.trim() !== ""
        );
      default:
        return true;
    }
  }, [step, selectedPropertyId, selectedRoomId, moveInDate, activeDuration, form]);

  /* Handlers */
  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
  };
  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const handlePropertyChange = (id: string) => {
    setSelectedPropertyId(id);
    setSelectedRoomId("");
  };

  const handleDurationChip = (months: number) => {
    setDuration(months);
    setCustomDuration("");
  };

  const handleCustomDuration = (val: string) => {
    const num = val.replace(/\D/g, "");
    setCustomDuration(num);
    setDuration(0);
  };

  const updateForm = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  /* Minimum date: today */
  const today = new Date().toISOString().split("T")[0];

  const weeks = weeksInMonths(activeDuration);
  const weeklyPrice = selectedRoom?.price ?? 0;
  const totalRent = weeklyPrice * weeks;

  /* ---------------------------------------------------------------- */
  /*  Render Steps                                                     */
  /* ---------------------------------------------------------------- */

  /* Step 1 -------------------------------------------------------- */
  const renderStep1 = () => (
    <div className="space-y-8 animate-in">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-2">
          Select Your Space
        </h2>
        <p className="text-text-muted">
          Choose from our curated collection of coliving properties in Montreal.
        </p>
      </div>

      {/* Property select */}
      <div>
        <label className="block text-sm font-medium text-secondary mb-2">
          Property
        </label>
        <div className="relative">
          <select
            value={selectedPropertyId}
            onChange={(e) => handlePropertyChange(e.target.value)}
            className="w-full appearance-none rounded-xl border border-border bg-card-bg px-4 py-3 pr-10 text-text-primary transition focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary cursor-pointer"
          >
            <option value="">Choose a property...</option>
            {properties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} &mdash; {p.neighborhood}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Room cards */}
      {selectedProperty && (
        <div>
          <p className="text-sm font-medium text-secondary mb-3">
            Rooms at {selectedProperty.name}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {selectedProperty.rooms.map((room) => {
              const isSelected = selectedRoomId === room.id;
              return (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoomId(room.id)}
                  className={`group relative text-left rounded-2xl border-2 overflow-hidden transition-all duration-200 hover:shadow-md ${
                    isSelected
                      ? "border-primary shadow-md ring-2 ring-primary/20"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-40 sm:h-36 overflow-hidden">
                    <img
                      src={room.images[0]}
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-secondary">{room.name}</h4>
                      <span className="text-primary font-bold whitespace-nowrap">
                        C${room.price}/wk
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-text-muted mb-2">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
                        </svg>
                        {room.beds} {room.beds === 1 ? "bed" : "beds"}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4" />
                        </svg>
                        {room.baths} {room.baths === 1 ? "bath" : "baths"}
                      </span>
                    </div>
                    {room.features && (
                      <div className="flex flex-wrap gap-1.5">
                        {room.features.map((f) => (
                          <span
                            key={f}
                            className="px-2 py-0.5 rounded-full bg-accent/10 text-accent-dark text-[11px] font-medium"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  /* Step 2 -------------------------------------------------------- */
  const renderStep2 = () => (
    <div className="space-y-8 animate-in">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-2">
          Pick Your Dates
        </h2>
        <p className="text-text-muted">
          Choose when you&rsquo;d like to move in and how long you&rsquo;re staying.
        </p>
      </div>

      {/* Move-in date */}
      <div>
        <label className="block text-sm font-medium text-secondary mb-2">
          Move-in Date
        </label>
        <input
          type="date"
          value={moveInDate}
          min={today}
          onChange={(e) => setMoveInDate(e.target.value)}
          className="w-full sm:w-72 rounded-xl border border-border bg-card-bg px-4 py-3 text-text-primary transition focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
        />
      </div>

      {/* Duration */}
      <div>
        <label className="block text-sm font-medium text-secondary mb-3">
          Duration
        </label>
        <div className="flex flex-wrap gap-3">
          {DURATION_OPTIONS.map((m) => (
            <button
              key={m}
              onClick={() => handleDurationChip(m)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                duration === m
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "bg-card-bg border border-border text-text-secondary hover:border-primary/40 hover:text-primary"
              }`}
            >
              {m} months
            </button>
          ))}
          {/* Custom */}
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              placeholder="Custom"
              value={customDuration}
              onChange={(e) => handleCustomDuration(e.target.value)}
              className={`w-28 rounded-full border px-4 py-2.5 text-sm text-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary ${
                duration === 0 && customDuration
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border bg-card-bg text-text-secondary"
              }`}
            />
            {customDuration && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-text-muted pointer-events-none">
                mo
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Calculated move-out */}
      {moveOutDate && (
        <div className="rounded-xl bg-accent/8 border border-accent/20 p-5">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-semibold text-secondary">Your Stay</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-text-muted mb-0.5">Move-in</p>
              <p className="font-medium text-secondary">
                {formatDate(new Date(moveInDate + "T00:00:00"))}
              </p>
            </div>
            <div>
              <p className="text-text-muted mb-0.5">Move-out</p>
              <p className="font-medium text-secondary">
                {formatDate(moveOutDate)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Cost breakdown */}
      {selectedRoom && activeDuration > 0 && (
        <div className="rounded-xl bg-card-bg border border-border p-5">
          <h4 className="font-semibold text-secondary mb-3">Cost Breakdown</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">Weekly rate</span>
              <span className="text-text-secondary font-medium">
                C${weeklyPrice}/week
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">
                {activeDuration} months ({weeks} weeks)
              </span>
              <span className="text-text-secondary font-medium">
                C${totalRent.toLocaleString()}
              </span>
            </div>
            <div className="pt-2 mt-2 border-t border-border-light flex justify-between">
              <span className="text-text-muted">Monthly equivalent</span>
              <span className="text-primary font-bold">
                ~C${activeDuration > 0 ? Math.round(totalRent / activeDuration).toLocaleString() : 0}
                /mo
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  /* Step 3 -------------------------------------------------------- */
  const renderStep3 = () => (
    <div className="space-y-8 animate-in">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-2">
          Your Details
        </h2>
        <p className="text-text-muted">
          Tell us a bit about yourself so we can prepare your space.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* First name */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-1.5">
            First Name <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            value={form.firstName}
            onChange={(e) => updateForm("firstName", e.target.value)}
            placeholder="Jane"
            className="w-full rounded-xl border border-border bg-card-bg px-4 py-3 text-text-primary placeholder:text-text-muted/60 transition focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
          />
        </div>
        {/* Last name */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-1.5">
            Last Name <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            value={form.lastName}
            onChange={(e) => updateForm("lastName", e.target.value)}
            placeholder="Doe"
            className="w-full rounded-xl border border-border bg-card-bg px-4 py-3 text-text-primary placeholder:text-text-muted/60 transition focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
          />
        </div>
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-1.5">
            Email <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateForm("email", e.target.value)}
            placeholder="jane@example.com"
            className="w-full rounded-xl border border-border bg-card-bg px-4 py-3 text-text-primary placeholder:text-text-muted/60 transition focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
          />
        </div>
        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-1.5">
            Phone <span className="text-primary">*</span>
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => updateForm("phone", e.target.value)}
            placeholder="+1 (514) 555-1234"
            className="w-full rounded-xl border border-border bg-card-bg px-4 py-3 text-text-primary placeholder:text-text-muted/60 transition focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
          />
        </div>
      </div>

      {/* About */}
      <div>
        <label className="block text-sm font-medium text-secondary mb-1.5">
          Tell Us About Yourself
        </label>
        <textarea
          rows={4}
          value={form.about}
          onChange={(e) => updateForm("about", e.target.value)}
          placeholder="What brings you to Montreal? What are you studying or working on? Anything you'd like us to know..."
          className="w-full rounded-xl border border-border bg-card-bg px-4 py-3 text-text-primary placeholder:text-text-muted/60 transition resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
        />
      </div>

      {/* Student checkbox */}
      <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative">
          <input
            type="checkbox"
            checked={form.isStudent}
            onChange={(e) => updateForm("isStudent", e.target.checked)}
            className="peer sr-only"
          />
          <div className="w-5 h-5 rounded-md border-2 border-border transition-all peer-checked:bg-primary peer-checked:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40 group-hover:border-primary/60" />
          <svg
            className="absolute top-0.5 left-0.5 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-sm text-text-secondary">
          I&rsquo;m a student (optional)
        </span>
      </label>
    </div>
  );

  /* Step 4 -------------------------------------------------------- */
  const renderStep4 = () => {
    if (reserved) {
      return (
        <div className="flex flex-col items-center justify-center py-16 animate-in">
          {/* Success animation */}
          <div className="relative mb-8">
            <div className="w-24 h-24 rounded-full bg-accent/15 flex items-center justify-center animate-bounce-slow">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            {/* Decorative dots */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-ping"
                style={{
                  backgroundColor: i % 2 === 0 ? "#E8614D" : "#7FB685",
                  top: `${50 + 52 * Math.sin((i * Math.PI * 2) / 8)}%`,
                  left: `${50 + 52 * Math.cos((i * Math.PI * 2) / 8)}%`,
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: "1.5s",
                }}
              />
            ))}
          </div>
          <h2 className="text-3xl font-bold text-secondary mb-2">
            You&rsquo;re All Set!
          </h2>
          <p className="text-text-muted text-center max-w-md mb-2">
            Your reservation at <span className="font-semibold text-secondary">{selectedProperty?.name}</span> has
            been confirmed. We&rsquo;ll send a confirmation email to{" "}
            <span className="font-semibold text-secondary">{form.email}</span>.
          </p>
          <p className="text-sm text-accent font-medium">
            Free cancellation within 24 hours
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-8 animate-in">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-2">
            Confirm &amp; Reserve
          </h2>
          <p className="text-text-muted">
            Review your booking details before finalizing.
          </p>
        </div>

        {/* Summary card */}
        <div className="rounded-2xl border border-border bg-card-bg overflow-hidden">
          {/* Property header */}
          <div className="relative h-40 overflow-hidden">
            <img
              src={selectedProperty?.heroImage}
              alt={selectedProperty?.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-bold text-lg">{selectedProperty?.name}</h3>
              <p className="text-white/80 text-sm">{selectedProperty?.area}</p>
            </div>
          </div>

          <div className="p-5 space-y-4">
            {/* Room */}
            <div className="flex items-center justify-between pb-4 border-b border-border-light">
              <div>
                <p className="text-sm text-text-muted">Room</p>
                <p className="font-semibold text-secondary">{selectedRoom?.name}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-text-muted">Weekly rate</p>
                <p className="font-bold text-primary">C${selectedRoom?.price}/wk</p>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-3 gap-4 pb-4 border-b border-border-light text-sm">
              <div>
                <p className="text-text-muted mb-0.5">Move-in</p>
                <p className="font-medium text-secondary">
                  {formatDate(new Date(moveInDate + "T00:00:00"))}
                </p>
              </div>
              <div>
                <p className="text-text-muted mb-0.5">Move-out</p>
                <p className="font-medium text-secondary">
                  {moveOutDate ? formatDate(moveOutDate) : ""}
                </p>
              </div>
              <div>
                <p className="text-text-muted mb-0.5">Duration</p>
                <p className="font-medium text-secondary">{activeDuration} months</p>
              </div>
            </div>

            {/* Guest */}
            <div className="pb-4 border-b border-border-light text-sm">
              <p className="text-text-muted mb-1">Guest</p>
              <p className="font-medium text-secondary">
                {form.firstName} {form.lastName}
              </p>
              <p className="text-text-muted">
                {form.email} &middot; {form.phone}
              </p>
            </div>

            {/* Pricing */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">
                  C${weeklyPrice} x {weeks} weeks
                </span>
                <span className="text-text-secondary">
                  C${totalRent.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Service fee (one-time)</span>
                <span className="text-text-secondary">C${SERVICE_FEE}</span>
              </div>
              <div className="pt-3 mt-2 border-t border-border-light flex justify-between font-bold text-base">
                <span className="text-secondary">Total</span>
                <span className="text-primary">
                  C${(totalRent + SERVICE_FEE).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Reserve button */}
        <div className="space-y-3">
          <button
            onClick={() => setReserved(true)}
            className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg transition-all duration-200 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]"
          >
            Reserve for C${SERVICE_FEE}
          </button>
          <p className="text-center text-sm text-text-muted">
            <svg
              className="inline w-4 h-4 mr-1 -mt-0.5 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            Free cancellation within 24 hours
          </p>
        </div>
      </div>
    );
  };

  /* ---------------------------------------------------------------- */
  /*  Page Layout                                                      */
  /* ---------------------------------------------------------------- */
  return (
    <>
      {/* Inline keyframe for the animate-in utility */}
      <style>{`
        .animate-in {
          animation: fadeSlideIn 0.4s ease-out both;
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-bounce-slow {
          animation: bounceSlow 2s ease-in-out infinite;
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      <section className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-secondary">
              Book Your Stay
            </h1>
            <p className="text-text-muted mt-1">
              Coliville &mdash; Community-first coliving in Montreal
            </p>
          </div>

          {/* Progress */}
          {!reserved && <ProgressBar current={step} />}

          {/* Content grid */}
          <div className="lg:grid lg:grid-cols-[1fr_340px] lg:gap-8">
            {/* Main column */}
            <div key={step}>
              {step === 0 && renderStep1()}
              {step === 1 && renderStep2()}
              {step === 2 && renderStep3()}
              {step === 3 && renderStep4()}

              {/* Navigation */}
              {!reserved && (
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-border-light">
                  {step > 0 ? (
                    <button
                      onClick={back}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-text-secondary bg-card-bg border border-border transition hover:border-primary/40 hover:text-primary"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < STEPS.length - 1 && (
                    <button
                      onClick={next}
                      disabled={!canContinue}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-primary transition-all duration-200 hover:bg-primary-dark hover:shadow-md hover:shadow-primary/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:bg-primary"
                    >
                      Continue
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar (desktop) */}
            <aside className="hidden lg:block">
              <Sidebar
                property={selectedProperty}
                room={selectedRoom}
                moveIn={moveInDate}
                duration={activeDuration}
                step={step}
              />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
