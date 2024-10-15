import {AppBar, Stack, Tab, tabClasses} from "@mui/material";
import User from "./components/user.tsx";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {SyntheticEvent, useState} from "react";

export const users = [{name: "user-1", avatar: ""}, {name: "user-2", avatar: ""}]

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
                    p: 1
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
                        {users.map(({name}, index) => {
                            return (
                                <Tab
                                    key={`${index}-${name}`}
                                    label={name} value={name}
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
                {users.map(({name,avatar}, index) => {
                    return (
                        <TabPanel value={name} key={`${index}-${name}`}>
                            <User user={name} avatar={avatar}/>
                        </TabPanel>
                    )
                })}
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