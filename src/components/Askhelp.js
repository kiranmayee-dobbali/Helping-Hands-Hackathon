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
      e.preventDefault();
      console.log("submitted");
      console.log("submit ",title,postDescription,email);
      
      fetch("/askhelp", {
        method:"POST",
        cache: "no-cache",
        headers:{
            "content_type":"application/json",
  
        },
        body:JSON.stringify({email,title,postDescription,selectedDate})
        
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

    }



    const classes = useStyles();
    const [title,setTitle] = useState(null); 
    const [postDescription, setPostDescription] = useState(null);
    const email = props.email;
    console.log("data passed",props.email);
    

    var today = new Date();
    
    const currdate = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    
    const [selectedDate, setSelectedDate] = React.useState(new Date(currdate));

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };


return(
    <Container >
    <Toolbar>
    </Toolbar>
     <form className={classes.root}  onSubmit={handleSubmit} action="http://localhost:5000/askhelp" method="POST" noValidate autoComplete="off">
    <Typography variant="h6" gutterBottom>
      Fill the details below
    </Typography>
    <Grid >
    <TextField id="title" name="title" label="Title" variant="outlined" onChange={handleTextChange}/>
    </Grid>
    <Grid>
    <TextField id="description" name="description"  label="Description" variant="outlined"   multiline
    rows={10}
    rowsMax={10}
    fullWidth
    onChange={handleTextChange}
    />    
    </Grid>

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

