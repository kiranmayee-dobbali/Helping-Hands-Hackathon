import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { sizing } from '@material-ui/system';
import { spacing } from '@material-ui/system';


import {
  Drawer, List, ListItem,
  ListItemIcon, ListItemText,
  Container, Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(10),
        width: '25ch',
      },
    },
  }));


export default function Askhelp(props){
    const classes = useStyles();

return(
    <Box elevation={3} >
     <form className={classes.root} noValidate autoComplete="off">
    <Typography variant="h4" gutterBottom>
      Fill the details below
    </Typography>
    
    <TextField id="title" label="Title" variant="outlined" />
    <TextField id="description"      label="Description" variant="outlined" />
    </form>
    <Button
                            type="submit"
                            
                            variant="contained"
                            color="primary"
                            
                        >
                            
                            Submit
                         </Button>
  </Box>
);


}

