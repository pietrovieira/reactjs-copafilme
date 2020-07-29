import React from "react";
import { IMovie } from "../../types/movies";

import api from "../../api";
import Header from '../../components/Header'
import Card from "../../components/Card"

const ListMovies: React.FC = () => {
  const [list, setList] = React.useState<IMovie[]>([]);
  const [resultList, setResultList] = React.useState<IMovie[]>([]);
  const [isResultFinal, setIsResultFinal] = React.useState<boolean>(false);
  const [totalMovieSelected, setTotalMovieSelected] = React.useState<number>(0);

  React.useEffect(() => {
    const fetchMovies = async () => {
      const { status, data } = await api.get("/api/filmes")
      if (status === 200) {
        const sortList = data.sort((oldMovie : IMovie, newMovie : IMovie) => (oldMovie.titulo < newMovie.titulo) ? -1 : (oldMovie.titulo > newMovie.titulo) ? 1 : 0 )
        let newMovieList : IMovie[] = []
        sortList.forEach((movie : IMovie) => {
          newMovieList.push({
            ...movie,
            checked: false
          })
        })
        setList(newMovieList)
        setResultList(sortList)
      }
    };
    fetchMovies();
  }, []);

  React.useEffect(() => {
    setTotalMovieSelected(list.filter((movie : IMovie) => movie.checked === true).length)
  },[list])

  const reset = () => {
    let locallyMovies : IMovie[] = []
    list.forEach((movie:IMovie, movieIndex : number) => {
      if ( movie.checked )
        movie.checked = false
      locallyMovies[movieIndex] = movie
    })
    setList([...locallyMovies])
    setIsResultFinal(false)
  }

  const handleChangeMovieSelect = (movieIndex : number) => {
    let locallyMovies : IMovie[] = list
    if ( totalMovieSelected < 8 )
      locallyMovies[movieIndex].checked = !locallyMovies[movieIndex].checked
    if ( totalMovieSelected >= 8 )
      locallyMovies[movieIndex].checked = false
    setList([...locallyMovies])
  }

  let movieListAvailable : IMovie[] = list.filter((movie : IMovie) => movie.checked === true)
  const handleGenerate = () => {
    let movieListLocal : IMovie[] = []
    const totalNumMovieList = movieListAvailable.length
    try
    {
      for( let index = 0 ; index < (totalNumMovieList/2) ; index++ )
      {
        const movieListTwo = movieListAvailable[ ( totalNumMovieList - (index+1) )]
        if ( movieListTwo !== undefined )
        {
          const movieListOne = movieListAvailable[index]
          const movieListOneScore = ( movieListOne !== undefined ? movieListOne.nota : 0 )
          const movieListTwoScore = ( movieListTwo !== undefined ? movieListTwo.nota : 0 )
          if (movieListOneScore > movieListTwoScore)
            movieListLocal.push(movieListOne)
          if (movieListOneScore < movieListTwoScore)
            movieListLocal.push(movieListTwo)
        }
      }
      if ( movieListLocal.length <= 2 ){
        const orderMovieOnResult = movieListLocal.sort((oldMovie : IMovie, newMovie : IMovie) => (oldMovie.nota > newMovie.nota) ? -1 : (oldMovie.nota < newMovie.nota) ? 1 : 0 )
        setResultList(orderMovieOnResult)
        setIsResultFinal(true)
      }
      if ( movieListLocal.length > 2 ){
        movieListAvailable = movieListLocal
        movieListLocal = []
        handleGenerate()
      }
    }catch( error ) {
      console.error(error)
    }
  }

  return (
    <>
        <Header resultFinal={isResultFinal} />
        {!isResultFinal && (
          <>
            <div className="top">
                <span className="width--sm">Selecionados {totalMovieSelected} de 8 filmes</span>
                <button className={`${totalMovieSelected<8 ? 'opacity-50 cursor-default outline-none' : ''}`} onClick={totalMovieSelected === 8 ? handleGenerate : ()=>{}} type="button">Gerar meu Campeonato</button>
            </div>
            <div className="cards">
                {list.map((movie: IMovie, movieIndex : number) => (
                  <Card
                  movieIndex={movieIndex}
                  totalMovieSelected={totalMovieSelected}
                  movie={movie}
                  handleChangeMovieSelect={handleChangeMovieSelect}
                  />
                ))}
            </div>
          </>
        )}
        {isResultFinal && (
          <>
          <div className="rows">
            <ol>
              {
                resultList.map( (movie : IMovie) => (
                <li key={movie.nota}>
                  <p>Titulo: {movie.titulo} - Nota: {movie.nota}</p>
                </li>
                ))
              }
            </ol>
            <div className="w-full inline-block h-32">
              <button type="button" onClick={reset}>Refazer</button>
            </div>
          </div>
          </>
        )}
    </>
  );
};

export default ListMovies;
