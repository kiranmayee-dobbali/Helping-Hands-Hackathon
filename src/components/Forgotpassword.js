import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import {useState, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { NavLink} from 'react-router-dom'



import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import Login from './Login'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

const styles = makeStyles((theme) => ({

  '@global': {
      body: {
          backgroundColor: theme.palette.common.white,
      },
  },
  paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
  },
  avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
  },
  form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
  },
  submit: {
      margin: theme.spacing(3, 0, 2),
  },
}));


 function Forgotpassword(props){
  const classes = styles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange =(e, value)=>{
      //
  }
  const handleClose = (e,value) => {   
    setOpen(false);
    if(value=="yes"){
      //add to my tasks
      console.log("yes");
      
    }    
  };

  const handleSubmit =(e)=>{
    e.preventDefault();

  }
  return(
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>

        <Typography component="h1" variant="h5">
            Reset Password
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <div className="currentpassword">

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="currentpassword"
                            label="Current Password"
                            name="cpwd"
                            autoComplete="currentpassword"
                            autoFocus
                            // onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="newpassword"
                            label="New Password"
                            name="npassword"
                            autoComplete="newpassword"
                            autoFocus
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="confirmpassword"
                            label="Confirm Password"
                            name="confirmpassword"
                            autoComplete="confirmpassword"
                            autoFocus
                            // onChange={handleChange}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleClickOpen}
                        >
                            Reset Password
                         </Button>
            <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                >
                <DialogTitle id="alert-dialog-slide-title">{"Reset Password"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    You have successfully set your new Password.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => {handleClose(e, "yes")}} color="primary">
                    Ok
                    </Button>
                </DialogActions>
            </Dialog>
            <Grid container>
                <Grid item xs>
                <NavLink variant="body2" to="/signin" onSubmit={Login} >
                    {"Open Signin page"}
                </NavLink>
                </Grid>
            </Grid>
            </div>
        </form>

    </div>

    </Container>
  );
 }
  
 export default Forgotpassword;


