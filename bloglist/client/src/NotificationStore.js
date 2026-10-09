import { create } from 'zustand'

let notificationTimeout

const useNotificationStore = create((set) => ({
  message: '',
  type: 'success',
  actions: {
    showNotification: (message, type = 'success') => {
      clearTimeout(notificationTimeout)
      set({ message, type })
      notificationTimeout = setTimeout(
        () => set({ message: '', type: 'success' }),
        5000,
      )
    },
  },
}))

export const useNotification = () =>
  useNotificationStore((state) => state.message)
export const useNotificationType = () =>
  useNotificationStore((state) => state.type)
export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions)