"use client";
// Since we are using swr Hooks to fetch data, we need to turn this component into client component.
// We could also use only the javaScript fetch function and make this component a server component and async.
// However, in this particular oportunity we'll use the useSWR hook
import useSWR from "swr";
import { isValid } from "zod";

// Declare the fetcher to be used in the useSWR hook. For more info head over https://swr.vercel.app/docs/getting-started
// Here, we call the api/suggestions and pass the term so that the API will fetch from the azureFunction.
const fetcher = (term: string) =>
  fetch("/api/suggestions?term=" + term).then((res) => res.json());

function AISuggestion({ term }: { term: string }) {
  // here, suggestions is the key
  //   the second argunment is the fetcher function
  const { data, error, isLoading, isValidating } = useSWR(
    "suggestions",
    () => fetcher(term),
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  const generateText = () => {
    if (isLoading || isValidating) {
      return (
        <>
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white" />
          <p className="text-sm text-gray-400">AI Assistant is thinking...</p>
        </>
      );
    }
    if (error) return <>Error...</>;
    if (!data) return <>No Data...</>;

    console.log("The object>>>", data);
    return (
      <>
        <div
          className="animate-pulse rounded-full bg-gradient-to-t from-blue-700 h-10 w-10 border-2 
        flex-shrink-0 border-black dark:border-white"
        />
        <div>
          <p className="text-sm text-gray-400">
            AI (Azure functions) Assistant Suggests:{" "}
          </p>
          <p className="italic text-sm">{data.message}</p>
        </div>
      </>
    );
  };

  return (
    <div className="flex space-x-5 items-center px-10">{generateText()}</div>
  );
}

export default AISuggestion;
