import { create } from "zustand";

type MapState = {
  map: {
    lat: number;
    lng: number;
  } | null;
  setMap: ({ lat, lng }: { lat: number; lng: number }) => void;
  location: string;
  setLocation: (location: string) => void;
};

export const useMapStore = create<MapState>((set) => ({
  map: null,
  setMap: ({ lat, lng }) => {
    set({ map: { lat, lng } });
  },
  location: "Unknown",
  setLocation: (location) => {
    set({ location });
  },
}));
