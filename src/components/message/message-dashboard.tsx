import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {Box, Paper, Stack, Typography} from "@mui/material";
import MessageInfo from "./message-info.tsx";
import {User} from "../../App.tsx";
import {useEffect, useRef} from "react";
import {handleMessageViewed} from "../../store/slices/messageSlice.ts";

const MessageDashboard = ({user}: { user: User }) => {
    const {name} = user
    const dashboardRef = useRef<HTMLDivElement>(null);
    const messages = useAppSelector((state) => state.message);
    const dispatch = useAppDispatch();

    const ref = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        const messageReceivedIds = messages.filter((item) => item.sender !== name && !item.isViewed).map((item) => item.id);
        if (messageReceivedIds.length > 0)
            dispatch(handleMessageViewed(messageReceivedIds));
        if (ref.current)
            ref.current.scrollIntoView({behavior: "smooth"});
    }, [dispatch, messages, name]);


    return (
        <Stack
            ref={dashboardRef}
            rowGap={1}
            sx={{
                display: "flex",
                flexDirection: "column",
                height: {
                    xs: "100%",
                    sm: 440,
                    md: 550
                },
                py: 0.2,
                px: {
                    xs: 2,
                    sm: 4,
                },
                overflowY: "scroll",
            }}
        >
            {messages.map((item) => {
                const isSameUser = item.sender === name;
                return (
                    <Paper
                        key={item.id}
                        sx={{
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.5,
                            alignSelf: isSameUser ? "flex-end" : "flex-start",
                            width: "fit-content",
                            maxWidth: "70%",
                            padding: "6px 12px",
                            borderRadius: isSameUser ? "12px 0 12px 12px" : "0 12px 12px 12px",
                            backgroundColor: isSameUser ? "secondary.light" : "grey.300",
                            color: isSameUser ? "white" : "black",
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
                                borderColor: ((theme) => isSameUser ? `${theme.palette.secondary.light} transparent transparent` : `${theme.palette.grey[300]} transparent transparent`),

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
                        >{item.message}
                        </Typography>
                        <MessageInfo message={item} isSameUser={isSameUser}/>
                    </Paper>
                )
            })}
            <Box component={"span"} ref={ref}/>
        </Stack>
    );
};

export default MessageDashboard;