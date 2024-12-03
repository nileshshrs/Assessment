import { useState, useEffect } from "react";

export const useLocalStorageState = <T,>(key: string, initialValue: T) => {
    const [state, setState] = useState<T>(() => {
        try {
            const storedValue = localStorage.getItem(key);
            // Ensure that task IDs are in sync, reparse the data if it exists
            return storedValue !== null ? JSON.parse(storedValue) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            // Store the state in localStorage whenever it changes
            localStorage.setItem(key, JSON.stringify(state));
        } catch (error) {
            console.error(`Error writing to localStorage key "${key}":`, error);
        }
    }, [key, state]);

    return [state, setState] as const;
};
