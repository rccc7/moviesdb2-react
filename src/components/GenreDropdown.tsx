import { Genre, Genres } from "@/typings";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// The icon to show in the DropdownMenu
import { ChevronDown } from "lucide-react";
import Link from "next/link";

// This component structure is based on the shacdn/ui's DropdownMenu example at:
// https://ui.shadcn.com/docs/components/dropdown-menu ,and adapted to load dinamically the genres.

async function GenreDropdown() {
  // URL and options obtained from : https://developer.themoviedb.org/reference/genre-movie-list
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
    // With Next.js 14 we have the caching feature which is basically whenever we make a simple request,
    // the same request is cached automatically. That is instead of refreshing the results everytime the
    // same request is made, save the results to the cache for a period of time (let's say one hour).
    // So therefore, the results from a particular request will be cached and refreshed every one hour.
    // More info about caching: https://nextjs.org/docs/app/building-your-application/caching#duration-1
    next: {
      revalidate: 60 * 60, //revalidate every 1 hour
    },
  };

  // API call to tmdb database:
  const response = await fetch(url, options);
  const data = (await response.json()) as Genres;
  console.log(data.genres);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-white flex justify-center items-center">
        Genre <ChevronDown className="ml-1" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Select a Genre</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {data.genres.map((genre) => (
          <DropdownMenuItem key={genre.id}>
            <Link href={`/genre/${genre.id}?genre=${genre.name}`}>
              {genre.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default GenreDropdown;
