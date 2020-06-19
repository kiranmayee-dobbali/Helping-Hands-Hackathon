import React from "react";
import '../App.css';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBInput } from 'mdbreact';
import { Switch, Route ,withRouter} from 'react-router-dom'
import {BrowserRouter as Router,NavLink} from 'react-router-dom'
import Login from "./Login";
import '../index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Button from '@material-ui/core/Button';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
class SignUp extends React.Component {

state = {
  fname: "",
  lname: "",
  bday:"",
  gender:"Male",
  phone:"",
  email: "",
  passwrd:"",
  loc:"",
  errors:{},
  country: '',
  region: ''
};
 openLogin =()=>{
  return(

<Router>
	<Switch>
		<Route exact path="/Login" strict component={Login} />
	</Switch>
</Router>

  )
};
changeHandler = event => {

    this.setState({ [event.target.name]: event.target.value });
  };

  selectCountry = (val)=>{

    this.setState({ country: val });
  }

  selectRegion = (val)=>{

    this.setState({ region: val });
  }

handleOptionChange = event =>{

    this.setState({
      gender : event.target.value
    });
  };

submituserRegistrationForm= event => {
      event.preventDefault();
      let fd = new FormData();
      if (this.validateForm()) {

        fd.append('fname',this.state.fname);
        fd.append('lname',this.state.lname);
        fd.append('bday',this.state.bday);
        fd.append('gender',this.state.gender);
        fd.append('phone',this.state.phone);
        fd.append('email',this.state.email);
        fd.append('passwrd',this.state.passwrd);
        fd.append('loc',this.state.loc);
        fd.append('country',this.state.country);
        fd.append('state',this.state.region);

        fetch('/registration', {
        method:'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        body:fd
        }
    ).then(response=>response.text()).
    then((final) => {
    if (final === 'Success')
    {
    this.setState({ fname:"" });
    this.setState({ lname:"" });
    this.setState({ bday:"" });
    this.setState({ gender:"Male" });
    this.setState({ phone:"" });
    this.setState({ email:"" });
    this.setState({ passwrd:"" });
    this.setState({ loc:"" });
    this.setState({ country:"" });
    this.setState({ state:"" });
      alert("Form submitted");
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


          if (typeof this.state.fname !== "undefined") {
            if (!this.state.fname.match(/^[a-zA-Z ]*$/)) {
              formIsValid = false;
              errors["fname"] = "*Please enter alphabet characters only in firstname.";
            }
          }

          if (typeof this.state.lname !== "undefined") {
            if (!this.state.lname.match(/^[a-zA-Z ]*$/)) {
              formIsValid = false;
              errors["lname"] = "*Please enter alphabet characters only in lastname.";
            }
          }

          if (typeof this.state.email !== "undefined") {

            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.email)) {
              formIsValid = false;
              errors["email"] = "*Please enter valid email-ID.";
            }
          }


          if (typeof this.state.phone !== "undefined") {

            if (!this.state.phone.match(/^[0-9]{10}$/)) {

              formIsValid = false;
              errors["phone"] = "*Please enter valid mobile no.";
            }
          }


          if (typeof this.state.passwrd !== "undefined") {

            if (!this.state.passwrd.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
              formIsValid = false;
              errors["passwrd"] = "*Please enter secure and strong password.";
            }
          }

          if (typeof this.state.loc !== "undefined") {
            if (!this.state.loc.match(/^[a-zA-Z ]*$/)) {
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

render()
{
  return (


		<MDBContainer>
			<MDBRow className='flex-center'>
				<MDBCol md="5">
					<MDBCard>
						<MDBCardBody>
							<form onSubmit={this.submituserRegistrationForm}>
								<p className="h4 text-center py-4">Registration</p>
								<label
                  htmlFor="defaultFormCardNameEx"
                  className="black-text font-weight-light"
                >
                  Your First name
                </label>
								<input
                  value = {this.state.fname}
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
                  value = {this.state.lname}
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
                  value = {this.state.bday}
                  id="defaultFormCardDate"
                  className="form-control"
                  name="bday"
                  min="1900-01-01"
                  onChange={this.changeHandler}
                  required
                />
								<br />
								<label
                  htmlFor="defaultFormCardNameEx"
                  className="black-text font-weight-light"
                >
                  Your Gender
                </label>
								<div className="custom-control custom-radio">
									<input type="radio" className="custom-control-input"   value="Female" id= "defaultUnchecked" checked={this.state.gender === "Female"}
                          onChange={this.handleOptionChange}  />
									<label className=" custom-control-label" htmlFor="defaultUnchecked">Female</label>
								</div>
								<div className="custom-control custom-radio">
									<input type="radio" className="custom-control-input"  value = "Male" id="defaultchecked" checked={this.state.gender === "Male"}
                        onChange={this.handleOptionChange}  />
									<label className=" custom-control-label" htmlFor="defaultchecked" >Male</label>
								</div>
								<br/>
								<label
                  htmlFor="defaultFormCardNameEx"
                  className="black-text font-weight-light"
                >
                  Your Phone Number
                </label>
								<input
                  type="text"
                  value = {this.state.phone}
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
                  value = {this.state.email}
                  id="defaultFormCardNameEx"
                  className="form-control"
                  name="email"
                  onChange={this.changeHandler}
                  required
                />
								<div className="errorMsg">{this.state.errors.email}</div>
								<br />
								<label
                  htmlFor="defaultFormCardEmailEx"
                  className="black-text font-weight-light"
                >
                  Your Password
                </label>
								<input
                  value = {this.state.passwrd}
                  type="password"
                  id="defaultFormCardEmailEx"
                  className="form-control"
                  minLength="8"
name = "passwrd"
onChange={this.changeHandler}
required
                />
								<div className="errorMsg">{this.state.errors.passwrd}</div>
								<br/>
								<label
                  htmlFor="defaultFormCardNameEx"
                  className="black-text font-weight-light"
                >
                  Your Country
                </label>
								<CountryDropdown
                className="form-control"
          value={this.state.country}
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
          country={this.state.country}
          value={this.state.region}
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
                  value = {this.state.loc}
                  id="defaultFormCardNameEx"
                  className="form-control"
                  name="loc"
                  onChange={this.changeHandler}
                  required
                />
								<div className="errorMsg">{this.state.errors.loc}</div>
								<br />
								<div className="text-center py-4 mt-3">
									<MDBBtn color="primary" variant="contained" type="submit">Register</MDBBtn>
								</div>
								<NavLink variant="body2" to="/" onSubmit={this.openLogin} style={{display: "flex",
                justifyContent: "center",
                alignItems: "center"
}}>
                {"Already have an account? Sign in"}
              </NavLink>
							</form>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
  );
};
};

export default withRouter(SignUp);
