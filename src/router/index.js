import Vue from 'vue'
import Router from 'vue-router'
import ReccommendationsWizard from '@/views/ReccommendationsWizard'
import Login from '@/views/Login'
import Unauthorized from '@/views/errorPages/Unauthorized'
import Internal from '@/views/errorPages/Internal'
import Instructions from '@/views/Instructions'
import Dashboard from '@/views/Dashboard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/recommendations-wizard',
      name: 'ReccommendationsWizard',
      component: ReccommendationsWizard
    },
    {
      path: '/',
      name: "Login",
      component: Login
    },
    {
      path: '/unauthorized',
      name: "Unauthorized",
      component: Unauthorized
    },
    {
      path: '/internal-error',
      name: "InternalError",
      component: Internal
    },
    {
      path: '/instructions',
      name: "Instructions",
      component: Instructions
    },
    {
      path: '/dashboard',
      name: "Dashboard",
      component: Dashboard
    }
  ]
})
