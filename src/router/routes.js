import MainLayout from 'layouts/MainLayout.vue'
import { useAuthStore } from 'stores/auth'

const requireAuth = (to, from, next) => {
  const auth = useAuthStore()
  auth.isAuthenticated ? next() : next('/login')
}

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', redirect: '/Expense' },
      {
        path: 'Expense',
        component: () => import('pages/ExpenseList.vue'),
        beforeEnter: requireAuth,
      },
      { path: 'add', component: () => import('pages/AddExpense.vue'), beforeEnter: requireAuth },
      {
        path: 'edit/:id',
        component: () => import('pages/EditExpense.vue'),
        beforeEnter: requireAuth,
      },
      { path: '/login', component: () => import('pages/LoginPage.vue') },
      { path: '/register', component: () => import('pages/RegisterPage.vue') },
      {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
      },
    ],
  },
]

export default routes
