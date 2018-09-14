import React, { Component } from 'react';
import { Container, Footer } from 'mdbreact';

class Foot extends Component {
  render() {
    return(

        <Footer color="amber darken-2" className="font-small pt-4 mt-4">
            <div className="footer-copyright text-center py-3" color="amber darken-1">
                <Container fluid>
                    &copy; {(new Date().getFullYear())} Copyright: <a href="https://www.zennajduke.com"> CreativeClassroom LLC </a>
                    </Container>
            </div>
    </Footer>
    );
    }
}

export default Foot;