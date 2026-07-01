import { motion } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1];

const VARIANTS = {
  up: { hidden: { opacity: 0, y: 44 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -36 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: 64 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -64 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
};

/**
 * Scroll-triggered reveal. Wrap any block; it animates in once when it
 * enters the viewport. `variant` picks the motion, `delay`/`duration` tune it.
 * `as` renders a different motion element (e.g. "h2", "p", "span", "li").
 */
export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = 0.65,
  amount = 0.2,
  once = true,
  className,
  as = "div",
  ...rest
}) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      variants={VARIANTS[variant] || VARIANTS.up}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Stagger container: children with `variants={staggerItem}` reveal in sequence. */
export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
