<template>
  <q-layout view="hHh lpR fFf">
    <!-- Navbar Component -->
    <AppNavbar />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import AppNavbar from 'components/AppNavbar.vue'
</script>
