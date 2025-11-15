export interface AanvoerderItemCreateDTO {
  Naam_Product: string;
  soort: string;
  potmaat?: string;
  steellengte?: string;
  hoeveelheid: number;
  minimumPrijs: number;
  gewensteKloklocatie: string; // bijv. "Aalsmeer"
  veildatum: string; // "2025-12-03"
}
