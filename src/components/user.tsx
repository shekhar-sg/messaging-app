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
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, IconButton, TextField,} from '@mui/material';
import {GitHub, SendRounded} from "@mui/icons-material";
import MessageDashboard from "./message/message-dashboard.tsx";
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
        <Card sx={{
            maxWidth: "sm",
            marginX: "auto",
            bgcolor: "antiquewhite",
        }}>
            <CardHeader
                sx={{
                    backgroundColor: "burlywood",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                avatar={
                    <Avatar sizes={"large"} sx={{bgcolor: "warning.main"}}>{user === "user-1" ? "1" : 2}</Avatar>
                }
                title={user}
                titleTypographyProps={{variant: "h4", textTransform: "capitalize"}}
                action={
                    <IconButton
                        sx={{color:"black"}}
                        onClick={() => {
                            window.open("https://github.com/shekhar-sg/messaging-app", "_blank");
                        }}
                    >
                        <GitHub fontSize={"large"}/>
                    </IconButton>
                }
            />
            <CardContent>
                <MessageDashboard user={user}/>
            </CardContent>
            <CardActions
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 1,
                    padding: 2,
                }}
            >
                <TextField
                    variant="outlined"
                    fullWidth
                    inputRef={inputRef}
                    color={"warning"}
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
                            borderRadius: 50,
                            "& input": {
                                padding: "16px 0 16px 22px",
                                borderRadius: 50,
                            },
                            "& fieldset": {
                                // display: 'none',
                                borderRadius: 50,
                            }
                        }

                    }}
                />
                <Button
                    variant={"contained"}
                    color={"warning"}
                    onClick={handleSendMessage}
                    sx={{borderRadius: 50, minWidth: "auto", padding: 2}}
                >
                    <SendRounded sx={{fontSize: 20}}/>
                </Button>
            </CardActions>
        </Card>
    );
};

export default User;
