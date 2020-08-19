import React from 'react';
import WeatherCardb from './WeatherCardb';
import { connect } from 'react-redux';

const mapStateToProps = state =>({
    personalCardState: state.personalCards
})

const WeatherPersonalCards = props =>{
    const {personalCardState} = props;
    return(
        <div>
        {personalCardState.personalCards.length>0?
            personalCardState.personalCards.map((item,index)=><WeatherCardb index={index} parentData={item} key={index}/>)
            :<p>No personal cards stored...</p>}
        </div>
    )
}

export default connect(mapStateToProps)(WeatherPersonalCards);