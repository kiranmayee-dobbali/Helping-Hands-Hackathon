import React, { lazy, Suspense } from 'react';
import { makeStyles } from "@material-ui/core/styles"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';

import {
  BrowserRouter as Router,
  Switch, Route, Link,
  withRouter
} from "react-router-dom";

import {
  Drawer, List, ListItem,
  ListItemIcon, ListItemText,
  Container, Typography,
} from "@material-ui/core";


import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import PersonIcon from '@material-ui/icons/Person';
import Askhelp from './Askhelp'
import Settings from './Settings'
import Signout from './Signout'
import Feed  from "./Feed";
import Feedmain from './Feedmain';
import App from "../App";
import Login from './Login';


import Profile from "./Profile";
//const Mytasks = lazy(() => import('./Mytasks'))
import Mytasks from "./Mytasks"
import { useHistory} from 'react-router';
import Myposts from "./Myposts"


const drawerWidth = 210;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
    link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  }
}))



function Mainpage2(props) {
  const classes = useStyles();
//   let email = null;
//   if(props.location.state!=null){
//     const emailid = props.location.state;
//     email = emailid['userEmail'];
//     console.log("email id passedon ",email);  
//   } 
// else{
//    email = props.userEmail;
//   console.log("email id passedon ",email);  
// }
//   console.log("log status",);
let login_user_id = localStorage.getItem("login_user_id");
const history2 = useHistory()

console.log("login user id in Mainpage", login_user_id);
// 
const logout=()=>{
  props.history.push(
    {pathname:"/",
  
    });
    history2.go();

}
  return (
    <Router>
      <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Helping Hands
          </Typography>
        </Toolbar>
      </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
        >
        <Toolbar />

        <div className={classes.drawerContainer}>
          <List>

              <Link to='/Mainpage2' className={classes.link}>
              <ListItem button key={"Feed"} >
                <ListItemIcon><ListAltOutlinedIcon /> </ListItemIcon>
                <ListItemText primary={"Feed"} />
              </ListItem>
              </Link>

              <Link to="/Mytasks" className={classes.link}>
              <ListItem button key={"My Tasks"}>
                <ListItemIcon><AssignmentTurnedInOutlinedIcon /></ListItemIcon>
                <ListItemText primary={"My Tasks"} />
              </ListItem>
              </Link>

              <Link to="/Myposts" className={classes.link}>
              <ListItem button key={"My Posts"}>
                <ListItemIcon><PlaylistAddCheckIcon /></ListItemIcon>
                <ListItemText primary={"My Posts"} />
              </ListItem>
              </Link>


              <Link to={{pathname:"/Askhelp"}}  className={classes.link}>

              <ListItem button key={"Ask for Help"}>
                <ListItemIcon><CreateOutlinedIcon /></ListItemIcon>
                <ListItemText primary={"Ask for Help"} />
              </ListItem>
              </Link>

              <Link to="/Profile" className={classes.link}>

              <ListItem button key={"Profile"}>
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText primary={"Profile"} />
              </ListItem>
              </Link>


              <Link to="/" className={classes.link} onClick={logout}>

              <ListItem button key={"Sign out"}>
                <ListItemIcon><ExitToAppOutlinedIcon /></ListItemIcon>
                <ListItemText primary={"Sign out"} />
              </ListItem>
              </Link>

          </List>

      
        </div>
        </Drawer>
        <Switch>
          <Route exact path="/Mainpage2"
          render={(props) => <Feedmain {...props} login_user_id={login_user_id}/>}
          />

          <Route exact path="/Mytasks" render={(props)=><Mytasks />}/>

          <Route exact path="/Myposts" render={(props)=><Myposts />}/>


          <Route exact path="/Askhelp"
           render={(props) => <Askhelp {...props}/>}
          />


          <Route exact path="/Profile">
         <Profile></Profile>
          </Route>

          <Route exact path="/Settings">
         <Settings></Settings>
          </Route>

          <Route exact path="/">
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default withRouter(Mainpage2);
