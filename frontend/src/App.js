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
                <Route path="/campaign" exact component={HomeYarisComponent}/>
                <Route path="/campaign/toyota-yaris" exact component={HomeYarisComponent} basename="/campaign" />
                <Route path="/campaign/toyota-revo" exact component={HomeRevoComponent} basename="/campaign" />
            </Switch>

        </div>
    );
}

export default App;