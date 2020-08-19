import React from 'react';
import WeatherCardb from './WeatherCardb';
import { connect } from 'react-redux';

const mapStateToProps = state =>({
    myCardsState: state.myCardsState
})

const WeatherPersonalCards = props =>{
    const {myCardsState} = props;
    return(
        <div>
            {myCardsState.personalCards.length===0?'No personal cards loaded...':null}
            {myCardsState.personalCards.map((item,index)=><WeatherCardb index={index} parentData={item} key={index} personal={true}/>)}
        </div>
    )
}

export default connect(mapStateToProps)(WeatherPersonalCards);