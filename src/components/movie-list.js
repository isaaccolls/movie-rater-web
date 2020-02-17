import React from 'react';

function MovieList(props) {

    return (
        <div>
            { props.movies.map(movie => {
                return <h3 key={movie.id}>{movie.title}</h3>
            })}
        </div>
    );
}

export default MovieList;