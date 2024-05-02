import getImagePath from "@/lib/getImagePath";
import { Movie } from "@/typings";
import Image from "next/image";
import React from "react";

function MovieCard({ movie }: { movie: Movie }) {
  return (
    // Assign the position of the div as relative so anything inside this div with position absolute
    // will be positioned relative to this div. In this particular scenario, the p element which
    // has an absolute position will be positioned relative to this div instead of positioned
    // relative to the main document
    <div
      className="relative flex-shrink-0 transform 
    hover:scale-105 transition duration-200 ease-out hover:drop-shadow-lg"
    >
      {/* this div is to add the gradient effect to the MovieCard more specifically to emphasize the text
      bg-gradient-to-b -->Gradient from top to bottom  */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-gray-200/0
       via-gray-900/10 to-gray-300 dark:to-[#1A1C29]/80 z-10"
      />
      {/* position: absolute --> The element is positioned relative to its closest 
        positioned ancestor (if any) or to the initial containing block. 
        If the position property is absolute, the containing block is formed by the edge of the padding box of 
        the nearest ancestor element that has a position value other than static (fixed, absolute, 
        relative, or sticky). |-->Detailed info about identifying the containing block: 
            https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
        In this particular scenario the parent div is positioned relative and not static.
        Therefore, this p element is positoned relative to its closest "positioned" ancestor. 
        If the div were positioned static, then this p element would have to be positoned relative 
        to the main document.*/}
      <p className="absolute z-20 bottom-5 left-5">{movie.title}</p>
      <Image
        className="w-fit lg:min-w-[400px] h-56 object-cover object-center
        shadow-md shadow-gray-900 drop-shadow-xl rounded-sm"
        // Here, movie.backdrop_path and movie.poster_path give only the relative path (/movie/3/movie.jpg)
        // but no the whole url: with http://www.image.tmdb....
        src={getImagePath(movie.backdrop_path || movie.poster_path)}
        alt=""
        width={1920}
        height={1080}
        key={movie.id}
      />
    </div>
  );
}

export default MovieCard;
