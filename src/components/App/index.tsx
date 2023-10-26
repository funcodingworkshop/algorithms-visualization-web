import React from "react";
import { chartDivId, drawChartCPP } from "./drawChartCPP";
import { TModule } from "../../types/TModule";
import { TIntVector } from "../../types/TIntVector";

export default function App() {
  const [methods, setMethods] = React.useState<{ next: (r: number, c: number, step: number) => void }>();
  const [algRes, setAlgRes] = React.useState<TIntVector>();
  const [algResSize, setAlgResSize] = React.useState<number>(0);
  const [cnt, setCnt] = React.useState<number>(0);

  React.useEffect(() => {
    drawChartCPP().then((r) => setMethods(r));
    // @ts-ignore
    const algModule: TModule = Module;
    setTimeout(() => {
      const res: TIntVector = algModule.run_alg();
      setAlgRes(res);
      setAlgResSize(Math.floor(res.size() / 3));
    }, 200);
  }, []);

  const isFinished = cnt >= algResSize;

  const handleNextClick = () => {
    if (methods && algRes && !isFinished) {
      const index = cnt * 3;
      const row = algRes.get(index);
      const col = algRes.get(index + 1);
      const step = algRes.get(index + 2);
      methods.next(row, col, step);
      setCnt(cnt + 1);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 800, height: 700 }}>
        <div id={chartDivId} style={{ height: "100%" }} />
      </div>
      <div style={{ padding: 10 }}>
        <button
          style={{ fontSize: 20, backgroundColor: isFinished ? "grey" : "#335da9", color: "white" }}
          onClick={handleNextClick}
        >
          {isFinished ? "END" : "NEXT"}
        </button>
      </div>
    </div>
  );
}

