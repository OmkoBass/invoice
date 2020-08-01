import React from 'react';

//Router
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

//Context
import { AuthProvider } from "./Components/Auth";

//Ant css
import 'antd/dist/antd.css';

//Components
import LoginPage from "./Components/LoginPage";
import Register from "./Components/Register";
import Invoicing from "./Components/Invoicing";
import NotFound from "./Components/NotFound";
import Success from "./Components/Success";

//css
import './Styles/global.css';
import './Styles/FileUpload.css';
import './Styles/Footer.css';

function App() {
    return <AuthProvider>
        <Router>
            <Switch>
                <Route exact path='/register/successful' component={Success}/>
                <Route exact path='/register' component={Register}/>
                <Route path='/invoice' component={Invoicing}/>
                <Route exact path='/404' component={NotFound}/>
                <Route exact path='/' component={LoginPage}/>

                <Redirect to='/404'/>
            </Switch>
        </Router>
    </AuthProvider>
}

export default App;
