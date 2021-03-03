const API_KEY ="6a6b15af6dcc14209c8a82e1c2d12260";
const API_BASE = 'https://api.themoviedb.org/3';
/**
 * 
 - originais da neflix 
 -recomendados (trending)
 -em alta (top rated)
 -acao 
 -comedia 
 -terror 
 - romance
 -documentário; 
 */


const basicFecth = async (endpoint) =>{
    return (await fetch(`${API_BASE}${endpoint}`)).json();
}

export default {
     getHomeList : async () =>{
        return [
            {
                slug: 'originals',
                title : "Originais do Netflix",
                items : await basicFecth(`/discover/tv/?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title : "Recomendados para Você",
                items : await basicFecth(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title : "Em Alta",
                items : await basicFecth(`/movie/top_rated?&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title : "Ação",
                items : await basicFecth(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title : "Comédia",
                items : await basicFecth(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title : "Terror",
                items : await basicFecth(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title : "Romance",
                items : await basicFecth(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },            
            {
                slug: 'documentary',
                title : "Documentários",
                items : await basicFecth(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            },
        ]
     },

     getMovieInfo : async (movieId, type) =>{
        let info = {};
        if(movieId) {
            switch(type){
                case 'movei':
                    info = await basicFecth(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
                 case 'tv':
                    info = await basicFecth(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
                default:
                    info = null;
                break;
            }
        }

         return info;
     }
}
