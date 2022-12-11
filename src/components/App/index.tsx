import React from "react";
import { chartDivId, drawChart } from "./drawChart";

export default function App() {
  React.useEffect(() => {
    drawChart();
  }, []);

  return (
    <div>
      <h3>Hello world!</h3>
      <div id={chartDivId}/>
    </div>
  );
}
