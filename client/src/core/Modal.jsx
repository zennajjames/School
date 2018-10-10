import React from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';


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
      <div>
        <Button color="amber" className="p-2" size="sm" onClick={this.toggle}>{this.props.openButton}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader>{this.props.header}</ModalHeader>
          <ModalBody>
            {this.props.body}
            {/* <Button onClick={this.toggle} size="sm">{this.props.insideBodyButton}</Button> */}
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.toggle} size="sm">{this.props.closeButton}</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalPage;