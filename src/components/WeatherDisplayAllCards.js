import React from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import WeatherCardb from './WeatherCardb';

const loadWeatherZones = async () =>{
    const res = await axios
                        .get('https://api.weather.gov/zones/public')
    if (!(res.status >= 200 && res.status < 300)) throw new Error(res.statusText);
    return res.data;
}

const WeatherDisplayAllCards = ()=>{
    const {data,error, isLoading} = useAsync({promiseFn: loadWeatherZones});
    if(isLoading) return(
        <div>
        <h2><u>Weather Cards</u></h2>
        <p>Loading zones...</p>
    </div>
    )
    if(error){
        return(
            <div>
                <h2><u>Weather Cards</u></h2>
                <p>Error loading cards...</p>
                <p>{error.message}</p>
            </div>
        )
    }
    const dataSetIDs = data.features.map((item,index)=>[item.properties.id,item.properties.name,item.properties.state]);
    let fiveRandoms = [ Math.floor(Math.random()*dataSetIDs.length),
                        Math.floor(Math.random()*dataSetIDs.length),
                        Math.floor(Math.random()*dataSetIDs.length),
                        Math.floor(Math.random()*dataSetIDs.length),
                        Math.floor(Math.random()*dataSetIDs.length)]
    return(
        <div>
            <h2><u>Weather Cards</u></h2>
            <WeatherCardb index={0} parentData={dataSetIDs[fiveRandoms[0]]} />
        </div>
    )
}

export default WeatherDisplayAllCards