// import {Box, Button, Paper, Stack, TextField, Typography} from '@mui/material';
// import {useState} from "react";
//
// const User = () => {
//     const [messages, setMessages] = useState<string[]>([]);
//     const [input, setInput] = useState<string>('');
//
//     const handleSend = () => {
//         if (input.trim()) {
//             setMessages([...messages, input]);
//             setInput('');
//         }
//     };
//
//     return (
//         <Box p={2}>
//             <Typography variant="h4" gutterBottom>Chat App</Typography>
//             <Stack spacing={2}>
//                 <Stack direction="row" spacing={1}>
//                     <TextField
//                         fullWidth
//                         variant="outlined"
//                         placeholder="Type a message"
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                     />
//                     <Button variant="contained" onClick={handleSend}>Send</Button>
//                 </Stack>
//                 <Box>
//                     {messages.map((message, index) => (
//                         <Paper key={index} elevation={3} sx={{padding: 2, marginBottom: 1}}>
//                             <Typography variant="body1">{message}</Typography>
//                         </Paper>
//                     ))}
//                 </Box>
//             </Stack>
//         </Box>
//     );
// };
//
// export default User;

import {useCallback, useRef} from 'react';
import {Button, Container, Paper, Stack, TextField, Typography,} from '@mui/material';
import {SendRounded} from "@mui/icons-material";
import MessageDashboard from "./ message-dashboard.tsx";
import {Message, sendMessage} from "../store/slices/messageSlice.ts";
import {useAppDispatch} from "../store/hooks";

interface FirstUserProps {
    user: string;
}

const User = (props: FirstUserProps) => {
    const {user} = props;
    const inputRef = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch();

    const handleSendMessage = useCallback(() => {
        if (inputRef.current) {
            const message = inputRef.current.value;
            if (message.trim() === "") {
                console.log("Message is empty");
                return;
            }
            const messageItem: Message = {
                id: String(Date.now()),
                message,
                sender: user,
                timestamp: new Date().toLocaleString([], {hour: '2-digit', minute: '2-digit'}),
                type: "sent",
            };
            dispatch(sendMessage(messageItem));
            inputRef.current.value = "";
        }
    }, [dispatch, user]);

    return (
        <Container maxWidth="sm" sx={{mt: 4}}>
            <Paper
                elevation={3} sx={{padding: 2}}>
                <Typography variant="h4" align="center" gutterBottom>
                    {user}
                </Typography>
                <MessageDashboard user={user}/>
                <Stack
                    sx={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 1
                    }}
                >
                    <TextField
                        variant="outlined"
                        fullWidth
                        inputRef={inputRef}
                        color={"success"}
                        placeholder="Message..."
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSendMessage();
                            }
                        }}
                        sx={{
                            borderRadius: 50,
                            bgcolor: 'grey.A200',
                            "& .MuiOutlinedInput-root": {
                                "& input": {
                                    padding: "16px 0 16px 22px",
                                    borderRadius: 50,
                                },
                                borderRadius: 50,
                                "& fieldset": {
                                    // display: 'none',
                                    borderRadius: 50,
                                }
                            }

                        }}
                    />
                    <Button
                        variant={"contained"}
                        color={"success"}
                        onClick={handleSendMessage}
                        sx={{borderRadius: 50, minWidth: "auto", padding: 2}}
                    >
                        <SendRounded sx={{fontSize: 20}}/>
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
};

export default User;
