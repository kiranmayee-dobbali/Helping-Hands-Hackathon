import React from 'react';
import Mainpage2 from './Mainpage2';
import Toolbar from '@material-ui/core/Toolbar';

import {
  Drawer, List, ListItem,
  ListItemIcon, ListItemText,
  Container, Typography,
} from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import { Alert,AlertTitle } from '@material-ui/lab';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import bunny from '../static/bunny.svg';
// src={helpinghands}
import logo from '../static/logo.svg';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 1000,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  buttons:{
    display: "flex", justifyContent: "center", alignItems: "center"

  }
}));


export default function Feed(props){

  const classes = useStyles();
 let { post_id,title,description, post_user_id,deadline,user_name} = props.person;
//  let {id,title,location,description}= props.person;
  console.log("got valus",post_id,title,description);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = (e,value) => {   
    setOpen(false);
    if(value=="yes"){
      //add to my tasks
      console.log(value,"id",{post_id});

      
      props.removePerson(post_id);
    }    
  };


  
  return(

    <Container pl={110}>  
    <Toolbar>
    </Toolbar>

    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={ require('../static/bunny.jpg') }/>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Posted by : {user_name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {description}
                </Typography>

              </Grid>
              <Grid item className={classes.buttons}>
                <Button variant="contained" color="primary" onClick={handleClickOpen}  >
                  Volunteer
                </Button>
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                >
        <DialogTitle id="alert-dialog-slide-title">{"Do you want to vounteer for this task?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please vounteer for this task only if you are able to complete it by deadline. Taking up task and not finishing
            it will not help your community people.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => {handleClose(e, "no")}} color="primary">
            No
          </Button>
          <Button onClick={(e) => {handleClose(e, "yes")}} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
              </Grid>
            </Grid> 
            <Grid item>
  <Typography variant="subtitle1">By: {deadline}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  </Container>
  
);


}

