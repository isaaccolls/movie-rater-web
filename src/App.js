import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Login from './components/login';
import Movies from './components/movies';
import './App.css';

function App() {

    return (
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Login} />
            <Route exact path="/movies" component={Movies} />
          </div>
        </BrowserRouter>
    );
  }

export default App;
