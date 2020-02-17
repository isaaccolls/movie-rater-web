import React from 'react';

function MovieList(props) {

    const movieClicked = movie => evt => {
        props.movieClicked(movie);
    };

    return (
        <div>
            { props.movies.map(movie => {
                return (
                    <h3 key={movie.id} onClick={movieClicked(movie)}>
                        {movie.title}
                    </h3>
                )
            })}
        </div>
    );
}

export default MovieList;