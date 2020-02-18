import React, { Component } from 'react';

class MovieForm extends Component {

    constructor(props) {
      super();
      this.state = {
      };
    }

    cancelClicked = () => {
        this.props.cancelForm();
    }

    inputChanged = () => {
        console.log('changed');
    }

    saveClick = () => {
        console.log('save');
    }

    render() {
        return (
            <React.Fragment>
                <span>Title</span><br />
                <input
                    type="text"
                    value={this.props.movie.title}
                    onChange={this.inputChanged}
                /><br />
                <span>Descripcion</span><br />
                <textarea
                    value={this.props.movie.description}
                    onChange={this.inputChanged}
                /><br />
                <button onClick={this.saveClick}>Save</button>
                <button onClick={this.cancelClicked}>Cancel</button>
            </React.Fragment>
        );
    }
};

export default MovieForm;
