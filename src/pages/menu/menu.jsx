import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { EXTERNAL_LINKS } from "@/lib/links";
import { FaFire, FaLeaf } from "react-icons/fa";
import { MdLocalFireDepartment } from "react-icons/md";

const MENU_DATA = [
  {
    id: "momo",
    title: "MOMO",
    subtitle: "The King of Dumplings",
    description: "Soft, pillowy, golden, crispy, spicy & saucy. Our dumplings are the heart and soul of Nepalese street food. All served with 8848 Momo Sauce and Chilli Garlic Sauce.",
    color: "#de1d3d",
    items: [
      {
        name: "Steamed Momo",
        description: "Classic hand-pleated dumplings, soft and pillowy, steamed to perfection.",
        variants: "Veg / Chicken / Pork / Buffalo / Lamb / Cheese & Spinach",
        badges: ["popular", "veg"],
        image: "/menu-images/steamed-momo.jpg",
      },
      {
        name: "Jhol Momo",
        description: "Your choice of steamed dumplings served in a tomato, sesame, herb-based runny soup-like sauce, usually served cold. Ask if you'd like it hot!",
        variants: "Veg / Chicken / Pork / Buffalo / Lamb / Cheese & Spinach",
        badges: ["popular"],
        image: "/menu-images/jhol-momo.jpg",
      },
      {
        name: "Kothey Pan-Fried Momo",
        description: "Half steamed, half crispy — the best of both worlds. Pan-fried to a golden base with soft pleated tops.",
        variants: "Veg / Chicken / Pork / Buffalo / Lamb / Cheese & Spinach",
        badges: [],
        image: "/menu-images/kothey-pan-fried-momo.jpg",
      },
      {
        name: "Crispy-Fried Momo",
        description: "Deep-fried until golden and crunchy, with a satisfying crackle in every bite.",
        variants: "Veg / Chicken / Pork / Buffalo / Lamb",
        badges: [],
        image: "/menu-images/crispy-fried-momo.jpg",
      },
      {
        name: "Chilli Momo",
        description: "Crispy fried momos wok-tossed with diced capsicum, onion, and fiery chillies, cooked in a bold chilli tomato sauce. This one's not for the faint-hearted.",
        variants: "Veg / Chicken / Pork / Buffalo / Lamb",
        badges: ["spicy"],
        image: "/menu-images/chilli-momo.jpg",
      },
      {
        name: "Momo Platter (20 pcs)",
        description: "A grand feast of Steamed, Chilli, Kothey (pan-fried) & Crispy-Fried Momo. Pick two fillings and let the dumpling indulgence begin!",
        variants: "Veg / Chicken / Pork",
        badges: ["popular"],
        image: "/menu-images/momo-platter.jpg",
      },
    ],
  },
  {
    id: "signature",
    title: "SIGNATURE MOMO & FUSION",
    subtitle: "The 8848-Flavour Climb",
    description: "The classic Nepalese dumpling, taken on an adventurous fusion journey. Let the 8848-flavour climb begin!",
    color: "#21408e",
    items: [
      {
        name: "Green Curry Momo (8 pcs)",
        description: "Juicy chicken momo and vegetable tossed in a creamy Thai green curry base, creating a Nepalese-Thai flavour fusion like no other.",
        variants: "",
        badges: ["new"],
        image: "/menu-images/green-curry-momo.jpg",
      },
      {
        name: "Butter Chicken Momo (8 pcs)",
        description: "Steamed chicken momos drenched in a rich, creamy butter chicken sauce, infused with dried fenugreek. Indian meets Nepalese perfection!",
        variants: "",
        badges: ["popular"],
        image: "/menu-images/butter-chicken-momo.jpg",
      },
      {
        name: "Tandoori Momo (8 pcs)",
        description: "Crispy-fried chicken tandoori momo tossed in butter, capsicum, onion, and onion salad, served with mint sauce and onion salad.",
        variants: "",
        badges: ["spicy"],
        image: "/menu-images/tandoori-momo.jpg",
      },
      {
        name: "Golden Carbonara Momo (6 pcs)",
        description: "Steamed dumplings in a golden silky Italian-style carbonara sauce with turmeric, herbs, & parmesan.",
        variants: "Chicken / Pork / Veg / Lamb / Buffalo",
        badges: ["new"],
        image: "/menu-images/golden-carbonara-momo.jpg",
      },
      {
        name: "WOW THE BAO Burger",
        description: "Large bao slider with fries. Chicken Bao: Juicy chicken, crisp lettuce, and house sauce. Haloumi Bao: A tasty haloumi, fresh greens, and herb-infused house sauce.",
        variants: "Chicken / Haloumi",
        badges: [],
        image: "/menu-images/bao-burger.jpg",
      },
    ],
  },
  {
    id: "street",
    title: "FROM THE STREETS OF KATHMANDU",
    subtitle: "Taste of Nepal in Every Bite",
    description: "Authentic Nepalese street food favourites, packed with bold Himalayan flavours and spices.",
    color: "#de1d3d",
    items: [
      {
        name: "Nepalese Pork Sekuwa",
        description: "Tender cuts of Nepalese-spiced, marinated pork, fried to absolute perfection. Served with house momo sauce and fresh salad.",
        variants: "",
        badges: ["gf"],
        image: "/menu-images/pork-sekuwa.jpg",
      },
      {
        name: "K'man Doo Wings (8 pcs)",
        description: "Marinated with Himalayan herbs and spices, deep fried to juicy perfection, served with house momo sauce. Make it Spicy BBQ!",
        variants: "Classic / Spicy BBQ",
        badges: ["popular"],
        image: "/menu-images/kman-doo-wings.jpg",
      },
      {
        name: "Sausage on Stick (2 pcs)",
        description: "Nepalese-style sausages, crisp outside, juicy inside, and perfectly seasoned with house momo sauce.",
        variants: "",
        badges: [],
        image: "/menu-images/sausage-on-stick.jpg",
      },
      {
        name: "8848 Himalayan Salad",
        description: "A crisp, refreshing medley of grilled chicken, fresh greens, juicy tomatoes, crunchy cucumbers, and red onions, tossed with olives and a miso sesame dressing.",
        variants: "Chicken / Haloumi",
        badges: ["gf"],
        image: "/menu-images/himalayan-salad.jpg",
      },
      {
        name: "Momolicious Loaded Fries (4 pcs)",
        description: "Four perfectly fried momo stacked atop cheesy, jalapeño-laced fries, drizzled with BBQ, mayo, mint and sweet chilli sauce. Savory, spicy, indulgent!",
        variants: "Veg / Chicken / Pork",
        badges: ["new"],
        image: "/menu-images/loaded-fries.jpg",
      },
      {
        name: "8848 Khaja Platter",
        description: "The ultimate Nepalese sampler, packed with flavour, texture, and tradition. Each platter comes with Furandana (beaten dry rice), Nepalese Mixed Spiced Salad, choice of protein, seasoned edamame, Nepalese tempered potato and boiled egg.",
        variants: "Veg (Paneer Chilli) / Pork Sekuwa or 8848 Hot & Spicy Chicken / Himalayan Buffalo Jerky",
        badges: ["popular"],
        image: "/menu-images/khaja-platter.jpg",
      },
      {
        name: "Edamame Crunch Mix",
        description: "Peeled edamame beans, good source of plant-based protein with fresh tomatoes, onions, and seasoning. A tangy, spicy kick that wakes up your taste buds instantly!",
        variants: "",
        badges: ["veg", "gf"],
        image: "/menu-images/edamame-crunch.jpg",
      },
      {
        name: "8848 Hot & Smoky Chicken",
        description: "Oven-grilled smoky chicken seasoned in hot, spicy, and mouth-watering flavours. A classic Nepalese chicken appetizer served with fresh salad.",
        variants: "",
        badges: ["spicy", "gf"],
        image: "/menu-images/hot-smoky-chicken.jpg",
      },
      {
        name: "8848 Chilli Rush",
        description: "Crispy, marinated chicken stir-fried with garlic, ginger, onions, capsicum, and green chillies in a rich, savory chilli tomato sauce. Fiery, aromatic, and undeniably satisfying!",
        variants: "Marinated Chicken / Paneer",
        badges: ["spicy"],
        image: "/menu-images/chilli-rush.jpg",
      },
      {
        name: "Himalayan Buffalo Jerky",
        description: "A Nepalese specialty, spiced, dried buffalo meat that's bold, and seasoned with authentic Himalayan spices. Served with a side of fresh salad for balance.",
        variants: "",
        badges: ["gf"],
        image: "/menu-images/buffalo-jerky.jpg",
      },
    ],
  },
  {
    id: "noodles",
    title: "8848 NOODLES & RICE BOWLS",
    subtitle: "For the Real Hunger!",
    description: "Hearty, filling bowls of Nepalese-style noodles and rice, packed with flavour and perfectly spiced.",
    color: "#21408e",
    items: [
      {
        name: "Noodles (Chowmein)",
        description: "Nepalese style stir-fried noodles with greens, cabbage, onions, carrots, and seasoning in rich Oriental sauces. Can be made mild, medium, or hot — your choice! Try it Szechuan style for a tangy, spicy flavour kick!",
        variants: "Chicken / Pork / Egg / Veg / Buffalo",
        badges: ["popular"],
        image: "/menu-images/chowmein-noodles.jpg",
      },
      {
        name: "Fried Rice",
        description: "Rice cooked with greens, carrots, peas, onions, and capsicum, seasoned with Nepali spices and served with 8848 House Sauce. Can be made mild, medium, or hot — your choice!",
        variants: "Chicken / Pork / Egg / Veg / Buffalo",
        badges: [],
        image: "/menu-images/fried-rice.jpg",
      },
      {
        name: "Chicken Curry Rice Bowl",
        description: "Tender, slow-cooked chicken infused with Himalayan spices like cumin, coriander, garam masala, and bay leaves. Served with steamed basmati rice, Nepali potato achar, and green salad.",
        variants: "",
        badges: ["popular"],
        image: "/menu-images/chicken-curry-bowl.jpg",
      },
      {
        name: "Goat Curry Rice Bowl",
        description: "Succulent goat meat simmered in a deeply aromatic broth, seasoned with ginger, garlic, and a robust blend of Himalayan spices.",
        variants: "",
        badges: [],
        image: "/menu-images/goat-curry-bowl.jpg",
      },
      {
        name: "Cottage Cheese & Mix Veg Curry",
        description: "A comforting mix of stir-fried mixed veg and cottage cheese cubes infused with ginger, garlic, turmeric, cumin, and traditional Nepali spices.",
        variants: "",
        badges: ["veg"],
        image: "/menu-images/cottage-cheese-veg-curry.jpg",
      },
      {
        name: "Butter Chicken Rice Bowl",
        description: "Tender chicken simmered in a rich, creamy tomato-butter gravy, infused with mild spices and a hint of sweetness. Served with perfectly steamed rice.",
        variants: "",
        badges: ["popular"],
        image: "/menu-images/butter-chicken-bowl.jpg",
      },
    ],
  },
  {
    id: "kids",
    title: "ZAK D' YAK KIDS MENU",
    subtitle: "Big Flavours for Little Champions!",
    description: "Kid-friendly portions of our most-loved dishes, designed to delight young diners.",
    color: "#f59e0b",
    items: [
      {
        name: "Sweet 'n' Tangy Chicken Noodles",
        description: "Twisty noodles and saucy chicken tossed in a sweet and tangy glaze. Fun, flavourful, and kid-approved!",
        variants: "",
        badges: [],
        image: "/menu-images/sweet-tangy-noodles.jpg",
      },
      {
        name: "Nuggets & Fries (5 pcs)",
        description: "Five crispy nuggets and fries, served with ketchup and a whole lot of happiness. Because food should always be fun!",
        variants: "",
        badges: [],
        image: "/menu-images/nuggets-fries.jpg",
      },
      {
        name: "Mini Butter Chicken Momo (4 pcs)",
        description: "A kid-sized portion of our famous steamed Chicken or Veg Momos, served in our iconic Butter Chicken Sauce, perfectly creamy and mild.",
        variants: "Chicken / Veg",
        badges: [],
        image: "/menu-images/mini-butter-chicken-momo.jpg",
      },
    ],
  },
  {
    id: "desserts",
    title: "HOUSE DESSERTS",
    subtitle: "The Sweet Summit",
    description: "End your meal on a high note with our Himalayan-inspired desserts.",
    color: "#de1d3d",
    items: [
      {
        name: "Coolfi Scoops (2 scoops)",
        description: "Velvety kulfi-style dessert with the warmth of cardamom and crunch of almond, pure Himalayan indulgence.",
        variants: "",
        badges: [],
        image: "/menu-images/coolfi-scoops.jpg",
      },
      {
        name: "Chocolate Momo (6 pcs)",
        description: "A delightful twist on the traditional Momo! Steamed dumplings, bursting with rich chocolate ganache, paired with velvety vanilla ice cream.",
        variants: "",
        badges: ["popular"],
        image: "/menu-images/chocolate-momo.jpg",
      },
    ],
  },
  {
    id: "sides",
    title: "SIDES",
    subtitle: "Perfect Companions",
    description: "Complete your meal with these classic sides.",
    color: "#21408e",
    items: [
      {
        name: "Steamed Rice",
        description: "Fluffy, perfectly steamed basmati long grain rice.",
        variants: "",
        badges: ["veg", "gf"],
        image: "/menu-images/steamed-rice.jpg",
      },
      {
        name: "Nepalese Paratha (2 pcs)",
        description: "Flaky, layered flatbread, freshly cooked and perfect for scooping up curries and sauces.",
        variants: "",
        badges: ["veg"],
        image: "/menu-images/nepalese-paratha.jpg",
      },
      {
        name: "Bowl of Fries",
        description: "Crispy golden fries, the perfect side to any meal.",
        variants: "",
        badges: ["veg", "gf"],
        image: "/menu-images/bowl-of-fries.jpg",
      },
    ],
  },
  {
    id: "sauces",
    title: "HOUSE SAUCES",
    subtitle: "The Flavour Finish",
    description: "Our signature sauces, crafted to complement every dish.",
    color: "#de1d3d",
    items: [
      {
        name: "8848 Tangy Tomato Sauce",
        description: "A mildly spiced and tangy tomato chutney infused with garlic, ginger, and onion.",
        variants: "",
        badges: ["veg"],
        image: "/menu-images/tangy-tomato-sauce.jpg",
      },
      {
        name: "8848 Momo Sauce",
        description: "A smooth tomato, sesame, and soybean based sauce tempered with Nepali spices.",
        variants: "",
        badges: ["veg"],
        image: "/menu-images/momo-sauce.jpg",
      },
      {
        name: "8848 Chilli Garlic Sauce",
        description: "Fresh red chilli paste seasoned with garlic, Himalayan salt, and herbs.",
        variants: "",
        badges: ["veg", "spicy"],
        image: "/menu-images/chilli-garlic-sauce.jpg",
      },
      {
        name: "8848 Himalayan Mint Chutney",
        description: "A refreshing mix of mint, coriander, chillies, and a sweet-spicy-sour balance.",
        variants: "",
        badges: ["veg"],
        image: "/menu-images/mint-chutney.jpg",
      },
      {
        name: "8848 Szechuan House Sauce",
        description: "Our signature in-house chilli sauce, crafted with garlic, ginger, roasted spices and a bold Szechuan kick. Smoky, spicy, and addictively flavourful.",
        variants: "",
        badges: ["spicy"],
        image: "/menu-images/szechuan-sauce.jpg",
      },
    ],
  },
];

