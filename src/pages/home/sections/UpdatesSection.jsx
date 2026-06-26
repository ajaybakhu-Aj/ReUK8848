import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { FaArrowRight } from "react-icons/fa"
import { getPageSectionContent, useHomePage } from "@/lib/cms"
import { useTranslation } from "react-i18next"

export default function UpdatesSection() {
  const { t, i18n } = useTranslation("home")
  const homePage = useHomePage()
  const fallback = {
    title: t("updates.title"),
    readMore: t("updates.readMore"),
    showLess: "Show Less",
    posts: t("updates.posts", { returnObjects: true }) || [],
  }
  const updates = getPageSectionContent(homePage, "updates", fallback, i18n.language)
  const posts = Array.isArray(updates.posts) ? updates.posts : fallback.posts

  const [expanded, setExpanded] = useState(null)
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, amount: 0.4 })

  return (
    <section className="relative overflow-hidden bg-[#edf2ff] au-body-font">
      {/* Subtle background */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #21408e 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative mx-auto max-w-[1180px] px-5 pb-10 pt-16 md:px-10 md:pb-14 md:pt-24">
        {/* Header */}
        <div ref={headerRef} className="mb-12 text-center md:mb-14">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-[#21408e]/15 bg-white px-5 py-1.5 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#21408e] shadow-sm"
          >
            <span className="h-2 w-2 rounded-full bg-[#de1d3d]" />
            Latest News
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="au-display-font mt-5 text-[clamp(2rem,6vw,3.5rem)] uppercase leading-none text-[#21408e]"
          >
            {updates.title || fallback.title}
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-4 h-[3px] w-16 rounded-full bg-[#de1d3d]/40"
          />
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          {posts.map((post, index) => (
            <UpdateCard
              key={post.key || `${post.title}-${index}`}
              post={post}
              index={index}
              expanded={expanded === index}
              onToggle={() => setExpanded(expanded === index ? null : index)}
              readMoreLabel={updates.readMore || fallback.readMore}
              showLessLabel={updates.showLess || fallback.showLess}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function UpdateCard({ post, index, expanded, onToggle, readMoreLabel, showLessLabel }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-400 hover:shadow-xl hover:shadow-[#21408e]/10"
    >
      {/* Image */}
      <a
        href={post.href || "#"}
        className="relative block overflow-hidden"
      >
        <img
          src={post.img}
          alt={post.alt || post.title}
          className="aspect-[1.5/1] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

        {/* Hover arrow */}
        <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#de1d3d] opacity-0 translate-y-2 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0 shadow-md">
          <FaArrowRight size={12} />
        </div>
      </a>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Red accent line */}
        <div className="mb-4 h-[3px] w-10 rounded-full bg-[#de1d3d]" />

        <h3 className="text-[1.2rem] font-extrabold leading-[1.25] text-[#21408e] sm:text-[1.3rem]">
          <a
            href={post.href || "#"}
            className="transition-colors hover:text-[#de1d3d] line-clamp-2"
            title={post.title}
          >
            {post.title}
          </a>
        </h3>

        <div className="mt-3 flex-1">
          <p
            className={`text-[0.88rem] font-normal leading-[1.6] text-[#21408e]/70 ${
              expanded ? "" : "line-clamp-2"
            }`}
          >
            {post.excerpt}
          </p>
        </div>

        <button
          onClick={onToggle}
          className="mt-4 inline-flex items-center gap-1.5 text-[0.75rem] font-extrabold uppercase tracking-[0.08em] text-[#de1d3d] transition-colors hover:text-[#21408e]"
        >
          {expanded ? showLessLabel : readMoreLabel}
          <FaArrowRight
            size={9}
            className={`transition-transform duration-300 ${expanded ? "rotate-90" : "group-hover:translate-x-0.5"}`}
          />
        </button>
      </div>
    </motion.article>
  )
}
