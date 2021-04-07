import React, {useLayoutEffect, useRef} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import './testData';

import './sensorDataUtils';


const LINE_COLORS = [
    am4core.color('#00429d'),
    am4core.color('#3761ab'),
    am4core.color('#5681b9'),
    am4core.color('#73a2c6'),
    am4core.color('#93c4d2'),
    am4core.color('#b9e5dd'),
    am4core.color('#ffffe0'),
    am4core.color('#ffd3bf'),
    am4core.color('#ffa59e'),
    am4core.color('#f4777f'),
    am4core.color('#dd4c65'),
    am4core.color('#be214d'),
    am4core.color('#93003a')];

/**
 * Construct a series.
 *
 * @param chart
 * @param {AMDataPoint[]}data
 */
function getSeries(chart, data) {
    if (data.length === 0) {
        data = [];
    }
    const dataSample = data[0];
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.tooltipText = "{valueY.value}";
    series.data = data;
    series.name = dataSample.name;
    series.strokeWidth = 3
    return series;
}

am4core.useTheme(am4themes_animated);

/**
 * Create a chart
 * @param {ChartData} props.chartData
 * @return {JSX.Element}
 * @constructor
 */
function Chart(props) {
    const chart = useRef(null);
    const chartData = props.chartData;
    useLayoutEffect(() => {

        let x = am4core.create("chartdiv_" + chartData.title, am4charts.XYChart);
        x.legend = new am4charts.Legend();
        x.legend.position = "right";
        x.paddingRight = 20;
        x.colors.list = LINE_COLORS;

        let scrollbarX = new am4charts.XYChartScrollbar();
        x.scrollbarX = scrollbarX;

        x.cursor = new am4charts.XYCursor();

        let dateAxis = x.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.baseInterval = {
            "timeUnit": "second",
            "count": 30
        };

        let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;
        valueAxis.title.text = chartData.unit;
        valueAxis.logarithmic=true;

        chartData.series.forEach(seriesData => {
            const s = getSeries(x, seriesData);
            scrollbarX.series.push(s);
        })


        chart.current = x;

        return () => {
            x.dispose();
        };
    }, [chartData.series, chartData.title, chartData.unit, props.chartData]);

    return (
        <div id={"chartdiv_" + chartData.title} style={{width: "100%", height: "500px"}}/>
    );
}

export default Chart;