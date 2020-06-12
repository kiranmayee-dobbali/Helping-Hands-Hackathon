import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {   BrowserRouter as Router,Route, Switch, Link ,withRouter,Redirect} from "react-router-dom";
import 'mdbreact/dist/css/mdb.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import Home from './components/Home';
import SignIn from './components/Login'
import SignUp from "./components/SignUp"
import Mainpage from "./components/Mainpage"
import Feed from "./components/Feed";
import Mainpage2 from "./components/Mainpage2"
import  Mytasks  from "./components/Mytasks";
import Askhelp from './components/Askhelp'
import Settings from './components/Settings'
import Signout from './components/Signout'
import {useState, useEffect} from 'react';
import { useHistory} from 'react-router';


function App(props) {
  const [loggedInStatus, setLoginStatus] = useState("NOT_LOGGED_IN");
  const [user, setUser]= useState("dummy");

  const history2 = useHistory()

  function handleSuccessfulAuth(data){
    props.history.push("/Mainpage2");
    history2.go()
  }


  return (
  <Router >
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/signin"
            render ={ props =>(
              <SignIn {...props}   logInStatus = {loggedInStatus} handleSuccessfulAuth={handleSuccessfulAuth} user={user} setUser={setUser} setLoginStatus={setLoginStatus}/>
            )
            }
            />
            <Route exact path="/SignUp" strict component={SignUp} />
            <Route exact path="/Mainpage" strict component={Mainpage} />
            <Route exact path='/Feed' strict component={Feed}/>
            <Route exact path="/Mainpage2"
            render ={ props =>(
              <Mainpage2 {...props}   logInStatus = {loggedInStatus}/>
            )
          }        
            />
 

          </Switch>
        </div>
      </div>
    </div></Router>

  );
}

export default withRouter(App);
