import React, { createContext, useState, useContext, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Alpine, AlphineDark, Balham, BalhamDark, Material, Quartz, QuatzDark, Small, Large, Normal } from './assets/theme'; // Supondo que esses sejam seus temas
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [classTheme, setClassTheme] = useState(localStorage.getItem('class') || 'ag-theme-material');
  const [font, setFont] = useState(sessionStorage.getItem('font') || 'Calibri');
  const [dimension, setDimension] = useState(sessionStorage.getItem('dimension') || 'Small');
  useEffect(() => {
    localStorage.setItem('class', classTheme);
    sessionStorage.setItem('font', font);
    sessionStorage.setItem('dimension', dimension);
  }, [font, dimension, classTheme]);

  const selectFont = (font) => {
    sessionStorage.setItem('font', font);
    setFont(font);
  };
  const selectDimension = (dimension) => {
    sessionStorage.setItem('dimension', dimension);
    setDimension(dimension);
  };
  const selectClassTheme = (classTheme) => {
    localStorage.setItem('class', classTheme);
    setClassTheme(classTheme);
  };

  const currentThemeSettings = () => {
    let themeSettings = {};



    switch (classTheme) {
      case 'ag-theme-alpine':
        themeSettings = { ...themeSettings, ...Alpine };
        break;
      case 'ag-theme-alpine-dark':
        themeSettings = { ...themeSettings, ...AlphineDark };
        break;
      case 'ag-theme-balham':
        themeSettings = { ...themeSettings, ...Balham };
        break;
      case 'ag-theme-balham-dark':
        themeSettings = { ...themeSettings, ...BalhamDark };
        break;
      case 'ag-theme-material':
        themeSettings = { ...themeSettings, ...Material };
        break;
      case 'ag-theme-quartz-dark':
        themeSettings = { ...themeSettings, ...QuatzDark };
        break;
      default:
        themeSettings = { ...themeSettings, ...Quartz };

    }


    switch (dimension) {
      case 'Pequeno':
        themeSettings = { ...themeSettings, ...Small };
        break;
      case 'Grande':
        themeSettings = { ...themeSettings, ...Large };
        break;
      default:
        themeSettings = { ...themeSettings, ...Normal };
    }
    return themeSettings;
  };
  return (
    <ThemeContext.Provider value={{ dimension, selectDimension, classTheme, selectClassTheme }}>
      <StyledThemeProvider theme={currentThemeSettings()}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};


export const useTheme = () => useContext(ThemeContext);
