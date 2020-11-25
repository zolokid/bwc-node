import React from 'react';
import { Route, Switch } from "react-router-dom";

import NavBarComponent from "./components/navbar";
import HomeComponent from "./components/home";
import HomeComponentRevo from "./components/homeRevo";
import HomeComponentYaris from "./components/homeYaris";

function App() {
    return (
        <div className="App">
            <NavBarComponent /> 
            <Switch>
                <Route path="/" exact component={HomeComponent} />
                <Route path="/toyota-revo" exact component={HomeComponentRevo} />
                <Route path="/toyota-yaris" exact component={HomeComponentYaris} />
            </Switch>

        </div>
    );
}

export default App;