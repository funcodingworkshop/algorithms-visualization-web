import React from "react";
import { chartDivId, drawChart } from "./drawChart";
import { TModule } from "../../types/TModule";
import { TIntVector } from "../../types/TIntVector";

export default function App() {
  const [nextFn, setNextFn] = React.useState<{ updateChartClick: Function }>({ updateChartClick: () => undefined });
  const [algModule, setAlgModule] = React.useState<TModule>();  
  React.useEffect(() => {
    drawChart().then((r) => setNextFn(r));
    // @ts-ignore
    setAlgModule(Module);
  }, []);

  const handleTestFib = () => {
    if (algModule) {
      const res: TIntVector = algModule.intFib(5);
      console.log("Fib res size", res.size());
      for (let i=0; i<res.size(); i++) {
        console.log(i);
      }
    }
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 800, height: 700 }}>
        <div id={chartDivId} style={{ height: "100%" }} />
      </div>
      <div style={{ padding: 10 }}>
        <button
          style={{ fontSize: 20, backgroundColor: "#335da9", color: "white" }}
          onClick={() => nextFn.updateChartClick()}
        >
          NEXT
        </button>
      </div>
      <div style={{ padding: 10 }}>
        <button
          style={{ fontSize: 20, backgroundColor: "#335da9", color: "white" }}
          onClick={handleTestFib}
        >
          Test Fibonacci
        </button>
      </div>
    </div>
  );
}

