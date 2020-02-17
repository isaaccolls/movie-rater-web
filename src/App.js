import React, { Component } from 'react';
import './App.css';
import MovieList from './components/movie-list';

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8000/api/movies/', {
      method: 'GET',
      headers: {
        'Authorization': 'Token 934198eddddfe5a40d6c8ddc04400b5af2cb348f'
      }
    })
      .then(resp => resp.json())
      .then(res => {
        console.log(res);
        this.setState({movies: res})
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App">
        <h1>Movie Rater</h1>
        <MovieList movies={this.state.movies} />
      </div>
    );
  }
}

export default App;
