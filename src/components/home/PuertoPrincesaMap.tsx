import { useEffect, useRef } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import { createMap } from '../../lib/mapStyle';

// Puerto Princesa City Hall — verified via OpenStreetMap (osm way 293426739).
const CITY_HALL: [number, number] = [118.7320236, 9.7834701];

export default function PuertoPrincesaMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    // MapLibre's 512px vector tiles make zoom 11 frame the same area as a
    // 256px raster map at zoom 12.
    const map = createMap({
      container: containerRef.current,
      center: CITY_HALL,
      zoom: 11,
    });
    return () => map.remove();
  }, []);

  return (
    <div className="relative z-0">
      <div ref={containerRef} className="h-96 lg:h-[28rem] w-full rounded-md" />
    </div>
  );
}
