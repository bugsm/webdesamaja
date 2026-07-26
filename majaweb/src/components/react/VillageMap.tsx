import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  getVillageBoundary,
  VILLAGE_CENTER,
  DEFAULT_ZOOM,
} from "../../lib/getVillageBoundary";
import {
  facilities as fallbackFacilities,
  facilityTypeLabels,
  facilityTypeColors,
  type FacilityType,
  type Facility,
} from "../../lib/facilityData";

// Fix Leaflet default icon paths for bundlers
// @ts-expect-error Leaflet icon fix for webpack/vite bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function createColoredIcon(color: string) {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: 28px;
      height: 28px;
      background: ${color};
      border: 3px solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });
}

export default function VillageMap({ facilities = fallbackFacilities }: { facilities?: Facility[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] bg-[#F0EBD8] rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#2D6A4F] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-[#6B7280] text-sm">Memuat peta...</p>
        </div>
      </div>
    );
  }

  const boundary = getVillageBoundary();

  // Group facilities by type
  const facilityGroups = facilities.reduce(
    (acc, facility) => {
      if (!acc[facility.type]) {
        acc[facility.type] = [];
      }
      acc[facility.type].push(facility);
      return acc;
    },
    {} as Record<FacilityType, typeof facilities>
  );

  return (
    <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden shadow-lg border border-[#D4D4AA]">
      <MapContainer
        center={VILLAGE_CENTER}
        zoom={DEFAULT_ZOOM}
        className="w-full h-full"
        scrollWheelZoom={true}
        zoomControl={true}
      >
        {/* Base tile layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Village boundary GeoJSON */}
        <GeoJSON
          data={boundary}
          style={{
            color: "#2D6A4F",
            weight: 3,
            opacity: 0.8,
            fillColor: "#2D6A4F",
            fillOpacity: 0.1,
            dashArray: "5, 5",
          }}
          onEachFeature={(feature, layer) => {
            if (feature.properties) {
              layer.bindPopup(`
                <div style="font-family: 'Source Sans 3', sans-serif; min-width: 180px;">
                  <h3 style="font-family: 'Lexend', sans-serif; font-weight: 700; font-size: 16px; color: #1B4332; margin: 0 0 4px 0;">
                    ${feature.properties.name}
                  </h3>
                  <p style="color: #6B7280; font-size: 13px; margin: 0;">
                    ${feature.properties.kecamatan}, ${feature.properties.kabupaten}
                  </p>
                  <p style="color: #D4A373; font-size: 11px; margin: 4px 0 0 0; font-style: italic;">
                    ⚠ Batas wilayah bersifat perkiraan (dummy data)
                  </p>
                </div>
              `);
            }
          }}
        />

        {/* Facility markers with layer control */}
        <LayersControl position="topright">
          {(Object.keys(facilityGroups) as FacilityType[]).map((type) => (
            <LayersControl.Overlay
              key={type}
              checked
              name={facilityTypeLabels[type]}
            >
              <LayerGroup>
                {facilityGroups[type].map((facility) => (
                  <Marker
                    key={facility.id}
                    position={[facility.lat, facility.lng]}
                    icon={createColoredIcon(facilityTypeColors[facility.type])}
                  >
                    <Popup>
                      <div style={{ fontFamily: "'Source Sans 3', sans-serif", minWidth: "200px", maxWidth: "280px" }}>
                        <h4
                          style={{
                            fontFamily: "'Lexend', sans-serif",
                            fontWeight: 700,
                            fontSize: "15px",
                            color: "#1B4332",
                            margin: "0 0 4px 0",
                          }}
                        >
                          {facility.name}
                        </h4>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "2px 8px",
                            borderRadius: "12px",
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "white",
                            backgroundColor: facilityTypeColors[facility.type],
                            marginBottom: "6px",
                          }}
                        >
                          {facilityTypeLabels[facility.type]}
                        </span>
                        <p style={{ color: "#4B5563", fontSize: "13px", margin: "4px 0 0 0", lineHeight: 1.5 }}>
                          {facility.description}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </LayerGroup>
            </LayersControl.Overlay>
          ))}
        </LayersControl>
      </MapContainer>
    </div>
  );
}
