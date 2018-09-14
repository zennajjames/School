import React, {Component} from 'react'
import { Button, Input, InputFile } from 'mdbreact';
import PropTypes from 'prop-types'
import {create} from './api-post.js'
import auth from '../auth/auth-helper.js'

const styles = {
  media: {
    maxHeight: 200,
    maxWidth: 200
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50, 
    marginRight: 15
  },
  input: {
    display: 'none'
  }
}

class NewPost extends Component {
  
  state = {
    text: '',
    photos: [],
    error: '',
    user: {}
  }

  componentDidMount = () => {
    this.postData = new FormData()
    this.setState({user: auth.isAuthenticated().user})
  }

  clickPost = () => {
    console.log("Posting...")
    const jwt = auth.isAuthenticated()
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, this.postData).then((data) => {
      console.log(this.postData)
      if (!data) {
        this.setState({error: "There was an error. Try again."})
      } else {
        this.setState({text:'', photos: []})
        this.props.addUpdate(data)
      }
    })
  }

  fileInputHandler = (files) => {
     console.log(files) // returns FileList object
     //Check File API support
     if (window.File && window.FileList && window.FileReader) {
  
      var output = document.getElementById("result");

      for (var i = 0; i < files.length; i++) {
          var file = files[i];
          //Only pics
          if (!file.type.match('image')) continue;

          var picReader = new FileReader();
          picReader.addEventListener("load", function (event) {
              var picFile = event.target;
              var div = document.createElement("div");
              div.innerHTML = "<img style='max-width:90px; max-height:90px; float:left; margin:10px; display: inline'src='" + picFile.result + "'" + "title='" + picFile.name + "'/>";
              output.insertBefore(div, null);
          });
          //Read the image
          picReader.readAsDataURL(file);
      }

      } else {
          console.log("Your browser does not support File API");
      }
  }
  
  // handleChange = name => event => {
  //   const value = name === 'photo'
  //     ? event.target.files[0]
  //     : event.target.value
  //   this.postData.set(name, value)
  //   this.setState({ [name]: value })
  // }

  handleChange = name => event => {
    const value = name === 'photo'
      ? event.target.files
      : event.target.value
    
    if(name === "photo"){
      for(let i = 0; i < event.target.files.length; i++){
        let file = event.target.files[i];
        this.postData.append('File', file);
    }
  }
    this.postData.append(name, value)
    this.setState({ [name]: value })
  }

  render() {
    return (
        <div>
            <div className="d-flex flex-row">
              <Input onChange={this.handleChange('text')} hint="Share your thoughts ..." value={this.state.text}/>  
            </div>
              {/* <input style={styles.input}  onChange={this.handleFileSelect}  multiple="multiple"/> */}
        
                {/* <InputFile hint="upload" multiple  onChange={this.handleChange('photo')} btnColor="info" type="file" id="files"></InputFile> */}
                <input accept="image/*" multiple onChange={this.handleChange('photo')} id="icon-button-file" type="file" />

              <br/>
              <output id="result" />

            { this.state.error && (<h5 component="p" color="error">
                  {this.state.error}
                </h5>)
            }
    
              <div className='float-right'>
                  <Button size="sm" disabled={this.state.text === ''} onClick={this.clickPost}>Post</Button>
              </div>
        </div>)
  }
}

NewPost.propTypes = {
  addUpdate: PropTypes.func.isRequired
}

export default NewPost;


//getValue={this.fileInputHandler}