const BADGE_STYLES = {
  popular: { bg: "bg-amber-100 text-amber-700", icon: "★" },
  spicy: { bg: "bg-red-100 text-red-600", icon: null, IconComponent: MdLocalFireDepartment },
  veg: { bg: "bg-green-100 text-green-700", icon: null, IconComponent: FaLeaf },
  gf: { bg: "bg-blue-100 text-blue-700", icon: "GF" },
  new: { bg: "bg-purple-100 text-purple-700", icon: "✦" },
};

function Badge({ type, label }) {
  const style = BADGE_STYLES[type];
  if (!style) return null;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${style.bg}`}>
      {style.IconComponent ? <style.IconComponent size={11} /> : <span>{style.icon}</span>}
      {label}
    </span>
  );
}

function MenuItemCard({ item, index, t }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4), ease: "easeOut" }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {item.badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {item.badges.map((badge) => (
              <Badge key={badge} type={badge} label={t(`badges.${badge}`)} />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="au-nav-font text-lg font-bold text-[#21408e] leading-tight">
          {item.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-600 line-clamp-3">
          {item.description}
        </p>
        {item.variants && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.variants.split(" / ").map((v) => (
              <span
                key={v}
                className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[11px] font-medium text-gray-500"
              >
                {v.trim()}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function CategorySection({ category, t }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} id={category.id} className="scroll-mt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <div
          className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full px-5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white"
          style={{ backgroundColor: category.color }}
        >
          {category.subtitle}
        </div>
        <h2 className="au-nav-font text-3xl font-bold uppercase text-[#21408e] sm:text-4xl lg:text-[2.6rem]">
          {category.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500 sm:text-base">
          {category.description}
        </p>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#de1d3d]" />
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {category.items.map((item, i) => (
          <MenuItemCard key={item.name} item={item} index={i} t={t} />
        ))}
      </div>
    </section>
  );
}

export default function MenuPage() {
  const { t } = useTranslation("menu");
  const [activeCategory, setActiveCategory] = useState("all");
  const navRef = useRef(null);
  const [isNavSticky, setIsNavSticky] = useState(false);

  const categories = [
    { key: "all", label: t("categories.all") },
    { key: "momo", label: t("categories.momo") },
    { key: "signature", label: t("categories.signature") },
    { key: "street", label: t("categories.street") },
    { key: "noodles", label: t("categories.noodles") },
    { key: "kids", label: t("categories.kids") },
    { key: "desserts", label: t("categories.desserts") },
    { key: "sides", label: t("categories.sides") },
    { key: "sauces", label: t("categories.sauces") },
  ];

  const filteredData =
    activeCategory === "all"
      ? MENU_DATA
      : MENU_DATA.filter((c) => c.id === activeCategory);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setIsNavSticky(rect.top <= 0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCategory = (key) => {
    setActiveCategory(key);
    if (key === "all") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setTimeout(() => {
      const el = document.getElementById(key);
      if (el) {
        const offset = 140;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#fafbff]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#21408e] pb-16 pt-12 sm:pb-24 sm:pt-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        </div>
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#de1d3d]/20 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-white/5 blur-[120px]" />

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill="#fafbff" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center sm:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full bg-white/10 px-5 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-white/80 backdrop-blur-sm">
              {t("hero.kicker")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 au-nav-font text-5xl font-bold uppercase text-white sm:text-6xl lg:text-7xl"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-5 max-w-2xl text-base text-white/70 sm:text-lg"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href={EXTERNAL_LINKS.order}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#de1d3d] px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-red-500/25 transition-all hover:bg-[#c51625] hover:shadow-xl hover:shadow-red-500/30 hover:-translate-y-0.5"
            >
              {t("cta.orderNow")}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Sticky Category Navigation */}
      <div
        ref={navRef}
        className={`sticky top-0 z-40 transition-shadow duration-300 ${isNavSticky ? "shadow-md" : ""}`}
      >
        <div className="bg-white/95 backdrop-blur-md border-b border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide sm:justify-center sm:gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => scrollToCategory(cat.key)}
                  className={[
                    "whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-all duration-200 sm:text-sm",
                    activeCategory === cat.key
                      ? "bg-[#de1d3d] text-white shadow-md shadow-red-200"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-[#21408e]",
                  ].join(" ")}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="flex flex-col gap-20 sm:gap-28">
          <AnimatePresence mode="wait">
            {filteredData.map((category) => (
              <CategorySection key={category.id} category={category} t={t} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Allergy Notice */}
      <section className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-12 text-center sm:px-12">
          <div className="mx-auto inline-flex items-center gap-2 rounded-xl bg-amber-50 px-6 py-4 text-left">
            <div className="flex-shrink-0 text-2xl">⚠️</div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">Please Note</p>
              <p className="mt-1 text-xs leading-relaxed text-amber-700">
                {t("allergyNote")} {t("imageNote")}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <a
              href={EXTERNAL_LINKS.order}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#de1d3d] px-10 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-red-500/25 transition-all hover:bg-[#c51625] hover:shadow-xl hover:-translate-y-0.5"
            >
              {t("cta.orderNow")}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
