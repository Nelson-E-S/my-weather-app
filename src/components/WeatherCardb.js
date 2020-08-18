import React, { Component } from 'react';
import axios from 'axios';

export default class WeatherCardb extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            loading: true,
            errors: '',
            currentIndex:0
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e){
        const {currentIndex,data} = this.state;
        switch (e.target.id){
            case 'prev':{
                if(currentIndex===0)
                    this.setState({currentIndex:data.length - 1})
                else
                    this.setState({currentIndex:currentIndex-1})
                break;
            }
            case 'next':{
                if(currentIndex===data.length-1)
                    this.setState({currentIndex:0})
                else
                    this.setState({currentIndex:currentIndex+1})
                break;
            }
            default: console.log(`Can't read event target id or invalid id`);
        }
    }
    componentDidMount(){
        const {parentData} = this.props;
        //console.log(parentData[0])
        const query = `https://api.weather.gov/zones/public/${parentData[0]}/forecast` 
        this.setState({
            loading: true
        })
        try{
            axios
                .get(query)
                .then(res=>{
                    console.log(res)
                    const periods = res.data.properties.periods
                    this.setState({
                        data: periods,
                        loading: false
                    })
                })
        }catch(err){
            this.setState({
                loading: false,
                errors: err.message
            })
        }
    }
    render(){
        const {data,loading,errors,currentIndex} = this.state;
        const {index,parentData} = this.props;
        if(loading){
            return(
            <div>
                <p>Loading weather card...</p>
            </div>
            )
        }
        if(errors){
            return(
                <div>
                    <h2><u>Weather Cards</u></h2>
                    <p>Error loading cards...</p>
                    <p>{errors.message}</p>
                </div>
            )
        }
        if(data.length>0){
            console.log(data)
            return(
                <div id={'Card'+index}>
                    <h2>{parentData[1] + ', ' + parentData[2]}</h2>
                    <h4>{data[currentIndex].name}</h4>
                    <p>{data[currentIndex].detailedForecast}</p>
                    <button id="prev" onClick={this.handleClick}>Previous</button>
                    <button id="next" onClick={this.handleClick}>Next</button>
                </div>
            )
        }
    }
}