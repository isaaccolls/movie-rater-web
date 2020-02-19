import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import Login from './components/login';
import Movies from './components/movies';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <CookiesProvider>
        <Route exact path="/" component={Login} />
        <Route exact path="/movies" component={Movies} />
      </CookiesProvider>
    </BrowserRouter>
  );
}

export default App;
