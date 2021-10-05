import React, {useState} from 'react';
import ColoredPaper from "../../../../components/ColoredPaper/ColoredPaper";
import {Divider, Grid, useTheme} from "@material-ui/core";
import PlottingInput from "../../../../components/PlottingInput/PlottingInput";
import fetchPlotData from "./plotDataSource";
import {parseChartData} from "./parseData";
import Chart from '../../../../components/Chart/Chart'


function PlottingTab(props) {
    const theme = useTheme()

    /** @type {[ChartData[], Function]} */
    const [chartsData, setChartsData] = useState([]);

    //function to get the data for the plotting
    const plot = (data) => {
        fetchPlotData(data)
            .then(objs => {
                //console.log(objs);
                const chrtData = parseChartData(objs);
                console.log("ChartsData length:", chrtData.length);
                setChartsData(chrtData);
            });

    }

    return (
        <Grid container wrap="nowrap">

            <Grid item container xs={12} sm={12} md={4} lg={3} xl={3} zeroMinWidth>
                <PlottingInput
                    plot={plot}
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
