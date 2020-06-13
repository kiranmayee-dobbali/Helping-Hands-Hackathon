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
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import Askhelp from './Askhelp'
import Settings from './Settings'
import Signout from './Signout'
import Feed  from "./Feed";
//const Mytasks = lazy(() => import('./Mytasks'))
import Mytasks from "./Mytasks"


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
  const emailid = props.location.state;
  // console.log("email id passedon ",emailid['userEmail']);
  const email = emailid['userEmail'];
  console.log("email id passedon ",email);

  return (
    <Router>
      <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Permanent drawer
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

              <Link to='/Feed' className={classes.link}>
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


              <Link to={{pathname:"/Askhelp"}}  className={classes.link}>

              <ListItem button key={"Ask for Help"}>
                <ListItemIcon><CreateOutlinedIcon /></ListItemIcon>
                <ListItemText primary={"Ask for Help"} />
              </ListItem>
              </Link>


              <Link to="/Settings" className={classes.link}>

              <ListItem button key={"settings"}>
                <ListItemIcon><AccountCircleOutlinedIcon /></ListItemIcon>
                <ListItemText primary={"settings"} />
              </ListItem>
              </Link>


              <Link to="/Signout" className={classes.link}>

              <ListItem button key={"Sign out"}>
                <ListItemIcon><ExitToAppOutlinedIcon /></ListItemIcon>
                <ListItemText primary={"Sign out"} />
              </ListItem>
              </Link>

          </List>
      
        </div>
        </Drawer>

        <Switch>
          <Route exact path="/Feed">
         <Feed>         </Feed>

          </Route>
          <Route exact path="/Mytasks">
         <Mytasks></Mytasks>
          </Route>

          <Route exact path="/Askhelp"
           render={(props) => <Askhelp {...props} email={email} />}
          
          />
         

          <Route exact path="/Settings">
         <Settings></Settings>
          </Route>

          <Route exact path="/Signout">
         <Signout></Signout>
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default withRouter(Mainpage2);
