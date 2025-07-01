<template>
  <q-page class="row justify-center items-center q-pa-md">
    <q-card class="q-pa-md" style="width: 400px">
      <q-card-section>
        <div class="text-h6">📝 Register</div>
      </q-card-section>

      <q-form @submit.prevent="onRegister" class="q-gutter-md">
        <q-input v-model="form.username" label="Username" filled required />
        <q-input v-model="form.password" label="Password" type="password" filled required />

        <q-btn type="submit" label="Register" color="primary" class="full-width" />
        <q-btn flat label="Back to Login" to="/login" class="q-mt-sm full-width" />
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { Notify } from 'quasar'

const form = ref({ username: '', password: '' })
const router = useRouter()

const onRegister = async () => {
  try {
    await api.post('register/', form.value)
    Notify.create({ type: 'positive', message: 'Registered successfully' })
    router.push('/login')
  } catch {
    Notify.create({ type: 'negative', message: 'Registration failed' })
  }
}
</script>
