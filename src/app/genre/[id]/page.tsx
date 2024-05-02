import MoviesCarousel from "@/components/MoviesCarousel";
import { getDiscoverMovies } from "@/lib/getMovies";
import React from "react";

// How to obtain the props definition:
// add the generic parameter props to the function:
// "function GenrePage(props) {console.log("The props>>>", props);...}"
// Then go to http://localhost:3000/genre/80?genre=crime
// then check what the console prints:
// The props>>> { params: { id: '80' }, searchParams: { genre: 'crime' } }
// Based on that information we create the Props type. Or we can directly head over
// to the official app-router documentation: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes

// Note, the url will be the caching key
type Props = {
  params: { id: string };
  searchParams: { genre: string };
};

async function GenrePage({ params: { id }, searchParams: { genre } }: Props) {
  const movies = await getDiscoverMovies(id);
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col spac-y-5 mt-32 xl:mt-42">
        <h1 className="text-6xl font-bold p-10">Results for {genre}</h1>
      </div>
      <MoviesCarousel title={"Genre"} movies={movies} isVertical />
    </div>
  );
}

export default GenrePage;
