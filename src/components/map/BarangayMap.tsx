import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import 'leaflet/dist/leaflet.css';
import type {
  Map as LeafletMap,
  LatLngBoundsExpression,
  Layer,
  PathOptions,
} from 'leaflet';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import type { Feature, FeatureCollection, Geometry, Position } from 'geojson';
import { Search, MapPin, Users } from 'lucide-react';
// Barangay boundary polygons: NAMRIA administrative-boundary shapefiles
// enriched with PSA PSGC codes, from the "barangay-boundaries-repository"
// hierarchical release (snapshot 2023-10-24, v2026.4.13.0), filtered to
// Puerto Princesa City (ADM3_PCODE PH1705316), 66 features:
// https://github.com/bendlikeabamboo/barangay-boundaries-repository
import barangayBoundaries from '../../data/geo/puerto-princesa-barangays.json';
import { barangayPopulation2024 } from '../../data/barangayPopulation';
import { normalizeBarangayName } from '../../lib/barangayNames';

const numberFormat = new Intl.NumberFormat('en-US');

interface BarangayProperties {
  name: string;
  pcode: string;
}

const boundaries = barangayBoundaries as FeatureCollection<
  Geometry,
  BarangayProperties
>;

const DEFAULT_STYLE: PathOptions = {
  color: '#0052bc',
  weight: 1,
  fillColor: '#66a3f3',
  fillOpacity: 0.35,
};

const HOVER_STYLE: PathOptions = {
  ...DEFAULT_STYLE,
  weight: 2,
  fillOpacity: 0.6,
};

const SELECTED_STYLE: PathOptions = {
  color: '#003d8d',
  weight: 2.5,
  fillColor: '#0066eb',
  fillOpacity: 0.75,
};

// Recursively walks GeoJSON coordinate arrays (Polygon or MultiPolygon,
// any nesting depth) to compute a Leaflet bounds box.
function extendBoundsFromCoordinates(
  coords: Position | Position[] | Position[][] | Position[][][],
  bounds: { minLat: number; minLng: number; maxLat: number; maxLng: number }
) {
  if (typeof coords[0] === 'number') {
    const [lng, lat] = coords as Position;
    bounds.minLat = Math.min(bounds.minLat, lat);
    bounds.maxLat = Math.max(bounds.maxLat, lat);
    bounds.minLng = Math.min(bounds.minLng, lng);
    bounds.maxLng = Math.max(bounds.maxLng, lng);
  } else {
    (coords as unknown[]).forEach(c =>
      extendBoundsFromCoordinates(c as Position[], bounds)
    );
  }
}

function getFeatureBounds(
  feature: Feature<Geometry, BarangayProperties>
): LatLngBoundsExpression {
  const bounds = {
    minLat: Infinity,
    minLng: Infinity,
    maxLat: -Infinity,
    maxLng: -Infinity,
  };
  extendBoundsFromCoordinates(
    // @ts-expect-error -- geometry.coordinates shape varies by type, walked generically
    feature.geometry.coordinates,
    bounds
  );
  return [
    [bounds.minLat, bounds.minLng],
    [bounds.maxLat, bounds.maxLng],
  ];
}

const CITY_BOUNDS = (() => {
  const bounds = {
    minLat: Infinity,
    minLng: Infinity,
    maxLat: -Infinity,
    maxLng: -Infinity,
  };
  boundaries.features.forEach(f =>
    // @ts-expect-error -- geometry.coordinates shape varies by type, walked generically
    extendBoundsFromCoordinates(f.geometry.coordinates, bounds)
  );
  return [
    [bounds.minLat, bounds.minLng],
    [bounds.maxLat, bounds.maxLng],
  ] as LatLngBoundsExpression;
})();

function MapReadyBridge({ onReady }: { onReady: (map: LeafletMap) => void }) {
  const map = useMap();
  useEffect(() => {
    onReady(map);
  }, [map, onReady]);
  return null;
}

interface BarangayMapProps {
  // Externally-driven highlight (e.g. hovering a barangay in a list
  // elsewhere on the page), distinct from the internal click-to-select state.
  highlightedName?: string | null;
}

export interface BarangayMapHandle {
  // Selects and zooms to a barangay by name, e.g. from a list elsewhere on
  // the page — mirrors clicking the region directly on the map.
  focusByName: (name: string) => void;
}

