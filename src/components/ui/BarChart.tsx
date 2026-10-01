interface BarDatum {
  label: string;
  value: number;
}

interface BarChartProps {
  data: BarDatum[];
  orientation?: 'vertical' | 'horizontal';
  formatValue: (value: number) => string;
  color?: string;
  className?: string;
  labelWidth?: number;
  columnWidth?: number;
}

const BAR_THICKNESS = 24;
const GAP = 12;
const RADIUS = 4;

export function BarChart({
  data,
  orientation = 'vertical',
  formatValue,
  color = '#0052bc',
  className = '',
  labelWidth = 170,
  columnWidth = 64,
}: BarChartProps) {
  const max = Math.max(...data.map(d => d.value), 1);

  if (orientation === 'horizontal') {
    const chartWidth = 520;
    const plotWidth = chartWidth - labelWidth;
    const rowHeight = BAR_THICKNESS + GAP;
    const height = data.length * rowHeight;

    return (
      <div className={`overflow-x-auto ${className}`}>
        <svg
          viewBox={`0 0 ${chartWidth} ${height}`}
          width={chartWidth}
          height={height}
          className="max-w-none"
          role="img"
          aria-label="Bar chart"
        >
          {data.map((d, i) => {
            const barW = Math.max((d.value / max) * plotWidth, 1);
            const y = i * rowHeight;
            return (
              <g key={d.label}>
                <title>
                  {d.label}: {formatValue(d.value)}
                </title>
                <text
                  x={labelWidth - 8}
                  y={y + BAR_THICKNESS / 2}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="fill-gray-600 text-[11px] font-medium"
                >
                  {d.label}
                </text>
                <rect
                  x={labelWidth}
                  y={y}
                  width={plotWidth}
                  height={BAR_THICKNESS}
                  className="fill-gray-100"
                  rx={RADIUS}
                />
                <rect
                  x={labelWidth}
                  y={y}
                  width={barW}
                  height={BAR_THICKNESS}
                  fill={color}
                  rx={RADIUS}
                  className="transition-opacity hover:opacity-80"
                />
                <text
                  x={labelWidth + barW + 8}
                  y={y + BAR_THICKNESS / 2}
                  dominantBaseline="middle"
                  className="fill-gray-900 text-[11px] font-semibold"
                >
                  {formatValue(d.value)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  // Vertical (column) orientation — for time series
  const chartHeight = 220;
  const labelHeight = 44;
  const plotHeight = chartHeight - labelHeight;
  const colWidth = columnWidth;
  const barThickness = Math.min(BAR_THICKNESS, colWidth - 12);
  const width = data.length * colWidth;

  return (
    <div className={`overflow-x-auto ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${chartHeight}`}
        width={width}
        height={chartHeight}
        className="max-w-none"
        role="img"
        aria-label="Column chart"
      >
        {/* baseline */}
        <line
          x1={0}
          y1={plotHeight}
          x2={width}
          y2={plotHeight}
          className="stroke-gray-200"
          strokeWidth={1}
        />
        {data.map((d, i) => {
          const barH = Math.max((d.value / max) * (plotHeight - 28), 2);
          const x = i * colWidth + (colWidth - barThickness) / 2;
          const y = plotHeight - barH;
          return (
            <g key={d.label}>
              <title>
                {d.label}: {formatValue(d.value)}
              </title>
              <text
                x={x + barThickness / 2}
                y={y - 8}
                textAnchor="middle"
                className="fill-gray-900 text-[10px] font-semibold"
              >
                {formatValue(d.value)}
              </text>
              <rect
                x={x}
                y={y}
                width={barThickness}
                height={barH}
                fill={color}
                rx={RADIUS}
                className="transition-opacity hover:opacity-80"
              />
              <text
                x={x + barThickness / 2}
                y={plotHeight + 18}
                textAnchor="middle"
                className="fill-gray-500 text-[11px] font-medium"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
