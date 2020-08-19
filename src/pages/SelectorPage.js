import React from 'react';
import WeatherPersonalCards from '../components/WeatherPersonalCards';
import WeatherCardCase from '../components/WeatherCardCase';
import {connect} from 'react-redux';

const mapStateToProps = state =>({
    myCardsState: state.myCardsState
})

const SelectorPage = props =>{
    const {myCardsState} = props
    return(
        <div>
            <WeatherPersonalCards />
            <hr style={{height:'1px',width:'100%',background:'black'}} />
            <WeatherCardCase />
        </div>
    )
}
export default connect(mapStateToProps)(SelectorPage);