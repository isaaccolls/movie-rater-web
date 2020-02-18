import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MovieDetails extends Component {
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
                    </div>
                ) : null }
            </React.Fragment>
        );
    }
};

export default MovieDetails;
