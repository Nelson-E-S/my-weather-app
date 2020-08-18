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
            cardAmount: 5,
            statesAvailable: [],
            selectedState: '',
            zonesAvailable: [],
            selectedZone: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.initCards = this.initCards.bind(this);
    }
    handleChange(e){
        switch (e.target.id){
            case 'statePicker':{
                const {data,selectedState} = this.state
                const tempArr = data.filter(item=>item[2]===e.target.value);
                this.setState({
                    selectedState: e.target.value,
                    zonesAvailable: tempArr,
                    selectedZone: tempArr[0][1]
                })               
                break;
            }
            case 'zonePicker':{
                this.setState({selectedZone: e.target.value})
                break;
            }
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
                    const tempArr = [...new Set(dataSetIDs.map(item=>item[2]))].map(item=>{return{value:item,label:item}}); //grabbing a disnct set of states{value:'',label:''}
                    const tempArr2 = dataSetIDs.filter(item=>item[2]===tempArr[0].value);
                    //tempArr.unshift({value:'',label:'Select a State'});
                    //tempArr2.unshift(['','Select a Zone','']);
                    this.setState({
                        data: dataSetIDs,
                        statesAvailable: tempArr,
                        selectedState: tempArr[0].value,
                        zonesAvailable: tempArr2,
                        selectedZone: tempArr[0][1],
                        loading: false
                    })
                    //this.updateZones()
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
        if(arr.length>0){
            tempArr = arr;
        }
        else{
            for(let i=0;i<cardAmount;i++)
                tempArr.push(Math.floor(Math.random()*len))
        }
        this.setState({currentCards:tempArr})
    }
    render(){
        const {
            data,
            loading,
            errors,
            currentCards,
            statesAvailable,
            selectedState,
            zonesAvailable,
            selectedZone
        } = this.state;
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
                    <select value={selectedState} id="statePicker" onChange={this.handleChange}>
                        {statesAvailable.map((item,index)=><option value={item.value} key={index}>{item.label}</option>)}
                    </select>
                    <select value={selectedZone} id="zonePicker" onChange={this.handleChange}>
                        {zonesAvailable.map((item,index)=><option value={item[1]} key={index}>{item[1]}</option>)}
                    </select>
                    {currentCards.map((item,index)=><WeatherCardb index={index} parentData={data[item]} key={index} />)}
                </div>
            )
        }
    }
}