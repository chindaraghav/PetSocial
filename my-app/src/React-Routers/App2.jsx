import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';
import Timeline from "../Timeline/Timeline";
import SingalPost from "../Single-post/Singal_post";
import Footer from "../Footer/Footer";
import Header2 from '../Headers/header2';
import Home from '../Home-page/Home';
class App2 extends Component {
    constructor(props){
        super(props);
        this.state={rerenderG:[]};
    }
    render() {
        return (
            <div>
                <Route path="/" reRenderparent={this.rerenderMe} component={Header2}/>
                <div className='container'>
                    <div className='content' style={{paddingBottom:'80px',paddingTop:'80px'}}>
                <Switch>
                    <Route path="/timeline/Home" component={Home}/>
                    <Route path="/timeline/singlePost/:id" component={SingalPost}/>
                    <Route exact path="/timeline/:email" component={Timeline}/>
                    <Route exact path="/timeline" component={Timeline}/>
                </Switch>
                    </div>
                    </div>
                    <div className='clear' />
                <Footer/>
            </div>
        );
    }
}

export default App2;
