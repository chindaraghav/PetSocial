import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';
import App from './App';
import App2 from './App2';

class Main extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/timeline" component={App2} />
                    <Route path="/" component={App} />
                </Switch>
            </div>
        );
    }
}

export default Main;
