import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "@/components/Reveal";

/* High-quality dish photography shipped with the project. */
const FILES = [
  "feast-spread-1", "feast-spread-2", "feast-spread-3", "feast-spread-4", "feast-spread-5",
  "momo-trio", "khaja-platter", "momo-platter", "steamed-momo", "veg-steamed-momo",
  "jhol-momo", "tandoori-momo",
  "crispy-fried-momo", "kothey-pan-fried-momo", "chilli-momo", "green-curry-momo",
  "butter-chicken-momo", "mini-butter-chicken-momo", "golden-carbonara-momo",
  "chocolate-momo", "chocolate-brownie", "kman-doo-wings", "kman-doo-wings-classic",
  "buffalo-jerky", "pork-sekuwa",
  "hot-smoky-chicken", "chilli-rush", "sizzzzler", "sherpa-egg-drop-soup",
  "peanut-sadeko", "bao-burger", "loaded-fries", "bowl-of-fries",
  "sausage-on-stick", "chowmein-noodles",
  "fried-rice", "steamed-rice", "chicken-curry-bowl",
  "goat-curry-bowl", "nepalese-paratha", "himalayan-salad",
  "edamame-crunch", "coolfi-scoops",
];

const titleCase = (slug) =>
  slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

const IMAGES = FILES.map((slug, i) => ({
  id: i + 1,
  src: `/menu-images/${slug}.jpg`,
  caption: titleCase(slug),
}));

export default function Gallery() {
  const [active, setActive] = useState(null); // index or null

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + IMAGES.length) % IMAGES.length)),
    [],
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % IMAGES.length)),
    [],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, prev, next]);

  return (
    <div className="bg-white font-poppins text-gray-800">
      {/* ------------------------- Hero band ------------------------- */}
      <section
        className="relative w-full overflow-hidden bg-nepal-blue text-white py-16 md:py-24"
        style={{
          backgroundImage: `url('/8848-assets/Light-Mountain-Watermark-Top.png')`,
          backgroundPosition: "left top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-nepal-blue/60" />
        <motion.div
          className="container mx-auto max-w-[1400px] px-4 relative z-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="font-montserrat text-[13px] md:text-[15px] uppercase tracking-[4px] text-white/80 mb-4 font-bold">
            8848 Momo House · United Kingdom
          </p>
          <motion.h1
            className="font-shoem text-[52px] md:text-[96px] leading-none tracking-wide"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          >
            OUR GALLERY
          </motion.h1>
          <p className="font-poppins text-sm md:text-base tracking-[3px] uppercase mt-4 font-bold text-white/90">
            A Story in Every Bite • Our Journey • Our Passion
          </p>
        </motion.div>
      </section>

      {/* ------------------------- Grid ------------------------- */}
      <section className="w-full py-12 md:py-20 px-4 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 pb-4 border-b border-nepal-navy/20">
            <div className="flex items-baseline gap-3">
              <h2 className="text-[34px] md:text-[52px] font-shoem text-nepal-navy leading-none tracking-wide">
                EVERY
              </h2>
              <span className="text-[34px] md:text-[52px] font-anod text-nepal-red/80 ml-1 translate-y-1">
                MOMOMENT
              </span>
            </div>
            <Link
              to="/menu"
              className="hidden md:flex items-center px-[28px] py-[12px] bg-transparent border-2 border-nepal-red text-nepal-red font-poppins font-bold text-[14px] tracking-widest uppercase hover:bg-nepal-red hover:text-white transition-all duration-300 shadow-lg hover:scale-105 mb-2"
            >
              View Menu
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {IMAGES.map((img, i) => (
              <motion.button
                key={img.id}
                onClick={() => setActive(i)}
                className="group relative block overflow-hidden rounded-sm aspect-square cursor-pointer focus:outline-none focus:ring-2 focus:ring-nepal-red"
                aria-label={`Open ${img.caption}`}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.07, ease: EASE }}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale-[0.15] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-left translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                  <span className="block text-nepal-red font-bold text-[10px] tracking-widest uppercase mb-1">
                    8848
                  </span>
                  <h3 className="text-white font-shoem text-xl md:text-2xl uppercase leading-tight tracking-wide drop-shadow">
                    {img.caption}
                  </h3>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-nepal-red/50 transition-colors duration-500 rounded-sm" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------- Lightbox ------------------------- */}
      <AnimatePresence>
      {active !== null && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 md:p-10"
          onClick={close}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 md:top-6 md:right-8 text-white/80 hover:text-white transition-colors"
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
            className="absolute left-2 md:left-8 text-white/70 hover:text-nepal-red transition-colors"
          >
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <motion.figure
            key={active}
            className="max-w-[90vw] max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <img
              src={IMAGES[active].src}
              alt={IMAGES[active].caption}
              className="max-w-[90vw] max-h-[75vh] object-contain rounded-sm shadow-2xl"
            />
            <figcaption className="mt-4 text-center">
              <span className="font-shoem text-white text-2xl md:text-3xl uppercase tracking-wide">
                {IMAGES[active].caption}
              </span>
              <span className="block text-white/50 text-xs mt-1 font-poppins">
                {active + 1} / {IMAGES.length}
              </span>
            </figcaption>
          </motion.figure>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
            className="absolute right-2 md:right-8 text-white/70 hover:text-nepal-red transition-colors"
          >
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
