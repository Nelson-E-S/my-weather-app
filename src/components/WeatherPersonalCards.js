import React from 'react';
import WeatherCardb from './WeatherCardb';
import { connect } from 'react-redux';

const mapStateToProps = state =>({
    PCState: state.personalCards
})

const WeatherPersonalCards = props =>{
    const {PCState} = props;
    console.log(PCState)
    return(
        <div>
            TESTTING
        {/*personalCardsState.personalCards.length>0?
            personalCardsState.personalCards.map((item,index)=><WeatherCardb index={index} parentData={item} key={index}/>)
        :<p>No personal cards stored...</p>*/}
        </div>
    )
}

export default connect(mapStateToProps)(WeatherPersonalCards);