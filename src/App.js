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


function App() {
  return (
    <div className="App">
        <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/UserPage">User Page</Link>
            </li>
          </ul>
        </nav>

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
      </div>
    </Router>
    </div>
  );
}

export default App;
