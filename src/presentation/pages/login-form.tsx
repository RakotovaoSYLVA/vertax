import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "framer-motion/client"
import { useAuthStore } from "../../store/auth-store"
import { useLoginRedux } from "../../infra/useCase/login-useCase"
import { User, Lock, Smartphone } from "lucide-react"

export function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // Zustand store
  const { login, isLoading } = useAuthStore()

  // Redux hook
  const { loginWithRedux } = useLoginRedux()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Using both Zustand and Redux as requested
    await login(username, password)
    loginWithRedux({ username, password })
  }

  return (
    <Card className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden">
      <div className="flex min-h-[500px]">
        {/* Left Side - Teal Section */}
        <div className="flex-1 bg-gradient-to-br from-teal-400 to-teal-600 relative overflow-hidden">
          {/* Rotated Welcome Text */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
            <h1 className="text-white text-4xl font-light tracking-widest">Welcome</h1>
          </div>

          {/* 3D Phone Illustration */}
          <div className="absolute right-12 top-1/2 -translate-y-1/2">
            <div className="relative">
              {/* Phone mockup */}
              <div className="w-32 h-56 bg-white rounded-2xl shadow-xl transform rotate-12 hover:rotate-6 transition-transform duration-300">
                <div className="p-4 h-full flex flex-col">
                  <div className="w-full h-2 bg-gray-200 rounded mb-2"></div>
                  <div className="flex-1 bg-gradient-to-b from-teal-100 to-teal-200 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-8 h-8 text-teal-600" />
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-white/30 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-white/90 text-sm font-medium tracking-wide">INTRODUCING BROKER OPERATING SYSTEM</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-3xl font-light text-teal-600 mb-8 text-center">LOGIN</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <label className="text-sm text-gray-500 font-medium">Username</label>
                <div className="relative">
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-teal-400 focus:ring-teal-400"
                    placeholder="Enter your username"
                    required
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm text-gray-500 font-medium">Password</label>
                <div className="relative">
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-teal-400 focus:ring-teal-400"
                    placeholder="Enter your password"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-full transition-colors duration-200"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              {/* Footer Links */}
              <div className="flex justify-between text-sm">
                <button type="button" className="text-teal-500 hover:text-teal-600 transition-colors">
                  Forgot
                </button>
                <button type="button" className="text-teal-500 hover:text-teal-600 transition-colors">
                  Help
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Card>
  )
}
