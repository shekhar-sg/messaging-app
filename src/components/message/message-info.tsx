import {useEffect, useRef, useState} from "react";
import {Box, Typography} from "@mui/material";
import {DoneAll} from "@mui/icons-material";

interface MessageInfoProps {
    time: string;
    info: boolean;
}

const MessageInfo = (props: MessageInfoProps) => {
    const {time, info} = props;
    const [messageStatus, setMessageStatus] = useState(false);
    const bottomRef = useRef<HTMLSpanElement>(null);


    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({behavior: "smooth"});
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessageStatus(true);
        }, 1000);
        scrollToBottom();
        return () => clearTimeout(timer);
    }, [messageStatus]);

    useEffect(() => {
    }, []);

    return (
        <Box
            ref={bottomRef}
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: 0.7,
                alignSelf: info ? "flex-end" : "flex-start",
                fontSize: 10,
                paddingX: 2,
            }}
        >
            {info &&
                <DoneAll color={messageStatus ? "primary" : "disabled"} sx={{fontSize: 18}}/>
            }
            <Typography variant={"subtitle2"} fontSize={"inherit"}>{time}</Typography>
        </Box>
    );
};

export default MessageInfo;