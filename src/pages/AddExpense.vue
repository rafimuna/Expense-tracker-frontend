<template>
  <q-page class="q-pa-md">
    <q-form @submit.prevent="submitExpense" class="q-gutter-md" ref="expenseForm">
      <q-input v-model="form.title" label="Title" filled required />
      <q-input v-model.number="form.amount" label="Amount" type="number" filled required />
      <q-select
        v-model="form.category"
        :options="categories"
        option-label="name"
        option-value="id"
        label="Category"
        filled
        emit-value
        map-options
      />

      <q-input v-model="form.date" label="Date" type="date" filled required />
      <q-input v-model="form.note" label="Note" type="textarea" filled />

      <q-btn type="submit" color="primary" label="Add Expense" />
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { Notify } from 'quasar'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  title: '',
  amount: 0,
  category: '',
  date: '',
  note: '',
})

const categories = ref([])

const fetchCategories = async () => {
  try {
    const res = await api.get('categories/')
    categories.value = res.data
  } catch {
    Notify.create({ type: 'negative', message: 'Failed to load categories' })
  }
}

const submitExpense = async () => {
  try {
    await api.post('expenses/', form.value)
    Notify.create({ type: 'positive', message: 'Expense Added' })
    router.push('/')
  } catch {
    Notify.create({ type: 'negative', message: 'Failed to Add' })
  }
}

onMounted(() => {
  fetchCategories()
})

console.log(form.value.category)
</script>
