import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { getPageSectionContent, useHomePage } from "@/lib/cms";
import { EXTERNAL_LINKS } from "@/lib/links";
import Reveal, { EASE, staggerParent, staggerItem } from "@/components/Reveal";
import storefrontImg from "@/assets/storefront.jpg";

const FOUNDER_IMG = "/gallery/rajesh-hamal.jpeg";

/* Asset paths (project's own images) */
const A = {
  handMomo: "/8848-assets/hand-momo.png",
  homBadge: "/8848-assets/Eighty-eight-Forty-Eight-Hom-Pyashi-Badge-Colour-Watermark.png",
  everest: "/8848-assets/mount-everest-nepal-8848.png",
  mountainTop: "/8848-assets/Light-Mountain-Watermark-Top.png",
  brassBowl: "/8848-assets/momo-brass-bowl.png",
  goodTimes: "/8848-assets/good-times-tasty-food.png",
  concrete: "/8848-assets/Concrete-Background.jpg",
  column: "/8848-assets/Column-white-background-grunge.png",
  yak: "/8848-assets/yak-footer.png",
  heroBg: "/8848-assets/website-hero.svg",
};

/* Real 8848 Momo House moments — client-supplied hi-res photos (gallery/1–7) */
const GALLERY = [
  "/gallery/4.jpg",
  "/gallery/3.jpg",
  "/gallery/5.jpg",
  "/gallery/6.jpg",
  "/gallery/7.jpg",
  "/gallery/1.jpg",
  "/gallery/2.jpg",
];

/* Signature momo line-up for the food showcase */
const SIGNATURE_MOMOS = [
  {
    img: "/menu-images/steamed-momo.jpg",
    name: "Steamed Momo",
    tag: "The Original",
    desc: "Delicate parcels steamed to juicy perfection — the classic that started it all.",
  },
  {
    img: "/menu-images/jhol-momo.jpg",
    name: "Jhol Momo",
    tag: "Chef's Pick",
    desc: "Bathed in our soul-warming sesame-tomato jhol broth. Slurp, dip, repeat.",
  },
  {
    img: "/menu-images/tandoori-momo.jpg",
    name: "Tandoori Momo",
    tag: "Fired Up",
    desc: "Char-grilled and marinated in bold Himalayan spices for a smoky, fiery bite.",
  },
  {
    img: "/menu-images/butter-chicken-momo.jpg",
    name: "Butter Chicken Momo",
    tag: "Fan Favourite",
    desc: "Rich, buttery and irresistibly moreish — East-meets-West on one glorious plate.",
  },
];

