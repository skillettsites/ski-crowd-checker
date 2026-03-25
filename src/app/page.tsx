"use client";

import { useState, useMemo } from "react";
import {
  holidays,
  countries,
  resorts,
  generateWeeks,
  getWeekCrowdScore,
  holidayOverlapsWeek,
  type Week,
} from "@/data/holidays";

function CrowdBadge({ week }: { week: Week }) {
  const { count, total, label, color } = getWeekCrowdScore(week);
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
        style={{ backgroundColor: color, color: count > 3 ? "#fff" : "#0f172a" }}
      >
        {count}
      </div>
      <span className="text-[10px] text-slate-400 leading-tight text-center hidden sm:block">
        {label}
      </span>
    </div>
  );
}

function WeekHeader({ week }: { week: Week }) {
  return (
    <div className="text-center min-w-[64px]">
      <div className="text-[11px] text-slate-400">{week.label}</div>
    </div>
  );
}

export default function Home() {
  const [selectedCountries, setSelectedCountries] = useState<Set<string>>(
    new Set(countries.map((c) => c.name))
  );
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);

  const weeks = useMemo(() => generateWeeks(), []);

  const toggleCountry = (name: string) => {
    setSelectedCountries((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  // Group holidays by country+region for timeline rows
  const rows = useMemo(() => {
    const grouped: {
      key: string;
      country: string;
      region?: string;
      flag: string;
      color: string;
    }[] = [];

    const seen = new Set<string>();
    for (const h of holidays) {
      const key = h.region ? `${h.country} (${h.region})` : h.country;
      if (!seen.has(key) && selectedCountries.has(h.country)) {
        seen.add(key);
        const c = countries.find((c) => c.name === h.country);
        grouped.push({
          key,
          country: h.country,
          region: h.region,
          flag: c?.flag || "",
          color: h.color,
        });
      }
    }
    return grouped;
  }, [selectedCountries]);

  // Find the best weeks
  const bestWeeks = useMemo(() => {
    return weeks
      .map((w, i) => ({ week: w, index: i, ...getWeekCrowdScore(w) }))
      .filter((w) => {
        // Only include weeks in actual ski season (Dec - mid April)
        const month = w.week.start.getMonth();
        return month >= 11 || month <= 3;
      })
      .sort((a, b) => a.count - b.count)
      .slice(0, 3);
  }, [weeks]);

  return (
    <main className="min-h-screen bg-[#0f172a]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-700/50">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/30 via-transparent to-purple-900/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-12 sm:py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-sm mb-4 border border-sky-500/20">
              <span>&#9978;</span> 2025/2026 Ski Season
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
              Ski Crowd Checker
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
              Find the quietest weeks to ski in the Alps. See when European
              school holidays overlap so you can avoid the crowds.
            </p>
          </div>

          {/* Best weeks highlight */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {bestWeeks.map((w, i) => (
              <div
                key={i}
                className="bg-slate-800/60 backdrop-blur border border-slate-700/50 rounded-xl p-4 text-center"
              >
                <div className="text-xs text-emerald-400 font-medium mb-1 uppercase tracking-wider">
                  {i === 0 ? "Quietest week" : `#${i + 1} Quietest`}
                </div>
                <div className="text-lg font-semibold">{w.week.label}</div>
                <div className="text-sm text-slate-400 mt-1">
                  {w.count} of {w.total} countries on holiday
                </div>
                <div
                  className="inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: w.color + "22",
                    color: w.color,
                  }}
                >
                  {w.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Country filter */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-slate-400 mr-2">Filter countries:</span>
          {countries.map((c) => (
            <button
              key={c.name}
              onClick={() => toggleCountry(c.name)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selectedCountries.has(c.name)
                  ? "bg-slate-700 text-white"
                  : "bg-slate-800/50 text-slate-500"
              }`}
              style={{
                borderLeft: selectedCountries.has(c.name)
                  ? `3px solid ${c.color}`
                  : "3px solid transparent",
              }}
            >
              <span>{c.flag}</span>
              {c.name}
            </button>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              {/* Month headers */}
              <div className="flex border-b border-slate-700/50">
                <div className="w-44 shrink-0 px-4 py-3 text-sm font-medium text-slate-400">
                  Country / Region
                </div>
                <div className="flex-1 flex">
                  {(() => {
                    const months: { name: string; count: number }[] = [];
                    let current = "";
                    let count = 0;
                    for (const w of weeks) {
                      const monthNames = [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                      ];
                      const m = monthNames[w.start.getMonth()];
                      if (m !== current) {
                        if (current) months.push({ name: current, count });
                        current = m;
                        count = 1;
                      } else {
                        count++;
                      }
                    }
                    if (current) months.push({ name: current, count });

                    return months.map((m) => (
                      <div
                        key={m.name}
                        className="text-center py-3 text-sm font-semibold text-slate-300 border-l border-slate-700/30 first:border-l-0"
                        style={{ flex: m.count }}
                      >
                        {m.name}
                      </div>
                    ));
                  })()}
                </div>
              </div>

              {/* Crowd score row */}
              <div className="flex border-b border-slate-700/50 bg-slate-800/60">
                <div className="w-44 shrink-0 px-4 py-2 flex items-center">
                  <span className="text-sm font-medium text-slate-300">
                    Crowd Level
                  </span>
                </div>
                <div className="flex-1 flex">
                  {weeks.map((w, i) => (
                    <div
                      key={i}
                      className="flex-1 flex justify-center py-2 cursor-pointer transition-colors hover:bg-slate-700/30"
                      onMouseEnter={() => setHoveredWeek(i)}
                      onMouseLeave={() => setHoveredWeek(null)}
                    >
                      <CrowdBadge week={w} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Week date headers */}
              <div className="flex border-b border-slate-700/50">
                <div className="w-44 shrink-0" />
                <div className="flex-1 flex">
                  {weeks.map((w, i) => (
                    <div
                      key={i}
                      className={`flex-1 py-1.5 transition-colors ${
                        hoveredWeek === i ? "bg-slate-700/30" : ""
                      }`}
                    >
                      <WeekHeader week={w} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Holiday rows */}
              {rows.map((row) => {
                const rowHolidays = holidays.filter(
                  (h) =>
                    h.country === row.country &&
                    (h.region || undefined) === row.region
                );

                return (
                  <div
                    key={row.key}
                    className="flex border-b border-slate-700/30 last:border-b-0 hover:bg-slate-800/30 transition-colors"
                  >
                    <div className="w-44 shrink-0 px-4 py-3 flex items-center gap-2">
                      <span className="text-base">{row.flag}</span>
                      <div>
                        <div className="text-sm font-medium text-slate-200">
                          {row.country}
                        </div>
                        {row.region && (
                          <div className="text-[11px] text-slate-500">
                            {row.region}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 flex">
                      {weeks.map((w, i) => {
                        const activeHoliday = rowHolidays.find((h) =>
                          holidayOverlapsWeek(h, w)
                        );
                        return (
                          <div
                            key={i}
                            className={`flex-1 py-2 px-0.5 flex items-center justify-center transition-colors ${
                              hoveredWeek === i ? "bg-slate-700/20" : ""
                            }`}
                            onMouseEnter={() => setHoveredWeek(i)}
                            onMouseLeave={() => setHoveredWeek(null)}
                          >
                            {activeHoliday ? (
                              <div
                                className="w-full h-7 rounded-sm flex items-center justify-center"
                                style={{
                                  backgroundColor: activeHoliday.color + "33",
                                  borderLeft: `2px solid ${activeHoliday.color}`,
                                }}
                                title={`${row.key}: ${activeHoliday.name} (${activeHoliday.start} to ${activeHoliday.end})`}
                              >
                                <span
                                  className="text-[9px] font-medium truncate px-1 hidden lg:block"
                                  style={{ color: activeHoliday.color }}
                                >
                                  {activeHoliday.name}
                                </span>
                              </div>
                            ) : (
                              <div className="w-full h-7" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Popular resorts */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <h2 className="text-xl font-semibold mb-4">Popular Alpine Resorts</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {resorts.map((r) => (
            <div
              key={r.name}
              className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-4 hover:border-slate-600 transition-colors"
            >
              <div className="text-lg mb-1">{r.flag}</div>
              <div className="font-medium text-sm">{r.name}</div>
              <div className="text-xs text-slate-500">{r.country}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Legend */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">
            How to read the crowd score
          </h3>
          <div className="flex flex-wrap gap-4 text-sm">
            {[
              { color: "#4ade80", label: "0 countries: Empty slopes" },
              { color: "#86efac", label: "1 country: Very quiet" },
              { color: "#bef264", label: "2 countries: Quiet" },
              { color: "#fbbf24", label: "3 countries: Moderate" },
              { color: "#fb923c", label: "4 countries: Busy" },
              { color: "#f87171", label: "5+ countries: Very busy" },
              { color: "#ef4444", label: "6+ countries: Peak season" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-400">{item.label}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4">
            The crowd score shows how many European countries have school holidays
            in each week. More countries on holiday means busier slopes, longer
            lift queues, and higher prices. Dates are approximate and may vary by
            region.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-8 text-center text-sm text-slate-500">
        <p>
          Ski Crowd Checker &middot; 2025/2026 Season &middot; Data sourced from
          official school holiday calendars
        </p>
        <p className="mt-1 text-slate-600">
          Holiday dates are approximate. Always verify with official sources
          before booking.
        </p>
      </footer>
    </main>
  );
}
