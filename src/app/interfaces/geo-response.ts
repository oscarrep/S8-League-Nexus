export interface GeoResponse {
    results: Array<{
      geometry: {
        lat: number;
        lng: number;
      };
    }>;
  }