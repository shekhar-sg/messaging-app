import {Stack, Tab} from "@mui/material";
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
                typography: "body1",
            }}
        >
            <TabContext value={value}>
                <TabList onChange={handleChange}>
                    <Tab label={"First User"} value={"user-1"}/>
                    <Tab label={"Second User"} value={"user-2"}/>
                </TabList>
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