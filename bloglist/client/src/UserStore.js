import { create } from 'zustand'

const storedUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  return loggedUserJSON ? JSON.parse(loggedUserJSON) : null
}

const useUserStore = create((set) => ({
  user: null,
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
  },
}))

export const useUser = () => useUserStore((state) => state.user)
export const useUserActions = () => useUserStore((state) => state.actions)