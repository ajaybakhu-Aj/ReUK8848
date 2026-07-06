import { Link } from "react-router-dom";
import { useSiteSettings } from "@/lib/cms";
import { useTranslation } from "react-i18next";

const FOOTER_LOGO = "/8848-assets/logo-header-crop.png";
const FOOTER_TAGLINE = "/8848-assets/good-times-tasty-food.png";

const FbIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);
const IgIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);
const YtIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
  </svg>
);

function getOpeningHourRows(value) {
  return `${value || ""}`
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [day, ...rest] = line.split(/\s+/);
      return { day, time: rest.join(" ") || line };
    });
}

export default function Footer() {
  const { t } = useTranslation("footer");
  const settings = useSiteSettings();

  const siteName = settings.site_name || "8848 Momo House";
  const email = settings.email || "info@8848momo.co.uk";
  const phoneDisplay = settings.phone_display || settings.phone || t("footerLocation.phoneDisplay");
  const phoneHref = `tel:${(settings.phone || "+447700900123").replace(/\s+/g, "")}`;
  const city = settings.city || t("footerLocation.city");
  const address = settings.address || t("footerLocation.address");
  const openingHours = settings.opening_hours || t("footerLocation.hoursValue");
  const hourRows = getOpeningHourRows(openingHours);

  const socials = [
    { href: settings.facebook_url, icon: <FbIcon />, hover: "hover:bg-[#1877F2]", label: "Facebook" },
    { href: settings.instagram_url, icon: <IgIcon />, hover: "hover:bg-[#E4405F]", label: "Instagram" },
    { href: settings.youtube_url, icon: <YtIcon />, hover: "hover:bg-[#FF0000]", label: "YouTube" },
  ];

  return (
    <footer className="bg-nepal-blue text-white py-16 relative overflow-hidden font-montserrat">
      <div className="w-full px-8 md:px-16 lg:px-32 flex flex-col md:flex-row items-stretch relative z-10">
        {/* LEFT */}
        <div className="w-full md:w-1/2 md:pr-12 flex flex-col items-start text-left space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
            <img src={FOOTER_LOGO} alt={siteName} className="w-32 md:w-40 bg-white/95 rounded-md p-2" />
            <img src={FOOTER_TAGLINE} alt="Good times and tasty food" className="w-32 md:w-40 mb-2" />
          </div>

          <p className="text-sm leading-relaxed max-w-md text-white/90">
            {settings.footer_text || t("leftText")}
          </p>

          <div className="flex space-x-4 pt-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href || "#"}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white ${s.hover} transition-colors`}
              >
                {s.icon}
              </a>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <a href={`mailto:${email}`}>
              <button className="bg-nepal-red text-white px-[28px] py-[12px] font-medium text-[14px] uppercase hover:scale-105 transition-transform duration-300 shadow-lg leading-none">
                {t("contactUs")}
              </button>
            </a>
            <Link to="/about-us">
              <button className="bg-transparent border-2 border-white text-white px-[28px] py-[12px] font-medium text-[14px] uppercase hover:bg-nepal-red hover:border-nepal-red hover:scale-105 transition-all duration-300 shadow-lg leading-none">
                {t("moreAboutUs")}
              </button>
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/15" />

        {/* RIGHT */}
        <div className="w-full md:w-1/2 md:pl-8 mt-16 md:mt-0 flex flex-col">
          <h4 className="font-anod text-3xl mb-8 uppercase tracking-wider text-white">
            {t("findYour")} {t("localMomoHouse")}
          </h4>

          <div className="mb-8 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
            <div className="flex items-start space-x-4">
              <div className="mt-1 bg-nepal-red rounded-full p-2 text-white shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h5 className="font-bold text-lg text-white">{city}</h5>
                {address && <p className="text-sm text-gray-300">{address}</p>}
                <a href={phoneHref} className="text-sm text-white mt-2 block hover:text-red-400 transition">
                  <span className="font-semibold text-gray-300">{t("footerLocation.phoneLabel")}</span> {phoneDisplay}
                </a>
                <div className="text-sm text-gray-300 mt-2 space-y-1">
                  {hourRows.map(({ day, time }) => (
                    <span key={`${day}-${time}`} className="block">
                      <span className="text-white/60 w-28 inline-block">{day}</span> {time}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 text-sm pl-2">
            <div className="pb-4 border-b border-white/5">
              <h5 className="font-anod text-lg mb-4 text-white uppercase tracking-wide">Visit our international momo house</h5>
              <div>
                <strong className="block text-white mb-1 text-base">Australia</strong>
                <p className="text-gray-400 text-xs">
                  Queensland, Victoria, New South Wales, ACT and more — 8848 Momo House began Down Under.
                </p>
              </div>
            </div>
            <div className="pt-2">
              <strong className="block text-white mb-1 text-base">COMING SOON</strong>
              <p className="text-gray-300 text-xs md:text-sm">More United Kingdom locations.</p>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <a href={`mailto:${email}`} className="flex items-center space-x-3 text-white hover:text-red-400 transition group mb-4 sm:mb-0">
              <div className="bg-nepal-red p-2 rounded-full group-hover:bg-white group-hover:text-nepal-red transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-medium tracking-wide">{email}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16">
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 font-medium">
          <p className="text-center md:text-left mb-4 md:mb-0">
            {siteName} © Nepalese Dumplings &amp; Oriental Fusion | United Kingdom
          </p>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex space-x-6">
              <a href={settings.privacy_url || "#"} className="hover:text-white transition-colors">{t("privacy")}</a>
              <a href={settings.terms_url || "#"} className="hover:text-white transition-colors">{t("terms")}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
