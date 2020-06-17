import React from 'react';
import Mainpage2 from "./Mainpage2";
import {
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBBtn,
    MDBIcon
} from 'mdbreact';
import Button from 'react-bootstrap/Button'
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalDialog from 'react-bootstrap/ModalDialog';
import './Modal.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


class Mytasks extends React.Component {

        constructor(props) {
            super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
            this.state = { //state is by default an object
                Tasks: [{
                    Task: 'To help buy grocery',
                    Status: 'Pending',
                    Deadline: '6-8-2020',
                    Description: "",
                }],
                isOpen: false,
                desc: '',
                status: '',
                R_id: ''
            };
            //this.Clck = this.Clck.bind(this);
            this.toggleModal = this.toggleModal.bind(this);
            this.confrm = this.confrm.bind(this);
        }
        toggleModal = () => {
            this.setState({
                isOpen: !this.state.isOpen
            });
        };

        confrm = (r_id) => {
           let val = prompt("Have you completed or givenup?");
           let stats = new FormData();
           if (val!=null)
           {
          if (val.toLowerCase() == "completed")
          {
             val = 'Y'
           }
          else if (val.toLowerCase() == "givenup") {
            val = 'G'
          }
          else{
            alert('Enter Correct value')
          }
        }


          stats.append('status', val);
          stats.append('id', r_id);

          fetch('/MyTaskStatus', {
              method: 'POST',
              mode: 'cors',
              cache: 'no-cache',
              credentials: 'same-origin',
              body: stats
          }).then(response => {window.location.reload(false);;})
        };


        componentDidMount() {
            console.log('In mount')
            let fd = new FormData();
            fd.append('id', '2');

            fetch('/Mytasks', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                body: fd
            }).then(response => response.json()).then(data => this.setState({
                Tasks: data
            }))
        }

        renderTableHeader() {
            console.log('In header')
            let intial = (this.state.Tasks)[0]
            console.log("initial render", intial);
            
            intial['Description'] = 'D';
            //intial['Delete'] = 'C';
            console.log(intial);
            return Object.keys(intial).map((key, index) => {
                    return ( <th key = { index} show = {false}> 
                    {
                            key.toUpperCase()
                        } < /th>)
                    })
            }

            renderTableData() {
                return this.state.Tasks.map((task, index) => {
                    //let { Task, Deadline, Status } = task //destructuring
                    //alert(Task)
                    task['status'] = (task['status'] == 'N'? 'Pending':'Completed')
                    return ( <tr key = {  index } >
                        <td > {task['post']} </td>
                       <td > {task['status']} < /td>
                      <td> {
                            task['deadline']
                        } < /td>
                        <td > {
                            task['Id']
                        } < /td>
                        <td> <>< Button onClick = {
                            () => {
                                this.setState({
                                    isOpen: !this.state.isOpen
                                });
                                this.setState({
                                    desc: task['post']
                                });
                            }
                        } > Description < /Button>
                        < Modal show = {
                            this.state.isOpen
                        }
                        onHide = {
                          this.toggleModal
                        } >
                                                 <ModalHeader closeButton >
                        <ModalTitle > Description < /ModalTitle>
                        </ModalHeader>
                        <ModalBody> {
                            this.state.desc
                        } < /ModalBody>
                        <Modal.Footer >
                        <Button
                        onClick = {
                            this.toggleModal
                        } >
                        Close <
                        /Button> <
                        /Modal.Footer> <
                        /Modal>
                        </>
                        </td>
                        <td>
                        <MDBBtn  size="sm" color="primary" onClick = {() => {this.confrm(task['Id'])}}>
        <MDBIcon icon="times" />
      </MDBBtn>
                        </td>
                        </tr>
                    )
                })
            }



            render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
                console.log('In render')
                return ( <
                    MDBContainer >
                    <
                    MDBRow className = 'flex-center' >
                    <
                    MDBCol md = "10" >
                    <
                    MDBCard >
                    <
                    MDBCardBody >
                    <
                    MDBTable striped >
                    <
                    MDBTableHead >
                    <
                    tr > {
                        this.renderTableHeader()
                    } <
                    /tr> <
                    /MDBTableHead> <
                    MDBTableBody > {
                        this.renderTableData()
                    } <
                    /MDBTableBody> <
                    /MDBTable> <
                    /MDBCardBody> <
                    /MDBCard> <
                    /MDBCol> <
                    /MDBRow> <
                    /MDBContainer>
                );
            }
        }

        export default Mytasks;
