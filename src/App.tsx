import {AppBar, Stack, Tab} from "@mui/material";
import UserPanel from "./components/user-panel.tsx";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {SyntheticEvent, useState} from "react";
import {users} from "./constants";

export type User = {
    name: string;
    avatar: string;
}


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
                justifyContent: "end",
                bgcolor: "beige",
                backgroundImage: "url(/images/bg.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <TabContext value={value}>
                <AppBar sx={{
                    justifyContent: "center",
                    bgcolor: "secondary.main",
                    height: 64,
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
                        <TabPanel value={name} key={`${index}-${name}`}
                                  sx={{
                                      maxHeight: "calc(100% - 64px)",
                                      height: "calc(100% - 64px)",
                                      width: "100%",
                                      padding: {
                                          xs: 0,
                                          sm: 4
                                      },
                                  }}
                        >
                            <UserPanel user={user}/>
                        </TabPanel>
                    )
                })}
            </TabContext>
        </Stack>
    )
}

export default App