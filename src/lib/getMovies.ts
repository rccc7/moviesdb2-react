import { SearchResults } from "@/typings";

// RCCC Async functions to obtain the movies by specific genre to be shown in the Home page carousel:
const fetchFromTMDB = async(url:URL, cacheTime?:number)=>{
    
    // The filters configuration and other parameters can be seen in the example
    // at https://developer.themoviedb.org/reference/discover-movie
    // const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
    // Here, we add the following filters one by one with the url.searchParams.set function:

    // Don't include adult films
    url.searchParams.set('include_adult', 'false');
    url.searchParams.set('include_video','false');
    url.searchParams.set('sort_by','popularity.desc');
    url.searchParams.set('language', 'en-US');
    url.searchParams.set('page', '1');

    const options:RequestInit={
        method:'GET',
        headers:{
            accept:"application/json",
            Authorization:`Bearer ${process.env.TMDB_API_KEY}`
        },
        next:{
            revalidate:cacheTime|| 60*60*24, //Default to 24 hours if the cacheTime is not provided...
        }
    };

    const response = await fetch(url.toString(), options);
    // console.log('The response>>>', response)
    const data = (await response.json()) as SearchResults;

    return data;
}

export async function getUpcomingMovies(){
    // API Link obtained from: https://developer.themoviedb.org/reference/movie-upcoming-list
    const url = new URL('https://api.themoviedb.org/3/movie/upcoming');
    const data = await fetchFromTMDB(url);

    return data.results;
}

export async function getTopRatedMovies(){
    // API Link obtained from: https://developer.themoviedb.org/reference/movie-top-rated-list
    const url = new URL('https://api.themoviedb.org/3/movie/top_rated');
    const data = await fetchFromTMDB(url);

    return data.results;
}

export async function getPopularMovies(){
    // API Link obtained from: https://developer.themoviedb.org/reference/movie-popular-list
    const url = new URL('https://api.themoviedb.org/3/movie/popular');
    const data = await fetchFromTMDB(url);

    return data.results;
}

export async function getDiscoverMovies(id?:string, keywords?:string){
    // API Link obtained from: https://developer.themoviedb.org/reference/discover-movie
    // Use the discover URL:
    const url = new URL('https://api.themoviedb.org/3/discover/movie');
    keywords && url.searchParams.set('with_keywords', keywords);
    id && url.searchParams.set('with_genres', id);

    const data = await fetchFromTMDB(url);
    return data.results;
}

export async function getSearchedMovies(term:string){
    // API Link obtained from https://developer.themoviedb.org/reference/search-movie
    const url = new URL('https://api.themoviedb.org/3/search/movie');
    url.searchParams.set('query', term);
    // url.searchParams.set('include_adult', 'false');
    // url.searchParams.set('language', 'en-US');
    // url.searchParams.set('page','1');

    const data = await fetchFromTMDB(url);
    return data.results;
}