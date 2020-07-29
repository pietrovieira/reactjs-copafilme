import React from "react";
import { IMovie } from "../../types/movies";

interface Props {
    movieIndex : number,
    totalMovieSelected : number,
    movie : IMovie
    handleChangeMovieSelect : Function
}

const Card: React.FC <Props> = ({
    movieIndex,
    totalMovieSelected,
    movie,
    handleChangeMovieSelect
}) => {
  return (
    <div key={movieIndex}
        onClick={() => handleChangeMovieSelect(movieIndex)}
        className={`card${totalMovieSelected >= 8 && !movie.checked ? ' opacity-50' : ''}`}>
        <input
        type="checkbox"
        checked={movie.checked}
        />
        <div className="card__right">
        <h5>{movie.titulo}</h5>
        <p>{movie.ano}</p>
        </div>
    </div>
  );
};

export default Card;
