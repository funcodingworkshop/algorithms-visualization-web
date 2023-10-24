import {
  SciChartSurface,
  NumericAxis,
  UniformHeatmapDataSeries,
  UniformHeatmapRenderableSeries,
  HeatmapColorMap,
  NumberRange,
  NativeTextAnnotation,
  TextAnnotation,
  ECoordinateMode,
  EHorizontalAnchorPoint,
  EVerticalAnchorPoint,
  Thickness,
  EAnnotationLayer,
} from "scichart";
import { createBfs } from "../../algorithms/bfs2";
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
  const { sciChartSurface, wasmContext } = await SciChartSurface.create(chartDivId, {
    // padding: new Thickness(0, 0, 0, 0),
  });

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

  const nextBfs = createBfs(MAZE_MATRIX, { r: 1, c: 2, step: 0 }, { r: 9, c: 0, step: 0 });

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
      const { r, c, step } = newVal;
      heatmapDataSeries.setZValue(r, c, 0.5);
      const annotation = new NativeTextAnnotation({
        x1: c / COLS,
        y1: (ROWS - r - 1) / ROWS,
        xCoordinateMode: ECoordinateMode.Relative,
        yCoordinateMode: ECoordinateMode.Relative,
        horizontalAnchorPoint: EHorizontalAnchorPoint.Left,
        verticalAnchorPoint: EVerticalAnchorPoint.Top,
        textColor: "white",
        fontSize: 26,
        text: step.toString()
      });
      sciChartSurface.annotations.add(annotation);
    }
  };

  sciChartSurface.renderableSeries.add(heatmapSeries);
  // const nativeTextRemote = new NativeTextAnnotation({
  //   x1: 100,
  //   y1: 100,
  //   text: "Test",
  //   fontSize: 24,
  //   textColor: 'white'
  // });

  return { updateChartClick };
}

