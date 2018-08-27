import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Auth from '../../modules/Auth';
import LoginForm from '../../components/LoginForm.jsx';

const storedMessage = localStorage.getItem('successMessage');
let successMessage = '';

if (storedMessage) {
    successMessage = storedMessage;
    localStorage.removeItem('successMessage');
  }

class Login extends Component {

    state = {
        errors: {},
        successMessage,
        user: {
          email: '',
          password: ''
        }
    }; 

    handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
    };

    changeUser = event => {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;
    
        this.setState({
          user
        });
      }

    handleSubmit = event => {

        event.preventDefault();
       // create a string for an HTTP body message
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `email=${email}&password=${password}`;

        // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', 'api/users/login');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                // success
                console.log("Success!");
                // change the component-container state
                this.setState({
                errors: {}
                });

                // save the token
                Auth.authenticateUser(xhr.response.token);

                // update authenticated state
                this.props.toggleAuthenticateStatus()

                // redirect signed in user to dashboard
                this.props.history.push('/dashboard');
            } else {
                // failure
                console.log("Failure!");
                // change the component state
                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;
                this.setState({
                errors
                });
            }
            });
            xhr.send(formData);
    }

    render() {
        return (
            <LoginForm
              onSubmit={this.handleSubmit}
              onChange={this.changeUser}
              errors={this.state.errors}
              successMessage={this.state.successMessage}
              user={this.state.user}
            />
          );
        }
      
      }
      
      Login.contextTypes = {
        router: PropTypes.object.isRequired
      };
      

export default Login;


// if (this.state.redirectTo) {
//     return <Redirect to={{ pathname: this.state.redirectTo }} />
// } else {
//     return (
//         <div>
//             <h4>Login</h4>
//             <form className="form-horizontal">
//                 <div className="form-group">
//                     <div className="col-1 col-ml-auto">
//                         <label className="form-label" htmlFor="username">Username</label>
//                     </div>
//                     <div className="col-3 col-mr-auto">
//                         <input className="form-input"
//                             type="text"
//                             id="username"
//                             name="username"
//                             placeholder="Username"
//                             value={this.state.username}
//                             onChange={this.handleInputChange}
//                         />
//                     </div>
//                 </div>
//                 <div className="form-group">
//                     <div className="col-1 col-ml-auto">
//                         <label className="form-label" htmlFor="password">Password: </label>
//                     </div>
//                     <div className="col-3 col-mr-auto">
//                         <input className="form-input"
//                             placeholder="password"
//                             type="password"
//                             name="password"
//                             value={this.state.password}
//                             onChange={this.handleInputChange}
//                         />
//                     </div>
//                 </div>
//                 <div className="form-group ">
//                     <div className="col-7"></div>
//                     <button
//                         className="btn btn-primary col-1 col-mr-auto"
                       
//                         onClick={this.handleSubmit}
//                         type="submit">Login</button>
//                 </div>
//             </form>
//         </div>
//     )
// }
// }
// }