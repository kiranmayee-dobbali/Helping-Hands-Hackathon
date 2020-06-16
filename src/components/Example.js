import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

class Example extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
        Desc1: this.props.Desc,
        show1: this.props.show1
      }

   }

  render()
  {
  return (
    <Modal show={this.state.show1}>
      <ModalHeader>
        <ModalTitle>Description</ModalTitle>
      </ModalHeader>
      <ModalBody>{this.state.Desc1}</ModalBody>
    </Modal>
  );
}
};

export default Example;
