import React from 'react'
import MainRouter from './MainRouter'
import {BrowserRouter} from 'react-router-dom'
import "./styles/MainRouter.css";


const App = () => (
	<BrowserRouter>
		<div className="html">
			<MainRouter/>
		</div>
	</BrowserRouter>
  )

export default App;
