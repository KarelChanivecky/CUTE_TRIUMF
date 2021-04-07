/**
 * Models a data point set of values as received from the sensor php script.
 *
 * @param {string} timeStamp The moment the values were read. Format: 2021-03-24 15:12:39
 * @param {Object} values
 * @constructor
 */
function DataPointSet(timeStamp, values) {
    this.timeStamp = timeStamp;
    this.values = values;

    /**
     * Map the values into AMDataPoints
     * @return {AMDataPoint[]}
     */
    this.toAMDataPoints = () => {
        const AMDataPoints = [];
        for (let val in this.values) {
            AMDataPoints.push(new AMDataPoint(val, this.timeStamp, this.values[val]));
        }
        return AMDataPoints;
    }
}


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
 * Maps the list of objects return by the data php script into DataPoints.
 *
 * @param {Object[]} dataObjects
 * @return {DataPointSet[]}
 */
function mapObjectsToDataPoint(dataObjects) {
    return dataObjects.map(dataObj => {
        const {ts, ...values} = dataObj;
        return new DataPointSet(ts, values);
    });
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


/**
 * Maps the values in data point set to series
 *
 * @param {DataPointSet[]} dataPointSets
 * @return {Array<Array<AMDataPoint>>}
 */
function toSeriesData(dataPointSets) {
    const series = {};
    dataPointSets.forEach(dataPointSet => {
        const dataPoints = dataPointSet.toAMDataPoints();
        dataPoints.forEach(dataPoint => {
            if (!(dataPoint.name in series)) {
                series[dataPoint.name] = [];
            }
            series[dataPoint.name].push(dataPoint);

        });
    });
    return series;
}


const ThermoNames = {
    "RuO2_MC": null,
    "Cernox_MC": null,
    "RuO2_CP": null,
    "Cernox_Still": null,
    "4K": null,
    "60K": null
};


/**
 * Discriminate between pressure and thermometer sensors.
 *
 * @param {Array<Array<AMDataPoint>>} series
 * @return {Object}
 */
function discriminateSensors(series) {
    const thermos = [];
    const press = [];
    for (let s in series) {
        const amDataPoint = series[s][0];
        if (amDataPoint.name in ThermoNames) {
            thermos.push(series[s]);
        } else {
            press.push(series[s]);
        }
    }
    return {thermos, press};
}

/**
 * Convert data objects obtained from server php into series used by amcharts.
 * @param dataObjects
 * @param {Number}dataPointResolution How many points will be rendered from all the available in the data
 * @return {Object<ChartData, ChartData>}
 */
export function convertToChartData(dataObjects, dataPointResolution=400) {
    const mapped = mapObjectsToDataPoint(dataObjects);
    const sampled = takeSamples(mapped, dataPointResolution);
    const series = toSeriesData(sampled);
    const {thermos, press} = discriminateSensors(series);
    const thermosChartData = new ChartData("Thermometers", "Temperature (K)", thermos);
    const pressChartData = new ChartData("Pressure gauges", "Pressure (mbar)", press);
    return {thermosChartData, pressChartData};
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