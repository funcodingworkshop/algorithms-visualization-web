import React from "react";
import { chartDivId, drawChart } from "./drawChart";

export default function App() {
  const [nextFn, setNextFn] = React.useState<{ updateChartClick: Function }>({ updateChartClick: () => undefined });
  React.useEffect(() => {
    drawChart().then((r) => setNextFn(r));
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 800, height: 700 }}>
        <div id={chartDivId} style={{ height: "100%" }} />
      </div>
      <div>
        <button onClick={() => nextFn.updateChartClick()}>NEXT</button>
      </div>
    </div>
  );
}

