"use client";

import { useMemo, useState } from "react";
import { Table2, BarChart3 } from "lucide-react";

import { DailyOrdersPoint } from "../types/analytics.types";

interface Props {
  data: DailyOrdersPoint[];
}

const BAR_COLOR = "#db2777"; // brand pink-600, matches rest of admin UI
const WIDTH = 720;
const HEIGHT = 220;
const PADDING_LEFT = 36;
const PADDING_BOTTOM = 24;
const PADDING_TOP = 12;

export default function DailyOrdersChart({ data }: Props) {
  const [view, setView] = useState<"chart" | "table">("chart");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const maxCount = useMemo(() => Math.max(1, ...data.map((d) => d.count)), [data]);

  const plotWidth = WIDTH - PADDING_LEFT;
  const plotHeight = HEIGHT - PADDING_TOP - PADDING_BOTTOM;
  const barGap = 2;
  const barWidth = data.length > 0 ? plotWidth / data.length - barGap : 0;

  const labelEvery = Math.ceil(data.length / 6);

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Orders (last {data.length} days)</h2>

        <button
          onClick={() => setView(view === "chart" ? "table" : "chart")}
          className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
        >
          {view === "chart" ? <Table2 size={14} /> : <BarChart3 size={14} />}
          {view === "chart" ? "Table view" : "Chart view"}
        </button>
      </div>

      {data.every((d) => d.count === 0) ? (
        <p className="py-10 text-center text-sm text-gray-400">No orders in this period yet.</p>
      ) : view === "table" ? (
        <div className="max-h-72 overflow-y-auto">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-white text-gray-500">
              <tr>
                <th className="py-2 pr-4 font-medium">Date</th>
                <th className="py-2 pr-4 font-medium">Orders</th>
                <th className="py-2 font-medium">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.map((point) => (
                <tr key={point.date}>
                  <td className="py-2 pr-4">
                    {new Date(point.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </td>
                  <td className="py-2 pr-4">{point.count}</td>
                  <td className="py-2">₹{point.revenue.toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="relative">
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="w-full"
            role="img"
            aria-label="Daily order count over time"
          >
            {[0, 0.5, 1].map((fraction) => {
              const y = PADDING_TOP + plotHeight * (1 - fraction);
              return (
                <g key={fraction}>
                  <line
                    x1={PADDING_LEFT}
                    x2={WIDTH}
                    y1={y}
                    y2={y}
                    stroke="#e5e7eb"
                    strokeWidth={1}
                  />
                  <text x={0} y={y + 4} fontSize={10} fill="#9ca3af">
                    {Math.round(maxCount * fraction)}
                  </text>
                </g>
              );
            })}

            {data.map((point, i) => {
              const barHeight = (point.count / maxCount) * plotHeight;
              const x = PADDING_LEFT + i * (barWidth + barGap);
              const y = PADDING_TOP + plotHeight - barHeight;
              const showLabel = i % labelEvery === 0;

              return (
                <g key={point.date}>
                  <rect
                    x={x}
                    y={y}
                    width={Math.max(barWidth, 1)}
                    height={Math.max(barHeight, point.count > 0 ? 3 : 0)}
                    rx={2}
                    fill={BAR_COLOR}
                    opacity={hoverIndex === null || hoverIndex === i ? 1 : 0.45}
                    onMouseEnter={() => setHoverIndex(i)}
                    onMouseLeave={() => setHoverIndex(null)}
                  />
                  {showLabel && (
                    <text
                      x={x + barWidth / 2}
                      y={HEIGHT - 6}
                      fontSize={10}
                      fill="#9ca3af"
                      textAnchor="middle"
                    >
                      {new Date(point.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {hoverIndex !== null && data[hoverIndex] && (
            <div className="pointer-events-none absolute left-0 top-0 rounded-lg border bg-white px-3 py-2 text-xs shadow-md">
              <p className="font-medium">
                {new Date(data[hoverIndex].date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <p className="text-gray-500">{data[hoverIndex].count} order(s)</p>
              <p className="text-gray-500">
                ₹{data[hoverIndex].revenue.toLocaleString("en-IN")}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
