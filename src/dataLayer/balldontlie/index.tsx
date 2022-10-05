/* eslint-disable react/prop-types */
import React from "react";
import { BallDontLieAPI } from "./services"

const api = BallDontLieAPI.init();
const apiContext = React.createContext(api);
export const useAPI = () => React.useContext(apiContext);

export const APIProvider = ({children}) => <apiContext.Provider value={api}>{children}</apiContext.Provider>
