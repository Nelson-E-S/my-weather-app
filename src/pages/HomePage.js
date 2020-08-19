import React from 'react'
import {Header, Icon} from 'semantic-ui-react' 

const HomePage = () =>{
    return(
        <Header as='h1' icon textAlign='center' color="yellow">
            <Icon name='sun outline' color="yellow" circular />
            <Header.Content>Welcome to my Weather App</Header.Content>
        </Header>
    )
}

export default HomePage;