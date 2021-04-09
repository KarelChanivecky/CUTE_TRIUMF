import React, {useState} from 'react';
import ColoredPaper from "../../../../components/ColoredPaper/ColoredPaper";
import {Divider, Grid, useTheme} from "@material-ui/core";
import PlottingInput from "../../../../components/PlottingInput/PlottingInput";
import download, {buildSensorBoolString, makeDateTimeString, makeQuery} from "./downloadDataSource";
import fetchData from "./plottingDataSource";
import {convertToChartData} from "./sensorDataUtils";
import Chart from '../../../../components/Chart/Chart'


function PlottingTab(props) {
    const theme = useTheme()

    /** @type {[ChartData[], Function]} */
    const [chartsData, setChartsData] = useState([]);

    const plot = (startDateTime, endDateTime, checkedThermo, checkedPressure) => {
        fetchData(startDateTime, endDateTime, checkedThermo, checkedPressure)
            .then(objs => {
                const {thermosChartData, pressChartData} = convertToChartData(objs, 300);
                setChartsData([thermosChartData, pressChartData])
            });

    }

    return (
        <Grid container wrap="nowrap">

            <Grid item container xs={12} sm={12} md={4} lg={3} xl={2} zeroMinWidth>
                <PlottingInput
                    plot={plot}
                    download={download}
                />
            </Grid>

            <Grid item xs={12} sm={12} md={7} lg={9} xl={9}>
                <ColoredPaper  elevation={0}>
                    {chartsData.map((chartData, i) => {
                        if (i === chartData.length - 1) {
                            return <Chart key={i} chartData={chartData}/>;
                        }

                        return <>
                            <Chart key={i} chartData={chartData}/>
                            <Divider/>
                        </>
                    })}

                </ColoredPaper>
            </Grid>
        </Grid>
    );
}

export default PlottingTab;