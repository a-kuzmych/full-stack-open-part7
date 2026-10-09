import { create } from 'zustand'
import userService from './services/users'

const storedUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  return loggedUserJSON ? JSON.parse(loggedUserJSON) : null
}

const useUserStore = create((set) => ({
  user: null,
  users: [],
  actions: {
    initialize: () => {
      const user = storedUser()
      set({ user })
      return user
    },
    setUser: (user) => {
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      set({ user })
    },
    clearUser: () => {
      window.localStorage.removeItem('loggedBlogappUser')
      set({ user: null })
    },
    initializeUsers: async () => {
      const users = await userService.getAll()
      set({ users })
    },
  },
}))

export const useUser = () => useUserStore((state) => state.user)
export const useUsers = () => useUserStore((state) => state.users)
export const useUserActions = () => useUserStore((state) => state.actions)