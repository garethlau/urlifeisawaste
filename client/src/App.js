import React from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Uploader from './components/Uploader';
import FavouriteRecipes from './components/FavouriteRecipes';
import Landing from './components/Landing';

const App = () => {
  return (
    <div>
      <Router>
        <Route exact path={"/"} component={Landing}/>
        <Route path={"/upld"} component={Uploader}/>
        <Route path={"/fav"} component={FavouriteRecipes}/>
      </Router>
    </div>
  );
}

export default App;
