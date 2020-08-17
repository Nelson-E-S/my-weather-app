import React from 'react';
import WeatherCard from './WeatherCard';
import axios from 'axios';
import { useAsync } from 'react-async';

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
        //console.log(error)
        return(
            <div>
                <h2><u>Weather Cards</u></h2>
                <p>Error loading cards...</p>
                <p>{error.message}</p>
            </div>
        )
    }
    //console.log(data.features.map((item,index)=>item.properties.id))
    const dataSetIDs = data.features.map((item,index)=>[item.properties.id,item.properties.name,item.properties.state]);
    let fiveRandoms = [ Math.floor(Math.random()*dataSetIDs.length),
                        Math.floor(Math.random()*dataSetIDs.length),
                        Math.floor(Math.random()*dataSetIDs.length),
                        Math.floor(Math.random()*dataSetIDs.length),
                        Math.floor(Math.random()*dataSetIDs.length)]
    console.log(fiveRandoms);
    return(
        <div>
            <h2><u>Weather Cards</u></h2>
            <WeatherCard index={fiveRandoms[0]} parentData={dataSetIDs[fiveRandoms[0]]} />
        </div>
    )
}

export default WeatherDisplayAllCards