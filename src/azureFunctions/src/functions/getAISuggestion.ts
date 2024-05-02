import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
})

export async function getAISuggestion(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    // Get the query term param:
    const term = request.query.get('term');

    let suggestion:{body:string};

    suggestion= {body: `This is where ChatGPT suggestion should go based on the terms 
    the user enters. ChatGPT not enabled at the moment. The term: ${term}`}

    // IMPORTANT: Uncomment this to ehable chatGPT suggestion calls:
    // try{
    //     const completion = await openai.chat.completions.create({
    //         model:'gpt-3.5-turbo',
    //         messages: [{
    //             role: "system",
    //             // The instruction to chat GPT:
    //             content: "You are a digital video assistant working for services such as Netflix, Disney Plus & Amazon Prime Video. Your job is to provide suggestions based on the videos the user specifies. Provide a quirky breakdown of what the user should watch next! It should only list the names of the films after the introduction. Keep the response short and sweet! Always list at least three films as suggestions. If the user mentions a genre, you should provide a suggestion based on that genre."
    //         },{
    //             role:"user",
    //             content:`I like ${term}`,
    //         },],
    //     })

    //     // this completion will be the chatGPT suggestion to the user based on the provided movies in the serarch.
    //     console.log('The completion choices>>', completion?.choices[0]);

    //     suggestion=  { body: completion.choices[0].message.content || 'No Suggestion' };
    // }catch(error){
    //     suggestion= {body: 'The following error occured when trying to connect chatGPT>>>'+error}
    // }

    
    
    return suggestion;
};

app.http('getAISuggestion', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: getAISuggestion
});


// ####################THI IS THE ORIGINAL TEMPLATE WHEN CREATING THE FUNCTION THROUGH AZURE FUNCTIONS #################
// import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

// export async function getAISuggestion(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
//     context.log(`Http function processed request for url "${request.url}"`);

//     const name = request.query.get('name') || await request.text() || 'world';

//     return { body: `Hello, ${name}!` };
// };

// app.http('getAISuggestion', {
//     methods: ['GET', 'POST'],
//     authLevel: 'anonymous',
//     handler: getAISuggestion
// });
