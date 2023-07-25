import { useState } from "react";
import { User } from "./useUser";

export const useLocalStorage = (key: string, defaultValue: object | User | null) => {

    const [storedValue, setStoredValue] = useState<string | object | User | null>(() => {
        try {
            const value = localStorage.getItem(key);

            if (value) {
                return JSON.parse(value)
            } else {
                localStorage.setItem(key, JSON.stringify(defaultValue))
                return defaultValue;
            }

        } catch (error) {
            return defaultValue;
        }
    });


    const setValue = (value: string | object | User | null) => {
        try {
            console.log("useLocalStorage setValue", value);
            localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.log("error setting value in local storage", error)
        }
        setStoredValue(value);
    }

    return [storedValue, setValue] as const;

}