import React, {useEffect} from "react";
import Tmdb from "./Tmdb";

export const App = ()=>  {

 useEffect(()=> {
  const loadAll = async () =>{

    let list = await Tmdb.getHomeList();
    console.log(list);
}
loadAll();
},[])

  return(
    <div>
      Hi
    </div>
  );
}