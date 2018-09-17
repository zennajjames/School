import React from 'react'
import MainRouter from './MainRouter'
// import {BrowserRouter} from 'react-router-dom'
import { Col, Container, Row, Footer } from 'mdbreact';
import { Provider } from "react-redux";
import "./styles/index.css";

import { Router } from 'react-router-dom';
import history from './history';

const Foot = () => (
		<Footer color="cyan darken-2" className="font-small pt-0 mt-0">
				<Container>
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

const App = () => (
	<Router history={history}>
		<div className="content">
			<MainRouter/>
		</div>
	</Router>
	)

const withFooter = WrappedComponent => () => [
  <WrappedComponent key="1" />,
  <Foot key="2" />
];

const Wrapper = () => (
  <Provider>
    <App />
  </Provider>
);

const WrapperWithFooter = withFooter(Wrapper);

export default WrapperWithFooter;
