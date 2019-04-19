import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Giffy from './Giffy/Giffy';
import GifDetails from './Giffy/Gifs/GifDetails/GifDetails';
import Header from './Layout/Header/Header';
import Footer from './Layout/Footer/Footer';
import SearchResults from './Giffy/Search/SearchResults';
import GiphyWatermark from './assets/images/watermarks/1.png';

class App extends Component { 
  render() {
    return (
    	<Router>
	      <div className="App">
	   			<Header />
	   			<img src={GiphyWatermark} alt="giphy watermark" style={{"paddingTop": "15px"}}/>
	   			<Switch>
						<Route exact path="/" component={Giffy}/>
						<Route exact path="/search/:query" component={SearchResults}/>
						<Route exact path="/search/" component={SearchResults}/>
						<Route exact path="/gif/:id" component={GifDetails}/>
					</Switch>
					<Footer />
	      </div>
	    </Router>
    );
  }
}

export default App;


