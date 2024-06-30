import React, { useEffect, useRef, useState } from "react";
import { KTCard } from "../../../../_metronic/helpers";

import { ChartsWidget3 } from "../../../../_metronic/partials/widgets";

import SummaryTaskPieChart from "../SummaryTaskPieChart/SummaryTaskPieChart";
import SummaryMonthlyTaskStat from "../SummaryMonthlyTask/SummaryMonthlyTaskStat";
import RoadMap from "../RoadMapTask/RoadMap";
import LatestFileComponent from "../LatestFileComponent/LatestFileComponent";

const Overview = () => {
  return (
    <div className="row gap-5">
      {/* Begin Summary Statistics */}
      <div className="col-12">
        <div className="row gap-5">
          <div className="col">
            <SummaryTaskPieChart />
          </div>

          <div className="col">
            <SummaryMonthlyTaskStat />
          </div>
        </div>
      </div>
      {/* End Summary Statistics */}
      <div className="col-12">
        <div className="row gap-5">
          <div className="col">
            <RoadMap />
          </div>
          <div className="col">
            <LatestFileComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
