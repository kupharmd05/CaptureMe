import React, { Component } from 'react';
import CreateLogin from "./components/login/create-login"
import './App.css';
import Camera from "./components/camera/camera";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Security, SecureRoute, ImplicitCallback} from '@okta/okta-react';
import Login from './components/auth/login';
import Home from './components/pages/Home';


function onAuthRequired({ history }) {
  history.push('/login')
}

class App extends Component {

    render() {
    return (
      
      <Router>
        <Security issuer='https://dev-680655.okta.com/oauth2/default'
                  client_id='0oaiiphavOO8bpeh2356'
                  redirect_uri={window.location.origin + '/implicit/callback'}
                  onAuthRequired={onAuthRequired} >
        <div>
         
         
            <div className="container">
              <Route exact path="/" component={Home}/>
              <SecureRoute path="/camera" component={Camera}/> 
              <Route path='/login' render={() => <Login baseUrl='https://dev-680655.okta.com' />} />
              <Route path='/implicit/callback' component={ImplicitCallback} />
              
            </div>
            
          
        </div>
        </Security>
      </Router>
     
      
    )
  };


        




}

export default App;
