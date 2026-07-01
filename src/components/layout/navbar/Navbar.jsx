import { useState } from "react";
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
  { key: "gallery", href: "/gallery", internal: true },
  { key: "events", href: "/events", internal: true },
  { key: "rewards", href: "/rewards", internal: true },
];

const RIGHT_NAV = [
  { key: "stuff", href: "/stuff", internal: true },
  { key: "franchise", href: "/franchise", internal: true },
  { key: "careers", href: "/careers", internal: true },
  { key: "about", href: "/about-us", internal: true },
];

const ALL_NAV = [...LEFT_NAV, ...RIGHT_NAV];

const normalizePath = (path) => path.replace(/\/+$/, "") || "/";

export default function Navbar() {
  const { t, i18n } = useTranslation("navbar");
  const settings = useSiteSettings();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const phoneDisplay = settings.phone_display || settings.phone || "+44 7908 944999";
  const phoneHref = `tel:${(settings.phone || "+447908944999").replace(/\s+/g, "")}`;
  const currentPath = normalizePath(pathname);

  const isActive = (item) => item.internal && currentPath === normalizePath(item.href);
  const lang = (i18n.language || "en").slice(0, 2);
  const setLang = (l) => i18n.changeLanguage(l);

  const linkClass = (item) =>
    [
      "font-shoem font-normal text-[26px] tracking-wide transition-colors",
      isActive(item) ? "text-nepal-red" : "text-nepal-blue hover:text-nepal-red",
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
      <header className="sticky top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm font-poppins">
        {/* Top utility bar */}
        <div className="hidden md:block border-b border-gray-100">
          <div className="container mx-auto max-w-[1400px] px-4 py-2 flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <a
                href={phoneHref}
                className="flex items-center text-nepal-red font-bold text-[15px] hover:text-nepal-navy transition-colors"
              >
                <span className="mr-2">📞</span> {phoneDisplay}
              </a>
              <div className="flex space-x-2.5 items-center">
                {[
                  { href: settings.facebook_url, icon: <FaFacebookF size={12} />, label: "Facebook" },
                  { href: settings.instagram_url, icon: <FaInstagram size={13} />, label: "Instagram" },
                  { href: settings.youtube_url, icon: <FaYoutube size={13} />, label: "YouTube" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href || "#"}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="w-[24px] h-[24px] bg-[#EDF2FF] rounded-full flex items-center justify-center text-nepal-red hover:bg-nepal-red hover:text-white transition-colors"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <a href={EXTERNAL_LINKS.order} target="_blank" rel="noreferrer">
                <button className="bg-nepal-red hover:bg-red-700 text-white px-4 py-2 font-poppins font-semibold text-[13px] uppercase tracking-wide transition-colors shadow-sm">
                  {t("orderOnline")}
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Main nav row */}
        <div className="py-4">
          <div className="container mx-auto max-w-[1400px] px-4">
            <div className="grid grid-cols-12 items-center">
              <nav className="hidden xl:flex col-span-5 justify-between items-center pr-12">
                {LEFT_NAV.map((item) => (
                  <NavLink key={item.key} item={item} className={linkClass(item)} />
                ))}
              </nav>

              <div className="col-span-6 xl:col-span-2 flex justify-start xl:justify-center z-50 relative">
                <Link to="/" className="bg-white rounded-full p-2 -mt-2 xl:-mt-6 shadow-sm xl:shadow-none xl:bg-transparent xl:p-0 xl:rounded-none">
                  <img
                    src={logo}
                    alt="8848 Momo House Logo"
                    className="h-[60px] md:h-[80px] xl:h-[75px] w-auto transition-all duration-300 transform hover:scale-105"
                  />
                </Link>
              </div>

              <nav className="hidden xl:flex col-span-5 justify-between items-center pl-12">
                {RIGHT_NAV.map((item) => (
                  <NavLink key={item.key} item={item} className={linkClass(item)} />
                ))}
              </nav>

              <div className="col-span-6 flex justify-end xl:hidden">
                <button
                  onClick={() => setMobileOpen(true)}
                  aria-label={t("mobile.menu")}
                  className="text-nepal-blue p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                >
                  <span className="absolute top-0 right-0 w-3 h-3 bg-nepal-red rounded-full" />
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
