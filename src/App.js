import React, {useEffect} from "react";
import tmdb from "./tmdb";

export default () => {

useEffect(()=>{
const loadAll = async () =>{
//pegando a lista total
let list = await tmdb.getHomeList();
console.log(list);
}
loadAll();
},[]);

  return(
    <div>
      Hi
    </div>
  );
}