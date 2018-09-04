import React, { Component } from 'react';
import { Footer } from 'mdbreact';

class Foot extends Component {
  render() {
    return(

        <Footer color="blue">
        <p className="footer-copyright mb-0 py-3 text-center">
        &copy; {(new Date().getFullYear())} Copyright: <a href="https://www.zennajduke.com"> Zenna J. Duke </a>
        </p>
        </Footer>

    )}
};

export default Foot;