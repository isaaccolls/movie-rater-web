import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MovieDetails extends Component {

    constructor(props) {
      super();
      this.state = {
        highlighted: -1,
      };
    }

    highlightRate = high => evt => {
        // console.log(high);
        this.setState({highlighted: high});
    }

    rateClicked = stars => evt => {
        fetch(`http://127.0.0.1:8000/api/movies/${this.props.movie.id}/rate_movie/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 8c667c2fa7048eb4d07aeca5e650b3757ce29220'
            },
            body: JSON.stringify({
                stars: stars + 1
            })
        })
            .then(resp => resp.json())
            .then(res => {
                console.log("rateClicked!!", res);
                this.getDetails();
            })
            .catch(error => console.log(error))
    }

    getDetails = () => {
        fetch(`http://127.0.0.1:8000/api/movies/${this.props.movie.id}/`, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': 'Token 8c667c2fa7048eb4d07aeca5e650b3757ce29220'
            },
        })
            .then(resp => resp.json())
            .then(res => {
                console.log("getDetails!!", res);
                this.props.updateMovie(res);
            })
            .catch(error => console.log(error))
    }

    render() {
        const mov = this.props.movie;

        return (
            <React.Fragment>
                { mov ? (
                    <div>
                        <h3>{mov.title}</h3>
                        <FontAwesomeIcon icon={["fas","star"]} className={mov.avg_rating > 0 ? 'orange' : ''} />
                        <FontAwesomeIcon icon={["fas","star"]} className={mov.avg_rating > 1 ? 'orange' : ''} />
                        <FontAwesomeIcon icon={["fas","star"]} className={mov.avg_rating > 2 ? 'orange' : ''} />
                        <FontAwesomeIcon icon={["fas","star"]} className={mov.avg_rating > 3 ? 'orange' : ''} />
                        <FontAwesomeIcon icon={["fas","star"]} className={mov.avg_rating > 4 ? 'orange' : ''} />
                        ({mov.no_of_ratings})
                        <p>{mov.description}</p>
                        <div className="rate-container">
                            <h2>Rate it!</h2>
                            {[...Array(5)].map((e, i) => {
                                return <FontAwesomeIcon
                                            key={i} icon={["fas","star"]}
                                            className={this.state.highlighted > i - 1 ? 'purple' : ''}
                                            onMouseEnter={this.highlightRate(i)}
                                            onMouseLeave={this.highlightRate(-1)}
                                            onClick={this.rateClicked(i)}
                                        />
                            })}
                        </div>
                    </div>
                ) : null }
            </React.Fragment>
        );
    }
};

export default MovieDetails;
