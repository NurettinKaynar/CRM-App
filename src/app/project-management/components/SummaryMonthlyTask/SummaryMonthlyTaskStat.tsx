import React, { useEffect, useRef, useState } from "react";
import { useThemeMode } from "../../../../_metronic/partials";
import { ApexOptions } from "apexcharts";
import { getCSSVariableValue } from "../../../../_metronic/assets/ts/_utils";
import { getCompletedTasks, getInProgressTasks } from "../../core/_request";
import { AxiosResponse } from "axios";
import { KTCard } from "../../../../_metronic/helpers";
const SummaryMonthlyTaskStat = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();
  const months = [
    "Oca",
    "Şuba",
    "Mar",
    "Nis",
    "May",
    "Haz",
    "Tem",
    "Ağu",
    "Ey",
    "Ek",
    "Ka",
    "Ara",
  ];

  const [completedTasks, setCompletedTasks] = useState<number[]>(
    Array(12).fill(0)
  );
  const [processingTasks, setProcessingTasks] = useState<number[]>(
    Array(12).fill(0)
  );

  const refreshMode = () => {
    if (!chartRef.current) {
      return;
    }
    const chart = new ApexCharts(chartRef.current, getChartOptions());
    if (chart) {
      chart.render();
    }
    return chart;
  };

  const handleGetCompletedTask = () => {
    getCompletedTasks().then((res) => {
      if (res.status === 200) {
        const data: any[] = res.data;
        const compTaskData: number[] = Array(12).fill(0);
        data.forEach((task) => {
          compTaskData[task.month - 1] = task.count;
        });
        setCompletedTasks(compTaskData);
      }
    });
  };

  const handleInProgressTask = () => {
    getInProgressTasks().then((res) => {
      if (res.status === 200) {
        const data: any[] = res.data;
        const inpTaskData: number[] = Array(12).fill(0);
        data.forEach((task) => {
          inpTaskData[task.month - 1] = task.count;
        });
        setProcessingTasks(inpTaskData);
      }
    });
  };

  const getChartOptions = (): ApexOptions => {
    const labelColor = getCSSVariableValue("--bs-gray-500");
    const borderColor = getCSSVariableValue("--bs-gray-200");
    const baseColor = getCSSVariableValue("--bs-info");
    const color1 = getCSSVariableValue("--bs-success");
    const color2 = getCSSVariableValue("--bs-primary");
    const color1Light = getCSSVariableValue("--bs-success-light");

    const color2Light = getCSSVariableValue("--bs-primary-light");

    return {
      series: [
        {
          name: "Devam Ediyor",
          data: processingTasks,
        },
        {
          name: "Tamamlandı",
          data: completedTasks,
        },
      ],
      chart: {
        fontFamily: "inherit",
        type: "area",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {},
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "solid",
        opacity: 1,
      },
      stroke: {
        curve: "smooth",
        show: true,
        width: 3,
        colors: [color2, color1],
      },
      xaxis: {
        categories: months,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: labelColor,
            fontSize: "12px",
          },
        },
        crosshairs: {
          position: "front",
          stroke: {
            color: baseColor,
            width: 1,
            dashArray: 3,
          },
        },
        tooltip: {
          enabled: true,
          formatter: undefined,
          offsetY: 0,
          style: {
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: labelColor,
            fontSize: "12px",
          },
        },
      },
      states: {
        normal: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        hover: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: "none",
            value: 0,
          },
        },
      },
      colors: [color2Light, color1Light],
      grid: {
        borderColor: borderColor,
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      markers: {
        strokeColors: baseColor,
        strokeWidth: 3,
      },
    };
  };
  useEffect(() => {
    handleGetCompletedTask();
    handleInProgressTask();
  }, []);

  useEffect(() => {
    const chart = refreshMode();
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chartRef, mode, completedTasks, processingTasks]);

  return (
    <KTCard>
      <div className="d-flex flex-column p-5">
        <h3 className="fw-bold mb-1">Aylık Görev Özeti</h3>
        <div className="d-flex flex-row gap-5 align-items-center">
          <div className="d-flex align-items-center">
            <span className="menu-bullet d-flex align-items-center me-2">
              <span className="bullet bg-success"></span>
            </span>
            Tamamlandı
          </div>
          <div className="d-flex align-items-center">
            <span className="menu-bullet d-flex align-items-center me-2">
              <span className="bullet bg-primary"></span>
            </span>
            Devam Ediyor
          </div>
        </div>
        <div
          ref={chartRef}
          id="kt_charts_widget_3_chart"
          style={{ height: "350px" }}></div>
      </div>
    </KTCard>
  );
};

export default SummaryMonthlyTaskStat;
