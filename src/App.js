import React from 'react';
import {HashRouter} from 'react-router-dom';
import routes from './routes';
import './App.css';

function App(){
    return (
      <HashRouter>
      <div className="App">
      {routes}
      </div>
      </HashRouter>
    )
  }

export default App;
