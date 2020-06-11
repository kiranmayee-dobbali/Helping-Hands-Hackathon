import React, { lazy, Suspense } from 'react';
import { makeStyles } from "@material-ui/core/styles"

import {
  BrowserRouter as Router,
  Switch, Route, Link
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



const useStyles = makeStyles((theme) => ({
  drawerPaper: { width: 'inherit' },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  }
}))

function Mainpage2() {
  const classes = useStyles();
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Drawer
          style={{ width: '220px' }}
          variant="persistent"
          anchor="left"
          open={true}
          classes={{ paper: classes.drawerPaper }}
        >
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


              <Link to="/Askhelp" className={classes.link}>

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
        </Drawer>


        <Switch>
          <Route exact path="/Feed">
         <Feed>         </Feed>

          </Route>
          <Route exact path="/Mytasks">
         <Mytasks></Mytasks>
          </Route>

          <Route exact path="/Askhelp">
         <Askhelp></Askhelp>
          </Route>

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

export default Mainpage2;
