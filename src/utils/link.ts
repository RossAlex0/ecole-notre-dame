// Opens external pages in a new tab without giving them access to window.opener.
export const EXTERNAL_LINK_PROPS = { target: "_blank", rel: "noopener noreferrer" } as const;

// Link to a section of the home page; works from any route (e.g. legal pages).
export function toSectionHref(id: string): string {
  return `/#${id}`;
}

// Privacy-enhanced YouTube player, started right away since it is only loaded on a click.
export function toYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`;
}

// Converts a French display number ("06 75 08 01 46") to an international tel: link.
export function toTelHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const international = digits.startsWith("0") ? `33${digits.slice(1)}` : digits;

  return `tel:+${international}`;
}

type MailOptions = {
  subject?: string;
  body?: string;
};

export function toMailHref(email: string, { subject, body }: MailOptions = {}): string {
  const params = Object.entries({ subject, body })
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  return `mailto:${email}${params ? `?${params}` : ""}`;
}
