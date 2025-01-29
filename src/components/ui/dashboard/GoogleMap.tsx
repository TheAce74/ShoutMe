import { useToast } from "@/hooks/useToast";
import { ENV } from "@/lib/env";
import { cn } from "@/lib/utils";
import { useMapStore } from "@/store/map";
import axios from "axios";
import { useCallback, useEffect } from "react";

type GoogleMapProps = {
  className?: string;
};

export default function GoogleMap({ className }: GoogleMapProps) {
  const { map, setMap, setLocation } = useMapStore();

  const { toast } = useToast();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMap({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
          toast({
            title: "Error!",
            description: "Error fetching location",
            variant: "destructive",
          });
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      toast({
        title: "Error!",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive",
      });
    }
  }, [toast, setMap]);

  const fetchLocation = useCallback(
    async (lat: number, lng: number, key: string) => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`
        );
        if (response.data.results.length > 0) {
          setLocation(response.data.results[0].formatted_address);
        } else {
          toast({
            title: "Error!",
            description: "No address found for this location.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Error!",
          description: "No address found for this location.",
          variant: "destructive",
        });
      }
    },
    [toast, setLocation]
  );

  useEffect(() => {
    if (map) {
      fetchLocation(map.lat, map.lng, ENV.NEXT_PUBLIC_GOOGLE_API_KEY);
    }
  }, [map, fetchLocation]);

  return (
    <div
      className={cn(
        "h-[225px] w-full min-w-[332px] lg:sticky lg:top-24 lg:h-[calc(100dvh_-_200px)]",
        className
      )}
    >
      {map ? (
        <iframe
          className="h-full w-full rounded-md border"
          src={`https://www.google.com/maps/embed/v1/view?key=${ENV.NEXT_PUBLIC_GOOGLE_API_KEY}&center=${map.lat},${map.lng}&zoom=14`}
          allowFullScreen
          loading="lazy"
          title="Google Map"
        ></iframe>
      ) : (
        <div className="h-full w-full animate-pulse rounded-md bg-neutral-300" />
      )}
    </div>
  );
}
