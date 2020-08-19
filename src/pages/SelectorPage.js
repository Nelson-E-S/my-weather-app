import React from 'react';
import WeatherPersonalCards from '../components/WeatherPersonalCards';
import WeatherCardCase from '../components/WeatherCardCase';
import {connect} from 'react-redux';
import {Segment,Divider} from 'semantic-ui-react'

const mapStateToProps = state =>({
    myCardsState: state.myCardsState
})

const SelectorPage = props =>{
    //const {myCardsState} = props
    return(
        <Segment>
            <WeatherPersonalCards />
            <Divider />
            <WeatherCardCase />
        </Segment>
    )
}
export default connect(mapStateToProps)(SelectorPage);