import React, {useEffect, useState} from 'react'
import Tmdb from './tmdb';
import MovieRow from './components/MovieRow/MovieRow';
import './App.css'
import FeaturedMovie from './components/FeaturedMovie/FeaturedMovie';
import Header from './components/Header/Header';


export default () =>{

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState (null);
  const [blackHeader, setBlackHeader] = useState(false); 

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


   useEffect(()=>{
     const scrollListener = () =>{
         if(window.scrollY > 10) {
           setBlackHeader(true);
         }else {
           setBlackHeader(false); 
         }
     }

     window.addEventListener('scroll', scrollListener);
     return () => {
       window.removeEventListener('scroll', scrollListener);
   
     }
   
   },[]);


    return(
      <div className ="page">
        <Header  black ={blackHeader}/>

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

        <footer>
           Feito com <span role ="img" aria-label="coração"> </span> por Lucas Leite
           Direitod de imagem para netflix 
           Dados do site TMDB
        </footer>

       {movieList.length <= 0 && 
        <div className ="loading">
             <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="loading"></img>
        </div> 
       }

     </div>
   )
 }