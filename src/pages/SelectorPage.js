import React from 'react';
import {connect} from 'react-redux';
import WeatherPersonalCards from '../components/WeatherPersonalCards';
import WeatherCardCase from '../components/WeatherCardCase';;

const mapStateToProps = state =>({
    personalCardState: state.personalCards
})

const SelectorPage = props =>{
    const {personalCardState} = props;
    return(
        <div>
            <WeatherPersonalCards />
            <hr />
            <WeatherCardCase />
        </div>
    )
}
export default connect(mapStateToProps)(SelectorPage)