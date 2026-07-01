import { useRef, useState } from "react";
import { motion, useInView, useAnimationFrame } from "framer-motion";

const badges = [
  { value: "8848M", label: "MT. EVEREST" },
  { value: "100%", label: "SATISFACTION" },
  { value: "NEPAL", label: "HERITAGE" },
  { value: "UK", label: "DESTINATION" },
];

const moments = [
  "/gallery/699905803_1395674515924236_8862937895640454602_n.jpg",
  "/gallery/690913600_1391357303022624_306986777952760570_n.jpg",
  "/gallery/683844009_18074008022378582_6744251658218158524_n.jpg",
  "/gallery/682083582_18073447619378582_4201470612714727230_n.jpg",
  "/gallery/679994087_1379560484202306_6412673578865363964_n.jpg",
  "/gallery/679528802_987160163825765_2976338946044117438_n.jpg",
  "/gallery/667210978_1365141555644199_8043924957435588798_n.jpg",
  "/gallery/663309908_1363583052466716_2927746911495968980_n.jpg",
  "/gallery/660275657_1363841442440877_1508218509033431157_n.jpg",
  "/gallery/660705672_1360999326058422_7649937306138062630_n.jpg",
  "/gallery/659653523_1363583049133383_5294780339634034547_n.jpg",
  "/gallery/650619506_1345266560965032_6862016175277555941_n.jpg",
];

function AutoScrollStrip() {
  const stripRef = useRef(null);
  const xRef = useRef(0);
  const [paused, setPaused] = useState(false);

  useAnimationFrame((_, delta) => {
    if (paused || !stripRef.current) return;
    const el = stripRef.current;
    const speed = 0.03;
    xRef.current -= delta * speed;
    const halfWidth = el.scrollWidth / 2;
    if (Math.abs(xRef.current) >= halfWidth) {
      xRef.current = 0;
    }
    el.style.transform = `translateX(${xRef.current}px)`;
  });

  const doubled = [...moments, ...moments];

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={stripRef}
        className="flex gap-4 md:gap-5 will-change-transform"
        style={{ width: "max-content" }}
      >
        {doubled.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="group relative h-[200px] w-[260px] shrink-0 overflow-hidden rounded-xl sm:h-[230px] sm:w-[300px] md:h-[260px] md:w-[340px]"
          >
            <img
              src={src}
              alt="8848 Momo House moment"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />
            {/* Branded overlay on hover */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#21408e]/40 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
            {/* Inner border */}
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-[#21408e]/10 transition-all duration-300 group-hover:ring-[#de1d3d]/30 group-hover:ring-2" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OurStorySection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.4 });
  const badgesRef = useRef(null);
  const badgesInView = useInView(badgesRef, { once: true, amount: 0.5 });
  const stripSectionRef = useRef(null);
  const stripInView = useInView(stripSectionRef, { once: true, amount: 0.2 });

  return (
    <section className="relative overflow-hidden bg-[#edf2ff] au-body-font">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #21408e 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 pt-20 pb-8 sm:px-6 md:pt-28 md:pb-12">
        {/* Header */}
        <div ref={headerRef} className="text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-[#de1d3d]/20 bg-white px-5 py-1.5 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#de1d3d] shadow-sm"
          >
            <span className="h-2 w-2 rounded-full bg-[#de1d3d]" />
            Our Story
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="au-display-font mx-auto mt-5 text-[clamp(1.8rem,7vw,3.8rem)] uppercase leading-[0.95] text-[#21408e]"
          >
            BORN IN NEPAL, SERVED WITH{" "}
            <span className="au-stamp-font text-[#de1d3d]">Love</span>
          </motion.h2>
        </div>

        {/* Two-column quote cards */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2 sm:gap-5"
        >
          <div className="group relative rounded-xl border border-[#21408e]/8 bg-white px-5 py-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 sm:px-6">
            <div className="absolute left-0 top-5 bottom-5 w-[3px] rounded-full bg-[#de1d3d]" />
            <p className="text-[0.92rem] font-medium leading-relaxed text-[#21408e]/75 sm:text-[0.95rem]">
              8848 Momo House has been built on a deep love of food, culture and family.
            </p>
          </div>
          <div className="group relative rounded-xl border border-[#21408e]/8 bg-white px-5 py-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 sm:px-6">
            <div className="absolute left-0 top-5 bottom-5 w-[3px] rounded-full bg-[#21408e]" />
            <p className="text-[0.92rem] font-medium leading-relaxed text-[#21408e]/75 sm:text-[0.95rem]">
              When you step into 8848 Momo House, you are joining a family.
            </p>
          </div>
        </motion.div>

        {/* Badges */}
        <div ref={badgesRef} className="mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {badges.map((b, i) => (
            <motion.div
              key={b.value}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={badgesInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.1 + 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                scale: 1.06,
                y: -3,
                transition: { duration: 0.25 },
              }}
              className="group flex cursor-default items-center gap-2 rounded-full border border-[#21408e]/10 bg-white px-3.5 py-2 shadow-sm transition-shadow duration-300 hover:shadow-md sm:gap-2.5 sm:px-4"
            >
              <span className="text-[0.8rem] font-black text-[#de1d3d] transition-transform duration-300 group-hover:scale-110 sm:text-[0.85rem]">
                {b.value}
              </span>
              <span className="text-[0.58rem] font-extrabold uppercase tracking-[0.14em] text-[#21408e]/60 sm:text-[0.62rem]">
                {b.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* "Our Moments" auto-scrolling strip */}
      <div ref={stripSectionRef} className="relative mt-8 pb-16 md:mt-12 md:pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={stripInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center"
        >
          <span className="text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-[#21408e]/35">
            Our Moments
          </span>
          <div className="mx-auto mt-2 h-px w-16 bg-[#21408e]/10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={stripInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <AutoScrollStrip />
        </motion.div>
      </div>
    </section>
  );
}
