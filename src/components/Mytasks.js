import React from 'react';
import Mainpage2 from "./Mainpage2";
import { MDBTable, MDBTableBody, MDBTableHead, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdbreact';

class Mytasks extends React.Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { //state is by default an object
         Tasks: [
  {  Task: 'To help buy grocery', Status: 'Pending', Deadline: '6-8-2020' }
          ]
		}
   }

   componentDidMount()
   {
     console.log('In mount')
     let fd = new FormData();
     fd.append('id','2');

     fetch('/Mytasks', {
     method:'POST',
     mode: 'cors',
     cache: 'no-cache',
     credentials: 'same-origin',
     body:fd
     }
 ).then(response=>response.json()).then(data=>this.setState({ Tasks : data }))


}

renderTableHeader() {
  console.log('In header')
  let intial = (this.state.Tasks)[0]
  console.log(intial)
  return Object.keys(intial).map((key, index) => {
      return (<th key={index}>{key.toUpperCase()}</th>)
   })
}



   renderTableData() {
      return this.state.Tasks.map((task, index) => {
         //let { Task, Deadline, Status } = task //destructuring
         //alert(Task)
         return (
            <tr>
               <td>{task['post']}</td>
               <td>{task['status']}</td>
               <td>{task['deadline']}</td>
            </tr>
         )
      })
   }



   render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
     console.log('In render')
     console.log(this.state.Tasks)
      return (
         <MDBContainer>
      <MDBRow className='flex-center'>
        <MDBCol md="10">
          <MDBCard>
            <MDBCardBody>
    <MDBTable striped>
    <MDBTableHead>
    <tr>
	  {this.renderTableHeader()}
    </tr>
	  </MDBTableHead>
	  <MDBTableBody>
	  {this.renderTableData()}
	  </MDBTableBody>
    </MDBTable>
    </MDBCardBody>
  </MDBCard>
</MDBCol>
</MDBRow>
</MDBContainer>
);
   }
 }

 export default Mytasks;
