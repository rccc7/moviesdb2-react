"use client";
import Image from "next/image";
import React, { useState } from "react";

function DisclaimerBanner() {
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(true);
  return (
    <div
      className={`${
        showDisclaimer ? "visible" : "hidden"
      } bg-yellow-400 text-center rounded-xl p-2 mt-2 text-black`}
    >
      <h1 className="text-sm">
        <span className="font-bold">IMPORTANT NOTICE:</span> This is a personal
        project app with the main purpose to demonstrate the React.js
        capabilities with Nextjs features. This product uses the TMDB API but is
        not endorsed or certified by TMDB. Movie billboards and movie
        descriptions are retrieved directly using the free TMDB API:{" "}
        <a href="https://www.themoviedb.org/" target="_blank">
          <Image
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            alt="TMDB Logo"
            about="https://www.themoviedb.org/about/logos-attribution"
            width={108}
            height={14}
            // className="invert"
            // className="bg-red-400"
            className=" inline"
          />
        </a>
        {/* <span className="font-bold">
          THIS IS A PERSONAL PROJECT WITH NO COMMERCIAL PURPOSES.
        </span> */}
      </h1>
      <button
        className="bg-black/20 py-1 px-4 rounded-lg animate-pulse mt-2"
        onClick={(e) => setShowDisclaimer(!showDisclaimer)}
      >
        Close
      </button>
    </div>
  );
}

export default DisclaimerBanner;
