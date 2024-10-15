import {createSlice} from "@reduxjs/toolkit";

export interface MessageType {
    id: string;
    message: string;
    sender: string;
    timestamp: Date | number;
    isSent?: boolean;
    isReceived?: boolean;
    isViewed?: boolean;
}

const initialState: MessageType[] = [];


export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        resetChat: () => initialState,
        sendMessage: (state, {payload}: { payload: MessageType }) => {
            state.push({
                ...payload,
                isSent: true,
            });
        },
        handleMessageReceived: (state, {payload}: { payload: string }) => {
            state.forEach((message) => {
                if (message.id === payload) {
                    message.isReceived = true;
                }
            });
        },
        handleMessageViewed: (state, {payload}: { payload: string[] }) => {
            state.forEach((message) => {
                if (payload.includes(message.id)) {
                    if (!message.isReceived) message.isReceived = true;

                    message.isViewed = true;
                }
            });
        }
    }
})

export const {sendMessage, handleMessageViewed, handleMessageReceived} = messageSlice.actions;

export default messageSlice.reducer;