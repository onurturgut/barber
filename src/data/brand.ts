/** Replace these placeholders with the real business details. */
export const BRAND = {
  name: "RAZE",
  sub: "BARBER CLUB",
  est: "EST. 2026",
  address: "[Adres eklenecek]",
  phone: "[Telefon eklenecek]",
  instagram: "#",
  whatsapp: "#",
  maps: "#",
  hours: [
    { day: "Pzt — Cum", time: "10:00 — 21:00" },
    { day: "Cumartesi", time: "10:00 — 20:00" },
    { day: "Pazar", time: "[Belirlenecek]" },
  ],
};

export const NAV = [
  { to: "/", label: "ANA SAYFA" },
  { to: "/hakkimizda", label: "HAKKIMIZDA" },
  { to: "/hizmetler", label: "HİZMETLER" },
  { to: "/ekibimiz", label: "EKİBİMİZ" },
  { to: "/galeri", label: "GALERİ" },
  { to: "/iletisim", label: "İLETİŞİM" },
] as const;
