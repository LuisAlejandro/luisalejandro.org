import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import cn from "classnames";
import React from "react";
import { Scatter } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TimelineData {
  year: number;
  text: string;
}

interface TimelineChartProps {
  data: TimelineData[];
}

const TimelineChart: React.FC<TimelineChartProps> = ({ data }) => {
  // Sort data by year to ensure proper timeline order
  const sortedData = [...data].sort((a, b) => a.year - b.year);

  // Create extended spacing for points (3x longer separation)
  const minYear = Math.min(...sortedData.map((d) => d.year));
  const maxYear = Math.max(...sortedData.map((d) => d.year));
  const yearRange = maxYear - minYear;
  const extendedRange = yearRange * 3;

  // Add padding to prevent points from being cut off
  const paddingRange = extendedRange * 0.1; // 10% padding on each side

  // Calculate the full scale range
  const scaleMin = minYear;
  const scaleMax = minYear + extendedRange + paddingRange * 2;
  const fullScaleRange = scaleMax - scaleMin;

  // Prepare chart data for vertical timeline with extended spacing
  const chartData = {
    datasets: [
      {
        label: "Timeline",
        data: sortedData.map((item, index) => ({
          x: 0, // All points on the exact same vertical line
          y:
            minYear +
            paddingRange +
            (index * extendedRange) / (sortedData.length - 1),
        })),
        backgroundColor: "#fff",
        borderColor: "#fff",
        pointBackgroundColor: "#fff",
        pointHoverBackgroundColor: "#f8d983",
        pointRadius: 12,
        pointHoverRadius: 16,
        pointHoverColor: "#f8d983",
        pointHoverBorderColor: "#fff",
        pointBorderColor: "#fff",
        pointBorderWidth: 4,
        showLine: true, // This enables the connecting line
        borderWidth: 6, // Thicker line to make it more visible
        tension: 0, // No curve, straight lines only
        fill: false,
      },
    ],
  };

  const options: ChartOptions<"scatter"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false, // Disable default tooltips since we want always visible labels
      },
    },
    scales: {
      x: {
        display: false,
        type: "linear",
        min: -1, // Small range around 0 to center the vertical line
        max: 1,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        display: false,
        type: "linear",
        reverse: true, // Invert so newest years are at top
        min: scaleMin,
        max: scaleMax,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
    elements: {
      point: {
        radius: 12,
        hoverRadius: 16,
        borderWidth: 4,
      },
      line: {
        borderWidth: 6, // Thick line to ensure visibility
        tension: 0, // Straight lines only
      },
    },
    interaction: {
      intersect: false,
      mode: "nearest",
    },
    onHover: (event, elements) => {
      if (event.native?.target) {
        (event.native.target as HTMLElement).style.cursor =
          elements.length > 0 ? "pointer" : "default";
      }
    },
  };

  return (
    <div className="w-full relative mt-8 mb-8 px-4">
      <div className="h-[800px] relative">
        {" "}
        {/* Increased height from h-96 to h-[800px] */}
        <Scatter data={chartData} options={options} />
        {/* Always visible labels - alternating left and right */}
        <div className="absolute inset-0 pointer-events-none">
          {sortedData.map((item, index) => {
            // Calculate exact position based on data point Y coordinate
            const dataPointY =
              minYear +
              paddingRange +
              (index * extendedRange) / (sortedData.length - 1);

            // Convert data coordinate to percentage position (accounting for reversed Y-axis)
            // Since Y-axis is reversed, we need to invert the calculation
            const normalizedPosition = (scaleMax - dataPointY) / fullScaleRange;
            const topPercentage = normalizedPosition * 100;

            const isLeft = index % 2 === 0; // Alternate: even indices on left, odd on right

            return (
              <div
                key={index}
                className="absolute bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-lg"
                style={{
                  [isLeft ? "right" : "left"]: "55%",
                  top: `${topPercentage}%`,
                  transform: "translateY(-50%)",
                  maxWidth: "40%",
                  minWidth: "200px",
                }}
              >
                <div
                  className={cn(
                    "font-black font-title text-xl leading-7 tracking-wide flex bg-gradient-to-br from-gray-800/80 to-gray-800/60 bg-clip-text text-transparent",
                    "lg:text-5xl lg:leading-10.5 lg:mb-2",
                    "md:mb-1"
                  )}
                >
                  {item.year}
                </div>
                <div
                  className={cn(
                    "text-xs leading-4.5 pr-0 tracking-wide",
                    "lg:text-sm lg:leading-5.5 lg:pr-4",
                    "md:text-xs md:leading-4.5 md:pr-8"
                  )}
                >
                  {item.text}
                </div>

                {/* Arrow pointing to timeline */}
                <div
                  className="absolute w-0 h-0 top-1/2 transform -translate-y-1/2"
                  style={{
                    [isLeft ? "right" : "left"]: "-8px",
                    borderTop: "8px solid transparent",
                    borderBottom: "8px solid transparent",
                    [isLeft ? "borderLeft" : "borderRight"]:
                      "8px solid rgba(255, 255, 255, 0.8)",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineChart;
