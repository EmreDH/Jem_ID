import apiClient from "./apiClient";

export interface Veiling {
    auctionId: number;
    productId: number;
    productName: string;
    description: string;
    fotoUrl: string;
    hoeveelheid: number;
    minimumPrijs: number;
    currentPrice: number;
    startTimeUtc: string;
    endTimeUtc: string;
    isClosed: boolean;
}

export async function getActiveVeilingen(): Promise<Veiling[]> {
    const response = await apiClient.get("/auction/active");
    return response.data;
}
