// type definition taken from https://developer.themoviedb.org/reference/genre-movie-list -->
// after clicking the try it button, the response section is filled with the results structure.
export type Genre = {
    id:number;
    name:string;
}
export type Genres = {
    genres:Genre[];
}

export type SearchResults={
    page:number;
    results:Movie[];
    total_pages:number;
    total_results:number;
}

// Type definition taken from https://developer.themoviedb.org/reference/discover-movie -> 
// after clicking the try it button, the response section is filled with the results structure
export type Movie ={
    adult:boolean;
    backdrop_path:string;
    genre_ids:Number[];
    id:number;
    original_language:string;
    original_title:string;
    overview:string;
    popularity:number;
    poster_path?:string;
    release_date:string;
    title:string;
    video:boolean;
    vote_average:number;
    vote_count:number;
}