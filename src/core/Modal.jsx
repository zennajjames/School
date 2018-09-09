import React from 'react';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';


class ModalPage extends React.Component {
    state = {
      modal: this.props.modal
    };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <Container>
        <Button color="success" onClick={this.toggle}>Submit</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Welcome!</ModalHeader>
          <ModalBody>
            Registration successful! You can now log in.
          </ModalBody>
          <ModalFooter>
            <Button href="/login" color="primary">Log In!</Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default ModalPage;