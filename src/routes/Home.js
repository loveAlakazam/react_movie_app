import React from "react";
import axios from "axios";
import Movie from "../components/Movie";
import "./Home.css";

class Home extends React.Component{
  state={
    isLoading: true,
    movies:[],
  };

  //life cycle 

  //axios: fetch위에 있는 레이어. - npm i axios
  //async: 비동기 
  //axios가 끝날때까지 기다려야해. (async 키워드가 있어야 await 키워드를 사용할 수 있다.)
  getMovies= async()=>{
    const {
      data:{
        data: {movies}}
      }= await axios.get("https://yts.mx/api/v2/list_movies.json?sort_by=rating")
    this.setState({movies, isLoading: false}); // setState.movies: axios.movies
      //무비를 다 업로드하면,, isLoading state가 변화.
  };

  //컴포넌트 생성할때 
  componentDidMount(){
    // setTimeout(()=>{
    //   this.setState({ isLoading: false, book:true});
    // }, 6000);
    this.getMovies();
  }
  

  render(){
    const {isLoading, movies} = this.state;

    return(
      <section className="container">
        {isLoading? (
            <div className="loader">
              <span className="loader__text">Loading...</span>
            </div>
          ): (
            <div className="movies">
              {movies.map(movie => (
                  <Movie
                  key={movie.id}
                  id={movie.id} 
                  year={movie.year} 
                  title={movie.title} 
                  summary={movie.summary} 
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                />
              ))}
            </div>
        )}
      </section>
    );
  }
}

export default Home;
