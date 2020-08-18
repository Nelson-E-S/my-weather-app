import React, { Component } from 'react';
import axios from 'axios';
import WeatherCardb from './WeatherCardb';

export default class WeatherCardCase extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            loading: true,
            errors: '',
            currentCards:[],
            cardAmount: 10
        }
        this.handleChange = this.handleChange.bind(this);
        this.initCards = this.initCards.bind(this);
    }
    handleChange(e){
        const {currentCards,data} = this.state;
        switch (e.target.id){
            default: console.log(`Can't read event target id or invalid id`);
        }
    }
    componentDidMount(){
        const query = 'https://api.weather.gov/zones/public' 
        this.setState({
            loading: true
        })
        try{
            axios
                .get(query)
                .then(res=>{
                    //console.log(res)
                    const features = res.data.features
                    const dataSetIDs = features.map((item)=>[item.properties.id,item.properties.name,item.properties.state]);
                    this.setState({
                        data: dataSetIDs,
                        loading: false
                    })
                    this.initCards(dataSetIDs.length)
                })
        }catch(err){
            this.setState({
                loading: false,
                errors: err.message
            })
        }
    }
    initCards(len,arr=[]){
        const {cardAmount} = this.state;
        let tempArr = [];
        console.log(arr===true)
        if(arr.length>0){
            console.log("nothing")
        }
        else{
            for(let i=0;i<cardAmount;i++)
                tempArr.push(Math.floor(Math.random()*len))
        }
        this.setState({currentCards:tempArr})
    }
    render(){
        const {data,loading,errors,currentCards} = this.state;
        if(loading){
            return(
                <div>
                    <h2><u>Weather Cards</u></h2>
                    <p>Loading zones...</p>
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
            //console.log(data)
            return(
                <div>
                    <h2><u>Weather Cards</u></h2>
                    {currentCards.map((item,index)=><WeatherCardb index={index} parentData={data[item]} key={index} />)}
                </div>
            )
        }
    }
}