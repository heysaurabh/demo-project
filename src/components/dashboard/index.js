import React, { Fragment } from "react";

import Navbar from "../navbar";
import DemoChart from "./DemoChart";
import DemoTable from "./DemoTable";

const Dashboard = () => {
  return (
    <Fragment>
      <Navbar />
      <DemoChart />
      <DemoTable />
    </Fragment>
  );
};

export default Dashboard;
