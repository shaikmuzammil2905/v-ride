import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Navigation, MapPin, Plus, Minus, Crosshair } from 'lucide-react';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || '';

export const MapComponent = ({
  pickupCoords = [17.4948, 78.3578], // [lat, lng] Miyapur
  dropCoords = [17.4842, 78.3986],   // [lat, lng] Kukatpally
  pickupName = 'Miyapur, Hyderabad',
  dropName = 'Kukatpally, Hyderabad',
  vehicleType = 'bike',
  animated = true,
  interactive = false,
  onSelectLocation,
  height = '230px'
}) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const riderMarkerRef = useRef(null);
  const dropMarkerRef = useRef(null);
  const routeCoordsRef = useRef([]);

  const [routeInfo, setRouteInfo] = useState({ distanceKm: '5.4', durationMin: '12' });
  const [selectedLabel, setSelectedLabel] = useState(pickupName);
  const [mapError, setMapError] = useState(false);

  // Note: Mapbox uses [lng, lat]
  const pickupLngLat = [pickupCoords[1], pickupCoords[0]];
  const dropLngLat = [dropCoords[1], dropCoords[0]];

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (!MAPBOX_TOKEN) {
      setMapError(true);
      return;
    }

    try {
      mapboxgl.accessToken = MAPBOX_TOKEN;

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [
          (pickupLngLat[0] + dropLngLat[0]) / 2,
          (pickupLngLat[1] + dropLngLat[1]) / 2
        ],
        zoom: 12.2,
        attributionControl: false
      });

      mapRef.current = map;

      // Custom Pickup Marker (Green)
      const pickupEl = document.createElement('div');
      pickupEl.className = 'w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-md';
      new mapboxgl.Marker(pickupEl)
        .setLngLat(pickupLngLat)
        .setPopup(new mapboxgl.Popup({ offset: 12 }).setText(`Pickup: ${pickupName}`))
        .addTo(map);

      // Custom Drop Marker (Red/Orange)
      const dropEl = document.createElement('div');
      dropEl.className = 'w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow-md';
      dropMarkerRef.current = new mapboxgl.Marker(dropEl)
        .setLngLat(dropLngLat)
        .setPopup(new mapboxgl.Popup({ offset: 12 }).setText(`Drop: ${dropName}`))
        .addTo(map);

      // Animated Rider Marker
      const riderEl = document.createElement('div');
      riderEl.className = 'w-8 h-8 rounded-full bg-[#FFD600] border-2 border-black flex items-center justify-center shadow-lg text-sm';
      riderEl.innerHTML = vehicleType === 'bike' ? '🛵' : vehicleType === 'auto' ? '🛺' : '🚗';
      riderMarkerRef.current = new mapboxgl.Marker(riderEl)
        .setLngLat(pickupLngLat)
        .addTo(map);

      map.on('load', async () => {
        // Fetch real road route via Mapbox Directions API
        try {
          const dirUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupLngLat[0]},${pickupLngLat[1]};${dropLngLat[0]},${dropLngLat[1]}?geometries=geojson&overview=full&access_token=${MAPBOX_TOKEN}`;
          const res = await fetch(dirUrl);
          const data = await res.json();
          const route = data?.routes?.[0];
          const coords = route?.geometry?.coordinates || [pickupLngLat, dropLngLat];
          routeCoordsRef.current = coords;

          if (route) {
            setRouteInfo({
              distanceKm: (route.distance / 1000).toFixed(1),
              durationMin: Math.max(1, Math.round(route.duration / 60)).toString()
            });
          }

          map.addSource('vride-route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: coords
              }
            }
          });

          map.addLayer({
            id: 'vride-route-line',
            type: 'line',
            source: 'vride-route',
            layout: { 'line-join': 'round', 'line-cap': 'round' },
            paint: {
              'line-color': '#111111',
              'line-width': 4.5,
              'line-opacity': 0.9
            }
          });

          // Fit bounds to route
          const bounds = new mapboxgl.LngLatBounds(pickupLngLat, pickupLngLat);
          coords.forEach((c) => bounds.extend(c));
          map.fitBounds(bounds, { padding: 42, maxZoom: 14, duration: 500 });
        } catch (err) {
          routeCoordsRef.current = [pickupLngLat, dropLngLat];
        }
      });

      // Interactive Map Picker click handler with Mapbox Reverse Geocoding
      if (interactive) {
        map.on('click', async (e) => {
          const { lng, lat } = e.lngLat;
          if (dropMarkerRef.current) {
            dropMarkerRef.current.setLngLat([lng, lat]);
          }
          try {
            const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}&limit=1`;
            const res = await fetch(geoUrl);
            const data = await res.json();
            const placeName = data?.features?.[0]?.place_name || `${lat.toFixed(4)}, ${lng.toFixed(4)} (Hyderabad)`;
            setSelectedLabel(placeName);
            onSelectLocation?.(placeName, [lat, lng]);
          } catch {
            const fallback = `${lat.toFixed(4)}, ${lng.toFixed(4)}, Hyderabad`;
            setSelectedLabel(fallback);
            onSelectLocation?.(fallback, [lat, lng]);
          }
        });
      }

      map.on('error', () => setMapError(true));

      return () => {
        map.remove();
      };
    } catch (err) {
      setMapError(true);
    }
  }, [pickupCoords[0], pickupCoords[1], dropCoords[0], dropCoords[1], vehicleType, interactive]);

  // Animate rider along fetched route coordinates
  useEffect(() => {
    if (!animated) return;
    let step = 0;
    const interval = setInterval(() => {
      const coords = routeCoordsRef.current;
      if (coords && coords.length > 1 && riderMarkerRef.current) {
        step = (step + 1) % coords.length;
        riderMarkerRef.current.setLngLat(coords[step]);
      }
    }, 350);
    return () => clearInterval(interval);
  }, [animated]);

  const handleZoomIn = () => mapRef.current?.zoomIn();
  const handleZoomOut = () => mapRef.current?.zoomOut();
  const handleRecenter = () => {
    mapRef.current?.flyTo({
      center: [(pickupLngLat[0] + dropLngLat[0]) / 2, (pickupLngLat[1] + dropLngLat[1]) / 2],
      zoom: 12.5
    });
  };

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden bg-[#e8f1f5] border border-gray-200 shadow-inner select-none"
      style={{ height }}
    >
      {/* Real Mapbox GL Container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-xs font-bold text-gray-500 p-4 text-center">
          Mapbox Live Map (Hyderabad Corridor)
        </div>
      )}

      {/* Floating GPS details badge */}
      <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm border border-gray-100 flex items-center gap-1.5 text-[11px] font-bold text-gray-800 z-20 pointer-events-none">
        <Navigation className="w-3 h-3 text-blue-500 fill-blue-500" />
        <span>Mapbox Route · {routeInfo.distanceKm} km ({routeInfo.durationMin} min)</span>
      </div>

      {/* Location tag on map */}
      <div className="absolute bottom-2.5 left-2.5 bg-black/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[10px] font-medium flex items-center gap-1.5 z-20 pointer-events-none max-w-[200px]">
        <MapPin className="w-3 h-3 text-[#FFD600] shrink-0" />
        <span className="truncate">{interactive ? `Tap map: ${selectedLabel}` : selectedLabel}</span>
      </div>

      {/* Interactive Mobile Map Controls (Zoom +, Zoom -, Recenter) */}
      <div className="absolute bottom-2.5 right-2.5 flex flex-col gap-1.5 z-20">
        <button
          type="button"
          onClick={handleRecenter}
          className="w-7 h-7 rounded-lg bg-white/95 shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-100 active:scale-90 transition"
          title="Recenter GPS"
        >
          <Crosshair className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={handleZoomIn}
          className="w-7 h-7 rounded-lg bg-white/95 shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-100 active:scale-90 transition font-black text-xs"
          title="Zoom In"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          className="w-7 h-7 rounded-lg bg-white/95 shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-100 active:scale-90 transition font-black text-xs"
          title="Zoom Out"
        >
          <Minus className="w-3.5 h-3.5 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};

export default MapComponent;
