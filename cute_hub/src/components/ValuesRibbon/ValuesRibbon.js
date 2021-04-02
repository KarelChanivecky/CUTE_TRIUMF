import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Box, Container, Grid, Tab, Tabs, useTheme } from "@material-ui/core";
import ColoredPaper from "../../components/ColoredPaper/ColoredPaper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        
        fontSize: '0.8rem',
    }
}));

//TODO: update this array with the name of the variable to be shown and its placeholder value
const arr1 = {
    "Liquid Nitrogen Level": "xyz",
    "Lab Area Pressure": "abc"
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

    const makeTabs = (arr) => {
        let mapped = []
        let key = 1
        for (let element in arr) {
            mapped.push(<Tab label={`${element}: ${arr[element]}`} key={key.toString()}  className={classes.root} disabled={true}/>)
            key++;
        };
        return mapped;
    }


    const [values, setValues] = useState(arr1)
    const [tabs, setTabs] = useState(makeTabs(values))

    const getData = async () => {
        try {
            const fridge = await axios.get("https://cdms-webapp.slac.stanford.edu/www/cute/fridge/status.php")
            setData(fridge.data);  // set State

        } catch (err) {
            console.error(err.message);
        }
    };

    // get-set all values from fridge data
    const updateValues1 = async () => {
        const temp = values
        // TODO: update "Liquid Nitrogen Level" with whatever name you want to be shown (also used in arr1 on top)
        temp["Liquid Nitrogen Level"] = data["4K STAGE"]
        setValues(temp);
        setTabs(makeTabs(values))
    };

    // get-set all values from websocket1
    const updateValues2 = async (message) => {
        console.log("message : " + message.data)
        const temp = values

        //TODO: replace message.data on next line with whatever specific
        // information we need from this received data. example message.data.temperatue
        // // also update "Lab Area Pressure" with whatever name you want to be shown (also used in arr1 on top)
        temp["Lab Area Pressure"] = message.data 
        setValues(temp);
        setTabs(makeTabs(values))

    };

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
    }, [data])  // includes empty dependency array

    //adds an event listener to the websocket and acts when it recieves a response.
    useEffect(() => {
        props.cryostatWS.addEventListener('message', updateValues2, true)
        return () => props.cryostatWS.removeEventListener('message', updateValues2, true);
    })

    return (
        <ColoredPaper color={theme.palette.tertiary} square variant={'outlined'} elevation={0}>
            <Grid item container direction='row' justify="center" wrap="wrap" alignItems="stretch">
                {/*<Grid item container alignItems="flex-end">*/}
                <Tabs
                    value={0}
                    TabIndicatorProps={{  
                        style: {
                            display: "none",
                        },
                      }}
                    textColor="inherit"
                    centered>
                    {tabs}
                </Tabs>
                {/*</Grid>*/}
            </Grid>
        </ColoredPaper>
    )


}
