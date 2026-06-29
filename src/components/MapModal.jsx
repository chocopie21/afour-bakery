import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix leaflet default marker icon issue in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconRetinaUrl: iconRetina,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

export default function MapModal({ isOpen, onClose, onConfirm }) {
  const [position, setPosition] = useState(null);
  
  // Koordinat default (misal: Monas, Jakarta Pusat)
  const defaultCenter = [-6.175392, 106.827153];

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (position) {
      onConfirm(position);
    }
  };

  return (
    <div className="map-modal-overlay">
      <div className="map-modal-content">
        <div className="map-modal-header">
          <h3 style={{ fontFamily: 'var(--font-heading)' }}>Tandai Lokasi Pengiriman</h3>
          <button onClick={onClose} className="btn-close-map"><i className="fas fa-times"></i></button>
        </div>
        <div className="map-modal-body">
          <p className="mb-4 text-secondary">Ketuk pada peta untuk menandai lokasi rumah Anda dengan akurat.</p>
          <div style={{ height: '400px', width: '100%', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <MapContainer center={defaultCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker position={position} setPosition={setPosition} />
            </MapContainer>
          </div>
          {position && (
            <div className="mt-4" style={{ fontSize: '0.85rem', color: 'var(--button-bg)' }}>
              <i className="fas fa-check-circle"></i> Koordinat: {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
            </div>
          )}
        </div>
        <div className="map-modal-footer">
          <button className="btn btn-outline" onClick={onClose} style={{ padding: '0.6rem 1.5rem' }}>Batal</button>
          <button className="btn" disabled={!position} onClick={handleConfirm} style={{ padding: '0.6rem 1.5rem' }}>
            {position ? 'Simpan Lokasi' : 'Pilih Lokasi Dulu'}
          </button>
        </div>
      </div>
    </div>
  );
}
