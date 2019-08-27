import React,{useEffect} from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Switch, Route, withRouter} from "react-router-dom";
import "semantic-ui-css/semantic.min.css"
import firebase from "./Firebase";

//store state 
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(()=>{},composeWithDevTools());

const Root = (props)=>{

    useEffect(()=>{
        console.log("checking useeffect...")
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                props.history.push("/")
            }
        });
    },[]);

    return(<Switch>
                <Route exact path="/" component={App} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Switch>);
}

const RouterWithApp = withRouter(Root)

ReactDOM.render(
        <Provider store={store}>
            <Router>
                <RouterWithApp/>
            </Router>
        </Provider>
        , document.getElementById('root'));
registerServiceWorker();
