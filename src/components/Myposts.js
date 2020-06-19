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


class Myposts extends React.Component {

        constructor(props) {
            super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
            this.state = { //state is by default an object
                Posts: [],
                isOpen: false,
                desc: '',
                status: '',
                R_id: ''
            };
            this.toggleModal = this.toggleModal.bind(this);
        }
        toggleModal = () => {
            this.setState({
                isOpen: !this.state.isOpen
            });
        };


        componentDidMount() {
            console.log('In mount')
            let fd = new FormData();
            fd.append('id', '2');

            fetch('/Myposts', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                body: fd
            }).then(response => response.json()).then(data => this.setState({
                Posts: data
            }))
        }

        renderTableHeader() {
            let intial = (this.state.Posts)[0]
            intial['Description'] = 'D';
            return Object.keys(intial).map((key, index) => {
                    return (
<th key = { index} show = {false}>
                    {
                            key.toUpperCase()
                        } < /th>)
                    })
            }

            renderTableData() {
                return this.state.Posts.map((task, index) => {
                  task['status'] = ((task['status'] == 'P' || task['status'] == 'Pending')? 'Pending':'New')
                    return (
	<tr key = {  index } >
		<td > {task['post_title']} </td>
    <td> {
                          task['deadline']
                      } < /td>
		<td > {task['status']} < /td>
				<td > {
                            task['Id']
                        } < /td>
                        <td> {
                                              task['post']
                                          } < /td>
					<td><>< Button onClick = {
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
                         >
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
                        /Button><
                        /Modal.Footer><
                        /Modal>
									</>
								</td>
							</tr>
                    )
                })
            }



            render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
              if (Object.keys(this.state.Posts).length == 0)
              {
                return (<h2 style={{position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
 }}> No Posts </h2>)
              }
							return(<MDBContainer ><
                    MDBRow className = 'flex-center' ><
                    MDBCol md = "10" ><
                    MDBCard ><
                    MDBCardBody ><
                    MDBTable id="posts" striped><
                    MDBTableHead ><
                    tr > {
                        this.renderTableHeader()
                    } <
                    /tr><
                    /MDBTableHead><
                    MDBTableBody > {
                        this.renderTableData()
                    } <
                    /MDBTableBody><
                    /MDBTable><
                    /MDBCardBody><
                    /MDBCard><
                    /MDBCol><
                    /MDBRow><
                    /MDBContainer>
                  )




            }
        }

        export default Myposts;
