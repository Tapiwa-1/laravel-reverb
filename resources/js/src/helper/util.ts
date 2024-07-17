import { showError } from "./toast-notification";

export function showErrorResponse(error:unknown){
    if(Array.isArray(error)){
        for (const message of error as string[]) {
            showError(message);  // Show error message to user
        }
    }else{
        showError((error as Error).message)
    }
}
