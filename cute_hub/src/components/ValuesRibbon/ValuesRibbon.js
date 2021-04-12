import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {Grid, Typography, useTheme} from "@material-ui/core";
import ColoredPaper from "../../components/ColoredPaper/ColoredPaper";
import Divider from '@material-ui/core/Divider';


//TODO: update this array with the name of the variable to be shown and its placeholder value
const initialDataState = {
    "Lab Air Pressure (hPa)": "1000",
    "Lab Temperature (C)": "20",
    "Liquid Nitrogen Level (kg)": "xyz"
};

function makeTabs(arr) {
    let mapped = []
    let key = 1
    for (let element in arr) {
        mapped.push(
            <div key={key}>

                <Typography variant="body1" component="h2">
                    &nbsp;&nbsp;&nbsp;{element}: {arr[element]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Typography>
                <Divider orientation="vertical" flexItem/>

            </div>
        )
        key++;
    }
    return mapped;
}

export default function ValuesRibbon(props) {
    const theme = useTheme();


    const [values, setValues] = useState(initialDataState)


    // get-set all values from fridge data
    const updateFridgeData = (frigeData) => {
        // TODO if more values need to be added from fridge data, add the values to the object as
        //  the third line ahead(line numbers may change).
        setValues(prevState => ({
            ...prevState,
            "Lab Temperature (C)": frigeData["PT 100 Bidon C"],
        }));
    };


    //
    // get-set all values from LN2 data
    const updateLiquidNitrogen = (scaleData) => {

        setValues(prevState => {
            return {
                ...prevState, "Liquid Nitrogen Level (kg)": scaleData["Weight"],
            };
        });
    };

    // get-set all values from websocket1
    const updateCryoSocketValues = (message) => {

        //TODO: replace message.data on next line with whatever specific
        // information we need from this received data. example message.data.temperatue
        // // also update "Lab Air Pressure" with whatever name you want to be shown (also used in initialDataState on top)
        if (message.data.startsWith("F")) {
            const message_arr = message.data.split(" ")
            setValues(prevState => ({

                ...prevState, "Lab Air Pressure (hPa)": message_arr[8],
            }));
        }

    };

    // TODO to add more sources of values copy the pattern below and remember to add updateData function just like
    // updateFridgeData.
    const getFridgeData = () => {
        axios.get("http://192.168.44.30/status.php")
            .then(res => {
                updateFridgeData(res.data);
            })
            .catch(console.log);
    };

    const getLN2Data = () => {
        axios.get("http://192.168.44.30/LN2weight.php")
            .then(res => {
                updateLiquidNitrogen(res.data);
            })
            .catch(console.log);
    };


    //setup the fridge data
    useEffect(() => {
        props.cryostatWS.addEventListener('message', updateCryoSocketValues);
        getLN2Data();
        getFridgeData();
        const interval = setInterval(() => {
            getLN2Data();
            getFridgeData();
        }, 10000);

        return () => {
            props.cryostatWS.removeEventListener('message', updateCryoSocketValues);
            clearInterval(interval);
        };
    }, [])  // includes empty dependency array


    return (
        <ColoredPaper color={theme.palette.tertiary} square variant={'outlined'} elevation={0}>
            <Grid item container direction='row' justify="flex-start" wrap="wrap" alignItems="stretch">
                {/*<Grid item container alignItems="flex-end">*/}

                {makeTabs(values)}

                {/*</Grid>*/}
            </Grid>
        </ColoredPaper>
    )


}
