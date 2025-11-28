// src/api/veilingApi.ts
import apiClient from "./apiClient";

export type Veiling = {
  auctionId: number;
  fotoUrl: string;
  productName: string;
  description: string;
  currentPrice: number;
  minimumPrijs: number;
};

const API_BASE_URL = "https://localhost:7239";

export async function getActiveVeilingen(): Promise<Veiling[]> {
  const res = await apiClient.get("/Auction/active");

  // verwacht backend shape:
  // { id, productId, naam, soort, fotoUrl, minimumPrijs, currentPrice, kloklocatie }

  return res.data.map((a: any) => ({
    auctionId: a.id,
    fotoUrl: `${API_BASE_URL}${a.fotoUrl}`,
    productName: a.naam,
    description: a.soort,
    currentPrice: a.currentPrice,
    minimumPrijs: a.minimumPrijs
  }));
}
