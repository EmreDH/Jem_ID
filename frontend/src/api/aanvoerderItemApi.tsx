import apiClient from "./apiClient";

export const createAanvoerderItem = (dto: any, token: string) =>
  apiClient.post("/AanvoerderItem", dto, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getAanvoerderItems = () => apiClient.get("/AanvoerderItem");
