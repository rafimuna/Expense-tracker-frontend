<template>
  <q-page class="q-pa-md">
    <!-- 📝 Edit ফর্ম শুরু -->
    <q-form @submit.prevent="updateExpense" class="q-gutter-md">
      <!-- 🧾 Title ইনপুট -->
      <q-input v-model="form.title" label="Title" filled required />

      <!-- 💰 Amount ইনপুট -->
      <q-input v-model.number="form.amount" label="Amount" type="number" filled required />

      <!-- 📂 Category ড্রপডাউন (ডাইনামিকভাবে লোড হবে) -->
      <q-select
        v-model="form.category"
        :options="categories"
        option-label="name"
        option-value="id"
        label="Category"
        filled
        emit-value
        map-options
        required
      />

      <!-- 📅 Date ইনপুট -->
      <q-input v-model="form.date" label="Date" type="date" filled required />

      <!-- 🗒️ Note ইনপুট -->
      <q-input v-model="form.note" label="Note" type="textarea" filled />

      <!-- ✅ সাবমিট বাটন -->
      <q-btn type="submit" label="Update Expense" color="primary" />
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useRoute, useRouter } from 'vue-router'
import { Notify } from 'quasar'

const route = useRoute() // 🔁 URL থেকে id নেয়ার জন্য
const router = useRouter() // 🔁 Routing করতে ব্যবহৃত হবে
const id = route.params.id // 🆔 /edit/:id থেকে id নিচ্ছি

// 🧾 ফর্ম ডেটা
const form = ref({
  title: '',
  amount: 0,
  category: '',
  date: '',
  note: '',
})

// 📂 ক্যাটাগরির লিস্ট
const categories = ref([])

// 🛑 ডেটা আপডেট করার ফাংশন
const updateExpense = async () => {
  try {
    await api.put(`expenses/${id}/`, form.value)
    Notify.create({ type: 'positive', message: '✔️ Expense Updated Successfully' })
    router.push('/') // 🔁 হোমপেজে পাঠিয়ে দিচ্ছি
  } catch {
    Notify.create({ type: 'negative', message: '❌ Failed to update expense' })
  }
}

// 🔁 আগের ডেটা লোড করে ফর্মে প্রিফিল করবো
const fetchExpense = async () => {
  try {
    const res = await api.get(`expenses/${id}/`)
    form.value = res.data
  } catch {
    Notify.create({ type: 'negative', message: '❌ Failed to load expense data' })
  }
}

// 📂 ক্যাটাগরি লিস্ট লোড
const fetchCategories = async () => {
  try {
    const res = await api.get('categories/')
    categories.value = res.data
  } catch {
    Notify.create({ type: 'negative', message: '❌ Failed to load categories' })
  }
}

// 📌 পেজ লোড হলেই কাজ শুরু হবে
onMounted(() => {
  fetchExpense()
  fetchCategories()
})
</script>
