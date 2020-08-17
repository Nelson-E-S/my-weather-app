import React, { Component } from 'react';
import WeatherCard from './WeatherCard';

class WeatherDisplayAllCards extends Component{
    constructor(props){
        super(props);
        this.state={
            parentData: [0,1,2]
        }
    }
    render(){
        return(
            <div>
                <h2><u>Weather Cards</u></h2>
                <div>
                {
                    this.state.parentData.map((item,index)=><WeatherCard parentData={item} key={index} index={index}/>)
                }
                </div>
            </div>
        );
    }
}

export default WeatherDisplayAllCards