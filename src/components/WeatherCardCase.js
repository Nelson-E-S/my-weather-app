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
            selectedZone: '',
            selectedZoneData: '',
            showCustomCard: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.initCards = this.initCards.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleChange(e){
        switch (e.target.id){
            case 'statePicker':{
                const {data} = this.state
                const tempArr = data.filter(item=>item[2]===e.target.value);
                this.setState({
                    selectedState: e.target.value,
                    zonesAvailable: tempArr,
                    selectedZone: tempArr[0][1],
                    selectedZoneData: tempArr[0]
                })               
                break;
            }
            case 'zonePicker':{
                const {zonesAvailable} = this.state
                let zoneData = []
                zonesAvailable.forEach(el=>el[1]===e.target.value?zoneData=el:[])
                this.setState({
                    selectedZone: e.target.value,
                    selectedZoneData: zoneData
                })
                break;
            }
            default: console.log(`Can't read event target id or invalid id`);
        }
    }
    handleClick(e){
        switch (e.target.id){
            case 'show':{
                this.setState({showCustomCard:true})
                break;
            }
            case 'hide':{
                this.setState({showCustomCard:false})
                break
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
                        selectedZone: tempArr2[0][1],
                        selectedZoneData: tempArr2[0],
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
            selectedZone,
            showCustomCard,
            selectedZoneData
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
            return(
                <div>
                    <h2><u>Weather Cards</u></h2>
                    <select value={selectedState} id="statePicker" onChange={this.handleChange}>
                        {statesAvailable.map((item,index)=><option value={item.value} key={index}>{item.label}</option>)}
                    </select>
                    <select value={selectedZone} id="zonePicker" onChange={this.handleChange}>
                        {zonesAvailable.map((item,index)=><option value={item[1]} key={index}>{item[1]}</option>)}
                    </select>
                    <button id="show" onClick={this.handleClick}>Show Card</button>
                    <button id="hide" onClick={this.handleClick}>Hide Card</button>
                    {showCustomCard?<WeatherCardb index={'Custom'} parentData={selectedZoneData}/>:null}
                    {currentCards.map((item,index)=><WeatherCardb index={index} parentData={data[item]} key={index} />)}
                </div>
            )
        }
    }
}