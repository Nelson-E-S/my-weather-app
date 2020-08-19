import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {CARD_ADD,CARD_REMOVE} from '../actions/cardActions'
import {Card,Button,Loader} from 'semantic-ui-react'

const mapStateToProps = state =>({
    myCardsState: state.myCardsState
})

//requires parentData[zoneId,name,state]
//requires index
class WeatherCardb extends Component{
    _isMounted = false;
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
    componentDidMount(){
        this._isMounted = true;
        
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
                    if (this._isMounted) {
                        this.setState({
                            data: periods,
                            loading: false,
                            name: parentData[1],
                            state: parentData[2]
                        })
                    }
                })
        }catch(err){
            this.setState({
                loading: false,
                errors: err.message
            })
        }
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    render(){
        const {data,loading,errors,currentIndex,name,state} = this.state;
        const {index,personal} = this.props;
        if(loading){
            return(
            <div>
                <Card>
                    <Card.Content header="One moment please..." />
                    <Card.Content meta="........." />
                    <Card.Content description="........"/>
                    <Loader active />
                </Card>
            </div>
            )
        }
        if(errors){
            return(
                <Card>
                    <Card.Content header="No data" />
                    <Card.Content meta="error" />
                    <Card.Content description="refresh the page to try again"/>
                </Card>
            )
        }
        if(data.length>0){
            if(personal){
                return(
                    <Card id={'Card'+index}>
                        <Card.Content header={name + ', ' + state} />
                        <Card.Content meta={data[currentIndex].name} />
                        <Card.Content description={data[currentIndex].detailedForecast} />
                        <Card.Content extra>
                            <Button id="prev" onClick={this.handleClick}>Previous</Button>
                            <Button id="next" onClick={this.handleClick}>Next</Button><br />
                            <Button id="rem" onClick={this.handleClick}>Remove Card</Button>
                        </Card.Content>
                    </Card>
                )
            }
            else{
                return(
                    <Card id={'Card'+index}>
                        <Card.Content header={name + ', ' + state} />
                        <Card.Content meta={data[currentIndex].name} />
                        <Card.Content description={data[currentIndex].detailedForecast} />
                        <Card.Content extra>
                            <Button id="prev" onClick={this.handleClick}>Previous</Button>
                            <Button id="next" onClick={this.handleClick}>Next</Button>
                        </Card.Content>
                        <Card.Content extra>
                            <Button id="add" onClick={this.handleClick}>Add Card</Button>
                        </Card.Content>
                    </Card>
                )
            }
        }
    }
}

export default connect(mapStateToProps)(WeatherCardb);