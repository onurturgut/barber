"use client";

import { useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { BARBERS, SERVICES, type Service, type Barber } from "@/data/demo";
import {
  FIRST_AVAILABLE,
  getDemoSlots,
  canSelectSlot,
  isPastDate,
  toISODate,
  startOfDay,
  validateCustomer,
  formatPrice,
  type CustomerDetails,
  type CustomerErrors,
  type Slot,
} from "@/lib/booking";
import { gsap, useGSAP } from "@/lib/gsap";

const STEPS = ["HİZMET", "BERBER", "TARİH", "SAAT", "BİLGİLER", "ÖZET"];

const pick = "border transition-colors duration-150 text-left";
const pickOn = "border-primary bg-primary/10";
const pickOff = "border-border hover:border-foreground/60";

export function BookingStepper({ step }: { step: number }) {
  return (
    <ol className="grid grid-cols-6 gap-1" aria-label="Randevu adımları">
      {STEPS.map((s, i) => (
        <li key={s} aria-current={i === step ? "step" : undefined}>
          <div className="h-1 bg-steel">
            <div
              className={`h-full bg-primary transition-[width] duration-500 ${i <= step ? "w-full" : "w-0"}`}
            />
          </div>
          <span
            className={`micro mt-2 hidden sm:block ${i === step ? "text-primary" : "text-muted-foreground"}`}
          >
            0{i + 1} {s}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function ServiceSelector({
  value,
  onChange,
}: {
  value?: string | undefined;
  onChange: (id: string) => void;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {SERVICES.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => onChange(s.id)}
          aria-pressed={value === s.id}
          className={`${pick} flex gap-4 p-4 ${value === s.id ? pickOn : pickOff}`}
        >
          <img
            src={s.image}
            alt=""
            className="duotone size-20 shrink-0 object-cover"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2">
              <span className="font-display text-3xl">{s.name}</span>
              <span className="micro text-primary">{s.no}</span>
            </div>
            <p className="mt-1 text-sm text-foreground/70">{s.description}</p>
            <p className="micro mt-2 text-muted-foreground">
              {s.duration} DK · {formatPrice(s.price)}{" "}
              <span className="opacity-70">(ÖRNEK)</span>
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

export function BarberSelector({
  serviceId,
  value,
  onChange,
}: {
  serviceId?: string | undefined;
  value?: string | undefined;
  onChange: (id: string) => void;
}) {
  const list = BARBERS.filter(
    (b) => !serviceId || b.services.includes(serviceId),
  );
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <button
        type="button"
        onClick={() => onChange(FIRST_AVAILABLE)}
        aria-pressed={value === FIRST_AVAILABLE}
        className={`${pick} flex min-h-48 flex-col justify-end p-5 ${value === FIRST_AVAILABLE ? pickOn : pickOff}`}
      >
        <span className="font-display text-4xl">İLK MÜSAİT BERBER</span>
        <span className="micro mt-2 text-muted-foreground">
          EN HIZLI SEÇENEK
        </span>
      </button>
      {list.map((b) => (
        <button
          key={b.id}
          type="button"
          onClick={() => onChange(b.id)}
          aria-pressed={value === b.id}
          className={`${pick} group ${value === b.id ? pickOn : pickOff}`}
        >
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={b.image}
              alt={`${b.name} portresi`}
              className={`size-full object-cover ${value === b.id ? "" : "grayscale"}`}
            />
          </div>
          <div className="p-4">
            <span className="font-display text-3xl">{b.name}</span>
            <p className="micro mt-1 text-primary">{b.specialization}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

const MONTHS = [
  "OCAK",
  "ŞUBAT",
  "MART",
  "NİSAN",
  "MAYIS",
  "HAZİRAN",
  "TEMMUZ",
  "AĞUSTOS",
  "EYLÜL",
  "EKİM",
  "KASIM",
  "ARALIK",
];
const DAYS = ["PZT", "SAL", "ÇAR", "PER", "CUM", "CMT", "PAZ"];

export function BookingCalendar({
  value,
  onChange,
}: {
  value?: string | undefined;
  onChange: (iso: string) => void;
}) {
  const today = startOfDay(new Date());
  const [view, setView] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const max = new Date(today.getFullYear(), today.getMonth() + 2, 0);
  const lead = (view.getDay() + 6) % 7;
  const days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const canPrev = view > new Date(today.getFullYear(), today.getMonth(), 1);
  const canNext = new Date(view.getFullYear(), view.getMonth() + 1, 1) <= max;
  return (
    <div className="max-w-xl border border-border p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          disabled={!canPrev}
          onClick={() =>
            setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))
          }
          aria-label="Önceki ay"
          className="flex size-11 items-center justify-center border border-border disabled:opacity-30"
        >
          <ChevronLeft />
        </button>
        <span className="font-display text-3xl">
          {MONTHS[view.getMonth()]} {view.getFullYear()}
        </span>
        <button
          type="button"
          disabled={!canNext}
          onClick={() =>
            setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))
          }
          aria-label="Sonraki ay"
          className="flex size-11 items-center justify-center border border-border disabled:opacity-30"
        >
          <ChevronRight />
        </button>
      </div>
      <div className="micro mt-5 grid grid-cols-7 gap-1 text-center text-muted-foreground">
        {DAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1">
        {Array.from({ length: lead }).map((_, i) => (
          <span key={`e${i}`} />
        ))}
        {Array.from({ length: days }).map((_, i) => {
          const d = new Date(view.getFullYear(), view.getMonth(), i + 1);
          const iso = toISODate(d);
          const disabled = isPastDate(d, today) || d > max;
          const sel = value === iso;
          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => onChange(iso)}
              aria-pressed={sel}
              aria-label={`${i + 1} ${MONTHS[d.getMonth()]}`}
              className={`flex aspect-square min-h-11 items-center justify-center text-sm font-semibold transition-colors ${sel ? "bg-primary text-primary-foreground" : disabled ? "text-foreground/20 line-through" : "hover:bg-steel"} ${iso === toISODate(today) && !sel ? "outline outline-1 outline-primary/60" : ""}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function TimeSlotSelector({
  slots,
  value,
  onChange,
}: {
  slots: Slot[];
  value?: string | undefined;
  onChange: (t: string) => void;
}) {
  const free = slots.filter((s) => s.state === "available").length;
  return (
    <div>
      <p className="micro mb-4 text-muted-foreground">
        {free} MÜSAİT SAAT · DEMO MÜSAİTLİK VERİSİ
      </p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
        {slots.map((s) => {
          const booked = s.state === "booked";
          const sel = value === s.time;
          return (
            <button
              key={s.time}
              type="button"
              disabled={booked}
              onClick={() => canSelectSlot(slots, s.time) && onChange(s.time)}
              aria-pressed={sel}
              className={`flex min-h-14 flex-col items-center justify-center border text-sm font-semibold transition-colors duration-150 ${sel ? "border-primary bg-primary text-primary-foreground" : booked ? "cursor-not-allowed border-border bg-steel/40 text-foreground/30" : "border-border hover:border-primary"}`}
            >
              {s.time}
              {booked && <span className="micro mt-0.5">DOLU</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="micro text-muted-foreground">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-1 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls =
  "mt-2 w-full border border-input bg-transparent px-4 py-3 text-base outline-none focus:border-primary";

export function CustomerDetailsForm({
  value,
  errors,
  onChange,
}: {
  value: CustomerDetails;
  errors: CustomerErrors;
  onChange: (v: CustomerDetails) => void;
}) {
  const set =
    (k: keyof CustomerDetails) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange({ ...value, [k]: e.target.value });
  const a = (k: keyof CustomerDetails) => ({
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `${k}-err` : undefined,
  });
  return (
    <div className="grid max-w-2xl gap-5 sm:grid-cols-2">
      <Field id="name" label="AD *" error={errors.name}>
        <input
          id="name"
          autoComplete="given-name"
          className={inputCls}
          value={value.name}
          onChange={set("name")}
          {...a("name")}
        />
      </Field>
      <Field id="surname" label="SOYAD *" error={errors.surname}>
        <input
          id="surname"
          autoComplete="family-name"
          className={inputCls}
          value={value.surname}
          onChange={set("surname")}
          {...a("surname")}
        />
      </Field>
      <Field id="phone" label="TELEFON *" error={errors.phone}>
        <input
          id="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="05XX XXX XX XX"
          className={inputCls}
          value={value.phone}
          onChange={set("phone")}
          {...a("phone")}
        />
      </Field>
      <Field id="email" label="E-POSTA (OPSİYONEL)" error={errors.email}>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={inputCls}
          value={value.email}
          onChange={set("email")}
          {...a("email")}
        />
      </Field>
      <div className="sm:col-span-2">
        <Field id="note" label="EK NOT (OPSİYONEL)" error={errors.note}>
          <textarea
            id="note"
            rows={3}
            maxLength={300}
            className={inputCls}
            value={value.note}
            onChange={set("note")}
            {...a("note")}
          />
        </Field>
      </div>
    </div>
  );
}

export function BookingSummary({
  service,
  barber,
  date,
  time,
  customer,
}: {
  service: Service;
  barber?: Barber | undefined;
  date: string;
  time: string;
  customer: CustomerDetails;
}) {
  const [y, m, d] = date.split("-").map(Number);
  const rows = [
    ["HİZMET", service.name],
    ["BERBER", barber ? barber.name : "İLK MÜSAİT BERBER"],
    ["TARİH", `${d} ${MONTHS[(m ?? 1) - 1]} ${y}`],
    ["SAAT", time],
    ["SÜRE", `${service.duration} DK`],
    ["FİYAT (ÖRNEK)", formatPrice(service.price)],
    ["MÜŞTERİ", `${customer.name} ${customer.surname} · ${customer.phone}`],
  ];
  return (
    <dl className="max-w-2xl divide-y divide-ink/15 bg-bone p-6 text-ink sm:p-8">
      {rows.map(([k, v]) => (
        <div
          key={k}
          className="flex flex-wrap items-baseline justify-between gap-2 py-3"
        >
          <dt className="micro text-ink/60">{k}</dt>
          <dd className="font-display text-2xl sm:text-3xl">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

const EMPTY: CustomerDetails = {
  name: "",
  surname: "",
  phone: "",
  email: "",
  note: "",
};

export function BookingFlow({
  initialService,
  initialBarber,
}: {
  initialService?: string | undefined;
  initialBarber?: string | undefined;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<string | undefined>(
    SERVICES.some((s) => s.id === initialService) ? initialService : undefined,
  );
  const [barberId, setBarberId] = useState<string | undefined>(
    BARBERS.some((b) => b.id === initialBarber) ? initialBarber : undefined,
  );
  const [date, setDate] = useState<string>();
  const [time, setTime] = useState<string>();
  const [customer, setCustomer] = useState<CustomerDetails>(EMPTY);
  const [errors, setErrors] = useState<CustomerErrors>({});
  const [done, setDone] = useState(false);

  const slots = useMemo(
    () =>
      serviceId && barberId && date
        ? getDemoSlots(serviceId, barberId, date)
        : [],
    [serviceId, barberId, date],
  );
  const service = SERVICES.find((s) => s.id === serviceId);
  const barber = BARBERS.find((b) => b.id === barberId);

  const clearTimeIfInvalid = (next: Slot[]) => {
    if (time && !canSelectSlot(next, time)) setTime(undefined);
  };

  const chooseService = (id: string) => {
    setServiceId(id);
    if (
      barberId &&
      barberId !== FIRST_AVAILABLE &&
      !BARBERS.find((b) => b.id === barberId)?.services.includes(id)
    )
      setBarberId(undefined);
    if (date) clearTimeIfInvalid(getDemoSlots(id, barberId ?? "", date));
  };
  const chooseBarber = (id: string) => {
    setBarberId(id);
    if (serviceId && date)
      clearTimeIfInvalid(getDemoSlots(serviceId, id, date));
  };
  const chooseDate = (iso: string) => {
    setDate(iso);
    if (serviceId && barberId)
      clearTimeIfInvalid(getDemoSlots(serviceId, barberId, iso));
  };

  const canNext = [
    !!service,
    !!barberId,
    !!date,
    !!time && canSelectSlot(slots, time),
    true,
    true,
  ][step];

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".bk-step",
          { autoAlpha: 0, x: 40 },
          { autoAlpha: 1, x: 0, duration: 0.35, ease: "power3.out" },
        );
      });
    },
    { scope: ref, dependencies: [step, done] },
  );

  const go = (n: number) => {
    if (n > step && step === 4) {
      const e = validateCustomer(customer);
      setErrors(e);
      if (Object.keys(e).length) return;
    }
    gsap.to(".bk-step", {
      autoAlpha: 0,
      x: n > step ? -30 : 30,
      duration: 0.15,
      onComplete: () => {
        setStep(n);
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    });
  };

  const titles = [
    "HİZMETİNİ SEÇ",
    "BERBERİNİ SEÇ",
    "TARİH SEÇ",
    "SAAT SEÇ",
    "BİLGİLERİN",
    "SON KONTROL",
  ];

  if (done && service && date && time) {
    return (
      <div ref={ref}>
        <div className="bk-step">
          <div className="flex size-16 items-center justify-center bg-primary text-primary-foreground">
            <Check className="size-8" />
          </div>
          <h2 className="font-display text-huge mt-8">
            ÖNİZLEME <span className="text-primary">TAMAM.</span>
          </h2>
          <p
            role="status"
            className="mt-6 max-w-xl border border-primary p-4 font-semibold text-primary"
          >
            Demo önizleme — Gerçek randevu kaydı oluşturulmadı.
          </p>
          <div className="mt-8">
            <BookingSummary
              service={service}
              barber={barber}
              date={date}
              time={time}
              customer={customer}
            />
          </div>
          <button
            type="button"
            className="btn btn-ghost mt-8"
            onClick={() => {
              setDone(false);
              setStep(0);
              setDate(undefined);
              setTime(undefined);
              setCustomer(EMPTY);
            }}
          >
            YENİDEN BAŞLA
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref}>
      <BookingStepper step={step} />
      <div className="bk-step mt-12">
        <p className="micro text-primary">ADIM 0{step + 1} / 06</p>
        <h2 className="font-display text-huge mt-3">{titles[step]}</h2>
        <div className="mt-10">
          {step === 0 && (
            <ServiceSelector value={serviceId} onChange={chooseService} />
          )}
          {step === 1 && (
            <BarberSelector
              serviceId={serviceId}
              value={barberId}
              onChange={chooseBarber}
            />
          )}
          {step === 2 && <BookingCalendar value={date} onChange={chooseDate} />}
          {step === 3 && (
            <TimeSlotSelector slots={slots} value={time} onChange={setTime} />
          )}
          {step === 4 && (
            <CustomerDetailsForm
              value={customer}
              errors={errors}
              onChange={(v) => {
                setCustomer(v);
                if (Object.keys(errors).length) setErrors(validateCustomer(v));
              }}
            />
          )}
          {step === 5 && service && date && time && (
            <>
              <BookingSummary
                service={service}
                barber={barber}
                date={date}
                time={time}
                customer={customer}
              />
              <p className="micro mt-4 text-muted-foreground">
                BU BİR ARAYÜZ ÖNİZLEMESİDİR. HİÇBİR VERİ GÖNDERİLMEZ.
              </p>
            </>
          )}
        </div>
      </div>
      <div className="sticky bottom-0 mt-12 flex items-center justify-between gap-3 border-t border-border bg-ink/95 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          className="btn btn-ghost"
          disabled={step === 0}
          onClick={() => go(step - 1)}
          style={{ visibility: step === 0 ? "hidden" : "visible" }}
        >
          <ArrowLeft className="size-4" /> GERİ
        </button>
        {step < 5 ? (
          <button
            type="button"
            className="btn btn-signal disabled:opacity-40"
            disabled={!canNext}
            onClick={() => go(step + 1)}
          >
            DEVAM <ArrowRight className="size-4" />
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-signal"
            onClick={() => setDone(true)}
          >
            ÖNİZLEMEYİ ONAYLA <Check className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
