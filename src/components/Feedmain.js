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
      emailid: null,
      login_user_id: null
    }
  }

   //datanow = this.props.email;
  //this.setState({datanow:email});
  
  componentDidMount() {
    // this.fetchUsers();
    console.log("mount");    
     this.fetchPosts();
     // console.log("data", this.datanow);
     
   }


  fetchPosts(){
        // Where we're fetching data from
    fetch('http://localhost:5000/feeddata',{
        mode: "cors",
        method:"POST",
        cache: "no-cache",
        headers:{
            "content_type":"application/json",
  
        },
        body:JSON.stringify({"login_user_id":this.login_user_id})
        
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

  removePerson(post_id) {
  
    console.log("came back to feedmain", post_id);
    fetch("http://localhost:5000/volunteering", {
      method:"POST",
      mode: "cors",
      cache: "no-cache",
      headers:{
          "content_type":"application/json",

      },
      body:JSON.stringify({"post_id":post_id,"login_user_id":this.login_user_id})
      
      }
  ).then(response => response.text()).then(result =>  {
    console.log(result);
    if (result=="Valid") {    
      //props.handleSuccessfulAuth(finalresult);}      
     console.log("vonteer assigned to task");
      
     }
      else{
        console.log("INVALID - volunteer not assigned to task");
        
      }
       })
       
       this.setState({ posts: this.state.posts.filter(person => person.post_id !== post_id)});

  }
  
render(){

   
    console.log("posts in render", this.state.posts);
    
    // this.emailid = this.props.email;
    // console.log("email from mainpage in feedmain", this.emailid);
    
    this.login_user_id = this.props.login_user_id;
  
    console.log("login user id feedmain", this.login_user_id);


    let peopleCards = this.state.posts.map(person => {
        return (
            <Feed key={person.post_id} person={person}  removePerson={this.removePerson.bind(this)} />
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