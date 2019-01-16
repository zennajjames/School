import React from 'react';
import { Container, Footer } from 'mdbreact';

var style = {
        position: "absolute",
        left: "0",
        bottom: "0",
        height: "90px",
        width: "100%",
        paddingTop: "2rem"
}
    
class FooterPage extends React.Component {
    render(){
        return(
                <Footer style={style}>
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
