export type ContactPerson = {
  name: string;
  role: string;
  phone: string;
  email: string;
};

export const SCHOOL = {
  nameLines: ["Collège", "Notre-Dame de l'Aurore"],
  address: "4 rue de la Plaine, 31590 Verfeil",
  addressNote: "jusqu'en juin 2027, puis Balma",
  phone: "06 75 08 01 46",
  email: "nddelaurore@gmail.com",
} as const;

export const SCHOOL_NAME = SCHOOL.nameLines.join(" ");

export const DIRECTOR: ContactPerson = {
  name: "Agnès Debaecker",
  role: "Directrice du collège",
  phone: "06 75 08 01 46",
  email: "direction.ndda@gmail.com",
};

export const AGLAE_PRESIDENT: ContactPerson = {
  name: "Pierre de Watrigant",
  role: "Président de l’AGLAE",
  phone: "06 63 22 07 42",
  email: "bienfaiteurs.ndda@gmail.com",
};
