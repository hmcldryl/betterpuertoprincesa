import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { LatLngBoundsExpression } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { ExternalLink, Trees } from 'lucide-react';
import { miningSites } from '../../data/miningSites';

// Hansen/UMD/Google/USGS/NASA tree cover loss, 2001-2024 (the most recent
// year published — annual satellite analysis lags about a year, so
// 2025/2026 loss isn't computed anywhere yet), via Global Forest Watch's
// public tile service (no API key required): https://www.globalforestwatch.org/
// 30m-resolution satellite-derived forest loss, not specific to any single
// mining concession.
//
// Hits the "dynamic" (server-rendered) endpoint directly rather than via the
// "latest" alias, which wastes two redirects per tile. Tiles a browser
// hasn't requested before render in ~1-2s (cold), but GFW's CDN caches every
// tile after its first request, so repeat views of this same bounded area
// are fast (~0.1-0.2s) — an acceptable trade for one more year of data than
// the older pre-rendered v1.11 static tiles.
const FOREST_LOSS_TILE_URL =
  'https://tiles.globalforestwatch.org/umd_tree_cover_loss/v1.13/dynamic/{z}/{x}/{y}.png?implementation=tcd_30';

// Slightly padded past the map's own PALAWAN_BOUNDS so tiles at the edge of
// the viewport aren't clipped mid-pan.
const FOREST_LOSS_BOUNDS: LatLngBoundsExpression = [
  [7.8, 116.7],
  [10.7, 119.7],
];

const numberFormat = new Intl.NumberFormat('en-US');

function pinIcon(status: 'active' | 'historical') {
  const color = status === 'active' ? '#dc2626' : '#78716c';
  return L.divIcon({
    className: '',
    html: `<span style="display:block;width:14px;height:14px;border-radius:9999px;background:${color};border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.4);"></span>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -7],
  });
}

const PALAWAN_BOUNDS: LatLngBoundsExpression = [
  [8.3, 117.2],
  [10.2, 119.2],
];

export default function PalawanMiningMap() {
  const [showForestLoss, setShowForestLoss] = useState(false);

  return (
    <div>
      <div className="relative z-0">
        <button
          type="button"
          onClick={() => setShowForestLoss(v => !v)}
          aria-pressed={showForestLoss}
          className={`absolute right-2.5 top-2.5 z-[1000] flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-semibold shadow transition-colors ${
            showForestLoss
              ? 'border-red-700 bg-red-600 text-white'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Trees className="h-3.5 w-3.5" strokeWidth={2.5} />
          Tree cover loss
        </button>
        <MapContainer
          bounds={PALAWAN_BOUNDS}
          scrollWheelZoom={false}
          className="h-96 w-full rounded-md lg:h-[28rem]"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          {showForestLoss && (
            <TileLayer
              attribution='Tree cover loss: Hansen/UMD/Google/USGS/NASA, via <a href="https://www.globalforestwatch.org/" target="_blank" rel="noopener noreferrer">Global Forest Watch</a>'
              url={FOREST_LOSS_TILE_URL}
              bounds={FOREST_LOSS_BOUNDS}
              opacity={0.8}
              className="forest-loss-tiles"
            />
          )}
          {miningSites.map(site => (
            <Marker
              key={site.id}
              position={[site.lat, site.lng]}
              icon={pinIcon(site.status)}
            >
              <Popup>
                <div className="min-w-[220px] space-y-1">
                  <p className="font-semibold text-gray-900">{site.name}</p>
                  {site.operator && (
                    <p className="text-xs text-gray-500">
                      Operator: {site.operator}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    {site.barangay}, {site.municipality}
                  </p>
                  <p className="text-xs text-gray-500">
                    {site.commodity}
                    {site.areaHa
                      ? ` · ${numberFormat.format(site.areaHa)} ha`
                      : ''}
                    {site.tenement ? ` · ${site.tenement}` : ''}
                  </p>
                  <p className="text-xs font-medium text-gray-700">
                    {site.status === 'active'
                      ? 'Active operation'
                      : 'Historical / abandoned site'}
                  </p>
                  <p className="text-sm text-gray-700">{site.description}</p>
                  <a
                    href={site.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700"
                  >
                    {site.sourceLabel}
                    <ExternalLink className="h-3 w-3" strokeWidth={2.5} />
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full border border-white bg-red-600 shadow" />
          Active mining operation
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full border border-white bg-stone-500 shadow" />
          Historical / abandoned site
        </span>
        {showForestLoss && (
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-amber-800/80" />
            Tree cover loss, 2001–2024
          </span>
        )}
      </div>
      <p className="mt-2 text-xs text-gray-400">
        Sources: mining sites — MGB and cited news (see each pin); tree cover
        loss — Hansen/UMD/Google/USGS/NASA, 30m resolution, via{' '}
        <a
          href="https://www.globalforestwatch.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-primary-600"
        >
          Global Forest Watch
        </a>
        . The tree cover loss layer shows all detected loss in the area — not
        all of it is attributable to mining; logging, agriculture, and natural
        causes also clear tree cover.
      </p>
    </div>
  );
}
