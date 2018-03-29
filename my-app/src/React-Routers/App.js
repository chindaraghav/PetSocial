import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';
import Register from "../Register-Page/Register";
import Header from '../Headers/Header';
import Footer from '../Footer/Footer';
import Login from "../Login-page/Login";
import Reset from "../Reset-password/Reset";
import Forgot from "../Forgot-password/Forgot";

class App extends Component {
  render() {
    return (
         <div>
            <Header/>
             <Switch>
                 <Route exact path="/" component={Register}/>
                 <Route path="/forgot_password" component={Forgot}/>
                 <Route exact path="/reset_password/:id" component={Reset}/>
                 <Route exact path="/login" component={Login}/>
                 <Route path="/login/:id" component={Login}/>
             </Switch>
             <Footer/>
         </div>
    );
  }
}

export default App;
