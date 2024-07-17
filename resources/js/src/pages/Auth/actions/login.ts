import { ref } from "vue";
import { makeHttpReq } from "../../../helper/makeHttpReq";
import { showError, successMsg } from "../../../helper/toast-notification";

// Define types for user input and response from loginAPI
export type LoginUserType = {
    email: string;
    password: string;
};

export type LoginResponseType = {
    user: { email: string };
    message: string;
};

// Reactive reference for user login input
export const loginInput = ref<LoginUserType>({ email: "", password: "" });

// Function to handle user login logic
export function useLoginUser() {
    const loading = ref(false);  // Reactive reference for loading state

    async function login() {
        try {
            loading.value = true;  // Set loading state to true during login process

            // Make HTTP POST request to 'login' endpoint with user input data
            const data = await makeHttpReq<LoginUserType, LoginResponseType>('login', 'POST', loginInput.value);

            loading.value = false;  // Reset loading state after request completes
            loginInput.value = { email: "", password: "" };  // Clear user input after successful login
            successMsg(data.message);  // Show success message to user
        } catch (error) {
            loading.value = false;  // Reset loading state if an error occurs

            // Handle error response (assuming error is an array of strings)
            for (const message of error as string[]) {
                showError(message);  // Show error message to user
            }
        }
    }

    return { login, loading };  // Return function and loading state for component usage
}
