<template>
  <q-page class="q-pa-md">
    <q-btn label="Add Expense" color="primary" :to="`/add`" class="q-mb-md" />

    <q-table :rows="expenses" :columns="columns" row-key="id" flat bordered>
      <template v-slot:body-cell-actions="props">
        <q-btn color="red" icon="delete" dense flat @click="deleteExpense(props.row.id)" />
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { api } from 'boot/axios'
import { Notify } from 'quasar'

const expenses = ref([])

const columns = [
  { name: 'title', label: 'Title', field: 'title' },
  { name: 'amount', label: 'Amount', field: 'amount', align: 'right' },
  { name: 'category', label: 'Category', field: 'category' },
  { name: 'date', label: 'Date', field: 'date' },
  { name: 'note', label: 'Note', field: 'note' },
  { name: 'actions', label: 'Actions', field: 'actions' },
]

const fetchExpenses = async () => {
  const res = await api.get('expenses/')
  expenses.value = res.data
}

const deleteExpense = async (id) => {
  try {
    await api.delete(`expenses/${id}/`)
    Notify.create({ type: 'positive', message: 'Deleted' })
    fetchExpenses()
  } catch {
    Notify.create({ type: 'negative', message: 'Failed to delete' })
  }
}

onMounted(() => {
  fetchExpenses()
})
</script>
