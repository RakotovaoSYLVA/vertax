import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface LoginCredentials {
  username: string
  password: string
}

interface LoginState {
  credentials: LoginCredentials | null
  loginAttempts: number
  lastLoginTime: string | null
}

const initialState: LoginState = {
  credentials: null,
  loginAttempts: 0,
  lastLoginTime: null,
}

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginCredentials>) => {
      state.credentials = action.payload
      state.loginAttempts += 1
      state.lastLoginTime = new Date().toISOString()
    },
    clearCredentials: (state) => {
      state.credentials = null
    },
    resetAttempts: (state) => {
      state.loginAttempts = 0
    },
  },
})

export const { setCredentials, clearCredentials, resetAttempts } = loginSlice.actions

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
