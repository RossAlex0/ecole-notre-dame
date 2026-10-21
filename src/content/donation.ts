import type { DonationContent } from "@/types/content";
import { AGLAE_BANK } from "@/utils/constants/bank";
import { DOCUMENTS, HELLOASSO_URL, MAIL_LINKS } from "@/utils/constants/links";
import { CONTACT_LINK } from "@/utils/constants/navigation";

export const DONATION_CONTENT: DonationContent = {
  title: "Ensemble, construisons",
  highlight: "leur avenir",
  lede: "Les établissements indépendants ne reçoivent aucune aide de l'État. Vos dons nous permettent de maintenir des frais de scolarité accessibles et de construire l'avenir du collège à Balma.",
  campaign: { collected: 1_230_000, goal: 1_450_000 },
  simulator: {
    title: "Simulez votre don",
    profilesLabel: "Je donne en tant que",
    profiles: [
      {
        id: "individual",
        label: "Particulier",
        reductionRate: 0.66,
        title: "Vous êtes un particulier",
        text: [
          "66 % de votre don ouvrent droit à une réduction d'impôt sur le revenu, dans la limite de 20 % de votre revenu imposable. Si vos dons dépassent ce plafond, l'excédent est reportable sur les cinq années suivantes.",
        ],
      },
      {
        id: "company",
        label: "Entreprise",
        reductionRate: 0.6,
        title: "Vous représentez une entreprise",
        text: [
          "Votre don ouvre droit à une réduction d'impôt de 60 %, dans la limite de 20 000 € de dons par an ou de 0,5 % de votre chiffre d'affaires HT si ce montant est plus élevé. L'excédent éventuel est reportable sur les cinq exercices suivants.",
        ],
      },
      {
        id: "wealth-tax",
        label: "IFI",
        reductionRate: 0.75,
        title: "Vous êtes redevable de l'IFI",
        text: [
          "75 % de votre don peuvent être déduits de votre IFI, dans la limite de 50 000 € de réduction par an. ",
          { label: "Contactez-nous", href: MAIL_LINKS.ifiDonation },
          " pour effectuer votre don par l'intermédiaire de notre fondation partenaire.",
        ],
      },
    ],
    amountLabel: "Je donne",
    defaultAmount: 1000,
    resultLabel: "mon don me coûte",
  },
  payment: {
    title: "Choisissez comment donner",
    methodsLabel: "Moyen de paiement",
    methods: [
      {
        id: "online",
        label: "En ligne",
        text: ["Par carte bancaire sur HelloAsso, en une fois ou chaque mois. ", { strong: "Mensualisez votre don\u00a0!" }],
        cta: { label: "Donner en ligne", href: HELLOASSO_URL, variant: "accent", external: true },
      },
      {
        id: "transfer",
        label: "Virement",
        text: ["Ponctuel ou permanent, à l'ordre d'AGLAE. Téléchargez le RIB et ajoutez-le à votre application bancaire."],
        details: [`IBAN ${AGLAE_BANK.iban}`, `BIC ${AGLAE_BANK.bic}`],
        cta: { label: "Télécharger le RIB", href: DOCUMENTS.rib, variant: "outline-light", download: true },
      },
      {
        id: "check",
        label: "Chèque",
        text: ["À l'ordre d'", { strong: AGLAE_BANK.beneficiary }, ", à adresser à :"],
        details: AGLAE_BANK.postalAddress,
      },
      {
        id: "legacy",
        label: "Legs",
        text: ["Le collège peut aussi recevoir des legs et des donations. Parlons-en, en toute confidentialité."],
        cta: { label: "Nous contacter", href: CONTACT_LINK.href, variant: "outline-light" },
      },
    ],
  },
  receipt: {
    title: "Recevez votre reçu fiscal",
    text: "L'AGLAE, association d'intérêt général qui soutient le collège, délivre vos reçus fiscaux. Transmettez-nous vos coordonnées pour recevoir le vôtre.",
    cta: { label: "Laisser mes coordonnées", href: MAIL_LINKS.taxReceipt },
  },
};
