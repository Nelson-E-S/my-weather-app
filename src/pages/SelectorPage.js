import React from 'react';
//import {connect} from 'react-redux';
import WeatherPersonalCards from '../components/WeatherPersonalCards';
import WeatherCardCase from '../components/WeatherCardCase';;

/*const mapStateToProps = state =>({
    myCardState: state.myCardState
})*/

const SelectorPage = props =>{
    //const {myCardState} = props;
    return(
        <div>
            <WeatherPersonalCards />
            <hr style={{height:'1px',width:'100%',background:'black'}} />
            <WeatherCardCase />
        </div>
    )
}
export default SelectorPage//connect(mapStateToProps)(SelectorPage)