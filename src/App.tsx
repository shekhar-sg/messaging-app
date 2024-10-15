import {AppBar, Stack, Tab} from "@mui/material";
import UserPanel from "./components/user-panel.tsx";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {SyntheticEvent, useState} from "react";

export type User = {
    name: string;
    avatar: string;
}

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
                backgroundImage: "url(/images/background.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <TabContext value={value}>
                <AppBar sx={{
                    bgcolor: "secondary.main",
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
                                     bgcolor: "whitesmoke",
                                 }
                             }}

                    >
                        {users.map(({name}, index) => {
                            return (
                                <Tab
                                    key={`${index}-${name}`}
                                    label={name}
                                    value={name}
                                    sx={{
                                        fontWeight: "bold",
                                    }}
                                />
                            )
                        })}
                    </TabList>
                </AppBar>
                {users.map((user, index) => {
                    const {name} = user
                    return (
                        <TabPanel value={name} key={`${index}-${name}`}>
                            <UserPanel user={user}/>
                        </TabPanel>
                    )
                })}
            </TabContext>
        </Stack>
    )
}

export default App