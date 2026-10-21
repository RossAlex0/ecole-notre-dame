export type ImageAsset = {
  src: string;
  width: number;
  height: number;
};

export const IMAGES = {
  logo: { src: "/images/logo.png", width: 304, height: 320 },
  hero: { src: "/images/girls.jpg", width: 1600, height: 1085 },
  balma: { src: "/images/balma.jpg", width: 511, height: 315 },
  inscriptions: { src: "/images/walk.jpg", width: 946, height: 591 },
  pillarSoul: { src: "/images/messe.jpg", width: 1200, height: 675 },
  pillarMind: { src: "/images/teacher.jpg", width: 890, height: 900 },
  pillarTalents: { src: "/images/theatre.jpg", width: 1200, height: 675 },
  director: { src: "/images/team/agnes-debaecker.jpg", width: 480, height: 480 },
  aglaePresident: { src: "/images/team/pierre-de-watrigant.jpg", width: 480, height: 480 },
} as const satisfies Record<string, ImageAsset>;