const BarangayMap = forwardRef<BarangayMapHandle, BarangayMapProps>(
  function BarangayMap({ highlightedName = null }, ref) {
    const { t } = useTranslation('common');
    const [selected, setSelected] = useState<string | null>(null);
    const [query, setQuery] = useState('');
    const selectedRef = useRef<string | null>(null);
    const mapRef = useRef<LeafletMap | null>(null);

    useEffect(() => {
      selectedRef.current = selected;
    }, [selected]);

    const matches = useMemo(() => {
      const q = query.trim().toLowerCase();
      if (!q) return [];
      return boundaries.features
        .filter(f => f.properties.name.toLowerCase().includes(q))
        .slice(0, 8);
    }, [query]);

    const activeName = highlightedName
      ? (boundaries.features.find(
          f =>
            normalizeBarangayName(f.properties.name) ===
            normalizeBarangayName(highlightedName)
        )?.properties.name ?? highlightedName)
      : selected;
    const activePopulation = activeName
      ? barangayPopulation2024[normalizeBarangayName(activeName)]
      : undefined;

    function focusBarangay(feature: Feature<Geometry, BarangayProperties>) {
      setSelected(feature.properties.name);
      setQuery('');
      mapRef.current?.fitBounds(getFeatureBounds(feature), {
        maxZoom: 14,
        padding: [24, 24],
      });
    }

    useImperativeHandle(ref, () => ({
      focusByName(name: string) {
        const feature = boundaries.features.find(
          f =>
            normalizeBarangayName(f.properties.name) ===
            normalizeBarangayName(name)
        );
        if (feature) focusBarangay(feature);
      },
    }));

    return (
      <div>
        <div className="relative mb-3 flex justify-end">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t('statistics.searchBarangayPlaceholder')}
              className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {matches.length > 0 && (
              <ul className="absolute z-[1000] mt-1 max-h-56 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
                {matches.map(f => (
                  <li key={f.properties.pcode}>
                    <button
                      type="button"
                      onClick={() => focusBarangay(f)}
                      className="block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-primary-50"
                    >
                      {f.properties.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="relative z-0">
          <MapContainer
            bounds={CITY_BOUNDS}
            scrollWheelZoom={false}
            className="h-96 w-full rounded-md lg:h-[28rem]"
          >
            <MapReadyBridge onReady={map => (mapRef.current = map)} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            <GeoJSON
              data={boundaries}
              style={feature => {
                const name = feature?.properties.name ?? '';
                if (
                  highlightedName &&
                  normalizeBarangayName(name) ===
                    normalizeBarangayName(highlightedName)
                ) {
                  return HOVER_STYLE;
                }
                return name === selected ? SELECTED_STYLE : DEFAULT_STYLE;
              }}
              onEachFeature={(
                feature: Feature<Geometry, BarangayProperties>,
                layer: Layer
              ) => {
                const population =
                  barangayPopulation2024[
                    normalizeBarangayName(feature.properties.name)
                  ];
                layer.bindTooltip(
                  population
                    ? `${feature.properties.name} · Pop. ${numberFormat.format(population)}`
                    : feature.properties.name,
                  { sticky: true }
                );
                layer.on({
                  mouseover: e => {
                    if (feature.properties.name !== selectedRef.current) {
                      e.target.setStyle(HOVER_STYLE);
                    }
                  },
                  mouseout: e => {
                    e.target.setStyle(
                      feature.properties.name === selectedRef.current
                        ? SELECTED_STYLE
                        : DEFAULT_STYLE
                    );
                  },
                  click: () => focusBarangay(feature),
                });
              }}
            />
          </MapContainer>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-md border border-primary-100 bg-primary-50 px-4 py-3 text-sm text-gray-700">
          <MapPin className="h-4 w-4 shrink-0 text-primary-600" />
          {activeName ? (
            <span className="flex flex-wrap items-center gap-x-2">
              <span>
                {t('statistics.selectedBarangay')} <strong>{activeName}</strong>
              </span>
              {activePopulation != null && (
                <span className="inline-flex items-center gap-1 text-gray-500">
                  <Users className="h-3.5 w-3.5" />
                  {t('statistics.barangayPopulation', {
                    population: numberFormat.format(activePopulation),
                  })}
                </span>
              )}
            </span>
          ) : (
            <span>{t('statistics.mapHint')}</span>
          )}
        </div>

        <p className="mt-2 text-xs text-gray-400">
          {t('statistics.mapSourcesLabel')}:{' '}
          <a
            href="https://github.com/bendlikeabamboo/barangay-boundaries-repository"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary-600"
          >
            {t('statistics.mapSourceBoundaries')}
          </a>
          {', '}
          <a
            href="https://psa.gov.ph/classification/psgc/barangays/1731500000"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary-600"
          >
            {t('statistics.mapSourcePopulation')}
          </a>
        </p>
      </div>
    );
  }
);

export default BarangayMap;
