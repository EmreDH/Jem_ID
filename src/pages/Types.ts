export type AanvoerProduct = {
  id: number;
  fotoUrl?: string;
  soort: string;
  potmaat?: string | null;
  steellengte?: string | null;
  hoeveelheid: number;
  minimumprijs: number;
  kloklocatie: "Naaldwijk" | "Aalsmeer" | "Rijnsburg" | "Eelde";
  veildatum: string; // ISO string (yyyy-mm-dd of yyyy-mm-ddTHH:mm)
};
