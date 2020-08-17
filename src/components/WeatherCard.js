import React from 'react';

const WeatherCard = props =>{
    if(props.parentData.length===0)
        return(
            <div>Weather Card loading...</div>
        )
    else
        return(
            <div id={"Card"+props.index}>{props.parentData}</div>
        )
}

export default WeatherCard;