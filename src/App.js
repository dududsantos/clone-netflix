import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import { MovieRow } from "./components/MovieRow";
import {FeaturedMovie} from "./components/FeaturedMovie"
import "./App.css";

export const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData]= useState(null)

  useEffect(() => {
    const loadAll = async () => {
      //pegando lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //pegando featured movie (apenas series netflix)
      let originals = list.filter(i=> i.slug === 'originals');
      let randomChoice = Math.floor(Math.random()*(originals[0].items.results.length - 1));
      let choice = originals[0].items.results[randomChoice];
      let choiceInfo = await Tmdb.getMovieInfo(choice.id, 'tv');
      
      setFeaturedData(choiceInfo);
    };
    loadAll();
  }, []); 

  return (
    <div className="page">
     {featuredData &&
     <FeaturedMovie item={featuredData}/>}
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
};
