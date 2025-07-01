<template>
  <q-layout view="hHh lpR fFf">
    <!-- 🔝 Top Header/Navbar -->
    <AppNavbar />

    <!-- 📄 Main Page Content -->
    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>

    <!-- 📌 Optional Footer -->
    <q-footer class="bg-grey-2 text-grey-8 text-center q-pa-sm">
      © {{ new Date().getFullYear() }} Expense Tracker. All rights reserved.
    </q-footer>
  </q-layout>
</template>

<script setup>
import AppNavbar from 'components/AppNavbar.vue'
</script>
