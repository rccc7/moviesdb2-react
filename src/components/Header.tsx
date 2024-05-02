import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ThemeToggler } from "./ThemeToggler";
import SearchInput from "./SearchInput";
import GenreDropdown from "./GenreDropdown";
import DisclaimerBanner from "./DisclaimerBanner";

function Header() {
  return (
    // Here, we can use position sticky and the other elements will not be placed behind this one; however,
    // this time we'll use position fixed
    <header className="fixed w-full z-20 top-0 flex flex-col">
      <DisclaimerBanner />
      <div
        // Notice: Here, we are using 3 colors for the gradient background from, via, and to
        className="flex items-center justify-between p-5 
    bg-gradient-to-t from-gray-200/0 via-blue-900/25 dark:via-gray-900/25 to-blue-900 dark:to-gray-900"
      >
        <Link href={"/"} className="mr-40">
          <Image
            src={
              // "https://upload.wikimedia.org/wikipedia/commons/7/77/Disney_Plus_logo.svg"
              // "https://upload.wikimedia.org/wikipedia/commons/8/8f/Disney_logo.png"
              "/images/MoviesDB2Logo.png"
            }
            alt="Disney logo. https://commons.wikimedia.org/wiki/File:Disney_logo.png"
            about="Attribution: Merv Mat, CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0>, via Wikimedia Commons"
            width={120}
            height={199}
            className="cursor-pointer dark:invert"
          />
        </Link>
        <div className="flex space-x-2">
          {/* Genre dropdown */}
          <GenreDropdown />
          {/* Search Input */}
          <SearchInput />
          {/* Theme toggler */}
          <ThemeToggler />
        </div>
      </div>
    </header>
  );
}

export default Header;
