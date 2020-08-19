import React from 'react';
import './styles/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SelectorPage from './pages/SelectorPage'
import UserPage from './pages/UserPage'
import HomePage from './pages/HomePage'
import { List,Segment } from 'semantic-ui-react'
import ReactPlayer from 'react-player'


function App() {
  return (
    <Segment id="change">
      <ReactPlayer id="myVideo" url='https://www.youtube.com/watch?v=Ul_r4_QMAV8' muted={true} loop={true} playing={true} />
      <div id="overlayVideo"></div>
    <Segment className="App">
        <Router>
          <List link horizontal divided relaxed size="large">
          <List.Item active><Link to="/">Home</Link></List.Item>
          <List.Item><Link to="/UserPage">Your Cards</Link></List.Item>
          </List>
        
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/SelectorPage">
                <SelectorPage />
              </Route>
              <Route path="/UserPage">
                <UserPage />
              </Route>
              <Route exact path="/">
                <HomePage />
              </Route>
            </Switch>
        </Router>
    </Segment>
    </Segment>
  );
}

export default App;
