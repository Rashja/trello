import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../reducer/combiner";

//persist config
const persistConfig = {
  key: "app",
  storage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducer);

//create store
const store = createStore(persistedReducer, composeWithDevTools());

const persistor = persistStore(store);

export { store, persistor };
