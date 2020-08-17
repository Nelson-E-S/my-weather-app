import React, { Component } from 'react';
import WeatherCard from './WeatherCard';

class WeatherDisplayAllCards extends Component{
    constructor(props){
        super(props);
        this.state={
            parentData: []
        }
    }
    render(){
        return(
            <div>
                <h2><u>Weather CardsL</u></h2>
                {
                    this.state.parentData.map(
                        (item,index)=>{
                            <WeatherCard parentData={item} key={index} />
                        }
                    )
                }
            </div>
        );
    }
}