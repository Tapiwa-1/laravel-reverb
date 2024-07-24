import { APP } from "./../App/APP";

// Define a type for HTTP verbs that can be used in the request
type HttpVerbType = "GET" | "POST" | "PUT" | "DELETE";

/**
 * Makes an HTTP request to a specified endpoint with the provided verb and input data.
 * @param endpoint The endpoint to which the request is made (appended to APP.apiBaseURL).
 * @param verb The HTTP verb (GET, POST, PUT, DELETE) used for the request.
 * @param input The input data to be sent with the request (will be JSON stringified).
 * @returns A Promise that resolves with the parsed response data of type TResponse.
 */
export function makeHttpReq<TInput, TResponse>(endpoint: string, verb: HttpVerbType, input?: TInput): Promise<TResponse> {
    return new Promise<TResponse>(async (resolve, reject) => {
        try {
            // Perform the fetch request to the specified endpoint
            const res = await fetch(`${APP.apiBaseURL}/${endpoint}`, {
                method: verb,  // Use the specified HTTP verb (GET, POST, PUT, DELETE)
                headers: {
                    "Content-Type": "application/json",  // Set content type to JSON
                },
                body: JSON.stringify(input),  // Convert input data to JSON string and include in request body
            });

            // Check if the response status is ok (2xx range)
            if (!res.ok) {
                // If response is not ok, parse the error data and reject the promise
                const errorData = await res.json();
                reject(errorData);  // Reject with the parsed error data
                return;
            }

            // If response is ok, parse the response data as TResponse and resolve the promise
            const data: TResponse = await res.json();
            resolve(data);  // Resolve with the parsed response data
        } catch (error) {
            // If an error occurs during fetch or parsing, reject the promise with the error
            reject(error);  // Reject with the caught error
        }
    });
}
