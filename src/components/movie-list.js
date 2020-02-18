import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MovieList(props) {

    const movieClicked = movie => evt => {
        props.movieClicked(movie);
    };

    const removeClicked = movie => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${movie.id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 8c667c2fa7048eb4d07aeca5e650b3757ce29220'
            },
        })
            .then(resp => props.movieDeleted(movie))
            .catch(error => console.log(error))
    };

    return (
        <div>
            { props.movies.map(movie => {
                return (
                    <div key={movie.id}>
                        <h3 onClick={movieClicked(movie)}>
                            {movie.title}
                        </h3>
                        <FontAwesomeIcon icon={["fas","edit"]} className={''} />
                        <FontAwesomeIcon icon={["fas","trash"]} className={''} onClick={() => removeClicked(movie)} />
                    </div>
                )
            })}
        </div>
    );
}

export default MovieList;