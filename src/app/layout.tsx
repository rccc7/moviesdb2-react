import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";

// RCCC: Not interested in Google's inter..
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movies Database - React",
  description: "Just another react app clone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* // RCCC: Not interested in Google's inter.. */}
      {/* <body className={inter.className}>{children}</body> */}
      {/* Children will be what is inside the page.tsx file */}
      <body className="bg-white dark:bg-[#1A1C29] ">
        {/* Wrap all the body elements (Header and children) inside the Theme provider in order to apply the 
        theme functionality in the application.
        For more info about this theme provider component head over to: https://ui.shadcn.com/docs/dark-mode/next */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* The header will be displayed in each page even in the 404 page */}
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
