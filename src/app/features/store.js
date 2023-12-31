'use client'

import {  configureStore,combineReducers } from "@reduxjs/toolkit";
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST,persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slicer/userSlicer";
import activeReducer from "./slicer/activeSlicer";
import chatReducer from './slicer/chatSlicer';
import msgReducer from './slicer/msgSlicer';

const rootReducer = combineReducers({
    state:userReducer,
    index:activeReducer,
    user:chatReducer,
    message:msgReducer
  });


  const persistConfig = {
    key: "root",
    storage,
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  

  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          serializableCheck: false, 
          // Ignore these action types as they are handled by redux-persist
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST],
        },
      }),
    devTools: true,
  });
  
  export const persistor = persistStore(store);

export default { store, persistor };

