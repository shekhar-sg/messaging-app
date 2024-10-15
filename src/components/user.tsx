import {useCallback, useRef} from 'react';
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, IconButton, Link, TextField,} from '@mui/material';
import {GitHub, SendRounded} from "@mui/icons-material";
import MessageDashboard from "./message/message-dashboard.tsx";
import {Message, sendMessage} from "../store/slices/messageSlice.ts";
import {useAppDispatch} from "../store/hooks";
import {enqueueSnackbar} from "notistack";

interface FirstUserProps {
    user: string;
    avatar: string;
}

const User = (props: FirstUserProps) => {
    const {user:sender,avatar} = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();

    const handleSendMessage = useCallback(() => {
        if (inputRef.current) {
            const message = inputRef.current.value;
            if (message.trim() === "") {
                enqueueSnackbar("Please enter a message", {
                    variant: "error",
                });
                return;
            }
            const timestamp = Date.now();
            const messageItem: Omit<Message,'type'> = {
                id: timestamp.toString(),
                message,
                sender,
                timestamp,
            };
            dispatch(sendMessage(messageItem));
            inputRef.current.value = "";
        }
    }, [dispatch, sender]);

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
                    <Avatar sizes={"large"} src={avatar}/>
                }
                title={sender}
                titleTypographyProps={{variant: "h4", textTransform: "capitalize"}}
                action={
                    <IconButton
                        LinkComponent={Link}
                        sx={{color: "black"}}
                        href={"https://github.com/shekhar-sg/messaging-app"}
                        target={"_blank"}
                    >
                        <GitHub fontSize={"large"}/>
                    </IconButton>
                }
            />
            <CardContent>
                <MessageDashboard user={sender}/>
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
                    slotProps={{
                        input:{
                            sx:{
                                borderRadius: 50,
                            }
                        },
                        htmlInput:{
                            sx:{
                                padding: "16px 0 16px 22px",
                                borderRadius: 50,
                            }
                        }
                    }}

                    sx={{
                        borderRadius: 50,
                        bgcolor: 'grey.A200',
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
