import { create } from 'zustand'
import userService from './services/users'
import { getUser, saveUser, removeUser } from './services/persistentUser'

const useUserStore = create((set) => ({
  user: null,
  users: [],
  actions: {
    initialize: () => {
      const user = getUser()
      set({ user })
      return user
    },
    setUser: (user) => {
      saveUser(user)
      set({ user })
    },
    clearUser: () => {
      removeUser()
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