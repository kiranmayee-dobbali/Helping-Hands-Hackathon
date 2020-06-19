import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import {useState, useEffect} from 'react';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import {
  Drawer, List, ListItem,
  ListItemIcon, ListItemText,
  Container, Typography, Grid,
} from "@material-ui/core";

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';


import Mainpage2 from './Mainpage2';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(3),
        width: '100ch',
      },
 
    },

    customwidth:{
      '& .MuiTextField-root': {
        margin: theme.spacing(3),
        width: '25ch',
      },
    },
    checkboxes:{
       paddingLeft: 120,
    }
    
  }));
 
export default function Askhelp(props){

    const handleTextChange=(e)=>{
      e.preventDefault();
      const { name, value } = e.target;
    
      switch(name){
        case "title": 
          setTitle(value);
          break;

        case "description":
          setPostDescription(value);
          break;

        default:
            break;
      }
      console.log("title",title,"description",postDescription);
    }

    const handleSubmit=(e)=>{
      const email_checked = state.checkedA;
      const phone_checked = state.checkedB;
      e.preventDefault();
      alert("Your task is submitted");
      console.log("submitted");
      console.log("submit ",title,postDescription,login_user_id);
      
      fetch("/askhelp", {
        method:"POST",
        cache: "no-cache",  
        headers:{
            "content_type":"application/json",
  
        },
        body:JSON.stringify({login_user_id,title,postDescription,selectedDate,email_checked,phone_checked})
        
        }
    ).then(response => response.text()).then(result =>  {
      console.log(result);
      if (result=="Valid") {    
        console.log("values added");
      }
        else{
          console.log("values not added");
          
        }
         })
         
         setTitle("");
         setPostDescription("");
         setSelectedDate(new Date(currdate));

    }



    const classes = useStyles();
    const [title,setTitle] = useState(""); 
    const [postDescription, setPostDescription] = useState("");
    // const email = props.email;
    // console.log("data passed",props.email);
    

    var today = new Date();
    
    const currdate = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    
    const [selectedDate, setSelectedDate] = React.useState(new Date(currdate));

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    const login_user_id = localStorage.getItem("login_user_id");
    console.log("email after reload in askhelp", login_user_id);


    const [state, setState] = React.useState({
      checkedA:true,
      checkedB: false,
    });
  
    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
      console.log("status of checked",state.checkedB, state.checkedA);
      
    };
return(
    <Container >
    <Toolbar>
    </Toolbar>
     <form className={classes.root}  onSubmit={handleSubmit} action="http://localhost:5000/askhelp" method="POST" noValidate autoComplete="off">
    <Grid >
    <TextField   id="title" name="title" value={title} label="Title" variant="outlined" onChange={handleTextChange}/>
    </Grid>
    <Grid>
    <TextField  type="reset" id="description" value={postDescription} name="description"  label="Description" variant="outlined"   multiline
    rows={10}
    rowsMax={8}
    fullWidth
    onChange={handleTextChange}
    />    
    </Grid>
    <FormGroup row className={classes.checkboxes}>

        <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedA}
                onChange={handleChange}
                name="checkedA"
                color="primary"
              />
            }
            label="Email"
          />

        <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedB}
                onChange={handleChange}
                name="checkedB"
                color="primary"
              />
            }
            label="Phone Number"
          />

    </FormGroup>

    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around"  className={classes.customWidth}>
        <KeyboardDatePicker  
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Task Deadline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          
        />
      </Grid >
    </MuiPickersUtilsProvider>



    <Button type="submit" variant="contained" color="primary">Submit</Button>

    </form> 
  </Container>

);


}

