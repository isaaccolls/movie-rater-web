import React, { Component } from 'react';
import './App.css';
import MovieList from './components/movie-list';

class App extends Component {
  movies = ['titanic', 'avatar'];

  componentDidMount() {
    
  }

  render() {
    return (
      <div className="App">
        <h1>Movie Rater</h1>
        <MovieList movies={this.movies} />
      </div>
    );
  }
}

export default App;
