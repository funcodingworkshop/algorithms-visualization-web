import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { XyDataSeries } from "scichart/Charting/Model/XyDataSeries";
import { FastLineRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastLineRenderableSeries";

export const chartDivId = "chart1";

export async function drawChart() {
  const { sciChartSurface, wasmContext } = await SciChartSurface.create(chartDivId);

  // Create an X,Y Axis and add to the chart
  const xAxis = new NumericAxis(wasmContext);
  const yAxis = new NumericAxis(wasmContext);
  sciChartSurface.xAxes.add(xAxis);
  sciChartSurface.yAxes.add(yAxis);

  const dataSeries = new XyDataSeries(wasmContext, {
    xValues: [1, 2, 5, 8, 10],
    yValues: [3, 1, 7, 5, 8],
  });
  const renderableSeries = new FastLineRenderableSeries(wasmContext, {
    dataSeries,
    stroke: "steelblue",
  });
  sciChartSurface.renderableSeries.add(renderableSeries);
}
