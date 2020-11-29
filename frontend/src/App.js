import React from 'react';
import { Route, Switch } from "react-router-dom";

import NavBarComponent from "./components/navbar";
import HomeYarisComponent from "./components/home";
import HomeRevoComponent from "./components/home_revo";
import TagManager from 'react-gtm-module';
 
const tagManagerArgs = {
    gtmId: 'GTM-M4P8TZJ'
}
 
TagManager.initialize(tagManagerArgs)

function App() {
    return (
        <div className="App">
            <NavBarComponent /> 
            <Switch>
                <Route path="/" exact component={HomeYarisComponent}/>
                <Route path="/toyota-yaris" exact component={HomeYarisComponent} basename="/toyota-yaris" />
                <Route path="/toyota-revo" exact component={HomeRevoComponent} basename="/toyota-revo" />
            </Switch>

        </div>
    );
}

export default App;