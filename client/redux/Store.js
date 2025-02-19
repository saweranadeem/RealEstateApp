import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice.js";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Note: 'storage' should be lowercase

const rootReducers = combineReducers({ user: userReducer });

const persistConfig = {
  key: "root",
  storage, // Fix: Use 'storage' instead of 'Storage'
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
