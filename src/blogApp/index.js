import React,{Component} from 'react';
import ReactDOM from 'react-dom'
import {Provider} from "react-redux";
import {createStore,applyMiddleware} from "redux";
import PostIndex from './components/post_index';
import PostNew from './components/post_new';
import ShowPost from './components/post_show';
import reducers from './reducers';
import  {BrowserRouter, Route,Switch} from 'react-router-dom';
import ReduxPromise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);


ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <Switch>
                <Route path="/posts/new" component={PostNew}/>  
                <Route path="/posts/:id" component={ShowPost}/>  
                <Route path="/" component={PostIndex}/>
            </Switch>
        </BrowserRouter>
    </Provider>
    ,document.getElementById("root"));