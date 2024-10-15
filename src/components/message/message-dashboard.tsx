import {useAppSelector} from "../../store/hooks";
import {Box, Paper, Stack, Typography} from "@mui/material";
import MessageInfo from "./message-info.tsx";

const MessageDashboard = ({user}: { user: string }) => {
    const messages = useAppSelector((state) => state.message);

    return (
        <Stack
            sx={{
                height: {
                    xs: 330,
                    sm: 440,
                    md: 550
                },
                padding: "42px 24px",
                overflowY: "auto",
                gap: 1,
            }}
        >
            {messages.map((item) => {
                const isSameUser = item.sender === user;
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
                            backgroundColor: isSameUser ? "warning.light" : "grey.300",
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
                                borderColor: ((theme) => isSameUser ? `${theme.palette.warning.light} transparent transparent` : `${theme.palette.grey[300]} transparent transparent`),

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
                        <MessageInfo time={item.timestamp} info={isSameUser}/>
                    </Paper>
                )
            })}
            {/*<Box component={"span"} ref={bottomRef}/>*/}
        </Stack>
    );
};

export default MessageDashboard;