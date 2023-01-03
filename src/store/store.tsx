import { configureStore } from "@reduxjs/toolkit";

import crudFeature from "../feature/crudFeature";

export const store = configureStore({
  reducer: {
    crud: crudFeature,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
