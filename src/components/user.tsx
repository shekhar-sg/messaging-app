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

import {useState} from 'react';
import {Box, Button, Chip, Container, Paper, Stack, TextField, Typography,} from '@mui/material';
import {SendRounded} from "@mui/icons-material";

interface FirstUserProps {
    user: string;
}

const User = (prpos: FirstUserProps) => {
    const {user} = prpos;

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<string[]>([]);


    const handleSendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, input]);
            setInput('');
        }
    };

    return (
        <Container maxWidth="sm" sx={{mt: 4}}>
            <Paper
                elevation={3} sx={{padding: 2}}>
                <Typography variant="h4" align="center" gutterBottom>
                    {user === "1" ? "User - 1" : "User - 2"}
                </Typography>
                <Box
                    sx={{
                        height: 400,
                        overflowY: 'auto',
                    }}
                >
                    <Stack sx={{
                        height: "90%",
                        gap: 1,
                        paddingX: 1,
                        justifyContent: `${user === "1" ? 'flex-start' : 'flex-end'}`
                    }}>
                        {messages.map((msg, index) => (
                            <Chip key={index}
                                  component={Paper}
                                  label={msg}
                                  color={"secondary"}
                                  sx={{
                                      maxWidth: 400,
                                      width: 'fit-content',
                                      alignSelf: 'flex-end'
                                  }}
                            />
                        ))}
                    </Stack>
                </Box>
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
                        color={"success"}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
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
                                padding: 0,
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
    )
        ;
};

export default User;
