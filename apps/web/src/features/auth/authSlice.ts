import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loadAuthSession } from './authStorage';

export type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: string;
  isActive?: boolean;
};

export type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
};

const emptyState: AuthState = { user: null, accessToken: null, refreshToken: null };
const initialState: AuthState = loadAuthSession() ?? emptyState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    sessionEstablished: (_state, action: PayloadAction<AuthState>) => action.payload,
    accessTokenUpdated: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    profileUpdated: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
    },
    signedOut: () => emptyState,
  },
});

export const { sessionEstablished, accessTokenUpdated, profileUpdated, signedOut } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
