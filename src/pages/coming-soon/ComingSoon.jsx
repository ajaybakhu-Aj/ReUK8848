import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EXTERNAL_LINKS } from "@/lib/links";
import { staggerParent, staggerItem } from "@/components/Reveal";

export default function ComingSoon({ title = "This Page", blurb }) {
  const text =
    blurb ||
    "We're cooking something special. This part of the 8848 Momo House experience is on its way — check back soon for the full flavour.";

  return (
    <div className="bg-white font-poppins text-gray-800">
      <section className="relative w-full overflow-hidden bg-[#EDF2FF] flex items-center min-h-[80vh] py-20 md:py-28">
        {/* subtle badge pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url('/8848-assets/Eighty-eight-Forty-Eight-Hom-Pyashi-Badge-Colour-Watermark.png')`,
            backgroundSize: "360px",
            backgroundRepeat: "repeat",
          }}
        />
        {/* mountain watermark, top-left */}
        <div
          className="absolute inset-0 opacity-60 pointer-events-none"
          style={{
            backgroundImage: `url('/8848-assets/Light-Mountain-Watermark-Top.png')`,
            backgroundPosition: "left top",
            backgroundRepeat: "no-repeat",
          }}
        />

        <motion.div
          className="container mx-auto max-w-[900px] px-4 relative z-10 text-center"
          variants={staggerParent}
          initial="hidden"
          animate="show"
        >
          {/* pill badge */}
          <motion.span variants={staggerItem} className="inline-flex items-center gap-2 rounded-full border border-nepal-red/30 bg-white px-5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-nepal-red shadow-sm">
            <span className="h-2 w-2 rounded-full bg-nepal-red animate-pulse" />
            8848 Momo House · United Kingdom
          </motion.span>

          {/* heading */}
          <motion.h1 variants={staggerItem} className="mt-8 font-shoem leading-[0.9] tracking-wide">
            <span className="block text-nepal-navy text-[56px] md:text-[104px]">{title}</span>
            <span className="block text-nepal-red font-anod text-[40px] md:text-[76px] mt-1">
              IS COMING SOON
            </span>
          </motion.h1>

          <motion.p variants={staggerItem} className="font-poppins text-nepal-navy/75 text-[15px] md:text-[18px] font-medium leading-relaxed max-w-xl mx-auto mt-6">
            {text}
          </motion.p>

          <motion.img
            variants={staggerItem}
            src="/8848-assets/yak-footer.png"
            alt="Jak the Yak"
            className="w-[150px] md:w-[210px] h-auto object-contain mx-auto mt-10 drop-shadow-xl"
            animate={{ y: [0, -12, 0], rotate: [0, 1.5, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div variants={staggerItem} className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <Link to="/">
              <button className="bg-nepal-red text-white py-[12px] px-[28px] font-poppins font-medium text-[14px] uppercase tracking-[1px] hover:bg-red-700 transition-colors shadow-sm">
                Back to Home
              </button>
            </Link>
            <a href={EXTERNAL_LINKS.order} target="_blank" rel="noreferrer">
              <button className="bg-transparent border-2 border-nepal-blue text-nepal-blue py-[12px] px-[28px] font-poppins font-medium text-[14px] uppercase tracking-[1px] hover:bg-nepal-blue hover:text-white transition-all duration-300 shadow-lg hover:scale-105">
                Order Online
              </button>
            </a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
