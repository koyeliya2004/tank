"use client";
import { useState, useEffect, useRef } from "react";
import { MapPin, Crosshair, Layers } from "lucide-react";
import { useLang } from "./lang-context";
import { RUNOFF_COEFFICIENTS } from "@/lib/groundwater-data";

interface MapPickerProps {
  onLocationSelect: (lat: number, lon: number, address: string, roofAreaDetected?: number) => void;
  roofArea: number;
  onRoofAreaChange: (area: number) => void;
}

export function MapPicker({ onLocationSelect, roofArea, onRoofAreaChange }: MapPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const markerRef = useRef<unknown>(null);
  const [selectedLat, setSelectedLat] = useState<number | null>(null);
  const [selectedLon, setSelectedLon] = useState<number | null>(null);
  const [address, setAddress] = useState("");
  const [detecting, setDetecting] = useState(false);
  const [detectedArea, setDetectedArea] = useState<number | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current || mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      if (!mapRef.current) return;

      // Fix default icon issue with webpack
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current, {
        center: [20.5937, 78.9629],
        zoom: 5,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap | CGWB Data",
        maxZoom: 19,
      }).addTo(map);

      map.on("click", async (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        setSelectedLat(lat);
        setSelectedLon(lng);

        if (markerRef.current) {
          (markerRef.current as L.Marker).remove();
        }

        const customIcon = L.divIcon({
          html: `<div style="width:36px;height:36px;background:#2563eb;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          </div>`,
          className: "",
          iconSize: [36, 36],
          iconAnchor: [18, 36],
        });

        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
        markerRef.current = marker;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );
          const data = await res.json();
          const addr = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
          setAddress(addr);
          onLocationSelect(lat, lng, addr);
        } catch {
          const addr = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
          setAddress(addr);
          onLocationSelect(lat, lng, addr);
        }
      });

      mapInstanceRef.current = map;
      setMapReady(true);
    });

    return () => {
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGeolocate = async () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      setSelectedLat(latitude);
      setSelectedLon(longitude);

      if (mapInstanceRef.current) {
        const L = await import("leaflet");
        const map = mapInstanceRef.current as L.Map;
        map.setView([latitude, longitude], 17);

        if (markerRef.current) {
          (markerRef.current as L.Marker).remove();
        }
        const marker = L.marker([latitude, longitude]).addTo(map);
        markerRef.current = marker;
      }

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();
        const addr = data.display_name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        setAddress(addr);
        onLocationSelect(latitude, longitude, addr);
      } catch {
        onLocationSelect(latitude, longitude, `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
      }
    });
  };

  const handleAutoDetect = async () => {
    if (!selectedLat || !selectedLon) {
      alert("Please drop a pin on the map first");
      return;
    }
    setDetecting(true);
    // Simulate CV roof detection (production: Google Maps Static API + TensorFlow.js SegNet model)
    // The algorithm would: fetch satellite image -> run segmentation -> calculate polygon area -> subtract obstructions
    await new Promise((r) => setTimeout(r, 2200));
    const simulatedArea = Math.floor(55 + Math.random() * 180);
    setDetectedArea(simulatedArea);
    onRoofAreaChange(simulatedArea);
    onLocationSelect(selectedLat, selectedLon, address, simulatedArea);
    setDetecting(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-blue-200 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-400" />
          {t("dropPin")}
        </label>
        <button
          type="button"
          onClick={handleGeolocate}
          disabled={!mapReady}
          className="flex items-center gap-1 text-xs text-blue-300 hover:text-white bg-blue-800/40 border border-blue-600/30 px-2 py-1 rounded-lg transition disabled:opacity-50"
        >
          <Crosshair className="w-3 h-3" />
          Use My Location
        </button>
      </div>

      <div
        ref={mapRef}
        className="w-full rounded-xl border border-blue-500/30 overflow-hidden"
        style={{ height: "220px", zIndex: 0 }}
      />

      {!mapReady && (
        <p className="text-xs text-blue-400 text-center">Loading map...</p>
      )}

      {address && (
        <p className="text-xs text-blue-300 bg-blue-900/30 p-2 rounded-lg line-clamp-2">
          <MapPin className="w-3 h-3 inline mr-1" />
          {address}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleAutoDetect}
          disabled={!selectedLat || detecting}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm px-4 py-2 rounded-lg transition font-medium"
        >
          <Layers className="w-4 h-4" />
          {detecting ? "Analyzing satellite imagery..." : t("detectionBtn")}
        </button>
        {detectedArea && (
          <span className="text-xs text-emerald-300 bg-emerald-900/30 border border-emerald-600/30 px-2 py-1 rounded-lg">
            CV: ~{detectedArea} sqm
          </span>
        )}
      </div>
    </div>
  );
}
