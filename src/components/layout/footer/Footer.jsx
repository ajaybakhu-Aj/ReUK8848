import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/lib/cms";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdEmail, MdPhone, MdRestaurantMenu } from "react-icons/md";
import { useTranslation } from "react-i18next";

function SocialButton({ href, label, children }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="grid rounded-full h-9 w-9 place-items-center bg-white/10 hover:bg-white/20 transition"
      aria-label={label}
    >
      {children}
    </a>
  );
}

function hasDetailedOpeningHours(value) {
  const hours = `${value || ""}`.trim();
  return /\b(friday|saturday|sunday|monday|tuesday|wednesday|thursday)\b/i.test(hours);
}

function getOpeningHourRows(value) {
  return `${value || ""}`
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [day, ...timeParts] = line.split(/\s+/);
      return {
        day,
        time: timeParts.join(" ") || line,
      };
    });
}

export default function Footer() {
  const { t } = useTranslation("footer");
  const settings = useSiteSettings();
  const contactHref = settings.email
    ? `mailto:${settings.email}`
    : `tel:${settings.phone || "0000000000"}`;
  const phoneHref = settings.phone
    ? `tel:${settings.phone}`
    : "tel:0000000000";
  const phoneDisplay =
    settings.phone_display ||
    settings.phone ||
    t("footerLocation.phoneDisplay");
  const siteName = settings.site_name || "8848 Momo House";
  const openingHours = hasDetailedOpeningHours(settings.opening_hours)
    ? settings.opening_hours
    : t("footerLocation.hoursValue");
  const openingHourRows = getOpeningHourRows(openingHours);

  return (
    <footer
      className="relative overflow-hidden bg-[#21408e] text-white"
      style={{
        backgroundImage:
          "radial-gradient(circle at 80% 15%, rgba(225,29,46,0.20), transparent 28%), linear-gradient(135deg, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.08) 2px, transparent 2px, transparent 48px)",
        backgroundSize: "auto, 64px 64px",
      }}
    >
      <div className="absolute inset-0 bg-[#21408e]/92" />

      <div className="relative mx-auto max-w-6xl px-6 py-12 sm:px-8 md:py-16">
        {/* 3-column grid */}
        <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">

          {/* COLUMN 1 — Brand + Description */}
          <div className="min-w-0 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="px-3 py-1 text-3xl font-black leading-none border-4 border-white shrink-0">
                8848
              </div>
              <div className="text-sm font-extrabold uppercase tracking-[0.18em] opacity-95 sm:tracking-[0.25em]">
                {siteName.replace(/^8848\s*/i, "")}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-4 justify-center md:justify-start">
              <SocialButton href={settings.facebook_url} label="Facebook">
                <FaFacebookF size={14} />
              </SocialButton>
              <SocialButton href={settings.instagram_url} label="Instagram">
                <FaInstagram size={16} />
              </SocialButton>
              <SocialButton href={settings.youtube_url} label="YouTube">
                <FaYoutube size={16} />
              </SocialButton>
            </div>

            <p className="mx-auto max-w-sm mt-5 text-sm font-medium leading-relaxed text-white/75 md:mx-0">
              {settings.footer_text || t("leftText")}
            </p>

            <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap sm:justify-center md:justify-start">
              <a href={contactHref} className="min-w-0">
                <Button className="h-11 w-full bg-[#de1d3d] px-6 font-extrabold tracking-wide hover:bg-[#c51625] sm:w-auto">
                  <MdEmail className="mr-2" size={18} />
                  {t("contactUs")}
                </Button>
              </a>
              {settings.order_url && (
                <a href={settings.order_url} className="min-w-0" target="_blank" rel="noreferrer">
                  <Button className="h-11 w-full bg-white px-6 font-extrabold tracking-wide text-[#21408e] hover:bg-white/90 sm:w-auto">
                    <MdRestaurantMenu className="mr-2" size={18} />
                    {t("orderOnline")}
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Divider — mobile/tablet only */}
          <div className="my-8 h-px w-full bg-white/10 lg:hidden md:col-span-2" />

          {/* COLUMN 2 — Find Your Local Momo House */}
          <div className="min-w-0 text-center md:text-left">
            <h3 className="text-[clamp(1.75rem,7vw,2.75rem)] font-black leading-none tracking-tight text-white">
              {t("findYour")}
              <span className="au-stamp-font block mt-2 text-white/90">
                {t("localMomoHouse")}
              </span>
            </h3>

            {/* Location + Phone */}
            <div className="mt-6 flex flex-col items-center gap-4 md:items-start">
              <div className="flex items-start gap-3 text-left">
                <div className="grid w-8 h-8 mt-0.5 rounded-full place-items-center bg-white/10 shrink-0">
                  <span className="text-[#de1d3d]">&#128205;</span>
                </div>
                <div className="min-w-0 break-words text-sm font-semibold text-white/90">
                  <div className="font-black text-white">
                    {settings.city || t("footerLocation.city")}
                  </div>
                  <div className="text-white/70">
                    {settings.address || t("footerLocation.address")}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="grid w-8 h-8 rounded-full place-items-center bg-white/10 shrink-0">
                  <MdPhone className="text-[#de1d3d]" size={16} />
                </div>
                <a
                  href={phoneHref}
                  className="text-sm font-black text-white hover:text-white/90"
                >
                  {phoneDisplay}
                </a>
              </div>
            </div>

            <div className="mt-6">
              <Button
                variant="ghost"
                className="h-11 w-full px-6 font-extrabold tracking-wide text-white border border-white/20 hover:bg-white/10 sm:w-auto"
                onClick={() => (window.location.href = "/about-us")}
              >
                {t("moreAboutUs")}
              </Button>
            </div>
          </div>

          {/* Divider — mobile/tablet only */}
          <div className="my-8 h-px w-full bg-white/10 lg:hidden md:col-span-2" />

          {/* COLUMN 3 — Opening Hours (RIGHT) */}
          <div className="min-w-0 text-center md:text-left lg:text-right">
            <h4 className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-white/50">
              {t("footerLocation.hoursLabel")}
            </h4>

            <div className="mt-4 mx-auto grid w-full max-w-[300px] gap-1.5 md:mx-0 lg:ml-auto">
              {openingHourRows.map(({ day, time }) => (
                <div
                  key={`${day}-${time}`}
                  className="grid grid-cols-[minmax(6.5rem,1fr)_auto] items-center gap-3 rounded-md border border-white/10 bg-white/[0.06] px-3 py-2 text-white shadow-sm backdrop-blur-sm text-left"
                >
                  <span className="text-[0.7rem] font-extrabold uppercase tracking-[0.12em] text-white/70">
                    {day}
                  </span>
                  <span className="font-black tabular-nums leading-none text-white">
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center gap-3 border-t border-white/15 pt-6 text-xs font-medium text-white/60 md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} {siteName}
          </div>
          <div className="flex flex-wrap gap-4">
            <a className="hover:text-white transition" href={settings.privacy_url || "#"}>
              {t("privacy")}
            </a>
            <a className="hover:text-white transition" href={settings.terms_url || "#"}>
              {t("terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
