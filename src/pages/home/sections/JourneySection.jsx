import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";

const milestones = [
  {
    year: "2019",
    label: "THE GENESIS",
    location: "Nepal",
    image: "/8848-assets/masu.jpeg",
    text: "Born from a deep love for authentic Nepalese cuisine, 8848 Momo House was conceived as a dream to bring the taste of the Himalayas to the world.",
    accent: "#f59e0b",
  },
  {
    year: "2021",
    label: "RECIPE PERFECTION",
    location: "Kitchen Lab",
    image: "/8848-assets/jhol_Momo.png",
    text: "Hundreds of recipe iterations later, our signature momos and sauces were perfected — authentic flavours with a modern twist that defines our menu today.",
    accent: "#10b981",
  },
  {
    year: "2023",
    label: "UK LAUNCH",
    location: "United Kingdom",
    image: "/8848-assets/long_plate_momo.png",
    text: "8848 Momo House officially opened its doors in the UK, introducing hand-crafted Himalayan momos and oriental fusion to British food lovers.",
    accent: "#3b82f6",
  },
  {
    year: "2024",
    label: "COMMUNITY FAVOURITE",
    location: "Growing Fast",
    image: "/8848-assets/momo-brass-bowl.png",
    text: "Embraced by the local community, 8848 became a neighbourhood staple — known for warm hospitality, bold flavours, and the iconic Momoste greeting.",
    accent: "#8b5cf6",
  },
  {
    year: "2025",
    label: "EXPANDING HORIZONS",
    location: "New Locations",
    image: "/8848-assets/hand-momo.png",
    text: "With growing demand and a loyal following, 8848 Momo House is preparing to bring our authentic momo experience to more cities across the UK.",
    accent: "#ec4899",
  },
];

function MilestoneCard({ m, index, onMount }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const setRef = useCallback((el) => {
    ref.current = el;
    if (el && onMount) onMount(index, el);
  }, [index, onMount]);

  return (
    <motion.div
      ref={setRef}
      data-milestone={index}
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -10,
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      }}
      className="group relative w-[290px] shrink-0 snap-center cursor-pointer sm:w-[320px]"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white transition-shadow duration-400 shadow-[0_4px_20px_rgba(0,0,0,0.08)] group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.15)]">
        {/* Image */}
        <div className="relative h-[210px] overflow-hidden">
          <img
            src={m.image}
            alt={m.label}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

          {/* Location badge */}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.12 + 0.3 }}
            className="absolute left-3 top-3 rounded-full px-3.5 py-1.5 text-[0.62rem] font-extrabold uppercase tracking-widest text-white shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-105"
            style={{ background: `${m.accent}cc` }}
          >
            {m.location}
          </motion.span>

          {/* Year circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.12 + 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/40 bg-white/15 backdrop-blur-md transition-all duration-500 group-hover:rotate-[360deg] group-hover:border-white/70 group-hover:bg-white/30"
          >
            <span className="text-[0.7rem] font-black text-white">{m.year}</span>
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative p-5 transition-colors duration-300 group-hover:bg-slate-50/60">
          {/* Accent top border */}
          <div
            className="absolute left-5 right-5 top-0 h-[3px] origin-left rounded-full transition-all duration-500 group-hover:left-3 group-hover:right-3 group-hover:h-[4px]"
            style={{ background: `linear-gradient(90deg, ${m.accent}, ${m.accent}40)` }}
          />

          <span className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em]" style={{ color: m.accent }}>
            {m.year} Milestone
          </span>
          <h3 className="au-display-font mt-1.5 text-[1.3rem] uppercase leading-tight text-[#21408e]">
            {m.label}
          </h3>
          <p className="mt-3 text-[0.84rem] font-medium leading-relaxed text-[#21408e]/65">
            {m.text}
          </p>

          {/* Hover-reveal arrow */}
          <div className="mt-4 flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-wider opacity-0 translate-y-2 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0" style={{ color: m.accent }}>
            Read more <FaArrowRight size={10} className="transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TimelineDot({ m, index, active, onClick }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
      className="group/dot flex flex-col items-center gap-3 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <motion.div
          className="absolute -inset-2 rounded-full"
          style={{ border: `2px solid ${m.accent}` }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
        />
        <div
          className={`relative z-10 rounded-full border-[3px] border-white transition-all duration-300 group-hover/dot:scale-150 ${active ? "h-5 w-5 scale-125" : "h-4 w-4"}`}
          style={{ backgroundColor: m.accent }}
        />
      </div>
      <span className={`au-display-font text-[1.15rem] font-bold transition-all duration-300 group-hover/dot:text-white group-hover/dot:scale-110 ${active ? "text-white scale-110" : "text-white/80"}`}>
        {m.year}
      </span>
    </motion.div>
  );
}

