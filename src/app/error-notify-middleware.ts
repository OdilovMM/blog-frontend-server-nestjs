import {  isRejectedWithValue, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";

interface ErrorPayload {
    data?: {
        message?: string | string[];
    };
}

export const errorNotify: Middleware = 
(api: MiddlewareAPI)=> (next)=> (action)=> {
    if(isRejectedWithValue(action)) {
        const errorMessage = (action.payload as ErrorPayload)?.data?.message;
        const showSnackbar = (message: string)=> {
            enqueueSnackbar(message, {variant: 'error'});
        };
        if(Array.isArray(errorMessage)) {
            const showNextSnackbar = (index: number)=> {
                if(index < errorMessage.length) {
                    showSnackbar(errorMessage[index]);
                    setTimeout(()=> showNextSnackbar(index+1), 300)
                }
            };
            showNextSnackbar(0);
        } else {
            showSnackbar(errorMessage as string);
        }
    }
    return next(action)
}