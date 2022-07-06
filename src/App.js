import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import { MovieRow } from "./components/MovieRow";
import { FeaturedMovie } from "./components/FeaturedMovie";
import { Header } from "./components/Header";
import "./App.css";

export const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      //pegando lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //pegando featured movie (apenas series netflix)
      let originals = list.filter((i) => i.slug === "originals");
      let randomChoice = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let choice = originals[0].items.results[randomChoice];
      let choiceInfo = await Tmdb.getMovieInfo(choice.id, "tv");

      setFeaturedData(choiceInfo);
    };
    loadAll();
  }, []);

  useEffect(()=>{
    
    const scrollListener = () => {
      if(window.scrollY > 100){
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () =>{
      window.removeEventListener('scroll', scrollListener)
    }

  },[]);

  return (
    
    <div className="page">
      <head>
      <title>Netlfix</title>
      <meta
          name="Administration"
          content="V Simósio Norte-Nordeste de Bioinformática"
        />
    </head>
      <Header black={blackHeader}/>

      {featuredData && <FeaturedMovie item={featuredData} />}
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
      Feito por Eduardo Santos 
      <p>Baseado no Projeto da B7Web</p> 
      </footer>
      
      {movieList.length <=0 &&
      <div className="loading"><img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt='loading'/></div>}
    </div>
  );
};
