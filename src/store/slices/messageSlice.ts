import {createSlice} from "@reduxjs/toolkit";

export interface Message {
    id: string;
    message: string;
    sender: string;
    timestamp: string;
    type: "sent" | "received";
}

const initialState: Message[] = [];


export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        sendMessage: (state, action) => {
            state.push(action.payload);
        },
        // save message by which when refreshing the browser the data will be still same
        saveMessage: (state, action) => {
            state.push(action.payload);
            window.localStorage.setItem("messages", JSON.stringify(state));
        }
    }
})

export const {sendMessage,saveMessage} = messageSlice.actions;

export default messageSlice.reducer;