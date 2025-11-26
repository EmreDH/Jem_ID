export interface AanvoerderItemListDTO {
  id: number;
  naam_Product: string;
  fotoUrl: string;
  soort: string;
  potmaat?: string;
  steellengte?: string;
  hoeveelheid: number;
  minimumPrijs: number;
  gewensteKloklocatie: string;
  veildatum: string; // backend stuurt een string
  aanvoerderId: number;
  aanvoerderName: string;
}
