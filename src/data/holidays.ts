export interface Holiday {
  country: string;
  region?: string;
  name: string;
  start: string; // YYYY-MM-DD
  end: string;
  color: string;
}

export interface Resort {
  name: string;
  country: string;
  flag: string;
}

export const resorts: Resort[] = [
  { name: "Chamonix", country: "France", flag: "🇫🇷" },
  { name: "Val d'Isere", country: "France", flag: "🇫🇷" },
  { name: "Verbier", country: "Switzerland", flag: "🇨🇭" },
  { name: "Zermatt", country: "Switzerland", flag: "🇨🇭" },
  { name: "St Anton", country: "Austria", flag: "🇦🇹" },
  { name: "Val Thorens", country: "France", flag: "🇫🇷" },
  { name: "Lech", country: "Austria", flag: "🇦🇹" },
  { name: "Cortina", country: "Italy", flag: "🇮🇹" },
];

// 2025/2026 ski season school holidays
export const holidays: Holiday[] = [
  // UK
  {
    country: "UK",
    name: "Christmas",
    start: "2025-12-20",
    end: "2026-01-05",
    color: "#f87171",
  },
  {
    country: "UK",
    name: "February Half-Term",
    start: "2026-02-16",
    end: "2026-02-22",
    color: "#f87171",
  },
  {
    country: "UK",
    name: "Easter",
    start: "2026-03-30",
    end: "2026-04-13",
    color: "#f87171",
  },

  // France Zone A
  {
    country: "France",
    region: "Zone A",
    name: "Christmas",
    start: "2025-12-20",
    end: "2026-01-05",
    color: "#38bdf8",
  },
  {
    country: "France",
    region: "Zone A",
    name: "Winter",
    start: "2026-02-07",
    end: "2026-02-23",
    color: "#38bdf8",
  },
  {
    country: "France",
    region: "Zone A",
    name: "Easter",
    start: "2026-04-04",
    end: "2026-04-20",
    color: "#38bdf8",
  },

  // France Zone B
  {
    country: "France",
    region: "Zone B",
    name: "Christmas",
    start: "2025-12-20",
    end: "2026-01-05",
    color: "#7dd3fc",
  },
  {
    country: "France",
    region: "Zone B",
    name: "Winter",
    start: "2026-02-14",
    end: "2026-03-02",
    color: "#7dd3fc",
  },
  {
    country: "France",
    region: "Zone B",
    name: "Easter",
    start: "2026-04-11",
    end: "2026-04-27",
    color: "#7dd3fc",
  },

  // France Zone C
  {
    country: "France",
    region: "Zone C",
    name: "Christmas",
    start: "2025-12-20",
    end: "2026-01-05",
    color: "#bae6fd",
  },
  {
    country: "France",
    region: "Zone C",
    name: "Winter",
    start: "2026-02-21",
    end: "2026-03-09",
    color: "#bae6fd",
  },
  {
    country: "France",
    region: "Zone C",
    name: "Easter",
    start: "2026-04-18",
    end: "2026-05-04",
    color: "#bae6fd",
  },

  // Germany (Bavaria)
  {
    country: "Germany",
    region: "Bavaria",
    name: "Christmas",
    start: "2025-12-22",
    end: "2026-01-05",
    color: "#fbbf24",
  },
  {
    country: "Germany",
    region: "Bavaria",
    name: "Carnival",
    start: "2026-02-14",
    end: "2026-02-22",
    color: "#fbbf24",
  },
  {
    country: "Germany",
    region: "Bavaria",
    name: "Easter",
    start: "2026-03-28",
    end: "2026-04-11",
    color: "#fbbf24",
  },

  // Germany (NRW)
  {
    country: "Germany",
    region: "NRW",
    name: "Christmas",
    start: "2025-12-22",
    end: "2026-01-06",
    color: "#fcd34d",
  },
  {
    country: "Germany",
    region: "NRW",
    name: "Easter",
    start: "2026-03-30",
    end: "2026-04-13",
    color: "#fcd34d",
  },

  // Netherlands
  {
    country: "Netherlands",
    name: "Christmas",
    start: "2025-12-20",
    end: "2026-01-04",
    color: "#fb923c",
  },
  {
    country: "Netherlands",
    region: "North",
    name: "Spring",
    start: "2026-02-21",
    end: "2026-03-01",
    color: "#fb923c",
  },
  {
    country: "Netherlands",
    region: "South",
    name: "Carnival",
    start: "2026-02-14",
    end: "2026-02-22",
    color: "#fdba74",
  },
  {
    country: "Netherlands",
    name: "May",
    start: "2026-04-25",
    end: "2026-05-03",
    color: "#fb923c",
  },

  // Italy
  {
    country: "Italy",
    name: "Christmas",
    start: "2025-12-23",
    end: "2026-01-06",
    color: "#4ade80",
  },
  {
    country: "Italy",
    name: "Carnival",
    start: "2026-02-14",
    end: "2026-02-18",
    color: "#4ade80",
  },
  {
    country: "Italy",
    name: "Easter",
    start: "2026-04-02",
    end: "2026-04-07",
    color: "#4ade80",
  },

  // Switzerland
  {
    country: "Switzerland",
    name: "Christmas",
    start: "2025-12-20",
    end: "2026-01-04",
    color: "#c084fc",
  },
  {
    country: "Switzerland",
    region: "Zurich",
    name: "Sport",
    start: "2026-02-07",
    end: "2026-02-22",
    color: "#c084fc",
  },
  {
    country: "Switzerland",
    region: "Bern",
    name: "Sport",
    start: "2026-02-14",
    end: "2026-03-01",
    color: "#d8b4fe",
  },
  {
    country: "Switzerland",
    region: "Valais",
    name: "Carnival",
    start: "2026-02-09",
    end: "2026-02-20",
    color: "#e9d5ff",
  },
  {
    country: "Switzerland",
    name: "Easter",
    start: "2026-04-03",
    end: "2026-04-19",
    color: "#c084fc",
  },

  // Austria
  {
    country: "Austria",
    name: "Christmas",
    start: "2025-12-22",
    end: "2026-01-06",
    color: "#f472b6",
  },
  {
    country: "Austria",
    region: "Tyrol",
    name: "Semester",
    start: "2026-02-07",
    end: "2026-02-15",
    color: "#f472b6",
  },
  {
    country: "Austria",
    region: "Salzburg",
    name: "Semester",
    start: "2026-02-14",
    end: "2026-02-22",
    color: "#f9a8d4",
  },
  {
    country: "Austria",
    name: "Easter",
    start: "2026-03-28",
    end: "2026-04-07",
    color: "#f472b6",
  },
];

