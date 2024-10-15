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

    useEffect(() => {
        const messageReceivedIds = messages.filter((item) => item.sender !== name && !item.isViewed).map((item) => item.id);
        if (messageReceivedIds.length > 0)
            dispatch(handleMessageViewed(messageReceivedIds))
    }, [dispatch, messages, name]);

    return (
        <Stack
            ref={dashboardRef}
            justifyContent={"flex-end"}
            rowGap={1}
            sx={{
                display: "flex",
                flexDirection: "column",
                height: {
                    xs: 330,
                    sm: 440,
                    md: 550
                },
                py: 0.2,
                px: 4,
                overflowY: "auto",
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
                            backgroundColor: isSameUser ? "success.light" : "grey.300",
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
                                borderColor: ((theme) => isSameUser ? `${theme.palette.success.light} transparent transparent` : `${theme.palette.grey[300]} transparent transparent`),

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
            {/*<Box component={"span"} ref={ref}/>*/}
        </Stack>
    );
};

export default MessageDashboard;