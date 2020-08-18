//**************************************************
//*DONT USE, DOESN'T WORK, USE WeatherCardb instead*
//**************************************************
import React, { useState } from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';

var zoneId = '';
const loadWeather = async () =>{
    const res = await axios
                        .get(zoneId)
    if (!(res.status >= 200 && res.status < 300)) throw new Error(res.statusText);
    return res.data;
}

const WeatherCard = props =>{
    const [fIndex, setFIndex] = useState({
        index:0
    })
    zoneId = `https://api.weather.gov/zones/public/${props.parentData[0]}/forecast`;
    const {data,error, isLoading} = useAsync({promiseFn: loadWeather});
    data===undefined?console.log('loading data...'):console.log(`zoneid: ${zoneId}\nparentData:${props.parentData}\ndata:`)
    data===undefined?console.log(`...`):console.log(data.properties.periods)
    if(isLoading) return(
        <div>
        <p>Loading weather card...</p>
    </div>
    )
    if(error){
        //console.log(error)
        return(
            <div>
                <p>Error loading card...</p>
                <p>{error.message}</p>
            </div>
        )
    }

    let forecast = data.properties.periods;
    const updateFIndex = (e) =>{
        let updateNumber = fIndex.index;
        if (e.target.id==="1"){
            if (updateNumber===0)
                updateNumber = forecast.length-1
            else
                updateNumber--
        }
        if (e.target.id==="2"){
            if (updateNumber===forecast.length-1)
                updateNumber = 0
            else
                updateNumber++
        }
        setFIndex({index:updateNumber});
    }
    //console.log(forecast)
    return(
        <div id={"Card"+props.index}>
            <div>
                <h2>{props.parentData[1] + ', ' + props.parentData[2]}</h2>
                <h4>{forecast[fIndex.index].name}</h4>
                <p>{forecast[fIndex.index].detailedForecast}</p>
                <button id="1" onClick={updateFIndex}>Previous</button>
                <button id="2" onClick={updateFIndex}>Next</button>
            </div>
        </div>
    )
}

export default WeatherCard;