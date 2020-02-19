import React, { Component } from 'react';

class MovieForm extends Component {

    constructor(props) {
      super(props);
      this.state = {
        editedMovie: this.props.movie,
      };
    }

    cancelClicked = () => {
        this.props.cancelForm();
    }

    inputChanged = event => {
        // console.log('changed');
        let movie = this.state.editedMovie;
        movie[event.target.name] = event.target.value;
        this.setState({editedMovie: movie});
    }

    saveClicked = () => {
        // console.log('saveClicked');
        console.log(this.state.editedMovie);
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            },
            body: JSON.stringify(this.state.editedMovie)
        })
            .then(resp => resp.json())
            .then(res => {
                console.log("saveClicked res!!", res);
                this.props.newMovie(res);
            })
            .catch(error => console.log(error))
    }

    updateClicked = () => {
        // console.log("updateClicked");
        console.log(this.state.editedMovie);
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            },
            body: JSON.stringify(this.state.editedMovie)
        })
            .then(resp => resp.json())
            .then(res => {
                console.log("updateClicked res!!", res);
                this.props.editedMovie(res);
            })
            .catch(error => console.log(error))
    }

    render() {
        const isDisabled = this.state.editedMovie.title.length === 0 || this.state.editedMovie.description.length === 0;
        return (
            <React.Fragment>
                <span>Title</span><br />
                <input
                    name="title"
                    type="text"
                    value={this.props.movie.title}
                    onChange={this.inputChanged}
                /><br />
                <span>Descripcion</span><br />
                <textarea
                    name="description"
                    value={this.props.movie.description}
                    onChange={this.inputChanged}
                /><br />
                { this.props.movie.id ?
                    <button disabled={isDisabled} onClick={this.updateClicked}>Update</button> :
                    <button disabled={isDisabled} onClick={this.saveClicked}>Save</button> }
                &nbsp;
                <button onClick={this.cancelClicked}>Cancel</button>
            </React.Fragment>
        );
    }
};

export default MovieForm;
