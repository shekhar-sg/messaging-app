import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./styles";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {SnackbarProvider, SnackbarProviderProps} from "notistack";

const snackbarProviderDefaultsProps: Omit<SnackbarProviderProps, 'children'> = {
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "right"
    },
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <SnackbarProvider
            {...snackbarProviderDefaultsProps}
        >
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <App/>
                </ThemeProvider>
            </Provider>
        </SnackbarProvider>
    </StrictMode>,
)

