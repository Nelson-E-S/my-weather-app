import React, { useState } from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import WeatherCardb from './WeatherCardb';

const loadWeatherZones = async () =>{
    const res = await axios
                        .get('https://api.weather.gov/zones/public')
    if (!(res.status >= 200 && res.status < 300)) throw new Error(res.statusText);
    return res.data;
}

const getShowCardsArr = (num,len) =>{
    let tempArr = []
    for(let i = 0; i<num; i++){
        tempArr.push(Math.floor(Math.random()*len))
    }
    return tempArr
}

const WeatherDisplayAllCards = ()=>{
    const [showCards,setShowCards] = useState({
        showCardsArr: []
    })
    const {data,error, isLoading} = useAsync({promiseFn: loadWeatherZones});
    console.log(`isLoading:${isLoading}`)
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
    if(data && !isLoading){
        const dataSetIDs = data.features.map((item,index)=>[item.properties.id,item.properties.name,item.properties.state]);
        let tempArr = getShowCardsArr(10,dataSetIDs.length)
        console.log(tempArr)
        /*setShowCards({
            showCardsArr: tempArr
        })*/
        return(
            <div>
                <h2><u>Weather Cards</u></h2>
                {/*showCards.showCardsArr.map((item,index)=><WeatherCardb index={index} parentData={dataSetIDs[item]} key={index} />)*/}
            </div>
        )
    }
}

export default WeatherDisplayAllCards