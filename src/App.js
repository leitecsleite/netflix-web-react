import React, {useEffect, useState} from 'react'
import Tmdb from './tmdb';
import MovieRow from './components/MovieRow';
import './App.css'
import FeaturedMovie from './components/FeaturedMovie';

export default () =>{

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState (null);

   useEffect (()=>{
       const loadall = async () => {
         //pegando a lista total

         let list = await Tmdb.getHomeList();
         setMovieList(list);

         // pegando o filme em destaque 

         let originals = list.filter( i => i.slug === 'originals')
         let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1))
         let chosen = originals[0].items.results[randomChosen];
         let chosenInfor = await Tmdb.getMovieInfo(chosen.id, 'tv');
         setFeaturedData(chosenInfor);
       }

       loadall();
   }, []);


    return(
      <div className ="page">
        {featuredData && 
           <FeaturedMovie item = {featuredData} />
        }
        
        <section className="lists">
          {movieList.map((item, key) =>(
            <div>
              <MovieRow key={key} title={item.title} items={item.items}/>
            </div>
          ))}

        </section>

      </div>
    );

}