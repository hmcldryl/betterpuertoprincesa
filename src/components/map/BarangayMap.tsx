import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  Popup,
  type ExpressionSpecification,
  type LngLatBoundsLike,
  type Map as MapLibreMap,
  type MapLayerMouseEvent,
} from 'maplibre-gl';
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
import { createMap, withOverlays } from '../../lib/mapStyle';

const numberFormat = new Intl.NumberFormat('en-US');

interface BarangayProperties {
  name: string;
  pcode: string;
}

const boundaries = barangayBoundaries as FeatureCollection<
  Geometry,
  BarangayProperties
>;

// Feature-state driven styling. Priority:
// an external highlight (hovering the list) wins over the selection, which
// wins over a plain mouse hover.
const isOn = (key: string): ExpressionSpecification => [
  'boolean',
  ['feature-state', key],
  false,
];

const MAP_STYLE = withOverlays(
  {
    barangays: { type: 'geojson', data: boundaries, promoteId: 'pcode' },
  },
  [
    {
      id: 'barangay-fill',
      type: 'fill',
      source: 'barangays',
      paint: {
        'fill-color': [
          'case',
          isOn('highlighted'),
          '#66a3f3',
          isOn('selected'),
          '#0066eb',
          '#66a3f3',
        ],
        'fill-opacity': [
          'case',
          isOn('highlighted'),
          0.6,
          isOn('selected'),
          0.75,
          isOn('hover'),
          0.6,
          0.35,
        ],
      },
    },
    {
      id: 'barangay-line',
      type: 'line',
      source: 'barangays',
      paint: {
        'line-color': [
          'case',
          isOn('highlighted'),
          '#0052bc',
          isOn('selected'),
          '#003d8d',
          '#0052bc',
        ],
        'line-width': [
          'case',
          isOn('highlighted'),
          2,
          isOn('selected'),
          2.5,
          isOn('hover'),
          2,
          1,
        ],
      },
    },
  ]
);

// Recursively walks GeoJSON coordinate arrays (Polygon or MultiPolygon,
// any nesting depth) to compute a bounds box.
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
): LngLatBoundsLike {
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
    [bounds.minLng, bounds.minLat],
    [bounds.maxLng, bounds.maxLat],
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
    [bounds.minLng, bounds.minLat],
    [bounds.maxLng, bounds.maxLat],
  ] as LngLatBoundsLike;
})();

function pcodeByName(name: string | null) {
  if (!name) return undefined;
  return boundaries.features.find(
    f =>
      normalizeBarangayName(f.properties.name) === normalizeBarangayName(name)
  )?.properties.pcode;
}

// Moves a boolean feature-state flag from one barangay to another.
function moveFlag(
  map: MapLibreMap,
  key: string,
  from: string | undefined,
  to: string | undefined
) {
  if (from === to) return;
  if (from) {
    map.setFeatureState({ source: 'barangays', id: from }, { [key]: false });
  }
  if (to) {
    map.setFeatureState({ source: 'barangays', id: to }, { [key]: true });
  }
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
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<MapLibreMap | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);

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
        maxZoom: 13,
        padding: 24,
      });
    }
    // Map event handlers are bound once; route clicks through a ref so they
    // always call the latest focusBarangay.
    const focusRef = useRef(focusBarangay);
    focusRef.current = focusBarangay;

    useEffect(() => {
      if (!containerRef.current) return;
      const map = createMap({
        container: containerRef.current,
        style: MAP_STYLE,
        bounds: CITY_BOUNDS,
      });
      mapRef.current = map;
      map.on('load', () => setMapLoaded(true));

      const tooltip = new Popup({
        closeButton: false,
        closeOnClick: false,
        className: 'map-tooltip',
        offset: 12,
      });
      let hoveredId: string | undefined;

      map.on('mousemove', 'barangay-fill', (e: MapLayerMouseEvent) => {
        const feature = e.features?.[0];
        if (!feature) return;
        const id = feature.id as string;
        moveFlag(map, 'hover', hoveredId, id);
        hoveredId = id;
        map.getCanvas().style.cursor = 'pointer';
        const name = String(feature.properties.name);
        const population = barangayPopulation2024[normalizeBarangayName(name)];
        tooltip
          .setLngLat(e.lngLat)
          .setText(
            population
              ? `${name} · Pop. ${numberFormat.format(population)}`
              : name
          )
          .addTo(map);
      });
      map.on('mouseleave', 'barangay-fill', () => {
        moveFlag(map, 'hover', hoveredId, undefined);
        hoveredId = undefined;
        map.getCanvas().style.cursor = '';
        tooltip.remove();
      });
      map.on('click', 'barangay-fill', (e: MapLayerMouseEvent) => {
        const pcode = e.features?.[0]?.id;
        const feature = boundaries.features.find(
          f => f.properties.pcode === pcode
        );
        if (feature) focusRef.current(feature);
      });

      return () => {
        tooltip.remove();
        mapRef.current = null;
        setMapLoaded(false);
        map.remove();
      };
    }, []);

    // Mirror React state into feature-state once the barangay source exists.
    const selectedId = pcodeByName(selected);
    const highlightedId = pcodeByName(highlightedName);
    const appliedRef = useRef<{ selected?: string; highlighted?: string }>({});
    useEffect(() => {
      const map = mapRef.current;
      if (!map || !mapLoaded) return;
      moveFlag(map, 'selected', appliedRef.current.selected, selectedId);
      moveFlag(
        map,
        'highlighted',
        appliedRef.current.highlighted,
        highlightedId
      );
      appliedRef.current = { selected: selectedId, highlighted: highlightedId };
    }, [mapLoaded, selectedId, highlightedId]);

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
              <ul className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
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
          <div
            ref={containerRef}
            className="h-96 w-full rounded-md lg:h-[28rem]"
          />
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
