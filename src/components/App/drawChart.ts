import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { UniformHeatmapDataSeries } from "scichart/Charting/Model/UniformHeatmapDataSeries";
import { UniformHeatmapRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/UniformHeatmapRenderableSeries";
import { HeatmapColorMap } from "scichart/Charting/Visuals/RenderableSeries/HeatmapColorMap";
import { createBfs } from "../../algorithms/bfs2";
import { NumberRange } from "scichart/Core/NumberRange";
import { mazeInput } from "./input";

export const chartDivId = "chart1";

const MAZE_MATRIX = mazeInput.split(/\n/).map((e) => e.split("").map((t) => parseInt(t)));
console.log("MAZE_MATRIX", MAZE_MATRIX);
const ROWS = MAZE_MATRIX.length;
console.log("ROWS", ROWS);
const COLS = MAZE_MATRIX[0].length;
console.log("COLS", COLS);
const timeout = 20;

export async function drawChart() {
  const { sciChartSurface, wasmContext } = await SciChartSurface.create(chartDivId);

  // Create an X,Y Axis and add to the chart
  const xAxis = new NumericAxis(wasmContext, {
    majorGridLineStyle: { color: "white" },
    drawMinorGridLines: false,
    drawLabels: false,
    drawMajorTickLines: false,
    drawMinorTickLines: false,
  });
  xAxis.deltaCalculator.getDeltaFromRange = (min: number, max: number, minorsPerMajor: number, maxTicks: number) => {
    return new NumberRange(1, 1);
  };
  const yAxis = new NumericAxis(wasmContext, {
    majorGridLineStyle: { color: "white" },
    drawMinorGridLines: false,
    drawLabels: false,
    drawMajorTickLines: false,
    drawMinorTickLines: false,
  });
  yAxis.deltaCalculator.getDeltaFromRange = (min: number, max: number, minorsPerMajor: number, maxTicks: number) => {
    return new NumberRange(1, 1);
  };
  sciChartSurface.xAxes.add(xAxis);
  sciChartSurface.yAxes.add(yAxis);

  const heatmapDataSeries = new UniformHeatmapDataSeries(wasmContext, {
    xStart: 0,
    xStep: 1,
    yStart: 0,
    yStep: 1,
    zValues: MAZE_MATRIX,
  });

  const heatmapSeries = new UniformHeatmapRenderableSeries(wasmContext, {
    dataSeries: heatmapDataSeries,
    useLinearTextureFiltering: false,
    colorMap: new HeatmapColorMap({
      minimum: 0,
      maximum: 1,
      gradientStops: [
        { offset: 1, color: "#335da9" },
        { offset: 0.5, color: "#FF000055" },
        { offset: 0, color: "#00000055" },
      ],
    }),
  });

  const nextBfs = createBfs(MAZE_MATRIX, { r: 1, c: 2 }, { r: 9, c: 0 });

  // const updateChart = () => {
  //   const newVal = nextBfs();
  //   if (newVal !== undefined) {
  //     heatmapDataSeries.setZValue(newVal.r, newVal.c, 0.5);
  //     setTimeout(updateChart, timeout);
  //   }
  // };

  // updateChart();

  const updateChartClick = () => {
    const newVal = nextBfs();
    if (newVal !== undefined) {
      heatmapDataSeries.setZValue(newVal.r, newVal.c, 0.5);
    }
  };

  sciChartSurface.renderableSeries.add(heatmapSeries);

  return { updateChartClick };
}

