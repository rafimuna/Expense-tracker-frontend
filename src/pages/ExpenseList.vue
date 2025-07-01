<template>
  <q-page class="q-pa-md">
    <!-- ✅ Summary Card -->
    <q-card class="q-pa-md q-mb-md shadow-2">
      <div class="row items-center q-col-gutter-md">
        <div class="col">
          <div class="text-h6">💰 Total Spent: ৳{{ totalSpent }}</div>
        </div>
        <div class="col">
          <div class="text-h6">📂 Categories: {{ categoryCount }}</div>
        </div>
      </div>
    </q-card>

    <!-- 📊 Chart -->
    <div class="chart-container">
      <canvas id="expenseChart"></canvas>
    </div>
    <!-- 🔍 Search and Filter -->
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-6">
        <q-input v-model="search" label="Search by title" dense outlined clearable />
      </div>
      <div class="col-6">
        <q-select
          v-model="selectedCategory"
          :options="categoryOptions"
          label="Filter by Category"
          dense
          outlined
          clearable
        />
      </div>
    </div>

    <!-- 📋 Expense Table -->
    <q-table
      :rows="filteredExpenses"
      :columns="columns"
      row-key="id"
      flat
      bordered
      :rows-per-page-options="[5, 10, 20]"
      class="shadow-1"
    >
      <template v-slot:body-cell-actions="props">
        <q-td align="center">
          <q-btn flat icon="edit" color="primary" @click="goToEdit(props.row.id)" dense>
            <q-tooltip>Edit</q-tooltip>
          </q-btn>
          <q-btn flat icon="delete" color="negative" @click="deleteExpense(props.row.id)" dense>
            <q-tooltip>Delete</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>

    <!-- 🔘 Floating Add Button -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round color="primary" icon="add" to="/add" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'
import { Notify } from 'quasar'
import Chart from 'chart.js/auto'

const router = useRouter()
const expenses = ref([])
const search = ref('')
const selectedCategory = ref(null)
const categoryOptions = ref([])
const chart = ref(null)

const columns = [
  { name: 'title', label: 'Title', field: 'title', align: 'left' },
  { name: 'amount', label: 'Amount', field: 'amount', align: 'right' },
  { name: 'category', label: 'Category', field: 'category', align: 'left' },
  { name: 'date', label: 'Date', field: 'date', align: 'left' },
  { name: 'note', label: 'Note', field: 'note', align: 'left' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'center' },
]

const fetchExpenses = async () => {
  const res = await api.get('expenses/')
  expenses.value = res.data
  updateChart()
}

const deleteExpense = async (id) => {
  await api.delete(`expenses/${id}/`)
  Notify.create({ type: 'positive', message: 'Deleted' })
  fetchExpenses()
}

const goToEdit = (id) => {
  router.push(`/edit/${id}`)
}

const totalSpent = computed(() => {
  return expenses.value.reduce((sum, item) => sum + Number(item.amount), 0)
})

const categoryCount = computed(() => {
  const categories = new Set(expenses.value.map((e) => e.category))
  return categories.size
})

const filteredExpenses = computed(() => {
  return expenses.value.filter((exp) => {
    const matchesSearch = exp.title.toLowerCase().includes(search.value.toLowerCase())
    const matchesCategory = selectedCategory.value ? exp.category === selectedCategory.value : true
    return matchesSearch && matchesCategory
  })
})

const updateChart = () => {
  const categoryTotals = {}
  expenses.value.forEach((exp) => {
    if (!categoryTotals[exp.category]) categoryTotals[exp.category] = 0
    categoryTotals[exp.category] += parseFloat(exp.amount)
  })

  const ctx = document.getElementById('expenseChart')
  if (!ctx) return

  if (chart.value) chart.value.destroy()

  chart.value = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          label: 'Category-wise Expense',
          data: Object.values(categoryTotals),
          backgroundColor: ['#e57373', '#64b5f6', '#81c784', '#ffd54f', '#ba68c8'],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    },
  })
}

onMounted(async () => {
  const catRes = await api.get('categories/')
  categoryOptions.value = catRes.data.map((c) => c.name)
  fetchExpenses()
})
</script>

<style scoped>
.chart-container {
  position: relative;
  max-width: 600px; /* ✅ আপনার প্রয়োজন অনুযায়ী পরিবর্তন করুন */
  height: 300px; /* ✅ উচ্চতা নির্ধারণ করুন */
  margin: 0 auto; /* ✅ Center করতে */
}
</style>
