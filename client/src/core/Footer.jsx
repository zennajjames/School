import React from 'react';
import { Col, Container, Row, Footer } from 'mdbreact';

var style = {
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "60px",
        width: "100%",
}
    
class FooterPage extends React.Component {
    render(){
        return(
                <Footer transparent style={style}>
                        <div className="footer-copyright text-center py-3">
                                <Container fluid>
                                        &copy; {(new Date().getFullYear())} Copyright: <a href="https://www.zennajduke.com"> CreativeClassroom.com </a>
                                </Container>
                        </div>
                </Footer>
    );
    }
}   

export default FooterPage;
