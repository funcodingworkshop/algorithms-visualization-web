import React from "react";
import { chartDivId, drawChart } from "./drawChart";

export default function App() {
  React.useEffect(() => {
    drawChart();
  }, []);

  return (
    <div style={{ width: 800, height: 800 }}>
      <div id={chartDivId} />
    </div>
  );
}
