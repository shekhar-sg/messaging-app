import {createSlice} from "@reduxjs/toolkit";

export interface Message {
    id: string;
    message: string;
    sender: string;
    timestamp: Date | number;
    type: "sent" | "received";
}

const initialState: Message[] = [];


export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        sendMessage: (state, {payload}: { payload: Omit<Message, 'type'> }) => {
            state.push({
                ...payload,
                type: "sent"
            });
        },
    }
})

export const {sendMessage} = messageSlice.actions;

export default messageSlice.reducer;