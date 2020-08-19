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
        {myCardsState.personalCards.length>0?
            myCardsState.personalCards.map((item,index)=><WeatherCardb index={index} parentData={item} key={index}/>)
        :<p>No personal cards stored...</p>}
        </div>
    )
}

export default connect(mapStateToProps)(WeatherPersonalCards);