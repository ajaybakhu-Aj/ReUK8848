import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { EXTERNAL_LINKS } from "@/lib/links";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useSiteSettings } from "@/lib/cms";
import logo from "@/assets/8848logo.jpeg";

// Nav items split into a left group and a right group around the centered logo,
// mirroring the target header layout. Internal routes use <Link>, the rest are
// on-page anchors (the single-page target linked to #sections).
const LEFT_NAV = [
  { key: "home", href: "/", internal: true },
  { key: "menu", href: "/menu", internal: true },
];

const RIGHT_NAV = [
  { key: "franchise", href: "/franchise", internal: true },
  { key: "about", href: "/about-us", internal: true },
];

const ALL_NAV = [...LEFT_NAV, ...RIGHT_NAV];

const normalizePath = (path) => path.replace(/\/+$/, "") || "/";

export default function Navbar() {
  const { t, i18n } = useTranslation("navbar");
  const settings = useSiteSettings();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const phoneDisplay = settings.phone_display || settings.phone || "+44 7908 944999";
  const phoneHref = `tel:${(settings.phone || "+447908944999").replace(/\s+/g, "")}`;
  const currentPath = normalizePath(pathname);

  const isActive = (item) => item.internal && currentPath === normalizePath(item.href);
  const lang = (i18n.language || "en").slice(0, 2);
  const setLang = (l) => i18n.changeLanguage(l);

  const linkClass = (item) =>
    [
      "relative font-shoem font-normal text-[24px] xl:text-[26px] tracking-wide transition-colors duration-200 py-1",
      "after:absolute after:left-0 after:-bottom-0.5 after:h-[3px] after:w-full after:rounded-full after:bg-nepal-red",
      "after:origin-left after:transition-transform after:duration-300",
      isActive(item)
        ? "text-nepal-red after:scale-x-100"
        : "text-nepal-blue hover:text-nepal-red after:scale-x-0 hover:after:scale-x-100",
    ].join(" ");

  const NavLink = ({ item, className }) =>
    item.internal ? (
      <Link to={item.href} className={className} onClick={() => setMobileOpen(false)}>
        {t(`links.${item.key}`)}
      </Link>
    ) : (
      <a href={item.href} className={className} onClick={() => setMobileOpen(false)}>
        {t(`links.${item.key}`)}
      </a>
    );

  return (
    <>
      <header
        className={`sticky top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md font-poppins transition-shadow duration-300 ${
          scrolled ? "shadow-[0_6px_24px_-8px_rgba(38,54,124,0.25)]" : ""
        }`}
      >
        {/* Top utility bar */}
        <div className="hidden md:block bg-nepal-blue text-white">
          <div className="container mx-auto max-w-[1400px] px-4 py-1.5 flex justify-between items-center text-[13px]">
            <div className="flex items-center gap-6">
              <a href={phoneHref} className="flex items-center font-semibold tracking-wide hover:text-white/80 transition-colors">
                <span className="mr-2">📞</span> {phoneDisplay}
              </a>
              <span className="hidden lg:inline text-white/40">|</span>
              <span className="hidden lg:inline text-white/80 font-medium tracking-wide">
                Nepalese Dumplings &amp; Oriental Fusion
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-white/70 text-[12px] uppercase tracking-[0.15em] mr-1">Follow us</span>
              {[
                { href: settings.facebook_url, icon: <FaFacebookF size={11} />, label: "Facebook" },
                { href: settings.instagram_url, icon: <FaInstagram size={12} />, label: "Instagram" },
                { href: settings.youtube_url, icon: <FaYoutube size={12} />, label: "YouTube" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href || "#"}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-[24px] h-[24px] bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-nepal-red transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Main nav row — logo left, links + CTA right */}
        <div className={`transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}>
          <div className="container mx-auto max-w-[1400px] px-4 md:px-6">
            <div className="flex items-center justify-between gap-4">
              {/* Logo (left) */}
              <Link to="/" className="flex items-center shrink-0" aria-label="8848 Momo House — Home">
                <img
                  src={logo}
                  alt="8848 Momo House Logo"
                  className={`w-auto transition-all duration-300 hover:scale-[1.03] ${
                    scrolled ? "h-[48px] md:h-[56px]" : "h-[56px] md:h-[70px]"
                  }`}
                />
              </Link>

              {/* Nav + CTA (right, desktop) */}
              <div className="hidden lg:flex items-center gap-8 xl:gap-11">
                <nav className="flex items-center gap-7 xl:gap-9">
                  {ALL_NAV.map((item) => (
                    <NavLink key={item.key} item={item} className={linkClass(item)} />
                  ))}
                </nav>
                <span className="h-7 w-px bg-nepal-navy/15" />
                <a href={EXTERNAL_LINKS.order} target="_blank" rel="noreferrer">
                  <button className="group inline-flex items-center gap-2 bg-nepal-red hover:bg-red-700 text-white pl-5 pr-4 py-2.5 font-poppins font-bold text-[13px] uppercase tracking-wide transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 rounded-full">
                    {t("orderOnline")}
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </a>
              </div>

              {/* Mobile: order + hamburger */}
              <div className="flex lg:hidden items-center gap-2">
                <a href={EXTERNAL_LINKS.order} target="_blank" rel="noreferrer" className="hidden sm:block">
                  <button className="bg-nepal-red text-white px-4 py-2 font-poppins font-bold text-[12px] uppercase tracking-wide rounded-full shadow-sm">
                    {t("orderOnline")}
                  </button>
                </a>
                <button
                  onClick={() => setMobileOpen(true)}
                  aria-label={t("mobile.menu")}
                  className="text-nepal-blue p-2 hover:bg-nepal-blue/5 rounded-full transition-colors relative"
                >
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-nepal-red rounded-full" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-[9999] bg-white text-nepal-navy xl:hidden transition-transform duration-500 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white">
          <img src={logo} alt="8848 Momo House Logo" className="h-[50px] w-auto" />
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="text-nepal-red p-2 hover:bg-red-50 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col h-full overflow-y-auto pb-20 bg-white">
          <nav className="flex flex-col px-6 py-8 space-y-6">
            {ALL_NAV.map((item) => (
              <NavLink
                key={item.key}
                item={item}
                className={`font-shoem text-3xl md:text-4xl tracking-wide ${
                  isActive(item) ? "text-nepal-red" : "text-nepal-blue"
                }`}
              />
            ))}
          </nav>

          <div className="mt-auto px-6 py-8 border-t border-gray-100 bg-gray-50">
            <a href={EXTERNAL_LINKS.order} target="_blank" rel="noreferrer">
              <button className="w-full bg-nepal-red text-white py-4 font-poppins font-bold text-lg uppercase tracking-widest shadow-lg mb-8">
                {t("orderOnline")}
              </button>
            </a>
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                {[
                  { href: settings.facebook_url, icon: <FaFacebookF size={18} />, label: "Facebook" },
                  { href: settings.instagram_url, icon: <FaInstagram size={18} />, label: "Instagram" },
                  { href: settings.youtube_url, icon: <FaYoutube size={18} />, label: "YouTube" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href || "#"}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-nepal-navy shadow-sm"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
              <div className="flex items-center space-x-2 font-poppins font-bold">
                <button onClick={() => setLang("en")} className={lang === "en" ? "text-nepal-red" : "text-gray-400"}>EN</button>
                <span className="text-gray-300">|</span>
                <button onClick={() => setLang("de")} className={lang === "de" ? "text-nepal-red" : "text-gray-400"}>DE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