// Country flags and colors
export const countries = [
  { name: "UK", flag: "🇬🇧", color: "#f87171" },
  { name: "France", flag: "🇫🇷", color: "#38bdf8" },
  { name: "Germany", flag: "🇩🇪", color: "#fbbf24" },
  { name: "Netherlands", flag: "🇳🇱", color: "#fb923c" },
  { name: "Italy", flag: "🇮🇹", color: "#4ade80" },
  { name: "Switzerland", flag: "🇨🇭", color: "#c084fc" },
  { name: "Austria", flag: "🇦🇹", color: "#f472b6" },
];

// Generate weeks for the ski season (Dec 1 - Apr 30)
export interface Week {
  start: Date;
  end: Date;
  label: string;
  monthLabel?: string;
}

export function generateWeeks(): Week[] {
  const weeks: Week[] = [];
  const start = new Date(2025, 11, 1); // Dec 1, 2025
  const end = new Date(2026, 3, 30); // Apr 30, 2026

  let current = new Date(start);
  // Align to Monday
  const day = current.getDay();
  if (day !== 1) {
    current.setDate(current.getDate() - (day === 0 ? 6 : day - 1));
  }

  while (current < end) {
    const weekEnd = new Date(current);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    weeks.push({
      start: new Date(current),
      end: weekEnd,
      label: `${current.getDate()} ${monthNames[current.getMonth()]}`,
      monthLabel:
        current.getDate() <= 7
          ? monthNames[current.getMonth()]
          : undefined,
    });

    current.setDate(current.getDate() + 7);
  }

  return weeks;
}

// Calculate how many countries have holidays in a given week
export function getWeekCrowdScore(week: Week): {
  score: number;
  count: number;
  total: number;
  label: string;
  color: string;
} {
  const uniqueCountries = new Set<string>();

  for (const h of holidays) {
    const hStart = new Date(h.start);
    const hEnd = new Date(h.end);

    // Check if holiday overlaps with this week
    if (hStart <= week.end && hEnd >= week.start) {
      uniqueCountries.add(h.country);
    }
  }

  const count = uniqueCountries.size;
  const total = countries.length;
  const score = Math.round((count / total) * 100);

  let label: string;
  let color: string;

  if (count === 0) {
    label = "Empty slopes";
    color = "#4ade80";
  } else if (count <= 1) {
    label = "Very quiet";
    color = "#86efac";
  } else if (count <= 2) {
    label = "Quiet";
    color = "#bef264";
  } else if (count <= 3) {
    label = "Moderate";
    color = "#fbbf24";
  } else if (count <= 4) {
    label = "Busy";
    color = "#fb923c";
  } else if (count <= 5) {
    label = "Very busy";
    color = "#f87171";
  } else {
    label = "Peak season";
    color = "#ef4444";
  }

  return { score, count, total, label, color };
}

// Check if a holiday overlaps with a specific week
export function holidayOverlapsWeek(holiday: Holiday, week: Week): boolean {
  const hStart = new Date(holiday.start);
  const hEnd = new Date(holiday.end);
  return hStart <= week.end && hEnd >= week.start;
}
