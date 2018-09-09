import React from 'react';
import { Container, InputFile } from 'mdbreact';

class Upload extends React.Component {

  fileInputHandler = (files) => {
    console.log(files) // returns FileList object
  }

  render () {
    return (
      <Container className="mt-5">
        <InputFile multiple accept="image/*" onChange={this.handleChange('photo')} id="icon-button-file" type="file"></InputFile>
      </Container>
    );
  }
}

export default Upload;