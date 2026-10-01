interface PieDatum {
  label: string;
  value: number;
}

interface PieChartProps {
  data: PieDatum[];
  formatValue: (value: number) => string;
  colors?: string[];
  size?: number;
  className?: string;
}

// Validated categorical palette (fixed hue order — CVD-safe adjacent pairs).
const DEFAULT_COLORS = [
  '#2a78d6', // blue
  '#eb6834', // orange
  '#1baf7a', // aqua
  '#eda100', // yellow
  '#e87ba4', // magenta
  '#008300', // green
  '#4a3aa7', // violet
];

function textColorFor(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? '#0b0b0b' : '#ffffff';
}

export function PieChart({
  data,
  formatValue,
  colors = DEFAULT_COLORS,
  size = 220,
  className = '',
}: PieChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const radius = size / 2;
  const cx = radius;
  const cy = radius;

  let cumulativeAngle = -Math.PI / 2;

  const segments = data.map((d, i) => {
    const fraction = total > 0 ? d.value / total : 0;
    const angle = fraction * Math.PI * 2;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle = endAngle;

    const x1 = cx + radius * Math.cos(startAngle);
    const y1 = cy + radius * Math.sin(startAngle);
    const x2 = cx + radius * Math.cos(endAngle);
    const y2 = cy + radius * Math.sin(endAngle);
    const largeArc = angle > Math.PI ? 1 : 0;
    const path =
      fraction >= 1
        ? `M ${cx} ${cy - radius} A ${radius} ${radius} 0 1 1 ${cx - 0.01} ${cy - radius} Z`
        : `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    const midAngle = (startAngle + endAngle) / 2;
    const labelR = radius * 0.66;
    const color = colors[i % colors.length];

    return {
      ...d,
      path,
      color,
      percent: fraction * 100,
      lx: cx + labelR * Math.cos(midAngle),
      ly: cy + labelR * Math.sin(midAngle),
      textColor: textColorFor(color),
    };
  });

  return (
    <div
      className={`flex flex-col items-center gap-6 sm:flex-row sm:items-start ${className}`}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="shrink-0"
        role="img"
        aria-label="Pie chart"
      >
        {segments.map(s => (
          <g key={s.label}>
            <title>
              {s.label}: {formatValue(s.value)} ({s.percent.toFixed(1)}%)
            </title>
            <path
              d={s.path}
              fill={s.color}
              stroke="#fcfcfb"
              strokeWidth={2}
              className="transition-opacity hover:opacity-85"
            />
            {s.percent >= 4 && (
              <text
                x={s.lx}
                y={s.ly}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={s.textColor}
                className="pointer-events-none text-[11px] font-semibold"
              >
                {s.percent.toFixed(1)}%
              </text>
            )}
          </g>
        ))}
      </svg>
      <ul className="w-full space-y-2 text-sm">
        {segments.map(s => (
          <li key={s.label} className="flex items-center gap-2">
            <span
              className="h-3 w-3 shrink-0 rounded-sm"
              style={{ backgroundColor: s.color }}
              aria-hidden="true"
            />
            <span className="text-gray-700">{s.label}</span>
            <span className="ml-auto pl-3 font-semibold text-gray-900">
              {formatValue(s.value)}
            </span>
            <span className="w-12 shrink-0 text-right text-gray-400">
              {s.percent.toFixed(1)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
