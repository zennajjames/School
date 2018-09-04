import React, { Component } from 'react';
import { Container, Row, Col, Button, Fa, Card, Input } from 'mdbreact';
import Dropzone from 'react-dropzone'; 

class Dashboard extends Component {

  state = {
    selectedFile: null,
    isUploading: false,
    images: []
  }

  handleOnDrop = files => {
    this.setState({isUploading: true});

    Promise.all(files.map(file => this.uploadImage(file)))
      .then(images => {
        this.setState({
          isUploading: false,
          images: this.state.images.concat(images)
        });
      }).catch(e => console.log(e));
  }

  uploadImage = file => {
    console.log('Uploading.."')
    const data = new FormData();
    data.append("file", file);
    console.log(data);
    fetch('http://localhost:3000/upload', {
      method: "POST",
      body: data
    }).then(response => console.log(response));
  }
  
  render() {
    const divStyle = {
      width: 400,
      height: 200,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#666',
      borderStyle: 'solid',
      borderRadius: 5
    };

    const activeStyle = {
      opacity: 0.5,
      backgroundColor: '#eee'
    };

    const rejectStyle = {
      backgroundColor: '#ffdddd'
    };

    return(
      <Container>
        <section className="text-center my-5">
          <h2 className="h1-responsive font-weight-bold my-5">Hello {this.props.user}!</h2>
          <p className="grey-text w-responsive mx-auto mb-5">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit est laborum.</p>
          <Row>
            <Col md="12" className="mb-4">
              <Card className="card-image" style={{backgroundImage: 'url(https://mdbootstrap.com/img/Photos/Others/img%20%2832%29.jpg)'}}>
                <div className="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4 rounded">
                  <div>
                    <h6 className="purple-text">
                      <Fa icon="plane"></Fa><strong> Travel</strong>
                    </h6>
                    <h3 className="py-3 font-weight-bold">
                      <strong>Upload Photo</strong>
                    </h3>
                    <Input type="file" onChange={this.fileSelectHandler}/>
                    {/* <label htmlFor="file">Choose a file</label> */}
                    <Button onClick={this.fileUploadHandler}>Upload</Button>
                    <p className="pb-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat fugiat, laboriosam, voluptatem, optio vero odio nam sit officia accusamus minus error nisi architecto nulla ipsum dignissimos. Odit sed qui, dolorum!</p>
                    <Button color="secondary" rounded size="md"><Fa icon="clone" className="left"/> View project</Button>
                  </div>
                </div>
              </Card>
            </Col>
            <Col md="6" className="md-0 mb-4">
              <Card className="card-image" style={{backgroundImage: 'url(https://mdbootstrap.com/img/Photos/Horizontal/Nature/6-col/img%20%2873%29.jpg)'}}>
                <div className="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4 rounded">
                  <div>
                    <h6 className="pink-text">
                      <Fa icon="pie-chart"></Fa><strong> Marketing</strong>
                    </h6>
                    <h3 className="py-3 font-weight-bold">
                      <strong>Dropzone</strong>
                    </h3>
                    <p className="pb-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat fugiat, laboriosam, voluptatem, optio vero odio nam sit officia accusamus minus error nisi architecto nulla ipsum dignissimos. Odit sed qui, dolorum!</p>
                    <Button color="pink" rounded size="md"><Fa icon="clone" className="left"/> View project</Button>
                  </div>
                </div>
              </Card>
            </Col>
            <Col md="6" className="md-0 mb-4">
              <Card className="card-image" style={{backgroundImage: 'url(https://mdbootstrap.com/img/Photos/Horizontal/Nature/6-col/img%20%2873%29.jpg)'}}>
                <div className="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4 rounded">
                  <div>
                    <h6 className="green-text">
                      <Fa icon="eye"></Fa><strong> Entertainment</strong>
                    </h6>
                    <h3 className="py-3 font-weight-bold">
                      <strong>This is card title</strong>
                    </h3>
                    <p className="pb-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat fugiat, laboriosam, voluptatem, optio vero odio nam sit officia accusamus minus error nisi architecto nulla ipsum dignissimos. Odit sed qui, dolorum!</p>
                    <Button color="success" rounded size="md"><Fa icon="clone" className="left"/> View project</Button>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
            <Dropzone
              className="mx-auto"
              onDrop={this.handleOnDrop}
              accept="image/*"
              style={divStyle}
              activeStyle={activeStyle}
              rejectStyle={rejectStyle}
              >
            {this.state.isUploading ?
              <div>Uploading...</div> :
              <div>Upload images by clicking here or dragging files.</div>}
            </Dropzone>
            {/* <img src="..." alt="..." className="img-thumbnail"></img> */}
            {/* {this.state.images.length > 0 &&
              <div style={{margin: 30}}>
                {this.state.images.map(({name, url}) =>
                  <img alt='' key={name} src={url} style={{width: 200, height: 200}}/>)}
              </div>} */}
            </Col>
          </Row>
        </section>
      </Container>
    );
  };
}

export default Dashboard;