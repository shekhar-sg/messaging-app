import {useCallback, useRef} from 'react';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    Link,
    Stack,
    TextField,
} from '@mui/material';
import {GitHub, SendRounded} from "@mui/icons-material";
import MessageDashboard from "./message/message-dashboard.tsx";
import {handleMessageReceived, MessageType, sendMessage} from "../store/slices/messageSlice.ts";
import {useAppDispatch} from "../store/hooks";
import {enqueueSnackbar} from "notistack";
import {User} from "../App.tsx";

interface FirstUserProps {
    user: User
}

const UserPanel = ({user}: FirstUserProps) => {
    const {name, avatar} = user;
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
            const messageItem: Omit<MessageType, 'type'> = {
                id: timestamp.toString(),
                message,
                sender: name,
                timestamp,
            };
            dispatch(sendMessage(messageItem));
            setTimeout(() => {
                dispatch(handleMessageReceived(messageItem.id));
            }, 1000);
            inputRef.current.value = "";
        }
    }, [dispatch, name]);

    return (
        <Card
            component={Stack}
            sx={{
                maxWidth: "sm",
                marginX: "auto",
                height: {
                    xs: "100%",
                    sm: "auto",
                },
                bgcolor: "transparent",
                backdropFilter: {
                    xs: "blur(3px) brightness(0.6)",
                    sm: "blur(8px) brightness(0.8)",
                },
                boxShadow: "inset 0 0 10px 0 #ffffff",
                mt: {
                    xs: 0,
                    sm: 4,
                },
            }}
        >
            <CardHeader
                sx={{
                    bgcolor: "grey.A200",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingY: 0.5,
                    paddingx: 2,
                }}
                avatar={
                    <Avatar sizes={"large"} src={avatar}/>
                }
                title={name}
                titleTypographyProps={{
                    variant: "h4",
                    fontSize: {xs: 22, sm: 28},
                    textTransform: "capitalize",
                }}
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
            <CardContent sx={{
                height: {
                    xs: 1,
                    sm: "auto",
                },
                overflowY: "auto",
                scrollbarWidth: "none",
            }}>
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
                    color={"secondary"}
                    placeholder="Message..."
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSendMessage();
                        }
                    }}
                    sx={{
                        bgcolor: 'grey.A200',
                        borderRadius: 2,
                        '& *': {
                            borderRadius: 2,
                        }
                    }}
                />
                <Button
                    variant={"contained"}
                    color={"secondary"}
                    onClick={handleSendMessage}
                    sx={{borderRadius: 50, minWidth: "auto", padding: 2}}
                >
                    <SendRounded sx={{fontSize: 20}}/>
                </Button>
            </CardActions>
        </Card>
    );
};

export default UserPanel;
