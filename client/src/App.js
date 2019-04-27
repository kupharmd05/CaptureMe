import React, { Component } from 'react';
import Login from "./components/login/login";
import CreateLogin from "./components/login/create-login";
import './App.css';
import Camera from "./components/camera/camera";
import {BrowserRouter as Router, Route} from 'react-router-dom';



class App extends Component {

    render() {
    return (
      <Router>
        <div>
          <div className="login-page" style={{ height: '100vh' }}>

            
            <Route exact path="/" component={Login}/>
            <Route path="/create" component={CreateLogin}/>
            <Route path="/camera" component={Camera}/>
          </div>
        </div>

      </Router>
     
      
    )
  };


        




}

export default App;
