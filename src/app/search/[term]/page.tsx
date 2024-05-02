import AISuggestion from "@/components/AISuggestion";
import MoviesCarousel from "@/components/MoviesCarousel";
import { getPopularMovies, getSearchedMovies } from "@/lib/getMovies";
import { notFound } from "next/navigation";
import React from "react";

// This props definition can be obtained by symply receiving a pars in the SearchPage funcion
// like this: function SearchPage(props) { console.log('The props>>>', props)....}
// The result will print in the console the structure of the received props. For example:
// if we write localhost:3000/search/adf in the browser then look in the console, the result  will be:
// the props>>> { params: { term: 'adf' }, searchParams: {} } -->this is how we get the structure of the
// props received by a dinamyc route and with that info we can create our type as follows:
type Props = {
  params: { term: string }; //Notice that term is the name of the file inside the squqre brackets "[term]"
  searchParams: {}; //In this project we won't use this property
};

// And of course, we can check out the props parameter detail at the official dynamic routes documentation
// For info about dynamic routes: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
//

async function SearchPage({ params }: Props) {
  // console.log("the props>>>", params);
  // Next 14 feature: The notFound() function which when used in a React server component,
  // this will set the status code to 404. When used in a custom app route it will just send a 404 status.
  // That is it'll display a 404 not found page
  if (!params.term) notFound();

  //   Remove the nasty % signs when the term contains spaces: For example:
  // Search term: The matrix ---> params.term: The%matrix
  const termToUse = decodeURI(params.term);

  // API call to get the searched movies
  const movies = await getSearchedMovies(termToUse);

  // console.log("The searched movies>>>", movies);

  // API call to get the Popular movies
  const popularMovies = await getPopularMovies();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flexs flex-cols space-y-4 mt-32 xl:mt-42">
        <h1 className="text-6xl font-bold px-10">Results for {termToUse}</h1>

        {/* AI suggestion */}
        <AISuggestion term={termToUse} />

        <MoviesCarousel title="Movies" movies={movies} isVertical />

        <MoviesCarousel title="You may also like" movies={popularMovies} />
      </div>
    </div>
  );
}

export default SearchPage;
