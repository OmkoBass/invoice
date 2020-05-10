import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
} from "react-router-dom";

//antd css
import 'antd/dist/antd.css';

//Components
import LoginPage from "./Components/LoginPage";
import Invoicing from "./Components/Invoicing";
import Profile from "./Components/Profile";
import NotFound from "./Components/NotFound";

//css
import './Styles/global.css'

function App() {
    return <div>
        <Router>
            <Switch>
                <Route exact path='/' component={LoginPage}/>
                <Route exact path='/invoice' component={Invoicing}/>
                <Route exact path='/invoice/profile' component={Profile}/>
                <Route exact path='/404' component={NotFound}/>
                <Redirect to='/404'/>
            </Switch>
        </Router>
    </div>
}

export default App;
