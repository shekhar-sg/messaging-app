import {createTheme} from "@mui/material";

const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: (theme) => theme.unstable_sx({
                "*": {
                    margin: 0,
                }
            })
        },
    }
})

export default theme;