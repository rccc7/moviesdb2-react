"use client";
import { Movie } from "@/typings";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import getImagePath from "@/lib/getImagePath";

Autoplay.globalOptions = { delay: 8000 };

function CarouselsBanner({ movies }: { movies: Movie[] }) {
  // Here, duration is in milliseconds.
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 100 }, [
    Autoplay(),
  ]);
  return (
    <div
      className="overflow-hidden lg:-mt-40 relative cursor-pointer"
      ref={emblaRef}
    >
      {/* Here, according to the embla example, the classname should be "embla". However, we're not going to follow
        that same styling, but we will customize it. IN the same page in the section "Styling the carousel" at
        https://www.embla-carousel.com/get-started/react/#styling-the-carousel, the styles are as follows:
        .embla {
            overflow: hidden;
            }
        .embla__container {
            display: flex;
        }
        .embla__slide {
            flex: 0 0 100%;
            min-width: 0;
        }

        and in the example at the Accessing the carousel API at https://www.embla-carousel.com/get-started/react/#accessing-the-carousel-api
        the classname is 'embla'. However, as said above, we are using a customized class:
 */}
      <div className="flex">
        {movies.map((movie) => (
          // Extended flex-full css property defined in the tailwind.config.ts file (extend section)--> flex: 0 0 100%
          // this can also be achieved by writing a customized flex value: className="flex-[0_0_100]" whitouth having to
          // extend and configure the tailwind.config.ts file
          <div key={movie.id} className="flex-full min-w-0 relative">
            <Image
              key={movie.id}
              src={getImagePath(movie.backdrop_path, true)}
              alt=""
              width={1920}
              height={1080}
            />
            {/* - by default this dive will be hidden in the mobile view 
            - bg-transparent: --> the base background is transparent (before defining the gradient)
            - from-gray-900/90 via-transparent to-transparent -->Three stages gradient*/}
            <div
              className="hidden lg:inline absolute mt-0 top-0 pt-40 xl:pt-52
            left-0 lg:mt-40 bg-transparent z-20 h-full w-full 
            bg-gradient-to-r from-gray-900/90 via-transparent to-transparent
            p-10 space-y-5 text-white"
            >
              <h2 className="text-5xl font-bold max-w-xl z-50">
                {movie.title}
              </h2>
              {/* line-clamp: if the text will surpass 3 lines, then cut the text show 3 dots in the 3rd line  */}
              <p className="max-w-xl line-clamp-3">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
      {/* The shadow effect at the bottom of the banner: */}
      <div
        className="absolute inset-0 bg-gradient-to-b 
      from-gray-200/0 via-gray-900/25 to-gray-300 dark:to-[#1A1C29]"
      />
    </div>
  );
}

export default CarouselsBanner;
