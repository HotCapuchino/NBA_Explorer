/* eslint-disable react/prop-types */
import { isNil } from "lodash";
import React from "react";
import { GameStore } from "./GameStore";
import { PlayerStore } from "./PlayerStore";
import { TeamStore } from "./TeamStore";

class Store {

    teamStore: TeamStore;
    playerStore: PlayerStore;
    gameStore: GameStore;

    private static store: Store;

    private constructor() {
        this.teamStore = new TeamStore();
        this.playerStore = new PlayerStore();
        this.gameStore = new GameStore();
    }

    static init(): Store {
        if (isNil(Store.store)) {
			const singletoneInstance = new Store();
			Store.store = singletoneInstance;

			return singletoneInstance;
		}

		return Store.store;
    }

}

const store = Store.init();
const storeContext = React.createContext(store);

export const useStore = () => React.useContext(storeContext);
export const StoreProvider = ({children}) => <storeContext.Provider value={store}>{children}</storeContext.Provider>