import React from 'react'
import { hydrate } from 'react-dom'

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import App from './App'

hydrate(<App/>, document.getElementById('root'))
