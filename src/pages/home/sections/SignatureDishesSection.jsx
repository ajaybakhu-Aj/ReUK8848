import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaStar } from "react-icons/fa";

const DISHES = [
  {
    name: "Steamed Momo",
    description: "Soft, hand-pleated dumplings steamed to pillowy perfection.",
    image: "/menu-images/steamed-momo.jpg",
    reviews: "2,400+",
  },
  {
    name: "Butter Chicken Momo",
    description: "Steamed momos drenched in rich, creamy butter chicken sauce.",
    image: "/menu-images/butter-chicken-momo.jpg",
    reviews: "2,100+",
  },
  {
    name: "Chilli Momo",
    description: "Crispy fried momos wok-tossed with capsicum & fiery chillies.",
    image: "/menu-images/chilli-momo.jpg",
    reviews: "1,500+",
  },
  {
    name: "Jhol Momo",
    description: "Dumplings in a tomato, sesame & herb-based soup. Pure comfort.",
    image: "/menu-images/jhol-momo.jpg",
    reviews: "1,800+",
  },
];

function DishCard({ dish, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.a
      href="/menu"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
      className="group block text-center"
    >
      {/* Dish image */}
      <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-full border-4 border-white shadow-[0_8px_30px_rgba(0,0,0,0.10)] transition-all duration-400 group-hover:shadow-[0_12px_40px_rgba(222,29,61,0.18)] group-hover:-translate-y-2">
        <img
          src={dish.image}
          alt={dish.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Dish name */}
      <h3 className="mt-5 au-nav-font text-xl font-bold uppercase text-[#21408e] sm:text-2xl">
        {dish.name}
      </h3>

      {/* Description */}
      <p className="mx-auto mt-2 max-w-[240px] text-sm leading-relaxed text-gray-500">
        {dish.description}
      </p>

      {/* 5 Star Rating */}
      <div className="mt-3 flex flex-col items-center gap-1.5">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar key={i} size={18} className="text-amber-400 drop-shadow-sm" />
          ))}
        </div>
        <span className="text-xs font-bold uppercase tracking-wide text-gray-400">
          {dish.reviews} Reviews
        </span>
      </div>
    </motion.a>
  );
}

export default function SignatureDishesSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #21408e 1px, transparent 0)", backgroundSize: "32px 32px" }} />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 25 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center sm:mb-16"
        >
          <span className="inline-block rounded-full bg-[#de1d3d]/10 px-5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#de1d3d]">
            Our Specialities
          </span>

          <h2 className="mt-5 au-nav-font text-3xl font-bold uppercase text-[#21408e] sm:text-4xl lg:text-5xl">
            8848 Momo House
            <span className="mx-3 hidden text-[#de1d3d]/30 sm:inline">|</span>
            <span className="block text-[#de1d3d] sm:inline">Signature Dishes</span>
          </h2>

          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#de1d3d]" />
        </motion.div>

        {/* 4 Dish Cards */}
        <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4 lg:gap-12">
          {DISHES.map((dish, i) => (
            <DishCard key={dish.name} dish={dish} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 text-center sm:mt-16"
        >
          <a
            href="/menu"
            className="inline-flex items-center gap-2 rounded-full bg-[#de1d3d] px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-red-500/20 transition-all hover:bg-[#c51625] hover:shadow-xl hover:-translate-y-0.5"
          >
            Explore Full Menu
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
