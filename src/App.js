import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Giffy from './Giffy/Giffy';
import GifDetails from './Giffy/Gifs/GifDetails/GifDetails';
import Header from './Layout/Header/Header';
import Footer from './Layout/Footer/Footer';

class App extends Component { 
  render() {
    return (
    	<Router>
	      <div className="App">
	   			<Header />
	   			<Switch>
						<Route exact path="/" component={Giffy}/>
						<Route exact path="/gif/:id" component={GifDetails}/>
					</Switch>
					<Footer />
	      </div>
	    </Router>
    );
  }
}

export default App;


