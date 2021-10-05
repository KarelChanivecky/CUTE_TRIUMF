/**
 * Models a data series
 *
 * @param {string} name
 * @param {string} timeStamp
 * @param {Number} value
 * @constructor
 */
function AMDataPoint(name, timeStamp, value) {
    this.name = name;
    this.date = new Date(timeStamp);
    this.value = value;
}

/**
 * Models the data needed to generate a char
 * @param {string} title
 * @param {string} unit
 * @param {Array<Array<AMDataPoint>>}series
 * @constructor
 */
function ChartData(title, unit, series) {
    this.title = title;
    this.unit = unit;
    this.series = series;
}


const dbTables = ["fridge_output", "compressor_output", "peltier_output","atmPressure", "tankWaterLevel", "damperPosition_A", "damperPosition_B","damperPosition_C","stagePosition_A", "stagePosition_B","stagePosition_C"];

//map the database names to what we want the legend to display
const tableMap = {
    "damperPosition_A" : "Damper A",
    "damperPosition_B" : "Damper B",
    "damperPosition_C" : "Damper C",
    "stagePosition_A" : "Stage A",
    "stagePosition_B" : "Stage B",
    "stagePosition_C" : "Stage C",
    "atmPressure" : "Lab Air Pressure",
    "tankWaterLevel" : "Water Level",
    "P1":"P1",
    "P2":"P2",
    "P3":"P3",
    "K3":"K3",
    "K4":"K4",
    "K5":"K5",
    "K6":"K6",
    "K8":"K8",
    "RuO2_MC": "MC (RuOx)",
    "Cernox_MC": "MC (Cernox)",
    "RuO2_CP": "CP",
    "Cernox_Still": "ST",
    "4K": "4K",
    "60K": "60K",
    "PT100":"Lab Temperature",
};

//define the different charts that we want to make and which data series go into it
const chartInfoMap = {
    "thermometers" : {
        "title":"Thermometers",
        "unit":"Temperature (K)",
        "keys":["RuO2_MC", "Cernox_MC", "RuO2_CP", "Cernox_Still", "4K", "60K"],
    },
    "gauges" : {
        "title":"Pressure Gauges",
        "unit":"Pressure (mbar)",
        "keys":["P1", "P2", "P3", "K3", "K4", "K5", "K6", "K8"],
    },
    "suspension" : {
        "title":"Suspension System",
        "unit":"Position (mm)",
        "keys":["damperPosition_A", "damperPosition_B", "damperPosition_C", "stagePosition_A", "stagePosition_B", "stagePosition_C"],
    },
    "lab_pressure" : {
        "title":"Lab Air Temperature",
        "unit":"Temperature (\u00b0C)",
        "keys":["PT100"],
    },
    "air_pressure" : {
        "title":"Lab Air Pressure",
        "unit":"Pressure (hPa)",
        "keys":["atmPressure"],
    },
}

function makeAMDataSeries(data){
    var seriesDict = {};
    //loop over the different tables in the data
    for (const [key,value] of Object.entries(data)){
        //loop over all the rows returned for each table
        for (const row of value){
            const {timestamp, ...values} = row;
            //

            //if one of the keys is "val"
            if (values["val"]){
                if (!seriesDict[key]){
                    seriesDict[key] = [];
                }
                var point = new AMDataPoint(tableMap[key], timestamp, values["val"]);
                seriesDict[key].push(point);
            }
            //otherwise loop through all of the different column names
            else {
                for (let col in values){
                    if (!seriesDict[col]){
                        seriesDict[col] = [];
                    }
                    var point = new AMDataPoint(tableMap[col], timestamp, values[col]);
                    seriesDict[col].push(point);
                }
            }

        }
    }
    return seriesDict;

}

/**
 * Select a number of DataPoints based on their timeStamp.
 *
 * The sampled DataPoints will represent an equal distribution across the timeline represented by the data.
 *
 * @param {DataPointSet[]} dataPoints
 * @param {Number} count The number of points to select.
 */
function takeSamples(dataPoints, count) {
    if (dataPoints.length <= count) {
        return dataPoints;
    }
    const spread = Math.floor(dataPoints.length / count);
    let spreadRemainder = dataPoints.length % count;
    const samples = [];
    let i = 0;
    while (i < dataPoints.length) {

        samples.push(dataPoints[i]);
        i += spread;
        if (0 < spreadRemainder) {
            // if the count cannot be spread evenly across the number of datapoints, we will take the remainder
            // and spread it as we go. By definition, the remainder will be less than the count, hence it will
            // result in a more even spread
            spreadRemainder--;
            i++;
        }
    }
    return samples;
}

function makeChartSeries(seriesDict, nPoints=500){
    var chartLs = []; //list of chart data that will be used for plotting

    //loop over the different charts we can make
    for (var [chartKey,obj] of Object.entries(chartInfoMap)){
        var series_ls = []; //list to add the different data series to
        //loop over the different series from the data
        //for (var [key, ls] of Object.keys(seriesDict)){
        for (var key of Object.keys(seriesDict)){
            //if one of the keys is in the chart data add the series to our series list
            if (obj.keys.includes(key)){
                var sampled_ls = takeSamples(seriesDict[key], nPoints)
                series_ls.push(sampled_ls); //push the series into our series list
            }
        }
        //if the series_ls dictionary isn't empty
        if ( series_ls.length != 0 ){
            //make the ChartData object and push it into the chart list
            chartLs.push(new ChartData(obj.title, obj.unit, series_ls));
        }
    }
    return chartLs;

}

export function parseChartData(data, nPoints=500){
//function that parses the JSON data from the API call and formats it so that it can be used to make the charts
    var seriesDict=makeAMDataSeries(data);
    var chartLs= makeChartSeries(seriesDict, nPoints);
    return chartLs;
}


