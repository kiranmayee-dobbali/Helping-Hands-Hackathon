

import React from 'react';
import Signin from './Login'
import Typography from '@material-ui/core/Typography';
import { withRouter} from "react-router-dom";
import {useState, useEffect} from 'react';


 function Home (props){

    return(
    <div>
        <Signin/>
    </div>
    
    )
}

export default (Home);