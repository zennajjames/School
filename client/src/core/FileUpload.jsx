import React, { Component } from 'react';
import {upload} from '../courses/api-course'

class FileUpload extends Component {

		state = {
			imageURL: ''
		};


	handleUploadImage = (e) => {
		e.preventDefault();
    console.log("testing")
		const data = new FormData();
		data.append('file', this.uploadInput.files[0]);
		data.append('filename', this.fileName.value);

		upload({newdata:data}).then(response => {
			response.json().then(body => {
				this.setState({ imageURL: `http://localhost:3001/${body.file}` });
			});
		});
	}

	render() {
		return (
			<div className="upload">
				<h1 className="display-3">FileUpload</h1>
				<form onSubmit={this.handleUploadImage}>
					<div>
						<input
							ref={ref => {
								this.uploadInput = ref;
							}}
							type="file"
						/>
					</div>
					<br />
					<div>
						<input
							ref={ref => {
								this.fileName = ref;
							}}
							type="text"
							placeholder="Enter the desired name of file"
						/>
					</div>
					<br />
					<div>
						<button className="btn btn-success">Upload</button>
					</div>
					<hr />
					<p>Uploaded Image:</p>
					<img src={this.state.imageURL} alt="img" />
				</form>
			</div>
		);
	}
}
export default FileUpload;