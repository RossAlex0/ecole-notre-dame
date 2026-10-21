import type { ErrorContent } from "@/types/content";

export const NOT_FOUND_CONTENT: ErrorContent = {
  eyebrow: "Erreur 404",
  title: "Page",
  highlight: "introuvable",
  text: "La page que vous cherchez n'existe pas ou a été déplacée. Retrouvez l'essentiel du collège sur la page d'accueil.",
};

export const ERROR_CONTENT: ErrorContent = {
  eyebrow: "Erreur",
  title: "Un imprévu",
  highlight: "est survenu",
  text: "Le chargement de la page a échoué. Vous pouvez réessayer ou revenir à l'accueil.",
};

export const ERROR_ACTIONS = {
  home: "Retour à l'accueil",
  retry: "Réessayer",
} as const;
