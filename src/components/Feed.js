import React from 'react';
import Mainpage2 from './Mainpage2';

import {
  Drawer, List, ListItem,
  ListItemIcon, ListItemText,
  Container, Typography,
} from "@material-ui/core";

export default function Feed(props){
return(
  
    <Container>  
    <Typography variant="h3" gutterBottom>
      Home
    </Typography>
    <Typography variant="body1" gutterBottom>
    logInStatus :{props.logInStatus}
        NOW IN FEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEED
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </Typography>
  </Container>
  
);


}

