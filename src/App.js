import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {   BrowserRouter as Router,Route, Switch, Link ,withRouter,Redirect, BrowserRouter} from "react-router-dom";
import 'mdbreact/dist/css/mdb.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import Home from './components/Home';
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

function App(props) {
  //const [loggedInStatus, setLoginStatus] = useState("NOT_LOGGED_IN");
  let userEmail = null; 
  let loggedInStatus="NOT_LOGGED_IN";
  const history2 = useHistory()

  function handleSuccessfulAuth(data){
    console.log("data email-->", data);
    userEmail = data;
    loggedInStatus="LOGGED_IN";
    if(loggedInStatus=="LOGGED_IN"){
      console.log("emailid is----->",userEmail);
      props.history.push(
        {pathname:"/Mainpage2",
        state:{userEmail}
        });
     
      console.log("state",userEmail)
      history2.go()
    
    }
    else{
      console.log("NOT LOGGED IN");
      
    }


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
            <Route exact path="/" component={SignIn} />
            <Route exact path="/signin"
              render ={ props =>(
                <Login {...props}  handleSuccessfulAuth={handleSuccessfulAuth}/>
              )
              }
              />                
            
            
            
            <Route exact path="/forgotpassword" strict component={Forgotpassword} />

            <Route exact path='/Feed'
                render ={ props =>(
                <Feed {...props}  userEmail={userEmail}/>
              )
            }        
                    
            />
            <Route exact path='/Feedmain' strict component={Feedmain}/>

            <Route exact path='/Askhelp' 
             render ={ props =>(
              <Askhelp {...props}  userEmail={userEmail}/>
            )
          }        
                      
            />

            <Route exact path="/Mainpage2"
            render ={ props =>(
              <Mainpage2 {...props}  userEmail={userEmail}/>
            )
          }        
            />
 

            <Route exact path="/SignUp"><SignUp/></Route>
            <Route exact path="/Mainpage2" strict component={Mainpage2} />
            <Route exact path="/Mytasks" strict component={Mytasks} />
            <Route exact path="/Profile" strict component={Profile} />
          </Switch>
        </div>
      </div>
    </div></Router>

  );
//  return (<Example Desc="Hi how are you?"/>);
}

export default withRouter(App);
