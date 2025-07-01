<template>
  <q-page class="q-pa-md flex flex-center bg-grey-1">
    <q-card flat bordered class="q-pa-xl shadow-2 bg-white" style="max-width: 700px; width: 100%">
      <!-- 🧾 Logo Section -->
      <div class="column items-center q-mb-md">
        <q-avatar size="100px">
          <img src="~assets/quasar-logo-vertical.svg" />
        </q-avatar>
        <div class="text-h5 text-primary q-mt-md">Expense Tracker</div>
        <div class="text-subtitle2 text-grey-7">Track your spending, stay in control 💼</div>
      </div>

      <!-- ✅ Features -->
      <div class="row q-col-gutter-md q-my-md">
        <div class="col-12 col-sm-4">
          <q-icon name="payments" size="32px" color="primary" />
          <div class="text-subtitle1 q-mt-sm">Total Tracking</div>
          <div class="text-caption">Manage all your expenses with visual breakdowns.</div>
        </div>
        <div class="col-12 col-sm-4">
          <q-icon name="category" size="32px" color="accent" />
          <div class="text-subtitle1 q-mt-sm">Smart Categories</div>
          <div class="text-caption">Organize spending into categories for better insight.</div>
        </div>
        <div class="col-12 col-sm-4">
          <q-icon name="bar_chart" size="32px" color="positive" />
          <div class="text-subtitle1 q-mt-sm">Insightful Charts</div>
          <div class="text-caption">See how your money is spent with pie & bar charts.</div>
        </div>
      </div>

      <!-- 🚀 Call-to-Action -->
      <div class="row justify-center q-mt-lg">
        <q-btn color="primary" label="➕ Add New Expense" icon="add" to="/add" class="q-mx-sm" />
        <q-btn
          color="secondary"
          label="📋 View Expenses"
          icon="table_view"
          to="/Expense"
          class="q-mx-sm"
        />
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
// No additional logic needed for static home
</script>

<style scoped>
.text-subtitle1 {
  font-weight: 600;
}
</style>
