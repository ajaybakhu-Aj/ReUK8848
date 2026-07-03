// Resolves the backend API base URL from (in priority order):
//   1. Runtime config — window.__8848_CONFIG__ set by public/config.js.
//      This is what ops overrides per environment at deploy time.
//   2. Build-time env vars — VITE_CMS_API_URL / VITE_API_URL.
//   3. The page's own origin (safe same-origin default).
//
// A production build never trusts a localhost/127.0.0.1 value from either
// of the first two sources: if config.js is accidentally left at its local
// dev default and shipped as-is, the app falls through to same-origin
// instead of silently pointing at someone's dev machine forever.
function normalizeUrl(value) {
  return `${value || ""}`.trim().replace(/\/$/, "")
}

function isLocalBackend(url) {
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(url)
}

function rejectLocalInProd(url, source) {
  if (!url) return ""
  if (import.meta.env.PROD && isLocalBackend(url)) {
    console.warn(
      `[apiConfig] Ignoring ${source} (${url}) in a production build — it points at a local backend. ` +
        "Falling back to the next configured source. Set the real API URL in public/config.js or VITE_API_URL.",
    )
    return ""
  }
  return url
}

export function resolveApiBaseUrl() {
  const runtimeUrl = normalizeUrl(
    window.__8848_CONFIG__?.CMS_API_URL || window.__8848_CONFIG__?.API_URL,
  )
  const safeRuntimeUrl = rejectLocalInProd(runtimeUrl, "runtime config (public/config.js)")
  if (safeRuntimeUrl) return safeRuntimeUrl

  const buildUrl = normalizeUrl(import.meta.env.VITE_CMS_API_URL || import.meta.env.VITE_API_URL)
  const safeBuildUrl = rejectLocalInProd(buildUrl, "build-time env var (VITE_API_URL)")
  if (safeBuildUrl) return safeBuildUrl

  return window.location.origin
}
