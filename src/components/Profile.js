import React from 'react';
//import Mainpage2 from "./Mainpage2";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBInput } from 'mdbreact';
import '../index.css';
import {BrowserRouter as Router,NavLink} from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import Toolbar from '@material-ui/core/Toolbar';

class Profile extends React.Component
{
  state = {
    Profle: {
    fname: "",
    lname: "",
    bday:"",
    phone:"",
    email: "",
    loc:"",
    country: '',
    region: ''
  },
    errors:{}
  };

 DateChange= () =>
 {
 var today = new Date();
 var dd = today.getDate();
 var mm = today.getMonth()+1; //January is 0!
 var yyyy = today.getFullYear();
  if(dd
 <10){
         dd='0'+dd
     }
     if(mm
  <10){
         mm='0'+mm
     }

 today = yyyy+'-'+mm+'-'+dd;
 document.getElementById("defaultFormCardDate").setAttribute("max", today);
 }
 changeHandler = event => {
     let {name, value} = event.target
     this.setState(prevState => ({
        // update your 'list' property
        Profle: {
          // spread old values into this object so you don't lose any data
          ...prevState.Profle,
          // update this field's value
          [name]: value
        }}));
   };

 toFetch = () =>
 {
  let login_user_id = localStorage.getItem("login_user_id");

   let fd = new FormData();
   fd.append('id',login_user_id);

   fetch('/Profile', {
       method: 'POST',
       mode: 'cors',
       cache: 'no-cache',
       credentials: 'same-origin',
       body: fd
   }).then(response => response.json()).then(data => this.setState({
       Profle: data
   }))
 }
 selectCountry = (val)=>{

   this.setState(prevState => ({
      // update your 'list' property
      Profle: {
        // spread old values into this object so you don't lose any data
        ...prevState.Profle,
        // update this field's value
        ['country']: val
      }}));
 }

 selectRegion = (val)=>{

   this.setState(prevState => ({
      // update your 'list' property
      Profle: {
        // spread old values into this object so you don't lose any data
        ...prevState.Profle,
        // update this field's value
        ['region']: val
      }}));
 }
 submituserRegistrationForm= event => {
       event.preventDefault();
       let login_user_id = localStorage.getItem("login_user_id");

       let fd = new FormData();
       if (this.validateForm()) {
         fd.append('id',login_user_id);
         fd.append('fname',this.state.Profle['fname']);
         fd.append('lname',this.state.Profle['lname']);
         fd.append('bday',this.state.Profle['bday']);
         fd.append('phone',this.state.Profle['phone']);
         fd.append('email',this.state.Profle['email']);
         fd.append('loc',this.state.Profle['loc']);
         fd.append('country',this.state.Profle['country']);
         fd.append('state',this.state.Profle['region']);

         fetch('/ProfileUpdate', {
         method:'POST',
         mode: 'cors',
         cache: 'no-cache',
         credentials: 'same-origin',
         body:fd
         }
     ).then(response=>response.text()).
     then((final) => {
       alert(final)
     if (final === 'Success')
     {
       window.location.reload();
     }
     else {
       alert(final)
     }
   })
       }
     };

     validateForm=()=>{

           let errors = {};
           let formIsValid = true;


           if (typeof this.state.Profle.fname !== "undefined") {
             if (!(this.state.Profle.fname).match(/^[a-zA-Z ]*$/)) {
               formIsValid = false;
               errors["fname"] = "*Please enter alphabet characters only in firstname.";
             }
           }

           if (typeof this.state.Profle.lname !== "undefined") {
             if (!(this.state.Profle.lname).match(/^[a-zA-Z ]*$/)) {
               formIsValid = false;
               errors["lname"] = "*Please enter alphabet characters only in lastname.";
             }
           }

           if (typeof this.state.Profle.email !== "undefined") {

             //regular expression for email validation
             var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
             if (!pattern.test(this.state.Profle.email)) {
               formIsValid = false;
               errors["email"] = "*Please enter valid email-ID.";
             }
           }


           if (typeof this.state.Profle.phone !== "undefined") {
               let ph = this.state.Profle.phone
             if (!ph.match(/^[0-9]{10}$/)) {

               formIsValid = false;
               errors["phone"] = "*Please enter valid mobile no.";
             }
           }

           if (typeof this.state.Profle.loc !== "undefined") {
             if (!(this.state.Profle.loc).match(/^[a-zA-Z ]*$/)) {
               formIsValid = false;
               errors["loc"] = "*Please enter alphabet characters only in location.";
             }
           }

           this.setState({
             errors: errors
           });

           return formIsValid;


         }


