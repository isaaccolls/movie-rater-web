import React, { Component } from 'react';
import MovieList from './movie-list';
import MovieDetails from './movie-details';
import MovieForm from './movie-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withCookies } from 'react-cookie';

class Movies extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      selectedMovie: null,
      editedMovie: null,
      token: this.props.cookies.get('mr-token'),
    };
  }

  componentDidMount() {
    if (this.state.token) {
      fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${this.state.token}`
        }
      })
        .then(resp => resp.json())
        .then(res => {
          console.log(res);
          this.setState({movies: res})
        })
        .catch(error => console.log(error))
    } else {
      window.location.href = '/';
    }
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

  addedMovie = movie => {
    this.setState({movies: [...this.state.movies, movie]});
  }

  render() {
    return (
      <div className="App">
        <h1>
          <FontAwesomeIcon icon={["fas","film"]} />
          <span>Movie Rater</span>
        </h1>
        <div className="layout">
          <MovieList
            movies={this.state.movies}
            movieClicked={this.loadMovie}
            movieDeleted={this.movieDeleted}
            editClicked={this.editClicked}
            newMovie={this.newMovie}
            token={this.state.token}
          />
          <div>
            { !this.state.editedMovie ?
              <MovieDetails
                movie={this.state.selectedMovie}
                updateMovie={this.loadMovie}
                token={this.state.token}
              /> :
              <MovieForm
                movie={this.state.editedMovie}
                cancelForm={this.cancelForm}
                newMovie={this.addedMovie}
                editedMovie={this.loadMovie}
                token={this.state.token}
              /> }
          </div>
        </div>
      </div>
    );
  }
}

export default withCookies(Movies);
