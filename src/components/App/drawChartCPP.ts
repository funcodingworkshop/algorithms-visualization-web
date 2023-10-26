import {
  SciChartSurface,
  NumericAxis,
  UniformHeatmapDataSeries,
  UniformHeatmapRenderableSeries,
  HeatmapColorMap,
  NumberRange,
  NativeTextAnnotation,
  ECoordinateMode,
  EHorizontalAnchorPoint,
  EVerticalAnchorPoint,
} from "scichart";
import { mazeInput } from "./input";

export const chartDivId = "chart1";
const MAZE_MATRIX = mazeInput.split(/\n/).map((e) => e.split("").map((t) => parseInt(t)));
const ROWS = MAZE_MATRIX.length;
const COLS = MAZE_MATRIX[0].length;

export async function drawChartCPP() {
  const { sciChartSurface, wasmContext } = await SciChartSurface.create(chartDivId);

  // Create an X,Y Axis and add to the chart
  const xAxis = new NumericAxis(wasmContext, {
    majorGridLineStyle: { color: "white" },
    drawMinorGridLines: false,
    drawLabels: false,
    drawMajorTickLines: false,
    drawMinorTickLines: false,
  });
  xAxis.deltaCalculator.getDeltaFromRange = () => new NumberRange(1, 1);

  const yAxis = new NumericAxis(wasmContext, {
    majorGridLineStyle: { color: "white" },
    drawMinorGridLines: false,
    drawLabels: false,
    drawMajorTickLines: false,
    drawMinorTickLines: false,
  });
  yAxis.deltaCalculator.getDeltaFromRange = () => new NumberRange(1, 1);

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

  const next = (r: number, c: number, step: number) => {
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
      text: step.toString(),
    });
    sciChartSurface.annotations.add(annotation);
  };

  sciChartSurface.renderableSeries.add(heatmapSeries);

  return { next };
}

