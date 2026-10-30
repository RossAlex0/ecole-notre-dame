import type { LegalPageContent } from "@/types/content";
import { SCHOOL } from "@/utils/constants/contact";
import { DATA_PROTECTION_AUTHORITY, HOST, PUBLISHER } from "@/utils/constants/legal";
import { HELLOASSO_URL, SOCIAL_LINKS } from "@/utils/constants/links";
import { toMailHref, toTelHref } from "@/utils/link";

const UPDATED_AT = "21 octobre 2026";
const schoolEmail = { label: SCHOOL.email, href: toMailHref(SCHOOL.email) };
const socialNames = SOCIAL_LINKS.map((link) => link.label).join(" et ");

export const LEGAL_NOTICE_CONTENT: LegalPageContent = {
  title: "Mentions légales",
  description: "Éditeur, directeur de la publication et hébergeur du site du collège Notre-Dame de l'Aurore.",
  updatedAt: UPDATED_AT,
  sections: [
    {
      title: "Éditeur du site",
      paragraphs: [
        [`${PUBLISHER.name} (${PUBLISHER.legalForm}), ${PUBLISHER.registration}.`],
        [`Siège : ${PUBLISHER.address}.`],
        [
          `Établissement : ${SCHOOL.nameLines.join(" ")}, ${SCHOOL.address}. Téléphone : `,
          { label: SCHOOL.phone, href: toTelHref(SCHOOL.phone) },
          ". E-mail : ",
          schoolEmail,
          ".",
        ],
      ],
    },
    {
      title: "Directeur de la publication",
      paragraphs: [[PUBLISHER.publicationDirector]],
    },
    {
      title: "Hébergeur",
      paragraphs: [[`${HOST.name}, ${HOST.address}. Site : `, { label: HOST.website, href: HOST.website }, "."]],
    },
    {
      title: "Propriété intellectuelle",
      paragraphs: [
        [
          "L'ensemble des contenus de ce site (textes, photographies, logo, illustrations) est la propriété de l'éditeur ou de ses partenaires. Toute reproduction, totale ou partielle, sans autorisation préalable est interdite.",
        ],
      ],
    },
    {
      title: "Liens externes",
      paragraphs: [
        [
          `Le site renvoie vers des services tiers (HelloAsso, ${socialNames}). L'éditeur n'est pas responsable de leur contenu ni de leurs pratiques en matière de données personnelles.`,
        ],
      ],
    },
  ],
};

export const PRIVACY_CONTENT: LegalPageContent = {
  title: "Politique de confidentialité",
  description: "Données personnelles, cookies et droits des visiteurs du site du collège Notre-Dame de l'Aurore.",
  updatedAt: UPDATED_AT,
  sections: [
    {
      title: "Responsable du traitement",
      paragraphs: [[`${PUBLISHER.name}, ${PUBLISHER.address}. Contact : `, schoolEmail, "."]],
    },
    {
      title: "Données collectées",
      paragraphs: [
        [
          "Ce site ne comporte aucun formulaire et ne crée aucun compte. Les seules données que nous recevons sont celles que vous choisissez de nous transmettre par e-mail ou par téléphone (demande d'information, inscription, reçu fiscal).",
        ],
        [
          "Ces données sont utilisées uniquement pour répondre à votre demande et, pour les dons, pour établir votre reçu fiscal. Elles ne sont ni vendues ni cédées à des tiers, et sont conservées le temps nécessaire au traitement de la demande et au respect de nos obligations légales.",
        ],
      ],
    },
    {
      title: "Dons en ligne",
      paragraphs: [
        [
          "Les dons par carte bancaire sont traités par ",
          { label: "HelloAsso", href: HELLOASSO_URL },
          ", qui collecte et traite les données de paiement selon sa propre politique de confidentialité.",
        ],
      ],
    },
    {
      title: "Cookies et mesure d'audience",
      paragraphs: [
        [
          "Ce site n'utilise aucun cookie publicitaire ni outil de mesure d'audience. Aucun bandeau de consentement n'est donc nécessaire.",
        ],
        [
          "Les films du collège sont hébergés sur YouTube. Le lecteur n'est chargé que si vous lancez une vidéo, en mode « confidentialité renforcée » (youtube-nocookie.com) : YouTube peut alors collecter des données de navigation, selon sa propre politique de confidentialité.",
        ],
        [
          `L'hébergeur (${HOST.name}) peut enregistrer des données techniques de connexion (adresse IP, navigateur) à des fins de sécurité et de bon fonctionnement du service.`,
        ],
      ],
    },
    {
      title: "Vos droits",
      paragraphs: [
        [
          "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité de vos données. Pour l'exercer, écrivez-nous à ",
          schoolEmail,
          ".",
        ],
        [
          `Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la ${DATA_PROTECTION_AUTHORITY.name} : `,
          { label: DATA_PROTECTION_AUTHORITY.website, href: DATA_PROTECTION_AUTHORITY.website },
          ".",
        ],
      ],
    },
  ],
};
