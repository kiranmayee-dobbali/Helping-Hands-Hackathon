import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles ,makeStyles} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import {useState, useEffect} from 'react';
import SignUp from './SignUp'
import { Router,Route,NavLink,Switch,Redirect,withRouter} from 'react-router-dom'
import Mainpage2 from "./Mainpage2";
import Forgotpassword from './Forgotpassword';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  
  const formValid = ( formErrors, rest ) => {
    let valid = true;
    console.log("formerrr",formErrors);
    console.log("rest",rest);
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
  
    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });
  
    return valid;
  };
  
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




function SignIn(props) {
  
  const classes = styles();


  const handleSubmit = (e) => {

    e.preventDefault();
  
    if (formValid({emailError,passwordError},{email,password})) {
      console.log(`
        --SUBMITTING--
        Email: ${email}
        Password: ${password}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      alert("Invalid login details");
    }
    fetch("/hello", {
      method:"POST",
      cache: "no-cache",
      headers:{
          "content_type":"application/json",

      },
      body:JSON.stringify({email,password})
      
      }
  ).then(response => response.text()).then(result =>  {
    console.log(result);
    if (result=="Valid") {    
      //props.handleSuccessfulAuth(finalresult);}      
      {props.handleSuccessfulAuth(email)}   
     }
      else{
        console.log("no next page");
        
      }
       })
  };



  
  
const openMainpage=()=>{
  return(
    <Redirect to="/Mainpage2"/>
  )
}

  function setvalues(inputval){
    finalresult = inputval;
    
    if (finalresult=="Valid") {    
      //props.handleSuccessfulAuth(finalresult);}
      {props.handleSuccessfulAuth(email)}   
     }
      else{
        console.log("no next page");
        
      }
     
  }

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    //let formErrors = { ...state.formErrors };
  
    switch (name) {
      case "email":
        emailError = emailRegex.test(value)
          ? ""
          : "invalid email address";
          setEmailError(emailError);
          setEmail(value);

        break;
      case "password":
        passwordError =
          value.length < 6 ? "minimum 6 characaters required" : "";
          setPasswordError(passwordError);
          setPassword(value);
        break;
      default:
        break;
    }

    console.log("email:",email,"password:",password);
    
  };


  const openLogin =()=>{
      return(
        <Router>

        <Switch>

        <Route exact path="/SignUp" strict component={SignUp} />
        </Switch>

        </Router>

      )
  };

  const ForgotPassword =()=>{
    return(
      <Router>

      <Switch>

      <Route exact path="/forgotpassword" strict component={Forgotpassword} />
      </Switch>

      </Router>

    )
};

        let [email,setEmail ] = useState(null);
        let [password,setPassword] = useState(null);

        let [emailError, setEmailError] = useState("");
        let [passwordError, setPasswordError] = useState("");
        let finalresult = "";

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>

                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in!   
                        
                    </Typography>

                    <form className={classes.form} onSubmit={handleSubmit} action="http://localhost:5000/hello" method="POST" noValidate>
                    <div className="email">

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
                        {emailError.length > 0 && (
                <span className="errorMessage">{emailError}</span>
              )}
                        </div>
                        <div className="password">

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                        />
                                      {passwordError.length > 0 && (
                <span className="errorMessage">{passwordError}</span> 
              )}
                        </div>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                         </Button>
                        <Grid container>

                        </Grid>
                    </form>
                </div>
        <Grid container>
            <Grid item xs>
              <NavLink variant="body2" to="/forgotpassword" onSubmit={ForgotPassword} >
                {"Forgot password?"}
              </NavLink>
            </Grid>
            <Grid item>

              <NavLink  variant="body2" to="/SignUp" onSubmit={openLogin}>
                {"Don't have an account? Sign Up"}
              </NavLink>
            </Grid> 
        </Grid>
       
            </Container>
        );
    
}

export default withRouter(SignIn);