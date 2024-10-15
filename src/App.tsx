import {AppBar, Stack, Tab} from "@mui/material";
import User from "./components/user.tsx";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {SyntheticEvent, useState} from "react";

const App = () => {
    const [value, setValue] = useState("user-1")
    const handleChange = (_event: SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }
    // console.log("value",value);
    return (
        <Stack
            sx={{
                width: "100%",
                height: "100svh",
                justifyContent: "center",
                bgcolor: "beige",
            }}
        >
            <TabContext value={value}>
                <AppBar color={"transparent"}>
                    <TabList onChange={handleChange}
                             textColor={"inherit"}
                             sx={{
                                 padding: 2,
                                 "& .MuiTab-root": {
                                     fontWeight: 600,
                                     fontSize: 16,
                                     color: "warning.dark",
                                 },
                                 "& .MuiTabs-indicator": {
                                     bgcolor: "warning.dark",
                                 },
                                 "& .MuiTabs-flexContainer": {
                                     justifyContent: "center",
                                 },
                             }}
                    >
                        <Tab label={"First User"} value={"user-1"}/>
                        <Tab label={"Second User"} value={"user-2"}/>
                    </TabList>
                </AppBar>
                <TabPanel value={"user-1"}>
                    <User user={"user-1"}/>
                </TabPanel>
                <TabPanel value={"user-2"}>
                    <User user={"user-2"}/>
                </TabPanel>
            </TabContext>
        </Stack>
    )
}

export default App

//
// <TabPanel value={"1"}>
//     <User/>
//     </TabPanel>
// <TabPanel value={"2"}>
//     <User/>
// </TabPanel>