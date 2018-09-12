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
        <Button color="success" onClick={this.toggle}>{this.props.openButton}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{this.props.header}</ModalHeader>
          <ModalBody>
            {this.props.body}
          </ModalBody>
          <ModalFooter>
            <Button href="/login" color="primary">{this.props.closeButton}</Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default ModalPage;