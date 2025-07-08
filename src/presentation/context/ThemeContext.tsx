import { createContext, PropsWithChildren } from "react";
import merge from 'deepmerge';
import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
    MD3DarkTheme,
    MD3LightTheme,
    adaptNavigationTheme, 
    PaperProvider 
} from 'react-native-paper';
import { useColorScheme } from "react-native";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

export const ThemeContext = createContext({
    isDark: false,
    theme: LightTheme
});

export const ThemeProviderCustom = ({children}:PropsWithChildren) => {
    const colorSchema = useColorScheme();
    const isDarkTheme = colorSchema === 'dark';
    const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer theme={theme}>
                <ThemeContext.Provider value={{isDark:isDarkTheme, theme:theme}}>
                    {children}
                </ThemeContext.Provider>
            </NavigationContainer>
        </PaperProvider>
    )
}