<template>
  <q-page class="row justify-center items-center q-pa-md">
    <q-card class="q-pa-md" style="width: 400px">
      <q-card-section>
        <div class="text-h6">🔐 Login</div>
      </q-card-section>

      <q-form @submit.prevent="onLogin" class="q-gutter-md">
        <q-input v-model="form.username" label="Username" filled required />
        <q-input v-model="form.password" label="Password" type="password" filled required />

        <q-btn type="submit" label="Login" color="primary" class="full-width" />
        <q-btn flat label="Register" to="/register" class="q-mt-sm full-width" />
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Notify } from 'quasar'
import { useAuthStore } from 'stores/auth'

const form = ref({ username: '', password: '' })
const router = useRouter()
const auth = useAuthStore()

const onLogin = async () => {
  try {
    await auth.login(form.value.username, form.value.password)
    Notify.create({ type: 'positive', message: 'Logged in successfully' })
    router.push('/Expense')
  } catch {
    Notify.create({ type: 'negative', message: 'Login failed' })
  }
}
</script>