  componentDidMount() {
    this.DateChange();
    this.toFetch();
  }






  render() {
    return (


  		<MDBContainer>
      <Toolbar>
      </Toolbar>
  			<MDBRow className='flex-center'>
  				<MDBCol md="5">
  					<MDBCard>
  						<MDBCardBody>
  							<form onSubmit={this.submituserRegistrationForm}>
  								<p className="h4 text-center py-4">Profile</p>
  								<label
                    htmlFor="defaultFormCardNameEx"
                    className="black-text font-weight-light"
                  >
                    Your First name
                  </label>
  								<input
                    value = {this.state.Profle['fname']}
                    type="text"
                    id="defaultFormCardNameEx"
                    onChange={this.changeHandler}
                    className="form-control"
                    name = "fname"
                    required
                  />
  								<div className="errorMsg">{this.state.errors.fname}</div>
  								<br />
  								<label
                    htmlFor="defaultFormCardNameEx"
                    className="black-text font-weight-light"
                  >
                    Your Last name
                  </label>
  								<input
                    type="text"
                    value = {this.state.Profle['lname']}
                    id="defaultFormCardNameEx"
                    onChange={this.changeHandler}
                    className="form-control"
                    name = "lname"
                    required
                  />
  								<div className="errorMsg">{this.state.errors.lname}</div>
  								<br />
  								<label
                    htmlFor="defaultFormCardNameEx"
                    className="black-text font-weight-light"
                  >
                    Your Birthday
                  </label>
  								<input
                    type="date"
                    value = {this.state.Profle['bday']}
                    id="defaultFormCardDate"
                    className="form-control"
                    name="bday"
                    min="1900-01-01"
                    onChange={this.changeHandler}
                    required
                  />
  								<br/>
  								<label
                    htmlFor="defaultFormCardNameEx"
                    className="black-text font-weight-light"
                  >
                    Your Phone Number
                  </label>
  								<input
                    type="text"
                    value = {this.state.Profle['phone']}
                    id="defaultFormCardNameEx"
                    className="form-control"
                    name="phone"
                    onChange={this.changeHandler}
                    maxLength="10"
                    minLength="10"
                    required
                  />
  								<div className="errorMsg">{this.state.errors.phone}</div>
  								<br />
  								<label
                    htmlFor="defaultFormCardNameEx"
                    className="black-text font-weight-light"
                  >
                    Your Email
                  </label>
  								<input
                    type="text"
                    value = {this.state.Profle['email']}
                    id="defaultFormCardNameEx"
                    className="form-control"
                    name="email"
                    onChange={this.changeHandler}
                    required
                    disabled
                  />
  								<div className="errorMsg">{this.state.errors.email}</div>
  								<br />
  								<label
                    htmlFor="defaultFormCardNameEx"
                    className="black-text font-weight-light"
                  >
                    Your Country
                  </label>
  								<CountryDropdown
                  className="form-control"
            value={this.state.Profle['country']}
            onChange={(val) => this.selectCountry(val)} required />
  								<br />
  								<label
              htmlFor="defaultFormCardNameEx"
              className="black-text font-weight-light"
            >
              Your State
            </label>
  								<RegionDropdown
            className="form-control"
            country={this.state.Profle['country']}
            value={this.state.Profle['region']}
            onChange={(val) => this.selectRegion(val)} required />
  								<br />
  								<label
                    htmlFor="defaultFormCardNameEx"
                    className="black-text font-weight-light"
                  >
                    Your Location
                  </label>
  								<input
                    type="text"
                    value = {this.state.Profle['loc']}
                    id="defaultFormCardNameEx"
                    className="form-control"
                    name="loc"
                    onChange={this.changeHandler}
                    required
                  />
  								<div className="errorMsg">{this.state.errors.loc}</div>
  								<br />
  								<div className="text-center py-4 mt-3">
  									<MDBBtn color="primary" type="submit">Update</MDBBtn>
  								</div>
  							</form>
  						</MDBCardBody>
  					</MDBCard>
  				</MDBCol>
  			</MDBRow>
  		</MDBContainer>
    );
  }

}


export default Profile;
