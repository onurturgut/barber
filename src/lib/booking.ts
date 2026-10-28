/** Booking UI rules (frontend only — demo availability). */

export const SLOT_TIMES = [
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
];

export type SlotState = "available" | "booked";
export type Slot = { time: string; state: SlotState };

export const FIRST_AVAILABLE = "any";

export function toISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** Past dates are never selectable. */
export function isPastDate(date: Date, today: Date = new Date()) {
  return startOfDay(date).getTime() < startOfDay(today).getTime();
}

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Deterministic demo availability per service + barber + date.
 * On today, times already passed are marked booked.
 */
export function getDemoSlots(
  serviceId: string,
  barberId: string,
  dateISO: string,
  now: Date = new Date(),
): Slot[] {
  const isToday = dateISO === toISODate(now);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  return SLOT_TIMES.map((time, i) => {
    const [h, m] = time.split(":").map(Number);
    const passed = isToday && (h ?? 0) * 60 + (m ?? 0) <= nowMinutes;
    const busy =
      hash(`${serviceId}|${barberId}|${dateISO}|${i}`) % 100 <
      (barberId === FIRST_AVAILABLE ? 20 : 38);
    return { time, state: passed || busy ? "booked" : "available" };
  });
}

/** A time can only be chosen if it exists and is available. */
export function canSelectSlot(slots: Slot[], time: string) {
  return slots.some((s) => s.time === time && s.state === "available");
}

export type CustomerDetails = {
  name: string;
  surname: string;
  phone: string;
  email: string;
  note: string;
};
export type CustomerErrors = Partial<Record<keyof CustomerDetails, string>>;

/** Accepts Turkish mobile numbers: 5XXXXXXXXX, 05XXXXXXXXX, +905XXXXXXXXX. */
export function isValidTurkishPhone(raw: string) {
  const d = raw.replace(/\D/g, "");
  return /^(?:90|0)?5\d{9}$/.test(d);
}

export function validateCustomer(c: CustomerDetails): CustomerErrors {
  const e: CustomerErrors = {};
  const nameRe = /^[A-Za-zÇĞİÖŞÜçğıöşü' -]{2,}$/;
  if (!nameRe.test(c.name.trim()))
    e.name = "En az 2 harfli geçerli bir ad girin.";
  if (!nameRe.test(c.surname.trim()))
    e.surname = "En az 2 harfli geçerli bir soyad girin.";
  if (!isValidTurkishPhone(c.phone))
    e.phone = "Geçerli bir cep telefonu girin (05XX XXX XX XX).";
  if (c.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c.email.trim()))
    e.email = "Geçerli bir e-posta girin.";
  if (c.note.length > 300) e.note = "Not en fazla 300 karakter olabilir.";
  return e;
}

export const formatPrice = (n: number) => `₺${n.toLocaleString("tr-TR")}`;