const ArrowRight = ({ className = "w-4 h-4 ml-2" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m14-7H3" />
  </svg>
);

export default function Home() {
  const { t, i18n } = useTranslation("home");
  const homePage = useHomePage();

  const hero = getPageSectionContent(homePage, "hero", {
    kicker: t("hero.kicker"),
    title1: t("hero.title1"),
    title2: t("hero.title2"),
    desc: t("hero.desc"),
    ctaMenu: t("hero.ctaMenu"),
    ctaOrder: t("hero.ctaOrder"),
  }, i18n.language);

  const momoste = getPageSectionContent(homePage, "momoste", {
    title: t("momoste.title"),
    subtitle: t("momoste.subtitle"),
    body: t("momoste.body"),
    whyTitle: t("momoste.whyTitle"),
    whyBody: t("momoste.whyBody"),
    noteEmph: t("momoste.noteEmph"),
    noteRest: t("momoste.noteRest"),
  }, i18n.language);

  const roots = getPageSectionContent(homePage, "roots", {
    title1: t("roots.title1"),
    title2: t("roots.title2"),
    lead: t("roots.lead"),
    body: t("roots.body"),
    ctaMenu: t("roots.ctaMenu"),
  }, i18n.language);

  const updates = getPageSectionContent(homePage, "updates", {
    title: t("updates.title"),
    readMore: t("updates.readMore"),
    posts: t("updates.posts", { returnObjects: true }) || [],
  }, i18n.language);
  const posts = Array.isArray(updates.posts) ? updates.posts : [];

  const yak = getPageSectionContent(homePage, "yak_club", {
    titlePrefix: t("yak.titlePrefix"),
    titleEmph: t("yak.titleEmph"),
    body: t("yak.body"),
    cta: t("yak.cta"),
  }, i18n.language);

  const galleryCards = [
    { tag: "GOOD TIMES", title: "Better Together", desc: "Friends, family and momos — the perfect recipe for joy." },
    { tag: "THE COMMUNITY", title: "Bringing People Together", desc: "Momo lovers united, one plate at a time." },
    { tag: "THE BUZZ", title: "Always Buzzing", desc: "Late nights, full tables and endless momos." },
    { tag: "THE FAMILY", title: "Momoste!", desc: "The smiling faces behind every plate." },
    { tag: "THE VIBE", title: "Come On In", desc: "Cosy nights and unforgettable flavours." },
    { tag: "OUR HOME", title: "Where It Begins", desc: "Fresh momos, made to order, all day long." },
    { tag: "FIND US", title: "Your Local 8848", desc: "A warm welcome on every high street." },
  ];

  return (
    <div className="bg-white font-poppins text-gray-800">
      {/* ============================ HERO ============================ */}
      <section
        id="home"
        className="relative w-full min-h-[44vh] md:min-h-[56vh] lg:min-h-[76vh] overflow-hidden pt-[16px] md:pt-[28px] pb-8 bg-[#EDF2FF]"
      >
        {/* Left inset matches the text/button block's left padding (16px on
            mobile, 56px from md up) so both share the same left edge.
            Right-aligned and capped at 1400px: past that width the image
            hugs the right edge with 0 padding, and the growing leftover
            space is absorbed on the left only. The left edge itself is
            mask-faded so it blends into the section's flat backdrop instead
            of showing a hard rectangular seam. */}
        <div
          className="absolute inset-y-0 left-4 md:left-[56px] right-0 ml-auto max-w-[1400px] bg-cover bg-center lg:bg-bottom bg-no-repeat"
          style={{
            backgroundImage: `url('${A.heroBg}')`,
            maskImage: "linear-gradient(to right, transparent, black 72px)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 72px)",
          }}
        />

        <div className="container mx-auto max-w-[1400px] pl-4 md:pl-[56px] pr-4 relative z-10 flex flex-col lg:flex-row items-center lg:items-start">
          <motion.div
            className="w-full lg:w-[55%] flex flex-col items-start text-left mt-[25px]"
            variants={staggerParent}
            initial="hidden"
            animate="show"
          >
            <motion.p variants={staggerItem} className="font-montserrat text-[13px] md:text-[15px] text-nepal-red uppercase tracking-[0.5px] mb-3 font-bold">
              {hero.kicker}
            </motion.p>
            <motion.h2 variants={staggerItem} className="font-shoem text-[36px] md:text-[56px] leading-[1] text-nepal-navy mb-0">
              {hero.title1}
            </motion.h2>
            <motion.h2 variants={staggerItem} className="font-anod text-[36px] md:text-[56px] leading-[1] text-nepal-red mb-4 md:mb-5">
              {hero.title2}
            </motion.h2>
            <motion.p variants={staggerItem} className="font-poppins text-[15px] text-[#26367C] leading-[24px] max-w-[480px] mb-6">
              {hero.desc}
            </motion.p>
          </motion.div>

          <div className="hidden lg:flex w-full lg:w-[45%] relative h-[300px] lg:h-[430px] mt-8 lg:mt-0 justify-end">
            <motion.div
              className="absolute right-[-20px] lg:right-[-40px] top-4 w-[76%] lg:w-[84%] max-w-[420px] z-10"
              initial={{ opacity: 0, x: 60, rotate: 6 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            >
              <motion.img
                src={A.handMomo}
                alt="Hand holding momo"
                className="w-full h-auto object-contain drop-shadow-2xl"
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </div>

        {/* Anchored to the bottom of the hero section on lg+ screens; sits in
            normal flow (right after the text) on mobile/tablet. */}
        <motion.div
          className="container mx-auto max-w-[1400px] pl-4 md:pl-[56px] pr-4 relative z-10 mt-[26px] md:mt-[74px] flex flex-wrap items-center gap-4 lg:absolute lg:inset-x-0 lg:bottom-[20px] lg:mt-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
        >
          <Link to="/menu" className="w-full sm:w-auto">
            <button className="w-full sm:w-[240px] h-[48px] inline-flex items-center justify-center bg-nepal-red border-2 border-nepal-red text-white rounded-full font-poppins font-medium text-[14px] uppercase tracking-[1px] hover:bg-red-700 hover:border-red-700 hover:-translate-y-0.5 transition-all duration-300 shadow-lg">
              {hero.ctaMenu}
            </button>
          </Link>
          <Link to="/franchise" className="w-full sm:w-auto">
            <button className="w-full sm:w-[240px] h-[48px] inline-flex items-center justify-center bg-white/90 backdrop-blur-sm border-2 border-nepal-blue text-nepal-blue rounded-full font-poppins font-medium text-[14px] uppercase tracking-[1px] hover:bg-nepal-blue hover:text-white hover:-translate-y-0.5 transition-all duration-300 shadow-lg">
              Franchise Inquiry
            </button>
          </Link>
        </motion.div>
      </section>

      {/* ============================ MOMOSTE ============================ */}
      <section
        id="menu"
        className="relative w-full py-12 md:py-20 bg-white overflow-hidden"
        style={{ backgroundImage: `url('${A.mountainTop}')`, backgroundPosition: "left top", backgroundRepeat: "no-repeat" }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
            <Reveal variant="right" className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative w-[300px] md:w-[400px] lg:w-[500px]">
                <motion.img
                  src={A.brassBowl}
                  alt="Delicious momos on a brass plate"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  animate={{ rotate: 360, y: [0, -12, 0] }}
                  transition={{
                    rotate: { duration: 34, repeat: Infinity, ease: "linear" },
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  }}
                />
              </div>
            </Reveal>

            <motion.div
              className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 pt-10"
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div variants={staggerItem} className="flex flex-col items-center lg:items-start">
                <div className="relative">
                  <span className="absolute -top-6 -left-2 text-nepal-red text-3xl md:text-4xl font-bold select-none">✳</span>
                  <h2 className="font-anod text-[48px] md:text-[80px] leading-none text-nepal-navy mb-2">
                    {momoste.title}
                  </h2>
                </div>
                <img src={A.goodTimes} alt={momoste.subtitle} className="h-12 md:h-16 object-contain -mt-4 opacity-90" />
              </motion.div>

              <motion.div variants={staggerItem} className="space-y-4 max-w-lg font-poppins text-[#5C5C5C] leading-relaxed">
                <p>{momoste.body}</p>
              </motion.div>

              <motion.div variants={staggerItem} className="mt-8 border-2 border-dashed border-nepal-red rounded-lg p-6 max-w-md bg-nepal-cream/30 relative">
                <div className="absolute -top-3 left-6 bg-white px-2 font-bold text-nepal-red text-sm uppercase tracking-wider">
                  {momoste.whyTitle}
                </div>
                <p className="font-poppins text-sm text-nepal-navy italic">"{momoste.whyBody}"</p>
              </motion.div>

              <motion.div variants={staggerItem} className="flex items-start gap-3 mt-6 max-w-md">
                <span className="text-nepal-red text-lg leading-none shrink-0 mt-0.5">✳</span>
                <p className="font-poppins text-[13px] text-nepal-navy leading-normal">
                  <span className="font-bold text-[14px]">{momoste.noteEmph}</span> {momoste.noteRest}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== FRANCHISE PROMO ==================== */}
      <section className="relative w-full overflow-hidden bg-nepal-blue text-white py-16 md:py-24">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: `url('${A.homBadge}')`, backgroundSize: "340px", backgroundRepeat: "repeat" }}
        />
        <div className="container mx-auto max-w-[1300px] px-4 relative z-10">
          <div className="grid lg:grid-cols-2 items-center gap-10 lg:gap-16">
            {/* Image */}
            <Reveal variant="left" duration={0.8} className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <img
                  src={storefrontImg}
                  alt="An 8848 Momo House storefront"
                  className="w-full h-[280px] md:h-[440px] object-cover"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 bg-nepal-red text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow">
                  Est. Australia · 20+ Stores
                </span>
              </div>
              <motion.img
                src={A.everest}
                alt=""
                aria-hidden="true"
                className="absolute -bottom-6 -right-4 w-[90px] md:w-[120px] drop-shadow-xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
            </Reveal>

            {/* Copy */}
            <motion.div
              className="order-1 lg:order-2 text-center lg:text-left"
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.span
                variants={staggerItem}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.25em] text-white/90"
              >
                <span className="h-2 w-2 rounded-full bg-nepal-red" />
                Franchise With Us
              </motion.span>

              <motion.h2 variants={staggerItem} className="mt-6 font-shoem leading-[0.9] tracking-wide">
                <span className="block text-[44px] md:text-[74px]">BRING 8848</span>
                <span className="block text-[44px] md:text-[74px]">TO YOUR CITY</span>
                <span className="block font-anod text-nepal-red text-[30px] md:text-[46px] mt-2">
                  OWN THE FIRST NEPALESE MOMO FRANCHISE
                </span>
              </motion.h2>

              <motion.p variants={staggerItem} className="mt-6 font-poppins text-white/80 text-[15px] md:text-[18px] leading-relaxed max-w-xl mx-auto lg:mx-0">
                From a single kitchen in Australia to 20+ stores and growing — now we're
                inviting founding partners to bring the momo revolution to the United Kingdom.
              </motion.p>

              <motion.div variants={staggerItem} className="mt-8 flex flex-wrap justify-center lg:justify-start gap-8">
                {[
                  { k: "20+", v: "Stores" },
                  { k: "3M+", v: "Momos served" },
                  { k: "1st", v: "Nepalese franchise" },
                ].map((s) => (
                  <div key={s.v} className="text-center lg:text-left">
                    <div className="font-shoem text-nepal-red text-[38px] md:text-[46px] leading-none">{s.k}</div>
                    <div className="font-poppins text-white/70 text-[12px] uppercase tracking-widest mt-1">{s.v}</div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={staggerItem} className="mt-9">
                <Link
                  to="/franchise"
                  className="inline-flex items-center px-[32px] py-[14px] bg-nepal-red text-white font-poppins font-bold text-[14px] uppercase tracking-[1px] hover:bg-red-700 hover:-translate-y-0.5 transition-all duration-300 shadow-xl group rounded-full"
                >
                  Start Franchise Inquiry
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== MOMO SPOTLIGHT (promo) ==================== */}
      <section className="relative w-full overflow-hidden bg-nepal-red text-white py-16 md:py-24">
        {/* badge texture only (no gradient) */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: `url('${A.homBadge}')`, backgroundSize: "360px", backgroundRepeat: "repeat" }}
        />

        <div className="container mx-auto max-w-[1300px] px-4 relative z-10">
          <div className="grid lg:grid-cols-2 items-center gap-10 lg:gap-16">
            {/* Image */}
            <Reveal variant="right" duration={0.8} className="relative order-1 flex justify-center">
              <motion.div
                className="relative w-[95%] max-w-[660px]"
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src="/menu-images/jhol-momo.jpg"
                  alt="8848 signature jhol momo"
                  className="w-full rounded-3xl object-cover shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
                />
                {/* static stamp badge pinned to the card corner */}
                <img
                  src={A.everest}
                  alt=""
                  aria-hidden="true"
                  className="absolute -bottom-7 -left-5 md:-bottom-9 md:-left-7 w-[95px] md:w-[130px] -rotate-12 opacity-95 drop-shadow-xl"
                />
              </motion.div>
            </Reveal>

            {/* Copy */}
            <motion.div
              className="order-2 text-center lg:text-left"
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.span
                variants={staggerItem}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.25em] text-white/90"
              >
                <span className="h-2 w-2 rounded-full bg-nepal-red" />
                Kings of Momo
              </motion.span>

              <motion.h2 variants={staggerItem} className="mt-6 font-shoem leading-[0.88] tracking-wide">
                <span className="block text-[54px] md:text-[92px]">WE DON'T JUST</span>
                <span className="block text-[54px] md:text-[92px]">MAKE MOMO —</span>
                <span className="block font-anod text-nepal-navy text-[46px] md:text-[80px] mt-1">WE PERFECT IT.</span>
              </motion.h2>

              <motion.p variants={staggerItem} className="mt-6 font-poppins text-white/80 text-[15px] md:text-[18px] leading-relaxed max-w-xl mx-auto lg:mx-0">
                Crafted fresh every single day and inspired by the roof of the world.
                Steamed, fried, tossed in chilli or swimming in our legendary jhol — over
                <span className="text-white font-bold"> 20 mouth-watering fillings</span> made to keep you coming back for mo', mo', mo'.
              </motion.p>

              <motion.div variants={staggerItem} className="mt-7 flex flex-wrap justify-center lg:justify-start gap-3">
                {["Made fresh daily", "20+ fillings", "Steamed · Fried · Jhol · Tandoori"].map((f) => (
                  <span key={f} className="rounded-full bg-white/10 border border-white/15 px-4 py-2 text-[12px] font-semibold tracking-wide text-white/90">
                    {f}
                  </span>
                ))}
              </motion.div>

              <motion.div variants={staggerItem} className="mt-9">
                <Link
                  to="/menu"
                  className="inline-flex items-center px-[32px] py-[14px] bg-white text-nepal-red font-poppins font-bold text-[14px] uppercase tracking-[1px] hover:bg-nepal-navy hover:text-white hover:-translate-y-0.5 transition-all duration-300 shadow-xl group"
                >
                  Explore Our Food
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== SIGNATURE MOMO LINE-UP ==================== */}
      <section className="w-full py-16 md:py-24 px-4 md:px-12 lg:px-24 bg-[#EDF2FF] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal variant="up" className="text-center mb-12">
            <p className="font-montserrat text-nepal-red font-bold text-xs md:text-sm tracking-[4px] uppercase mb-3">
              Pick Your Pleasure
            </p>
            <h2 className="font-shoem text-nepal-navy text-[44px] md:text-[72px] leading-none">
              THE SIGNATURE <span className="font-anod text-nepal-red">MOMO</span> LINE-UP
            </h2>
          </Reveal>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {SIGNATURE_MOMOS.map((m) => (
              <motion.div
                key={m.name}
                variants={staggerItem}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={m.img}
                    alt={m.name}
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute top-3 left-3 bg-nepal-red text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow">
                    {m.tag}
                  </span>
                </div>
                <div className="flex flex-col flex-1 p-5 text-left">
                  <h3 className="font-shoem text-nepal-navy text-2xl md:text-[26px] uppercase tracking-wide leading-none">
                    {m.name}
                  </h3>
                  <p className="mt-3 font-poppins text-[13.5px] leading-relaxed text-nepal-navy/70 flex-1">
                    {m.desc}
                  </p>
                  <Link
                    to="/menu"
                    className="mt-4 inline-flex items-center text-nepal-red font-bold font-montserrat text-[11px] uppercase tracking-widest group/link"
                  >
                    Order now
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================ ROOTS ============================ */}
      <section
        id="about-us"
        className="relative w-full py-12 md:py-20 px-4 md:px-12 lg:px-24 overflow-hidden bg-[#F5F5F5]"
      >
        <div
          className="absolute inset-0 w-full h-full opacity-60 mix-blend-multiply pointer-events-none"
          style={{ backgroundImage: `url('${A.concrete}')`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div
          className="absolute inset-0 w-full h-full opacity-80 pointer-events-none"
          style={{ backgroundImage: `url('${A.column}')`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text column */}
          <motion.div
            className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2 variants={staggerItem} className="text-[34px] md:text-[52px] font-shoem text-nepal-navy leading-[0.9]">{roots.title1}</motion.h2>
            <motion.h2 variants={staggerItem} className="text-[34px] md:text-[52px] font-anod text-nepal-red leading-[0.9] mt-1">{roots.title2}</motion.h2>
            <motion.h2 variants={staggerItem} className="text-[34px] md:text-[52px] font-anod text-nepal-navy leading-[0.9] mt-1">COMING SOON TO THE UK.</motion.h2>

            <motion.p variants={staggerItem} className="mt-6 font-poppins text-nepal-navy text-[16px] md:text-[18px] font-medium leading-relaxed max-w-xl">
              {roots.lead} {roots.body}
            </motion.p>
            <motion.div variants={staggerItem}>
              <Link
                to="/menu"
                className="mt-6 inline-flex items-center px-[28px] py-[12px] bg-nepal-red text-white font-poppins text-[14px] font-medium hover:bg-red-700 hover:-translate-y-0.5 transition-all duration-300 group"
              >
                {roots.ctaMenu}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Image column */}
          <Reveal variant="left" duration={0.8} className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-[420px] lg:max-w-[560px] flex justify-center lg:justify-end">
              <div
                className="absolute inset-0 w-full h-full opacity-40 pointer-events-none z-0 scale-90"
                style={{ backgroundImage: `url('${A.homBadge}')`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
              />
              <img
                src={FOUNDER_IMG}
                alt="The team behind 8848 Momo House"
                className="relative z-10 w-full h-auto drop-shadow-xl rounded-xl"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ STUFF & THINGS ============================ */}
      <section id="stuff" className="w-full py-16 px-4 md:px-12 lg:px-24 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <Reveal variant="up" className="flex flex-col md:flex-row justify-between items-end mb-8 pb-4 border-b border-nepal-navy/20">
            <div className="flex items-baseline gap-3">
              <h2 className="text-[40px] md:text-[60px] font-shoem text-nepal-navy leading-none tracking-wide">MOMO</h2>
              <span className="text-[40px] md:text-[60px] font-anod text-nepal-red/80 ml-2 transform translate-y-1">JOURNEY</span>
            </div>
            <Link
              to="/stuff"
              className="hidden md:flex items-center px-[28px] py-[12px] bg-transparent border-2 border-nepal-red text-nepal-red font-poppins font-bold text-[14px] tracking-widest uppercase hover:bg-nepal-red hover:text-white transition-all duration-300 shadow-lg hover:scale-105 mb-2"
            >
              View All <ArrowRight />
            </Link>
          </Reveal>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {posts.map((post, i) => (
              <motion.a
                key={post.key || i}
                variants={staggerItem}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: EASE }}
                href={post.href || "#"}
                className="flex flex-col group cursor-pointer bg-white rounded-sm overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="w-full aspect-[3/2] overflow-hidden relative">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-nepal-navy/10 group-hover:bg-transparent transition-colors duration-300" />
                </div>
                <div className="flex flex-col items-start text-left p-6">
                  <h3 className="text-[22px] font-montserrat font-bold text-nepal-navy mb-3 leading-tight group-hover:opacity-80 transition-opacity">
                    {post.title}
                  </h3>
                  <p className="text-nepal-navy/80 font-poppins text-[15px] leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="text-nepal-red font-bold font-montserrat text-xs uppercase tracking-widest border-b-2 border-transparent group-hover:border-nepal-red transition-all duration-300">
                    {(updates.readMore || "Read more").toUpperCase()}
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================ GALLERY / STORY ============================ */}
      <section id="gallery" className="w-full bg-white py-12 md:py-16 px-4 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <Reveal variant="up" className="flex flex-col md:flex-row justify-between items-end mb-8 pb-4 border-b border-nepal-navy/20 relative z-10">
            <div className="flex flex-col text-center md:text-left w-full md:w-auto">
              <h2 className="text-[40px] md:text-[60px] font-shoem text-nepal-navy leading-none mb-2">A STORY IN EVERY BITE</h2>
              <p className="font-poppins text-nepal-red font-bold text-sm tracking-[3px] uppercase">
                Our Journey • Our Passion • Laughter &amp; Love
              </p>
            </div>
            <Link
              to="/gallery"
              className="hidden md:flex items-center px-[28px] py-[12px] bg-transparent border-2 border-nepal-red text-nepal-red font-poppins font-bold text-[14px] tracking-widest uppercase hover:bg-nepal-red hover:text-white transition-all duration-300 shadow-lg hover:scale-105 mb-2"
            >
              View Gallery <ArrowRight />
            </Link>
          </Reveal>

          <div className="flex flex-col gap-4 md:gap-3">
            <div className="flex flex-col md:flex-row gap-4 md:gap-3 md:h-[340px] w-full">
              {galleryCards.slice(0, 4).map((card, i) => (
                <GalleryTile key={i} img={GALLERY[i]} index={i} {...card} />
              ))}
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-3 md:h-[320px] w-full">
              {galleryCards.slice(4, 7).map((card, i) => (
                <GalleryTile key={i} img={GALLERY[i + 4]} index={i} {...card} />
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 md:hidden">
            <Link
              to="/gallery"
              className="flex items-center px-[28px] py-[12px] bg-transparent border-2 border-nepal-red text-nepal-red font-poppins font-bold text-[14px] tracking-widest uppercase hover:bg-nepal-red hover:text-white transition-all duration-300 shadow-lg"
            >
              Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* ============================ MOMOSTE CLUB ============================ */}
      <section id="rewards" className="relative w-full py-8 md:py-12 overflow-hidden bg-nepal-red">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-4">
            <motion.div
              className="w-full lg:w-3/5 text-white space-y-4 text-center lg:text-left"
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h2 variants={staggerItem} className="flex flex-wrap items-baseline justify-center lg:justify-start gap-4 text-4xl md:text-5xl lg:text-7xl leading-none">
                <span className="font-shoem">{yak.titlePrefix}</span>
                <span className="font-anod text-[#eaeaea] tracking-wide">{yak.titleEmph}</span>
              </motion.h2>
              <motion.p variants={staggerItem} className="font-poppins text-sm md:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 opacity-90">
                {yak.body}
              </motion.p>
              <motion.div variants={staggerItem} className="pt-2">
                <a
                  href={EXTERNAL_LINKS.order}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-transparent border-2 border-white hover:bg-nepal-blue hover:border-nepal-blue text-white font-bold py-[12px] px-[28px] transition-all duration-300 transform hover:scale-105 shadow-lg group text-[14px]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M7 10v12" />
                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                  </svg>
                  <span className="tracking-wider">{yak.cta}</span>
                </a>
              </motion.div>
            </motion.div>

            <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
              <motion.div
                className="relative w-[200px] md:w-[280px] lg:w-[320px]"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <motion.img
                  src={A.yak}
                  alt="Jak the Yak saying Namaste"
                  className="w-full h-auto object-contain drop-shadow-xl"
                  animate={{ y: [0, -12, 0], rotate: [0, 1.5, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.05 }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function GalleryTile({ img, tag, title, desc, index = 0 }) {
  return (
    <motion.div
      className="group relative cursor-pointer overflow-hidden rounded-sm transition-all duration-700 ease-in-out w-full h-[400px] md:h-full md:w-auto md:flex-[1] md:hover:flex-[3]"
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
    >
      <div className="absolute inset-0">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 md:opacity-70 md:group-hover:opacity-30 transition-opacity duration-500" />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="hidden md:block absolute bottom-6 left-6 group-hover:opacity-0 transition-opacity duration-300">
          <h3 className="font-shoem text-white text-2xl uppercase tracking-wide drop-shadow-lg">{tag}</h3>
        </div>
        <div className="relative transform translate-y-0 transition-all duration-500 delay-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0">
          <span className="text-nepal-red font-bold text-xs tracking-widest uppercase block mb-2">{tag}</span>
          <h3 className="text-white font-shoem text-3xl mb-3 leading-tight uppercase">{title}</h3>
          <p className="text-white/90 md:text-white/80 font-poppins text-sm md:max-w-xs leading-relaxed">{desc}</p>
        </div>
      </div>
      <div className="hidden md:block absolute inset-0 border-2 border-transparent group-hover:border-nepal-red/40 transition-colors duration-500 rounded-sm" />
    </motion.div>
  );
}
