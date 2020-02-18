import React, { Component } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details.js';

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
    };
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8000/api/movies/', {
      method: 'GET',
      headers: {
        'Authorization': 'Token 8c667c2fa7048eb4d07aeca5e650b3757ce29220'
      }
    })
      .then(resp => resp.json())
      .then(res => {
        console.log(res);
        this.setState({movies: res})
      })
      .catch(error => console.log(error))
  }

  loadMovie = movie => {
    // console.log(movie);
    this.setState({selectedMovie: movie});
  }

  render() {
    return (
      <div className="App">
        <h1>Movie Rater</h1>
        <div className="layout">
          <MovieList movies={this.state.movies} movieClicked={this.movieClicked} />
          <MovieDetails movie={this.state.selectedMovie} updateMovie={this.loadMovie} />
        </div>
      </div>
    );
  }
}

export default App;
