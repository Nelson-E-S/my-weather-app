import React from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';

var zoneId = '';
const loadWeather = async () =>{
    const res = await axios
                        .get(`https://api.weather.gov/zones/public/${zoneId}/forecast`)
    if (!(res.status >= 200 && res.status < 300)) throw new Error(res.statusText);
    return res.data;
}

const WeatherCard = props =>{
    zoneId = props.parentData[0];
    const {data,error, isLoading} = useAsync({promiseFn: loadWeather});
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
    const forecast = data.properties.periods;
    //console.log(forecast[current])
    return(
        <div id={"Card"+props.index}>
            <div>
                <h2>{props.parentData[1] + ', ' + props.parentData[2]}</h2>
                <h4>{forecast[0].name}</h4>
                <p>{forecast[0].detailedForecast}</p>
            </div>
        </div>
    )
}

export default WeatherCard;