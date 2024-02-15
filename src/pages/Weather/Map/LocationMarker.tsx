import { useMapEvents, Marker, Popup } from 'react-leaflet';
import React, { useEffect, useState } from 'react';
import L, { Layer } from 'leaflet';

import { useWeather } from '../WeatherContext';

const icon = L.icon({
  shadowUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png',
  popupAnchor: [2, -40],
  iconAnchor: [10, 41],
  iconSize: [25, 41],
});

export const LocationMarker = () => {
  const { clickMyLocation, setPosition, position } = useWeather();
  const [marker, setMarker] = useState<Layer | null>(null);

  const map = useMapEvents({
    click(e) {
      if (marker) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        map.removeLayer(marker);
      }
      const { lat, lng } = e.latlng;
      setPosition({ lat, lng });
      setMarker(L.marker([lat, lng], { icon }).addTo(map));
    },
  });

  useEffect(() => {
    if (clickMyLocation === undefined) {
      return;
    }
    if (marker) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      map.removeLayer(marker);
    }

    setMarker(L.marker([position.lat, position.lng], { icon }).addTo(map));
    map.flyTo([position.lat, position.lng], 17);
  }, [clickMyLocation]);

  return position ? (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null;
};
