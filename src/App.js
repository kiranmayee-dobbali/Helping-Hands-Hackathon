import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import './App.css';
import { BrowserRouter as Router,Route, Switch, Link } from "react-router-dom";
import SignIn from './components/Login'
import SignUp from "./components/SignUp"
import Mainpage from "./components/Mainpage"
import Feed from "./components/Feed";
import Mainpage2 from "./components/Mainpage2"
import  Mytasks  from "./components/Mytasks";
import Askhelp from './components/Askhelp'
import Settings from './components/Settings'
import Signout from './components/Signout'
import logo from './logo.svg';



function App() {
  return (<Router>
    <div className="App">

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/Signin" component={SignIn} />
            <Route exact path="/SignUp"><SignUp/></Route>
            <Route exact path="/Mainpage" strict component={Mainpage} />
            <Route exact path="/Mainpage2" strict component={Mainpage2} />
            <Route exact path="/Mytasks" strict component={Mytasks} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;
