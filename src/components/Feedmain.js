import React, { Component } from 'react';
import Feed from './Feed';
import Grid from '@material-ui/core/Grid';
import {
    Container, Typography,
  } from "@material-ui/core";

  


 

  
 
class Feedmain extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: true,
      posts: [],
      error: null,
      emailid: null
    }
  }

   //datanow = this.props.email;
  //this.setState({datanow:email});

  componentDidMount() {
    // this.fetchUsers();
    console.log("mount");
    console.log(this.emailid);
    
     this.fetchPosts(this.emailid);
     // console.log("data", this.datanow);
     
   }


  fetchPosts(emailid){
        // Where we're fetching data from
    fetch('http://localhost:5000/feeddata',{
        mode: "cors",
        method:"POST",
        cache: "no-cache",
        headers:{
            "content_type":"application/json",
  
        },
        body:JSON.stringify({"email":emailid})
        
    })
    // We get the API response and receive data in JSON format...
    .then(response => 
        //console.log("respones",response.text());
        response.json()
    )
    // ...then we update the users state
    .then(data =>
      {
        this.setState({
          posts: data.posts,
          isLoading: false,
        });
        console.log("data from api",data);
        
      
         }
    )
    // Catch any errors we hit and update the app
    .catch(error => this.setState({ error, isLoading: false })
    );
  }


render(){

   
    console.log("posts in render", this.state.posts);
    console.log("persomns",this.state.people);
    
    this.emailid = this.props.email;
    console.log("email from mainpage", this.emailid);
    
    let peopleCards = this.state.posts.map(person => {
        return (
            <Feed key={person.post_id} person={person} />
        )
      })
 
  return(

    <Container>
        {!this.state.isLoading ?(
            <Grid>
        {peopleCards}
        </Grid>

        ):(
            <Grid>
            <Typography>
                LOADING
                </Typography>
                <Typography>
                LOADING
                </Typography>
                <Typography>
                LOADING
                </Typography>
                <Typography>
                LOADING
                </Typography>
                <Typography>
                LOADING
                </Typography>
            </Grid>
        )}
          
      </Container>

  )

  }

  
}

export default Feedmain;