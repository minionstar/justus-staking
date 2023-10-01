import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const options = {
  legend: {
    // chart
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#FFFFFF"], //chart line color
  chart: {
    type: "line",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
    foreColor: "#FFF", // Axis font color
    redrawOnParentResize: true,
    zoom: {
      enabled: true,
      type: "x",
      autoScaleYaxis: false,
      zoomedArea: {
        fill: {
          color: "#90CAF9",
          opacity: 0.4,
        },
        stroke: {
          color: "#0D47A1",
          opacity: 0.4,
          width: 1,
        },
      },
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
  ],
  stroke: {
    width: [1, 1],
    curve: "smooth",
  },
 
  markers: {
    size: 6,
    colors: "#FFF",
    strokeColors: ["#3056D3"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    categories: [
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
    ],
    axisBorder: {
      show: true,
    },
    axisTicks: {
      show: true,
    },
		labels: {
			rotate: -45
		}
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
    max: 100,
  },
  noData: {
    text: "No Data",
    align: "center",
    verticalAlign: "middle",
    offsetX: 0,
    offsetY: 0,
    style: {
      color: undefined,
      fontSize: "20px",
      fontFamily: undefined,
    },
  },
  tooltip: {
    enabled: true,
    enabledOnSeries: true,
    shared: false,
    followCursor: true,
    intersect: true,
    inverseOrder: false,
    custom: function({series, seriesIndex, dataPointIndex, w}) {
			return '<div class="arrow_box bg-primary p-3">' +
				'<span className="text-gray-900 bg-blue-900">' + "Price "+series[seriesIndex][dataPointIndex] + '</span>' +
				'</div>'
		},
    fillSeriesColor: "white",
    theme: false,
    style: {
      fontSize: "12px",
      fontFamily: undefined,
    },
    onDatasetHover: {
      highlightDataSeries: false,
    },
    x: {
      show: true,
      format: "dd MMM",
      formatter: undefined,
    },
    y: {
      formatter: undefined,
      title: {
        formatter: (seriesName) => seriesName,
      },
    },
    z: {
      formatter: undefined,
      title: "Size: ",
    },
    marker: {
      show: true,
    },
    items: {
      display: "flex",
    },
    fixed: {
      enabled: false,
      position: "topRight",
      offsetX: 0,
      offsetY: 0,
    },
  },
	grid: {
    show: true,
    borderColor: '#90A4AE',
    strokeDashArray: 1,
    position: 'back',
    xaxis: {
        lines: {
            show: true
        }
    },   
    yaxis: {
        lines: {
            show: true
        }
    },  
    row: {
        colors: undefined,
        opacity: 0.2
    },  
    column: {
        colors: undefined,
        opacity: 0.2
    },  
    padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },  
}
};

export default function ChartComponent() {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Product One",
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
      },
    ],
  });

  return (
    <div className="col-span-12 rounded-lg px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8 h-full bg-[#231a4f] mb-5">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Total Revenue</p>
              <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Total Sales</p>
              <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Day
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Week
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Month
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={chartData.series}
            type="line"
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
