import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Box, Container, Grid, Tab, Tabs, useTheme, Typography } from "@material-ui/core";
import ColoredPaper from "../../components/ColoredPaper/ColoredPaper";
import Divider from '@material-ui/core/Divider';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {

        fontSize: '1.0 rem',
        color: '#ffffff'
    }
}));

//TODO: update this array with the name of the variable to be shown and its placeholder value
const arr1 = {
    "Lab Air Pressure (hPa)": "1000",
    "Lab Temperature (C)": "20",
    "Liquid Nitrogen Level (kg)": "xyz"
};

export default function ValuesRibbon(props) {
    const theme = useTheme();
    const classes = useStyles();


    const [data, setData] = useState({
        "Time": "2021-02-18 00:36:40",
        "Cernox STILL": "  0.00000",
        "Cernoc MC": "  0.00000",
        "4K STAGE": "  54.30",
        "60K STAGE": "  0.00000",
        "dffsf": "  0.00000",
        "Still bottom": "  0.00000",
        "MC bottom": "  0.00000"
    })

    const [scaleData, setScaleData] = useState({
        "Weight": "0",
    })

    const makeTabs = (arr) => {
        let mapped = []
        let key = 1
        for (let element in arr) {
            mapped.push(
                <div key={key}>
                    
                    <Typography variant="body1" component="h2">
                        &nbsp;&nbsp;&nbsp;{element}: {arr[element]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    
                </div>
            )
            key++;
        };
        return mapped;
    }


    const [values, setValues] = useState(arr1)
    const [tabs, setTabs] = useState(makeTabs(values))

    const getData = async () => {
        try {
            const fridge = await axios.get("http://192.168.44.30/status.php")
            setData(fridge.data);  // set State

        } catch (err) {
            console.error(err.message);
        }
    };

    const getLN2Data = async () => {
        try {
            const scale = await axios.get("http://192.168.44.30/LN2weight.php")
            setScaleData(scale.data);  // set State

        } catch (err) {
            console.error(err.message);
        }
    };

    // get-set all values from fridge data
    const updateValues1 = async () => {
        const temp = values
        // TODO: update "Liquid Nitrogen Level" with whatever name you want to be shown (also used in arr1 on top)
        temp["Lab Temperature (C)"] = data["PT 100 Bidon C"]
        setValues(temp);
        setTabs(makeTabs(values))
    };
    //
    // get-set all values from LN2 data
    const updateValuesLN2 = async () => {
        const temp = values
        // TODO: update "Liquid Nitrogen Level" with whatever name you want to be shown (also used in arr1 on top)
        temp["Liquid Nitrogen Level (kg)"] = scaleData["Weight"]
        setValues(temp);
        setTabs(makeTabs(values))
    };

    // get-set all values from websocket1
    const updateValues2 = async (message) => {
        //console.log("message : " + message.data)
        const temp = values

        //TODO: replace message.data on next line with whatever specific
        // information we need from this received data. example message.data.temperatue
        // // also update "Lab Air Pressure" with whatever name you want to be shown (also used in arr1 on top)
        if (message.data.startsWith("F"))
        {
            var message_arr = message.data.split(" ")
            temp["Lab Air Pressure (hPa)"] = message_arr[8]
            setValues(temp);
            setTabs(makeTabs(values))

        }

    };

    //setup the fridge data
    useEffect(() => {
        getData().then((res) => {
            updateValues1()
        })


        const interval = setInterval(() => {
            getData().then((res) => {
                updateValues1()
            })

        }, 10000)


        return () => clearInterval(interval)
    }, [])  // keep empty dependency array

    //setup the LN2 scale data
    useEffect(() => {
        getLN2Data().then((res) => {
            updateValuesLN2()
        })


        const interval = setInterval(() => {
            getLN2Data().then((res) => {
                updateValuesLN2()
            })

        }, 10000)


        return () => clearInterval(interval)
    }, [])  // keep empty dependency array

    //adds an event listener to the websocket and acts when it recieves a response.
    useEffect(() => {
        props.cryostatWS.addEventListener('message', updateValues2, true)
        return () => props.cryostatWS.removeEventListener('message', updateValues2, true);
    })

    return (
        <ColoredPaper color={theme.palette.tertiary} square variant={'outlined'} elevation={0}>
            <Grid item container direction='row' justify="flex-start" wrap="wrap" alignItems="stretch">
                {/*<Grid item container alignItems="flex-end">*/}

                {tabs}

                {/*</Grid>*/}
            </Grid>
        </ColoredPaper>
    )


}
