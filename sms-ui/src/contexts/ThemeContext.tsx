import { createContext, useState, useContext, useEffect } from "react"
import { selectDarkMode, setDarkMode } from "../stores/darkModeSlice";
import { useAppSelector, useAppDispatch } from "../stores/hooks";

type ThemeContextType = {
    darkTheme: boolean
    setTheme: (theme: boolean) => void
    switchMode: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
    darkTheme: false,
    setTheme: (theme: boolean) => { },
    switchMode: () => { },
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {

    const dispatch = useAppDispatch();
    const darkMode = useAppSelector(selectDarkMode);

    const [darkTheme, setTheme] = useState(darkMode);

    const setDarkModeClass = () => {
        const el = document.querySelectorAll("html")[0];
        darkMode ? el.classList.add("dark") : el.classList.remove("dark");
    };

    const switchMode = () => {
        dispatch(setDarkMode(!darkMode));
        localStorage.setItem("darkMode", (!darkMode).toString());
        setDarkModeClass();
        setTheme(!darkMode);
    };

    setDarkModeClass();

    return (
        <ThemeContext.Provider value={{ darkTheme, setTheme, switchMode }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    return useContext(ThemeContext)
}