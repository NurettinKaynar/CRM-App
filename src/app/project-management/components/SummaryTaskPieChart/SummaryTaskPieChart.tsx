import React from "react";
import { KTCard } from "../../../../_metronic/helpers";
import Chart from "react-apexcharts";
const SummaryTaskPieChart = () => {
  const pieChartOptions = {
    chart: {
      type: "donut",
    },
    labels: ["Devam Ediyor", "Tamamlandı"],
    colors: ["#4e73df", "#1cc88a"],
    legend: {
      show: false, // Legend'ı gizlemek için
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Görev Özeti",
              formatter: function (w:any) {
                return w.globals.seriesTotals.reduce((a:any, b:any) => a + b, 0);
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  };
  const pieChartSeries = [30, 45];

  return (
    <KTCard>
      <div className="d-flex flex-column p-5">
        <h3 className="fw-bold mb-1">Görev Özeti</h3>
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ width: "350px", height: "380px" }}>
            <Chart
            // @ts-ignore
              options={pieChartOptions}
              series={pieChartSeries}
              type={"pie"}
              width="100%"
              height="100%"
            />
          </div>
          <div className="d-flex flex-column gap-1">
            <div className="d-flex fs-6 fw-semibold align-items-center gap-3 mb-3">
              <div className="bullet bg-primary me-3"></div>
              <div className="text-gray-500">Devam Ediyor</div>
              <div className="ms-auto fw-bold text-gray-700">30</div>
            </div>
            <div className="d-flex fs-6 fw-semibold align-items-center gap-3 mb-3">
              <div className="bullet bg-success me-3"></div>
              <div className="text-gray-500">Tamamlandı</div>
              <div className="ms-auto fw-bold text-gray-700">30</div>
            </div>
          </div>
        </div>
      </div>
    </KTCard>
  );
};

export default SummaryTaskPieChart;
