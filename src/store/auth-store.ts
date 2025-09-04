import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface User {
  id: string
  username: string
  email?: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (username: string, password: string) => {
        set({ isLoading: true })

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // Mock successful login
          const user: User = {
            id: "1",
            username,
            email: `${username}@example.com`,
          }

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          })

          console.log("Zustand: User logged in successfully")
        } catch (error) {
          set({ isLoading: false })
          console.error("Zustand: Login failed", error)
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },
    }),
    {
      name: "auth-store",
    },
  ),
)
