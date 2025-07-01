import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || null,
    isAuthenticated: !!localStorage.getItem('accessToken'),
  }),
  actions: {
    async login(username, password) {
      try {
        const res = await api.post('token/', { username, password })
        this.accessToken = res.data.access
        this.isAuthenticated = true
        localStorage.setItem('accessToken', res.data.access)
        api.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`
      } catch {
        throw new Error('Login failed')
      }
    },
    logout() {
      this.accessToken = null
      this.isAuthenticated = false
      localStorage.removeItem('accessToken')
      delete api.defaults.headers.common['Authorization']
    },
  },
})
