import { ref } from "vue";
import { makeHttpReq } from "../../../helper/makeHttpReq";
import { showError, successMsg } from "../../../helper/toast-notification";
import { showErrorResponse } from "../../../helper/util";

// Define types for user input and response from loginAPI
export type LoginUserType = {
    email: string;
    password: string;
};

export type LoginResponseType = {
    user: { email: string,
        id: number,
        isLoggedin:boolean,
        token:string,

     },
    message: string,
    isLoggedIn: boolean,
};

// Reactive reference for user login input
export const loginInput = ref<LoginUserType>({} as LoginUserType);



// Function to handle user login logic
export function useLoginUser() {
    const loading = ref(false);  // Reactive reference for loading state

    async function login() {
        try {
            loading.value = true;  // Set loading state to true during login process

            // Make HTTP POST request to 'login' endpoint with user input data
            const data = await makeHttpReq<LoginUserType, LoginResponseType>('login', 'POST', loginInput.value);

            loading.value = false;  // Reset loading state after request completes
            loginInput.value = {} as LoginUserType
            successMsg(data.message)
            if(data.isLoggedIn){
                localStorage.setItem('userData', JSON.stringify(data))
                window.location.href="/app/dashboard"
            }else{

            }
        } catch (error) {
            loading.value = false;  // Reset loading state if an error occurs

            showErrorResponse(error)
        }
    }

    return { login, loading };  // Return function and loading state for component usage
}
