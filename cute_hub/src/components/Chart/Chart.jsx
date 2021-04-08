import React, {useLayoutEffect, useRef} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";




const LINE_COLORS = [
    am4core.color('#022c61'),
    am4core.color('#a13a0d'),
    am4core.color('#3761ab'),
    am4core.color('#608783'),
    am4core.color('#7ba5db'),
    am4core.color('#f4777f'),
    am4core.color('#a6cbc4'),
    am4core.color('#224e03'),
    am4core.color('#5ae045'),
    am4core.color('#db3326'),
    am4core.color('#040809'),
    am4core.color('#dae203'),
    am4core.color('#a41ca8')];

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
    series.strokeWidth = 3;
    return series;
}

am4core.useTheme(am4themes_animated);

function initiLegend(chart) {
    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";
    chart.paddingRight = 20;
    chart.colors.list = LINE_COLORS;
}

/**
 * This is a hack mimicking amchart's own number formatter.
 *
 * The purpose of this class is to provide different behaviour depending on the value passed.
 *
 * This class will wrap around am4core's own number formatter. Which you can use to simplify some formatting operations:
 * https://www.amcharts.com/docs/v4/concepts/formatters/formatting-numbers/
 * @constructor
 */
class CustomFormatter extends am4core.NumberFormatter{
    format(value, format=null, precision=null) {
        const formatter = new am4core.NumberFormatter();
        if ((value < 1e-3 && value !== 0) || 1000 < value ) {
            return formatter.format(value, "#e");
        }
        if (typeof value === "number") {
            const roundedValue = Number((value).toFixed(3));
            return roundedValue;
        }
        return value;
    }
}


/**
 *
 * @param {XYChart} chart
 * @param {ChartData} chartData
 * @return {{yAxis: ValueAxis<T>, xAxis: DateAxis<T>}}
 */
function initAxes(chart, chartData) {
    // initialize x axis
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.baseInterval = {
        "timeUnit": "second",
        "count": 30
    };

    //initialize y axis
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
    valueAxis.title.text = chartData.unit;

    valueAxis.numberFormatter = new CustomFormatter()

    return {xAxis: dateAxis, yAxis: valueAxis};
}

function initSeries(chartData, chart, scrollbarX) {
    // Add series to chart
    chartData.series.forEach(seriesData => {
        const s = getSeries(chart, seriesData);
        scrollbarX.series.push(s);
    })
}

/**
 *
 * @param {XYChart}chart
 * @param {ValueAxis<T>} valueAxis
 */
function initScaleSwitch(chart, valueAxis) {
    const scaleSwitch = chart.createChild(am4core.SwitchButton);
    scaleSwitch.y = 15;
    scaleSwitch.leftLabel.text = "Linear";
    scaleSwitch.rightLabel.text = "Logarithmic";
    scaleSwitch.verticalCenter = "top";
    scaleSwitch.isActive = false;
    scaleSwitch.fill = am4core.color("#000");
    scaleSwitch.events.on("toggled", () => {
        if (scaleSwitch.isActive) { // from the docs it seems that left is active
            valueAxis.logarithmic = true;
        } else {
            valueAxis.logarithmic = false;
        }
    });
}

/**
 * Create a chart
 * @param {ChartData} props.chartData
 * @return {JSX.Element}
 * @constructor
 */
function Chart(props) {
    const chartRef = useRef(null);
    const chartData = props.chartData;
    useLayoutEffect(() => {

        let chart = am4core.create("chartdiv_" + chartData.title, am4charts.XYChart);

        initiLegend(chart);

        // init the zooming scroll bar
        let scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX = scrollbarX;

        /// init the popup cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.numberFormatter = new am4core.NumberFormatter();

        const {xAxis, yAxis} = initAxes(chart, chartData);

        initScaleSwitch(chart, yAxis);

        initSeries(chartData, chart, scrollbarX);

        const title = chart.titles.create();
        title.text = chartData.title;
        title.fontSize = 25;
        title.marginBottom = 10;

        // Needed for react hooks
        chartRef.current = chart;

        return () => {
            chart.dispose();
        };
    }, [chartData.series, chartData.title, chartData.unit, props.chartData]);

    return (
        <div id={"chartdiv_" + chartData.title} style={{width: "100%", height: "418px"}}/>
    );
}

export default Chart;