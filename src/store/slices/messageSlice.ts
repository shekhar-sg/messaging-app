import {createSlice} from "@reduxjs/toolkit";

export interface Message {
    id: string;
    message: string;
    sender?: string;
    timestamp?: string;
    type?: "sent" | "received";
}

const initialState: Message[] = [];


export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        sendMessage: (state, action) => {
            state.push(action.payload);
        }
    }
})

export const {sendMessage} = messageSlice.actions;

export default messageSlice.reducer;