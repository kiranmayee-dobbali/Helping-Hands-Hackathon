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
  let [newpassword,setPassword] = useState(null);
  let [newpasswordError, setPasswordError] = useState("");
  let [confirmpassword,setConfirmPassword] = useState(null);
  let [confirmpasswordError, setConfirmPasswordError] = useState("");
  let [email,setEmail ] = useState(null);
   let [currentpassword, setCurrentPassword] = useState(null);

  const handleClickOpen = () => {
    // setOpen(true);
  };

  const handleChange =(e)=>{
    const { name, value } = e.target;

    if(name=='newpassword'){
    newpasswordError = value.length < 6 ? "minimum 6 characaters required" : "";
    setPasswordError(newpasswordError);
    setPassword(value);
    }
    else if(name=='email'){
        setEmail(value);
        console.log(email);
        
    }
    else if(name=='currentpassword'){
        setCurrentPassword(value);
        console.log(currentpassword);
        
    }
  }

  const confirmhandleChange =(e)=>{
    const { name, value } = e.target;

    confirmpasswordError = value == newpassword ? "passwords match" : "passwords not matched";
    setConfirmPasswordError(confirmpasswordError);
    setConfirmPassword(value);  
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
    console.log("new pwd", newpassword, "confirm pwd",confirmpassword );
    fetch("/resetpassword", {
        method:"POST",
        cache: "no-cache",  
        headers:{
            "content_type":"application/json",
  
        },
        body:JSON.stringify({email,currentpassword,newpassword})
        
        }
    ).then(response => response.text()).then(result =>  {
      console.log(result);
      if (result=="Valid") { 
        setOpen(true);
        console.log("values resett ");
      }
        else if(result=="Invalid email"){
            alert("Invalid email")
          
        }
        else if(result=="Invalid current password"){
            alert("Invalid current password")
        }
         })




  }
  return(
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>

        <Typography component="h1" variant="h5">
            Reset Password
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <div className="resetform">
                    <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleChange}
                        />
                        
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="currentpassword"
                            label="Current Password"
                            name="currentpassword"
                            autoComplete="currentpassword"
                            autoFocus
                            onChange={handleChange}
                        />
                    <div className="newpassword">

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="newpassword"
                            label="New Password"
                            name="newpassword"
                            autoComplete="newpassword"
                            autoFocus
                            onChange={handleChange}
                        />
                        {newpasswordError.length > 0 && (
                <span className="errorMessage" textcolor="Red">{newpasswordError}</span> 
                        )}
                    </div> 
                
                    <div className="confirmpassword">
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
                            onChange={confirmhandleChange}
                        />
                        {confirmpasswordError.length > 0 && (
                <span className="errorMessage" >{confirmpasswordError}</span> 
                        )}
                    </div>
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
                            <NavLink variant="body2" to="/" onSubmit={Login} >
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


