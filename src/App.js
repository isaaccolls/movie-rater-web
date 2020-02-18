import React, { Component } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      editedMovie: null,
    };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
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
    this.setState({selectedMovie: movie, editedMovie: null});
  }

  movieDeleted = selMovie => {
    const movies = this.state.movies.filter(movie => movie.id !== selMovie.id);
    this.setState({movies: movies, selectedMovie: null});
  }

  editClicked = selMovie => {
    // console.log("edit", selMovie);
    this.setState({editedMovie: selMovie});
  }

  newMovie = () => {
    // console.log("newMovie");
    this.setState({
      editedMovie: {
        title: '',
        description: '',
      }
    })
  }

  cancelForm = () => {
    this.setState({editedMovie: null});
  }

  render() {
    return (
      <div className="App">
        <h1>Movie Rater</h1>
        <div className="layout">
          <MovieList
            movies={this.state.movies}
            movieClicked={this.loadMovie}
            movieDeleted={this.movieDeleted}
            editClicked={this.editClicked}
            newMovie={this.newMovie}
          />
          <div>
            { !this.state.editedMovie ?
              <MovieDetails
                movie={this.state.selectedMovie}
                updateMovie={this.loadMovie}
              /> :
              <MovieForm
                movie={this.state.editedMovie}
                cancelForm={this.cancelForm}
              /> }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
