import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';

// Puerto Princesa City Hall — verified via OpenStreetMap (osm way 293426739).
const CITY_HALL: [number, number] = [9.7834701, 118.7320236];

export default function PuertoPrincesaMap() {
  return (
    <div className="relative z-0">
      <MapContainer
        center={CITY_HALL}
        zoom={12}
        scrollWheelZoom={false}
        className="h-96 lg:h-[28rem] w-full rounded-md"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
      </MapContainer>
    </div>
  );
}
