/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { API } from "./services"

const api = API.init();
const apiContext = React.createContext(api);

export const APIProvider = ({children}) => <apiContext.Provider value={api}>{children}</apiContext.Provider>