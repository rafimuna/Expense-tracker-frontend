const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/Expense', component: () => import('pages/ExpenseList.vue') },
      { path: '/add', component: () => import('pages/AddExpense.vue') },
      {
        path: '/edit/:id',
        component: () => import('pages/EditExpense.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
