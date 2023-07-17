import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { useColorScheme } from "@mantine/hooks";
import { AuthContextProvider } from "./context/AuthContext";
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
/*
<React.StrictMode>
    <Application />
  </React.StrictMode>
*/


function Application() {

  const theme = JSON.parse(localStorage.getItem("theme")) || "dark";
  const preferredColorScheme = useColorScheme(theme);
  const [colorScheme, setColorScheme] = useState(preferredColorScheme);
  const toggleColorScheme = () =>
    setColorScheme(colorScheme === "dark" ? "light" : "dark");

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme: colorScheme, primaryColor: "violet" }} withGlobalStyles withNormalizeCSS>
        <ModalsProvider>
          <Notifications position="top-right" zIndex={2077}/>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Application />
)