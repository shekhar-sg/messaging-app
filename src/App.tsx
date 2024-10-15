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
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "beige",
                backgroundImage: "url(/images/background.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <TabContext value={value}>
                <AppBar sx={{
                    bgcolor: "blueviolet",
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
                        <TabPanel value={name} key={`${index}-${name}`}
                                  sx={{
                                      height: "100%",
                                      width: "100%",
                                      padding: {
                                          xs: 0,
                                          sm: 4
                                      },
                                      paddingTop: {
                                          xs: 7,
                                          sm: 16
                                      },
                                      backdropFilter: "blur(3px)"
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