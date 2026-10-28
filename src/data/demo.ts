/**
 * DEMO CONTENT — replace with real data / API later.
 * Prices are example values until the salon provides actual prices.
 */
import heroImage from "@/assets/hero.jpg";
import portraitImage from "@/assets/portrait.jpg";
import craftImage from "@/assets/craft.jpg";
import beardImage from "@/assets/beard.jpg";
import barber1Image from "@/assets/barber1.jpg";
import barber2Image from "@/assets/barber2.jpg";
import barber3Image from "@/assets/barber3.jpg";
import fadeImage from "@/assets/fade.jpg";
import beforeImage from "@/assets/before.jpg";
import interiorImage from "@/assets/interior.jpg";
import classicImage from "@/assets/classic.jpg";
import stylingImage from "@/assets/styling.jpg";

const hero = heroImage.src;
const portrait = portraitImage.src;
const craft = craftImage.src;
const beard = beardImage.src;
const barber1 = barber1Image.src;
const barber2 = barber2Image.src;
const barber3 = barber3Image.src;
const fade = fadeImage.src;
const before = beforeImage.src;
const interior = interiorImage.src;
const classic = classicImage.src;
const styling = stylingImage.src;

export const IMAGES = {
  hero,
  portrait,
  craft,
  beard,
  fade,
  before,
  interior,
  classic,
  styling,
};

export type Service = {
  id: string;
  no: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: number; // TRY — demo
  image: string;
};

export type Barber = {
  id: string;
  name: string;
  specialization: string;
  bio: string;
  image: string;
  /** service ids this barber performs */
  services: string[];
};

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  tag: string;
  shape: "tall" | "wide" | "square";
};

export const SERVICES: Service[] = [
  {
    id: "sac",
    no: "01",
    name: "SAÇ KESİMİ",
    description:
      "Yüz hatlarına göre planlanmış, makas ve makine ile hassas kesim.",
    duration: 45,
    price: 600,
    image: fade,
  },
  {
    id: "sakal",
    no: "02",
    name: "SAKAL TASARIMI",
    description: "Ustura ile net çizgiler, sıcak havlu ve şekillendirme.",
    duration: 30,
    price: 400,
    image: beard,
  },
  {
    id: "sac-sakal",
    no: "03",
    name: "SAÇ + SAKAL",
    description: "Kesim ve sakal tasarımının bütünlüklü tek seansı.",
    duration: 75,
    price: 900,
    image: hero,
  },
  {
    id: "styling",
    no: "04",
    name: "MODERN STYLING",
    description: "Doku, hacim ve ürün seçimiyle günlük stile hazırlık.",
    duration: 30,
    price: 350,
    image: styling,
  },
  {
    id: "cilt",
    no: "05",
    name: "CİLT & YÜZ BAKIMI",
    description: "Temizleme, peeling ve nemlendirme ile yüz bakımı.",
    duration: 40,
    price: 550,
    image: portrait,
  },
  {
    id: "cocuk",
    no: "06",
    name: "ÇOCUK SAÇ KESİMİ",
    description: "12 yaş altı için sabırlı, hızlı ve rahat kesim.",
    duration: 30,
    price: 400,
    image: classic,
  },
];

export const BARBERS: Barber[] = [
  {
    id: "deniz",
    name: "DENİZ K.",
    specialization: "Fade & Skin Fade",
    bio: "Geçişlerde milimetrik hassasiyet. Keskin, temiz, iddialı.",
    image: barber1,
    services: ["sac", "sac-sakal", "styling", "cocuk"],
  },
  {
    id: "emre",
    name: "EMRE A.",
    specialization: "Doku & Modern Styling",
    bio: "Doğal dokuyu öne çıkaran, hareketli kesimler.",
    image: barber2,
    services: ["sac", "styling", "cilt", "cocuk", "sac-sakal"],
  },
  {
    id: "kaan",
    name: "KAAN T.",
    specialization: "Sakal & Klasik Ustura",
    bio: "Klasik berberliğin disiplinini modern çizgiyle buluşturur.",
    image: barber3,
    services: ["sakal", "sac-sakal", "sac", "cilt"],
  },
];

export const GALLERY: GalleryItem[] = [
  {
    id: "g1",
    src: fade,
    alt: "Doku üstte, düşük skin fade — arkadan görünüm",
    tag: "FADE CUT",
    shape: "tall",
  },
  {
    id: "g2",
    src: interior,
    alt: "Beton duvarlı stüdyo iç mekânı",
    tag: "THE STUDIO",
    shape: "wide",
  },
  {
    id: "g3",
    src: beard,
    alt: "Ustura ile sakal çizgisi",
    tag: "BEARD",
    shape: "tall",
  },
  {
    id: "g4",
    src: classic,
    alt: "Klasik yandan ayrımlı kesim, profil",
    tag: "CLASSIC",
    shape: "square",
  },
  {
    id: "g5",
    src: styling,
    alt: "Dokulu üst kısmın şekillendirilmesi",
    tag: "TEXTURED CROP",
    shape: "wide",
  },
  {
    id: "g6",
    src: craft,
    alt: "Makas ve saç makinesi detay",
    tag: "DETAIL",
    shape: "square",
  },
  {
    id: "g7",
    src: portrait,
    alt: "Modern kesim ve sakal portresi",
    tag: "MODERN",
    shape: "tall",
  },
];
