import React from "react";
import App from "./App";
import { Providers } from "./Providers";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const darkTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#000",
    primary3: "#333",
    primary4: "#444",
    primary5: '#333',
    
    primary6: '#666',
    accent: "#FAFAFA",
    color2: '#eee',
    color3: '#ddd',
    color4: '#ccc',
    color5: '#ddd',
    color6: '#fcfcfc',
    color7: '#fcfcfc',
    colora: '#888',
    f0: '#333',
    f00: '#000',
    text: '#fcfcfc',
    img: '#333',
    modal: 'rgba(0,0,0,0.1)'
  },
};

const lightTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#fff",
    primary3: "#fff",
    primary4: "#eee",
    primary5: "#f8f8f8",
    accent: "#1A1A1A",
    color2: '#222',
    color3: '#333',
    color4: '#414a4c',
    color5: '#555',
    color6: '#666',
    color7: '#777',
    colora: '#aaa',
    f0: '#f0f0f0',
    f00: '#f0f0f0',
    text: '#000',
    img: '#000',
    modal: 'rgba(0,0,0,0.8)'
  },
};

export default () => {

  return (
    <Providers>
      <PaperProvider theme={darkTheme}>
        <App />
      </PaperProvider>
    </Providers>
  )
};
