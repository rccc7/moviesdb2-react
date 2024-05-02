export async function GET(request: Request){
    // Get the url from the request:
    const {searchParams} = new URL(request.url);
    const term = searchParams.get('term');

    // Get the azure function URL from the environment variable
    const azureFunctionUrl = process.env.AZURE_FUNCTION_URL;

    // Call the azure function getAISuggestion and pass the term as a parameter
    const res = await fetch(`${azureFunctionUrl}?term=${term}`,
        {
            method:'GET',
            // Next extension to cache data in the fetch:
            // Documentation at: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#time-based-revalidation
            // 👆👆👆Next.js extends the native fetch Web API to allow you to configure the caching and revalidating behavior for each fetch request on the server. React extends fetch to automatically memoize fetch requests while rendering a React component tree.
            next:{
                revalidate: 60 * 60 *24, //24 hours
            },
        }
    );
    console.log('The response status...>>>', res.status)
    console.log('The response>>>>', res.ok)
    
    // First check whether the result is ok and there is no error, otherwise respond with a 
    // text indicating that azure functions is not enbled/not working.
    const message = (res.status !==200 && !res.ok) ? 
        'Azure functions with AI suggestions not working/not enabled at the moment...' 
        // Don't call res.json because the function already returns text
        : await res.text();
    console.log('the message>>>', message)

    // Now, return te message as a json.
    return Response.json({message});
}