    import React, { createContext, useReducer } from "react";
    import { AppStateReducer } from './reducer';

    export const AppStateContext = createContext();
    export const AppStateProvider = ({ children }) => {
        const initialState = {
            listTodo: [],
            getEditItem: {}
        }
        const [state, dispatch] = useReducer(AppStateReducer, initialState);
        return (
        <AppStateContext.Provider value={[state, dispatch]}>
            {children}
        </AppStateContext.Provider>
        );
    };