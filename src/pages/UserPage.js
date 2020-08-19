import React from 'react'
import WeatherPersonalCards from '../components/WeatherPersonalCards';
import {Segment,Button,Divider} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const UserPage = () =>{
    return(
        <Segment>
            <WeatherPersonalCards />
            <Divider />
            <Link to="/SelectorPage"><Button>Add Cards</Button></Link>
        </Segment>
    )
}

export default UserPage