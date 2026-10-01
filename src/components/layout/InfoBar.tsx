import { useState, useEffect, useCallback } from 'react';
import { Landmark, Thermometer, Calendar, Clock } from 'lucide-react';

// Puerto Princesa City coordinates
const LAT = 9.7392;
const LON = 118.7353;

export default function InfoBar() {
  const [rate, setRate] = useState('1 USD = ₱ --');
  const [temp, setTemp] = useState('--°C');
  const [dateStr, setDateStr] = useState('--- --, ----');
  const [timeStr, setTimeStr] = useState('--:-- --');

  const updateClock = useCallback(() => {
    const now = new Date(
      new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })
    );
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    setDateStr(
      `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`
    );
    let h = now.getHours();
    const m = now.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    setTimeStr(`${h}:${m < 10 ? '0' + m : m} ${ampm}`);
  }, []);

  useEffect(() => {
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [updateClock]);

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(r => r.json())
      .then(data => {
        if (data?.rates?.PHP) setRate(`1 USD = ₱ ${data.rates.PHP.toFixed(2)}`);
      })
      .catch(() => {});

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true`
    )
      .then(r => r.json())
      .then(data => {
        if (data?.current_weather?.temperature != null) {
          setTemp(`${Math.round(data.current_weather.temperature)}°C`);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div
      className="bg-gray-900 text-gray-300 text-xs"
      role="complementary"
      aria-label="Real-time information"
    >
      <div className="container mx-auto px-4">
        <div
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 py-1.5"
          aria-live="polite"
          aria-atomic="false"
        >
          <div
            className="flex items-center gap-1.5"
            aria-label="Exchange rates"
          >
            <Landmark
              className="h-3.5 w-3.5"
              strokeWidth={2.5}
              aria-hidden="true"
            />
            <span>{rate}</span>
          </div>
          <span className="text-gray-600" aria-hidden="true">
            |
          </span>
          <div
            className="flex items-center gap-1.5"
            aria-label="Current weather in Puerto Princesa"
          >
            <Thermometer
              className="h-3.5 w-3.5"
              strokeWidth={2.5}
              aria-hidden="true"
            />
            <span>Puerto Princesa</span>
            <span>{temp}</span>
          </div>
          <span className="text-gray-600" aria-hidden="true">
            |
          </span>
          <div
            className="flex items-center gap-1.5"
            aria-label="Philippine Date and Time"
          >
            <Calendar
              className="h-3.5 w-3.5"
              strokeWidth={2.5}
              aria-hidden="true"
            />
            <span>{dateStr}</span>
            <span aria-hidden="true">•</span>
            <Clock
              className="h-3.5 w-3.5"
              strokeWidth={2.5}
              aria-hidden="true"
            />
            <span>{timeStr}</span>
            <span>PHT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
