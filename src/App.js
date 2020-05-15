import React from 'react';

//Router
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

//antd css
import 'antd/dist/antd.css';

//Components
import LoginPage from "./Components/LoginPage";
import Register from "./Components/Register";
import Invoicing from "./Components/Invoicing";
import NotFound from "./Components/NotFound";

//css
import './Styles/global.css';


function App() {
    /*const [authenticated, setAuthenticated] = useState(firebase.auth().currentUser ? true : false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if(user) {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }

            console.log(`I'm in useEffect! ${authenticated}`)
        })
    }, [authenticated])

    //If user is not authenticated it will put them back to home page
    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            authenticated
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/',
                    /!*state: { from: props.location }*!/
                }} />
        )} />
    );

    const authenticate = () => {
        setAuthenticated(true);
    }*/

    return <div>
        <Router>
            <Switch>
                <Route exact path='/' component={LoginPage}/>
                {/*<PrivateRoute exact path='/register' component={Register}/>*/}
                {/*<PrivateRoute exact path='/invoice' component={Invoicing}/>*/}
                <Route exact path='/register' component={Register}/>
                <Route exact path='/invoice' component={Invoicing}/>
                <Route exact path='/404' component={NotFound}/>
                <Redirect to='/404'/>
            </Switch>
        </Router>
    </div>
}

export default App;
