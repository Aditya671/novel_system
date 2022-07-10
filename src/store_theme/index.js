import React, { useMemo, useState } from 'react';
import { StoreThemeProvider } from '../context/StoreThemeProvider';
import { ThemeProvider } from 'styled-components';
import {GlobalStyles} from './GlobalStyles';
import themeObj from './themeObject';

export const AppTheme = ({children}) => {
   const [theme,setTheme] = useState(localStorage.getItem('isAppTheme') || 'nightTheme')
   const toggleTheme = () => {
      setTheme((prevColor) => {
         if(prevColor === 'dayTheme') return 'nightTheme'
         else return 'dayTheme'
      })
   }
   useMemo(() => {
      localStorage.setItem('isAppTheme',theme)
   },[theme])

   return(
      <StoreThemeProvider.Provider value={{theme,toggleTheme}}>
         <ThemeProvider theme={themeObj[theme]}>
            <GlobalStyles/>
            {children}  
         </ThemeProvider>
      </StoreThemeProvider.Provider>
   )
}