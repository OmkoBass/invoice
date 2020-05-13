import React from 'react';

//Router
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
import Register from "./Components/Register";
import Invoicing from "./Components/Invoicing";
import NotFound from "./Components/NotFound";

//css
import './Styles/global.css'

/*const fire = firebase.firestore();

fire.collection('Times').add({
    title: 'Test',
    time: 15
})*/

function App() {
    return <div>
        <Router>
            <Switch>
                <Route exact path='/' component={LoginPage}/>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/invoice' component={Invoicing}/>
                <Route exact path='/404' component={NotFound}/>
                <Redirect to='/404'/>
            </Switch>
        </Router>
    </div>
}

export default App;
