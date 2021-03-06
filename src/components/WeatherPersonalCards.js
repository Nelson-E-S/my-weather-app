import React from 'react';
import WeatherCardb from './WeatherCardb';
import { connect } from 'react-redux';
import {Segment} from 'semantic-ui-react'

const mapStateToProps = state =>({
    myCardsState: state.myCardsState
})


const WeatherPersonalCards = props =>{
    const {myCardsState} = props;

    return(
        <Segment>
            <p>{myCardsState.personalCards.length===0?'No personal cards loaded...':'Your cards:'}</p>
            {myCardsState.personalCards.map((item,index)=><WeatherCardb index={index} parentData={item} key={index} personal={true}/>)}
        </Segment>
    )
}

export default connect(mapStateToProps)(WeatherPersonalCards);