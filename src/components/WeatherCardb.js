import React, { Component } from 'react';
import axios from 'axios';

export default class WeatherCardb extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            loading: false,
            errors: ''
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
        const {data,loading,errors} = this.state;
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
        if(data){
            return(
                <div id={'Card'+index}>
                    <h2>{parentData[1] + ', ' + parentData[2]}</h2>
                </div>
            )
        }
    }
}