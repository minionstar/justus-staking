import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

export default function ChartComponent() {
  const [prices, setPrices] = useState([]);
  // const [period, setPeriod] = useState(1);
  const [dates, setDates] = useState([]);
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Product One",
        data: [],
      },
    ],
  });
  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/justus/market_chart?vs_currency=usd&days=1` //eg. 1,14,30,max => 1 day, 2 weeks, 1 month, all
      )
      .then((response) => {
        let data = [];
        let dates = [];
        response?.data?.prices.map((price, index) => {
          if (index % 6 === 0) {
            data.push(price[1].toFixed(5));
            dates.push(
              new Date(price[0]).getMonth() +
                1 +
                "/" +
                new Date(price[0]).getDate() +
                ":" +
                new Date(price[0]).getHours() +
                "H"
            );
          }
          return response;
        });
        setPrices(data);
        setDates(dates);
        setChartData({
          series: [
            {
              name: "Product One",
              data: data,
            },
          ],
        });
      });
  }, []);

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
      size: 3,
      colors: "#FFF",
      strokeColors: ["#3056D3"],
      strokeWidth: 2,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 3,
      },
    },
    xaxis: {
      type: "time",
      categories: dates,
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      min: Math.min(...prices) - 0.0001,
      max: Math.max(...prices) + 0.0001,
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
      followCursor: false,
      intersect: false,
      inverseOrder: false,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return (
          '<div className="arrow_box p-20">' +
          '<span className="text-whiten bg-primary p-5">' +
          "   " +
          "$" +
          series[seriesIndex][dataPointIndex] +
          "</span></div>"
        );
      },
      theme: "white",
      style: {
        fontSize: "15px",
        fontFamily: undefined,
      },
      onDatasetHover: {
        highlightDataSeries: true,
      },
    },
    grid: {
      show: true,
      borderColor: "#90A4AE",
      strokeDashArray: 1,
      position: "back",
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      row: {
        colors: undefined,
        opacity: 0.2,
      },
      column: {
        colors: undefined,
        opacity: 0.2,
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
  };

  return (
    <div className="col-span-12 rounded-lg px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8 h-full bg-[#231a4f] mb-5">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          {/* <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Price</p>
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
          </div> */}
        </div>
        <div className="flex w-full max-w-45 justify-end">
          {/* <div className="inline-flex items-center rounded-md bg-transparent p-1.5 dark:bg-meta-4">
            <button className="rounded bg-whiten py-1 px-3 text-xs font-medium text-boxdark shadow-card hover:bg-whiten hover:shadow-card ">
              Day
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card">
              Week
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card">
              Month
            </button>
          </div> */}
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
