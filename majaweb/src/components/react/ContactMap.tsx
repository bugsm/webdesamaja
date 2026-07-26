import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon paths
// @ts-expect-error Leaflet icon fix for webpack/vite bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const KANTOR_DESA: [number, number] = [-5.783, 105.58];

export default function ContactMap() {
  return (
    <div className="w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-md border border-[#D4D4AA]">
      <MapContainer
        center={KANTOR_DESA}
        zoom={16}
        className="w-full h-full"
        scrollWheelZoom={false}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={KANTOR_DESA}>
          <Popup>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              <h4
                style={{
                  fontFamily: "'Lexend', sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "#1B4332",
                  margin: "0 0 4px 0",
                }}
              >
                Kantor Desa Maja
              </h4>
              <p style={{ color: "#6B7280", fontSize: "12px", margin: 0 }}>
                Desa Maja, Kec. Kalianda
                <br />
                Kab. Lampung Selatan, Lampung
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