export default function JourneySection() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.4 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 360, behavior: "smooth" });
    setTimeout(updateScrollState, 400);
  };

  const scrollToCard = (index) => {
    setActiveIndex(index);
    const card = cardRefs.current[index];
    const container = scrollRef.current;
    if (!card || !container) return;
    const cardLeft = card.offsetLeft;
    const cardWidth = card.offsetWidth;
    const containerWidth = container.clientWidth;
    const scrollTarget = cardLeft - (containerWidth / 2) + (cardWidth / 2);
    container.scrollTo({ left: scrollTarget, behavior: "smooth" });
    setTimeout(updateScrollState, 400);
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden au-body-font">
      {/* Red background */}
      <div className="absolute inset-0 bg-[#de1d3d]" />

      {/* Subtle overlays — no harsh shadows */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: bgY,
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 20% 100%, rgba(33,64,142,0.25), transparent), radial-gradient(ellipse 60% 50% at 85% 10%, rgba(0,0,0,0.10), transparent)",
        }}
      />

      {/* Mountain silhouette */}
      <motion.div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          y: bgY,
          backgroundImage: "url('/8848-assets/mount-everest-nepal-8848.png')",
          backgroundSize: "700px",
          backgroundPosition: "right -50px bottom -80px",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/20"
            style={{
              left: `${18 + i * 16}%`,
              top: `${22 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: 4 + i * 0.6,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        {/* Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={headerInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block rounded-full border border-white/30 bg-white/10 px-5 py-1.5 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-white backdrop-blur-sm"
          >
            Our Milestones
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="au-display-font mt-5 text-[clamp(2.5rem,8vw,4.5rem)] uppercase leading-none text-white"
          >
            THE JOURNEY
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-4 h-[3px] w-20 rounded-full bg-white/40"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-5 max-w-2xl text-[1rem] font-medium leading-relaxed text-white/80"
          >
            Trace our growth from a dream in Nepal to bringing authentic Himalayan
            flavours to the UK. A story of dedication, authentic craftsmanship,
            and scaling with love.
          </motion.p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation arrows */}
          <button
            onClick={() => scroll(-1)}
            className={`absolute -left-4 top-[42%] z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/25 md:grid ${!canScrollLeft ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            aria-label="Scroll left"
          >
            <FaChevronLeft size={14} />
          </button>
          <button
            onClick={() => scroll(1)}
            className={`absolute -right-4 top-[42%] z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/25 md:grid ${!canScrollRight ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            aria-label="Scroll right"
          >
            <FaChevronRight size={14} />
          </button>

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            className="flex snap-x snap-mandatory gap-7 overflow-x-auto scroll-smooth px-6 py-4 sm:gap-8 md:px-10 lg:px-14 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {milestones.map((m, i) => (
              <MilestoneCard
                key={m.year + m.label}
                m={m}
                index={i}
                onMount={(idx, el) => { cardRefs.current[idx] = el; }}
              />
            ))}
          </div>
        </div>

        {/* Mobile year pills */}
        <div className="mt-6 flex justify-center gap-2 md:hidden">
          {milestones.map((m, i) => (
            <button
              key={m.year}
              onClick={() => scrollToCard(i)}
              className={`rounded-full px-3.5 py-1.5 text-[0.7rem] font-extrabold tracking-wider transition-all duration-300 ${
                activeIndex === i
                  ? "bg-white text-[#de1d3d] shadow-md scale-105"
                  : "bg-white/15 text-white/80 hover:bg-white/25"
              }`}
            >
              {m.year}
            </button>
          ))}
        </div>

        {/* Desktop timeline bar */}
        <div className="relative mt-10 hidden md:block">
          <div className="absolute left-0 right-0 top-[7px] h-[2px] bg-white/20" />
          <motion.div
            className="absolute left-0 top-[7px] h-[2px] bg-white/50"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="flex justify-between px-8 md:px-14 lg:px-20">
            {milestones.map((m, i) => (
              <TimelineDot
                key={m.year}
                m={m}
                index={i}
                active={activeIndex === i}
                onClick={() => scrollToCard(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
