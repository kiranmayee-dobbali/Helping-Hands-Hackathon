

import React from 'react';
import Signin from './Login'
import Typography from '@material-ui/core/Typography';
import { withRouter} from "react-router-dom";
import {useState, useEffect} from 'react';


 function Home (props){
    function handleSuccessfulAuth(){
    
        console.log("wow");
         //props.history.push("/Mainpage2");
        // <Redirect to="/Mainpage2"/>
      }
    return(
    <div>
        <Signin handleSuccessfulAuth={handleSuccessfulAuth}/>
    </div>
    
    )
}

export default withRouter(Home);