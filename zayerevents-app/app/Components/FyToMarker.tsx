import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface FlyToMarkerProps {
  position: [number, number]; // Ensure the position is a tuple of latitude and longitude
  zoomLevel?: number; // Make zoomLevel optional
}

const FlyToMarker = ({ position, zoomLevel }: FlyToMarkerProps) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      const zoom = zoomLevel ?? map.getZoom(); // Use provided zoomLevel or current map zoom
      map.flyTo(position, zoom, {
        duration: 1, // You can adjust the duration for smoother transitions if needed
      });
    }
  }, [map, position, zoomLevel]);

  return null;
};

export default FlyToMarker;
