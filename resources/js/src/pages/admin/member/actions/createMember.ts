import { ref } from "vue";
import { makeHttpReq } from "../../../../helper/makeHttpReq";
import { successMsg } from "../../../../helper/toast-notification";
import { showErrorResponse } from "../../../../helper/util";


// Define types for user input and response from registration API
export type MemberInputType = {
    name:string
    email: string
    
};

export type MemberResponseType = {
    user: { email: string },
    message: string
};

// Reactive reference for user registration input
export const memberInput = ref<MemberInputType>({} as MemberInputType);



// Function to handle user registration logic
export function useCreateOrUpdateMember() {
    const loading = ref(false);  // Reactive reference for loading state

    async function createOrUpdate() {
        try {
            loading.value = true;  // Set loading state to true during registration process

            // Make HTTP POST request to 'register' endpoint with user input data
            const data = await makeHttpReq<MemberInputType, MemberResponseType>('members', 'POST', memberInput.value);

            loading.value = false;  // Reset loading state after request completes
            memberInput.value = {} as MemberInputType
            successMsg(data.message);  // Show success message to user
        } catch (error) {
            loading.value = false;  // Reset loading state if an error occurs

            // Handle error response (assuming error is an array of strings)
            showErrorResponse(error)
            
        }
    }

    return { createOrUpdate, loading };  // Return function and loading state for component usage
}
