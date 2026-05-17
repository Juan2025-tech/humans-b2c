export interface UTMParams {
  fuente:       string | null;
  utm_medium:   string | null;
  utm_campaign: string | null;
  referrer:     string | null;
}

export function extractUTM(req: Request): UTMParams {
  const url      = new URL(req.url);
  const referer  = req.headers.get("referer");
  const referrer = referer ? new URL(referer).hostname : null;

  return {
    fuente:       url.searchParams.get("utm_source"),
    utm_medium:   url.searchParams.get("utm_medium"),
    utm_campaign: url.searchParams.get("utm_campaign"),
    referrer,
  };
}

// Client-side: lee los UTM params de la URL actual y los almacena en sessionStorage
// para que el formulario los recoja al hacer submit.
export function storeUTMFromWindow(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign"]) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }
  if (Object.keys(utm).length > 0) {
    sessionStorage.setItem("humans_utm", JSON.stringify(utm));
  }
}

export function readStoredUTM(): Partial<UTMParams> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem("humans_utm");
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, string>;
    return {
      fuente:       parsed.utm_source   ?? null,
      utm_medium:   parsed.utm_medium   ?? null,
      utm_campaign: parsed.utm_campaign ?? null,
      referrer:     null,
    };
  } catch {
    return {};
  }
}
