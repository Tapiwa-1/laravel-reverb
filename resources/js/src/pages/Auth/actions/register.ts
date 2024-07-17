import { ref } from "vue";
import { makeHttpReq } from "../../../helper/makeHttpReq";
import { showError, successMsg } from "../../../helper/toast-notification";

// Define types for user input and response from registration API
export type RegisterUserType = {
    email: string;
    password: string;
};

export type RegisterResponseType = {
    user: { email: string };
    message: string;
};

// Reactive reference for user registration input
export const registerInput = ref<RegisterUserType>({ email: "", password: "" });

// Function to handle user registration logic
export function useRegisterUser() {
    const loading = ref(false);  // Reactive reference for loading state

    async function register() {
        try {
            loading.value = true;  // Set loading state to true during registration process

            // Make HTTP POST request to 'register' endpoint with user input data
            const data = await makeHttpReq<RegisterUserType, RegisterResponseType>('register', 'POST', registerInput.value);

            loading.value = false;  // Reset loading state after request completes
            registerInput.value = { email: "", password: "" };  // Clear user input after successful registration
            successMsg(data.message);  // Show success message to user
        } catch (error) {
            loading.value = false;  // Reset loading state if an error occurs

            // Handle error response (assuming error is an array of strings)
            for (const message of error as string[]) {
                showError(message);  // Show error message to user
            }
        }
    }

    return { register, loading };  // Return function and loading state for component usage
}
