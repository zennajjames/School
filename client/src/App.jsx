import React from 'react'
import MainRouter from './MainRouter'
import {BrowserRouter} from 'react-router-dom'
import "./styles/index.css";

const App = () => (
  <BrowserRouter>
      <MainRouter/>
  </BrowserRouter>
)


export default App;