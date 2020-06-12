
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import {BrowserRouter as Router,Route,NavLink,Switch,Redirect} from 'react-router-dom'
import Feed from './Feed'
import Link from '@material-ui/core/Link';
import Mytasks from './Mytasks'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
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
}));

 function Mainpage() {
  const classes = useStyles();


    const callFeed =() =>{
        console.log("rssed");
        return(
        <Router>

        <Switch>

        <Route exact path="/Feed" strict component={Feed} />
        </Switch>

        </Router>
        )
    }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <Router>
        <div className={classes.drawerContainer}>
          <List>
              <Link to='/Feed' component={Feed}>
              <ListItem button key={"Feed"} >
                <ListItemIcon><ListAltOutlinedIcon /> </ListItemIcon>
                <ListItemText primary={"Feed"} />
              </ListItem>
              </Link>
                <Link to='/Mytasks' component={Mytasks}>
              <ListItem button key={"My Tasks"}>
                <ListItemIcon><AssignmentTurnedInOutlinedIcon /></ListItemIcon>
                <ListItemText primary={"My Tasks"} />
              </ListItem>
                </Link>
              <ListItem button key={"Ask for Help"}>
                <ListItemIcon><CreateOutlinedIcon /></ListItemIcon>
                <ListItemText primary={"Ask for Help"} />
              </ListItem>
              <ListItem button key={"Update Profile"}>
                <ListItemIcon><AccountCircleOutlinedIcon /></ListItemIcon>
                <ListItemText primary={"Update Profile"} />
              </ListItem>
              <ListItem button key={"Sign out"}>
                <ListItemIcon><ExitToAppOutlinedIcon /></ListItemIcon>
                <ListItemText primary={"Sign out"} />
              </ListItem>
          </List>
          <Divider />

        </div>
        </Router>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />

      </main>
    </div>
  );
}
export default Mainpage
