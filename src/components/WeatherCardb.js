import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {CARD_ADD,CARD_REMOVE} from '../actions/cardActions'

const mapStateToProps = state =>({
    myCardsState: state.myCardsState
})

//requires parentData[zoneId,name,state]
//requires index
class WeatherCardb extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            loading: true,
            errors: '',
            currentIndex:0,
            name: '',
            state: '',
            isPersonal: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e){
        const {currentIndex,data} = this.state;
        const {parentData,dispatch,myCardsState} = this.props;
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
            case 'add':{
                if(myCardsState.personalCards.length<5)
                    dispatch({type:CARD_ADD,payload:parentData})
                else
                    alert('You can only have 5 cards max! \nRemove some cards then try again...')
                break;
            }
            case 'rem':{
                for(let index in myCardsState.personalCards){
                    //console.log(myCardsState.personalCards[index][0] + ' ?= '+ parentData[0])
                    if(myCardsState.personalCards[index][0] === parentData[0])
                        dispatch({type:CARD_REMOVE,payload:index})
                }
                break;
            }
            default: console.log(`Can't read event target id or invalid id`);
        }
    }
    componentWillMount(){
        const {parentData} = this.props;
        const query = `https://api.weather.gov/zones/public/${parentData[0]}/forecast` 
        this.setState({
            loading: true
        })
        try{
            axios
                .get(query)
                .then(res=>{
                    const periods = res.data.properties.periods
                    this.setState({
                        data: periods,
                        loading: false,
                        name: parentData[1],
                        state: parentData[2]
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
        const {data,loading,errors,currentIndex,name,state} = this.state;
        const {index,personal} = this.props;
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
                    <p>Error loading card...</p>
                    <p>{errors.message}</p>
                </div>
            )
        }
        if(data.length>0){
            if(personal){
                return(
                    <div id={'Card'+index}>
                        <h2>{name + ', ' + state}</h2>
                        <h4>{data[currentIndex].name}</h4>
                        <p>{data[currentIndex].detailedForecast}</p>
                        <button id="prev" onClick={this.handleClick}>Previous</button>
                        <button id="next" onClick={this.handleClick}>Next</button><br />
                        <button id="rem" onClick={this.handleClick}>Remove Card</button>
                    </div>
                )
            }
            else{
                return(
                    <div id={'Card'+index}>
                        <h2>{name + ', ' + state}</h2>
                        <h4>{data[currentIndex].name}</h4>
                        <p>{data[currentIndex].detailedForecast}</p>
                        <button id="prev" onClick={this.handleClick}>Previous</button>
                        <button id="next" onClick={this.handleClick}>Next</button><br />
                        <button id="add" onClick={this.handleClick}>Add Card</button>
                    </div>
                )
            }
        }
    }
}

export default connect(mapStateToProps)(WeatherCardb);