import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import './App.css';
import {   BrowserRouter as Router,Route, Switch, Link ,withRouter,Redirect, BrowserRouter} from "react-router-dom";
//import '@fortawesome/fontawesome-free/css/all.min.css';
//import 'bootstrap-css-only/css/bootstrap.min.css';
//import Home from './components/Home';
import SignIn from './components/Login'
import SignUp from "./components/SignUp"
import Feed from "./components/Feed";
import Mainpage2 from "./components/Mainpage2"
import Example from "./components/Example"
import  Mytasks  from "./components/Mytasks";
import Askhelp from './components/Askhelp'
import Settings from './components/Settings'
import Signout from './components/Signout'
import {useState, useEffect} from 'react';
import { useHistory} from 'react-router';
import Feedmain from './components/Feedmain';
import ProtectedRoute from './components/protectedRoute';
import Login from './components/Login';
import {browserHistory} from 'react-router-dom'
import Forgotpassword from './components/Forgotpassword';
import Profile from "./components/Profile";
import { Myposts } from "./components/Myposts";

let userEmail = null; 

function App(props) {
  //const [loggedInStatus, setLoginStatus] = useState("NOT_LOGGED_IN");
  let loggedInStatus="NOT_LOGGED_IN";
  const history2 = useHistory()
  let login_user_id=null;


  function handleSuccessfulAuth(data){

    console.log("data usr id-->", data);
    if(data!=null){
      loggedInStatus="LOGGED_IN";

    }
    
    if(loggedInStatus=="LOGGED_IN"){
      console.log("usrid is----->",data);

      props.history.push(
        {pathname:"/Mainpage2",
        state:{data}
        });
      localStorage.setItem("login_user_id", data);
    
    }
    else{
      console.log("NOT LOGGED IN");
      props.history.push(
        {pathname:"/"
        });
    }

    history2.go()

  }


  // loggedInStatus="NOT_LOGGED_IN";
  console.log("login status", loggedInStatus);
//   if(loggedInStatus=="NOT_LOGGED_IN")
// {
//   props.history.push('/signin');
// }
  return (
  <Router >
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path="/"
              render ={ props =>(
                <Login {...props}  handleSuccessfulAuth={handleSuccessfulAuth}/>
              )
              }
              />



            <Route exact path="/forgotpassword" strict component={Forgotpassword} />

            <Route exact path='/Askhelp' 
             render ={ props =>(
              <Mainpage2 {...props}/>
            )
          } />

            <Route exact path="/Mainpage2"
            render ={ props =>(
              <Mainpage2 {...props} login_user_id={login_user_id} />
            )
          }
            />
 
            <Route exact path="/SignUp"><SignUp/></Route>
            <Route exact path="/Mytasks" strict component={Mainpage2} />
            <Route exact path="/Profile" strict component={Mainpage2} />
            <Route exact path="/Myposts" strict component={Mainpage2} />

          </Switch>
        </div>
      </div>
    </div></Router>

  );
}

export default withRouter(App);
