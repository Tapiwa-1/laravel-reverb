import { ref } from "vue";
import { makeHttpReq } from "../../../../helper/makeHttpReq";
import { showErrorResponse } from "../../../../helper/util";

export type MemberType = {
    id:number,
    name:string,
    email:string
}
export type GetMemberType = {
    data:{data:Array<MemberType>}
} & Record<string, any>

export function useGetMembers(){
    const loading = ref(false);  // Reactive reference for loading state
    const memberData = ref<GetMemberType>({} as GetMemberType)
    async function getMembers(page:number=1,query:string='') {
        try {
            loading.value = true;  // Set loading state to true during registration process
    
            // Make HTTP POST request to 'register' endpoint with user input data
            const data = await makeHttpReq<undefined, GetMemberType>(`members?query=${query}`, 'GET');
          
            loading.value = false;  // Reset loading state after request completes
            memberData.value = data
            // successMsg(data.message);  // Show success message to user
        } catch (error) {
            loading.value = false;  // Reset loading state if an error occurs
    
            // Handle error response (assuming error is an array of strings)
            showErrorResponse(error)
            
        }
        
       
    }

    return {getMembers,loading,memberData}
}