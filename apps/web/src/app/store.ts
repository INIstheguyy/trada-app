import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import {
  accessTokenUpdated,
  authReducer,
  profileUpdated,
  sessionEstablished,
  signedOut,
} from '../features/auth/authSlice';
import { clearAuthSession, saveAuthSession } from '../features/auth/authStorage';
import { api } from '../lib/api';

const authSessionListener = createListenerMiddleware();

authSessionListener.startListening({
  matcher: isAnyOf(sessionEstablished, accessTokenUpdated, profileUpdated),
  effect: (_action, listenerApi) => {
    const state = listenerApi.getState() as { auth: ReturnType<typeof authReducer> };
    saveAuthSession(state.auth);
  },
});

authSessionListener.startListening({
  actionCreator: signedOut,
  effect: () => clearAuthSession(),
});

export const store = configureStore({
  reducer: { auth: authReducer, [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(authSessionListener.middleware).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
