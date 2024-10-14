import {useAppSelector} from "../store/hooks";
import {Box, Paper, Stack, Typography} from "@mui/material";
import {DoneAll} from "@mui/icons-material";
import {useEffect, useRef, useState} from "react";

const MessageDashboard = ({user}: { user: string }) => {
    const message = useAppSelector((state) => state.message);

    const bottomRef = useRef<HTMLSpanElement>(null);
    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({behavior: "smooth"});
    };

    useEffect(() => {
        scrollToBottom();
    }, [message.length]);

    return (
        <Stack
            sx={{
                height: 550,
                padding: "42px 24px",
                overflowY: "auto",
            }}
        >
            {message.map((msg) => {
                const isSameUser = msg.sender === user;
                return (
                    msg &&
                    <Paper
                        key={msg.id}
                        sx={{
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.5,
                            alignSelf: isSameUser ? "flex-end" : "flex-start",
                            width: "fit-content",
                            maxWidth: "70%",
                            padding: "6px 12px",
                            marginBottom: 1,
                            borderRadius: isSameUser ? "24px 0 24px 24px" : "0 24px 24px 24px",
                            backgroundColor: isSameUser ? "secondary.light" : "grey.200",
                        }}
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                top: 0,
                                right: isSameUser ? -15 : "auto",
                                left: !isSameUser ? -15 : "auto",
                                border: 15,
                                borderRadius: 2,
                                borderColor: ((theme) => isSameUser ? `${theme.palette.secondary.light} transparent transparent` : `${theme.palette.grey[200]} transparent transparent`),

                            }}
                        />
                        <Typography variant={"subtitle1"}
                                    sx={{
                                        whiteSpace: "normal",
                                        overflowWrap: "anywhere",
                                        paddingX: 1,
                                        lineHeight: "normal",
                                        alignSelf: isSameUser ? "flex-end" : "flex-start",
                                    }}
                        >{msg.message}
                        </Typography>
                        <MessageInfo time={msg.timestamp} info={isSameUser}/>
                    </Paper>
                )
            })}
            <Box component={"span"} ref={bottomRef}/>
        </Stack>
    );
};

export default MessageDashboard;

const MessageInfo = ({time, info}: { time?: string, info?: boolean }) => {
    const [messageStatus, setMessageStatus] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessageStatus(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, [messageStatus]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 0.7,
                alignSelf: info ? "flex-end" : "flex-start",
                fontSize: 10,
                paddingX: 2,
            }}
        >
            {info &&
                <DoneAll color={messageStatus ? "primary" : "disabled"} sx={{fontSize: 18}}/>
            }
            <Typography variant={"caption"} fontSize={"inherit"}>{time}</Typography>
        </Box>
    )
}