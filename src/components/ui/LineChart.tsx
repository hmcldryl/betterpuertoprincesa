import { useState } from 'react';

interface SeriesDatum {
  year: number;
  value: number;
}

interface Series {
  name: string;
  color: string;
  data: SeriesDatum[];
}

interface LineChartProps {
  series: Series[];
  formatValue: (value: number) => string;
  className?: string;
}

const WIDTH = 640;
const HEIGHT = 260;
const PADDING = { top: 16, right: 16, bottom: 28, left: 56 };
const Y_TICKS = 4;

export function LineChart({
  series,
  formatValue,
  className = '',
}: LineChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const years = series[0]?.data.map(d => d.year) ?? [];
  const plotWidth = WIDTH - PADDING.left - PADDING.right;
  const plotHeight = HEIGHT - PADDING.top - PADDING.bottom;
  const maxValue = Math.max(
    ...series.flatMap(s => s.data.map(d => d.value)),
    1
  );

  const xForIndex = (i: number) =>
    years.length > 1
      ? PADDING.left + (i / (years.length - 1)) * plotWidth
      : PADDING.left;
  const yForValue = (v: number) =>
    PADDING.top + plotHeight - (v / maxValue) * plotHeight;

  const bandWidth = plotWidth / Math.max(years.length - 1, 1);
  const tooltipLeft =
    hoverIndex !== null ? Math.min(xForIndex(hoverIndex) + 10, WIDTH - 140) : 0;

  return (
    <div className={className}>
      <div className="relative overflow-x-auto">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          width={WIDTH}
          height={HEIGHT}
          className="max-w-none"
          role="img"
          aria-label="Line chart"
        >
          {Array.from({ length: Y_TICKS + 1 }).map((_, i) => {
            const v = (maxValue / Y_TICKS) * i;
            const y = yForValue(v);
            return (
              <g key={i}>
                <line
                  x1={PADDING.left}
                  y1={y}
                  x2={WIDTH - PADDING.right}
                  y2={y}
                  className="stroke-gray-100"
                  strokeWidth={1}
                />
                <text
                  x={PADDING.left - 8}
                  y={y}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="fill-gray-400 text-[9px]"
                >
                  {formatValue(v)}
                </text>
              </g>
            );
          })}

          {years.map((year, i) => (
            <rect
              key={year}
              x={xForIndex(i) - bandWidth / 2}
              y={PADDING.top}
              width={bandWidth}
              height={plotHeight}
              fill="transparent"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            />
          ))}

          {hoverIndex !== null && (
            <line
              x1={xForIndex(hoverIndex)}
              y1={PADDING.top}
              x2={xForIndex(hoverIndex)}
              y2={PADDING.top + plotHeight}
              className="stroke-gray-300"
              strokeWidth={1}
            />
          )}

          {series.map(s => {
            const path = s.data
              .map(
                (d, i) =>
                  `${i === 0 ? 'M' : 'L'} ${xForIndex(i)} ${yForValue(d.value)}`
              )
              .join(' ');
            return (
              <path
                key={s.name}
                d={path}
                fill="none"
                stroke={s.color}
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            );
          })}

          {series.map(s => {
            const i = s.data.length - 1;
            const last = s.data[i];
            return (
              <circle
                key={s.name}
                cx={xForIndex(i)}
                cy={yForValue(last.value)}
                r={5}
                fill={s.color}
                stroke="white"
                strokeWidth={2}
              />
            );
          })}

          {hoverIndex !== null &&
            series.map(s => (
              <circle
                key={s.name}
                cx={xForIndex(hoverIndex)}
                cy={yForValue(s.data[hoverIndex].value)}
                r={4}
                fill={s.color}
                stroke="white"
                strokeWidth={2}
              />
            ))}

          {years.map((year, i) => (
            <text
              key={year}
              x={xForIndex(i)}
              y={HEIGHT - 8}
              textAnchor="middle"
              className="fill-gray-500 text-[10px] font-medium"
            >
              {year}
            </text>
          ))}
        </svg>

        {hoverIndex !== null && (
          <div
            className="absolute bg-white border border-gray-200 rounded-md shadow-md px-3 py-2 text-xs pointer-events-none"
            style={{ left: tooltipLeft, top: PADDING.top }}
          >
            <div className="font-semibold text-gray-900 mb-1">
              {years[hoverIndex]}
            </div>
            {series.map(s => (
              <div
                key={s.name}
                className="flex items-center gap-1.5 text-gray-600 whitespace-nowrap"
              >
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ background: s.color }}
                />
                {s.name}: {formatValue(s.data[hoverIndex].value)}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3">
        {series.map(s => (
          <div
            key={s.name}
            className="flex items-center gap-1.5 text-xs text-gray-600"
          >
            <span
              className="h-2.5 w-2.5 rounded-full shrink-0"
              style={{ background: s.color }}
            />
            {s.name}
          </div>
        ))}
      </div>
    </div>
  );
}
