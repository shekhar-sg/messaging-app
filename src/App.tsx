import {AppBar, Stack, Tab, tabClasses} from "@mui/material";
import User from "./components/user.tsx";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {SyntheticEvent, useState} from "react";

const users = ["user-1", "user-2"] as const

const App = () => {
    const [value, setValue] = useState("user-1")
    const handleChange = (_event: SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }
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
                <AppBar sx={{
                    bgcolor: "transparent",
                    borderBottom: "1px solid",
                    borderColor: "grey.300",
                    p:1
                }}>
                    <TabList onChange={handleChange}
                             textColor={"inherit"}
                             sx={{
                                 width: "fit-content",
                                 mx: "auto",
                             }}
                             TabIndicatorProps={{
                                 sx: {
                                     bgcolor: "warning.dark",
                                 }
                             }}

                    >
                        {users.map((user) => {
                            return (
                                <Tab label={user} value={user}
                                     sx={{
                                         color: "warning.dark",
                                         fontWeight: "bold",
                                         [`&.${tabClasses.selected}`]: {
                                             color: "warning.main",
                                         },
                                     }}
                                />
                            )
                        })}
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