import React from 'react';
import { Col, Container, Row, Footer } from 'mdbreact';

var style = {
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "120px",
        width: "100%",
}

const container = {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start"
}
    

class FooterPage extends React.Component {
    render(){
        return(
                <Footer style={style} color="stylish-color-dark" className="footer font-small">
                        <Container style={container}>
                                <Row>
                                        <Col md="12">
                                                <div className="mb-5 flex-center">
                                                <a className="fb-ic"><i className="fa fa-facebook fa-md white-text mr-md-3 mr-1"> </i></a>
                                                <a className="tw-ic"><i className="fa fa-twitter fa-md white-text mr-md-3 mr-1"> </i></a>
                                                <a className="gplus-ic"><i className="fa fa-google-plus fa-md white-text mr-md-3 mr-1"> </i></a>
                                                <a className="li-ic"><i className="fa fa-linkedin fa-md white-text mr-md-3 mr-1"> </i></a>
                                                <a className="ins-ic"><i className="fa fa-instagram fa-md white-text mr-md-3 mr-1"> </i></a>
                                                <a className="pin-ic"><i className="fa fa-pinterest fa-md white-text"> </i></a>
                                                </div>
                                        </Col>
                                </Row>
                        </Container>
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
