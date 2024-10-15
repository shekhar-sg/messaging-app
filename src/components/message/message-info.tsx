import {Box, Typography} from "@mui/material";
import {DoneAllRounded, DoneRounded} from "@mui/icons-material";
import {MessageType} from "../../store/slices/messageSlice.ts";

interface MessageInfoProps {
    message: MessageType;
    isSameUser: boolean;
}

const MessageInfo = ({message, isSameUser}: MessageInfoProps) => {
    const {timestamp, isSent, isReceived, isViewed} = message;

    const localeTime = new Date(timestamp).toLocaleTimeString();

    const StatusIcon = isSameUser && isSent && !isReceived ? DoneRounded : DoneAllRounded;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: 0.7,
                alignSelf: isSameUser ? "flex-end" : "flex-start",
                fontSize: 10,
                paddingX: 2,
            }}
        >
            {(isSameUser && isSent) && <StatusIcon sx={{fontSize: 18}}
                                                   color={isViewed ? "primary" : "disabled"}
            />}
            <Typography variant={"subtitle2"} fontSize={"inherit"}>{localeTime}</Typography>
        </Box>
    );
};

export default MessageInfo;