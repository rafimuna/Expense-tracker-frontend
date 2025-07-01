<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <!-- 🔰 Logo & Title -->
      <q-toolbar-title class="text-h6">
        <q-icon name="account_balance_wallet" class="q-mr-sm" />
        Expense Tracker
      </q-toolbar-title>

      <!-- 🧭 Navigation Links -->
      <q-btn
        flat
        dense
        icon="dashboard"
        label="Dashboard"
        to="/Expense"
        v-if="auth.isAuthenticated"
      />
      <q-btn
        flat
        dense
        icon="add_circle_outline"
        label="Add"
        to="/add"
        v-if="auth.isAuthenticated"
      />

      <!-- 🔓 Auth Buttons -->
      <q-space />
      <q-btn
        flat
        dense
        label="Register"
        icon="person_add"
        to="/register"
        v-if="!auth.isAuthenticated"
      />
      <q-btn flat dense label="Login" icon="login" to="/login" v-if="!auth.isAuthenticated" />
      <q-btn
        flat
        dense
        label="Logout"
        icon="logout"
        @click="logout"
        v-if="auth.isAuthenticated"
        color="white"
        class="bg-red-5"
      />
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { useAuthStore } from 'stores/auth'
import { useRouter } from 'vue-router'
import { Notify } from 'quasar'

const auth = useAuthStore()
const router = useRouter()

// 🔐 Logout করলে redirect করে login এ পাঠাবে
const logout = () => {
  auth.logout()
  Notify.create({ type: 'info', message: 'Logged out' })
  router.push('/login')
}
</script>
