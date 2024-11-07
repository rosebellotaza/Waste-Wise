import { useAuthUserStore } from '@/stores/authUser'
import { getUserInformation, isAuthenticated } from '@/utils/supabase'
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DashboardView from '@/views/system/user/DashboardView.vue'
import AboutusView from '@/views/system/user/AboutusView.vue'
import AccountSettingsView from '@/views/system/user/AccountSettingsView.vue'
import AppointmentView from '@/views/system/user/AppointmentView.vue'
import GuideView from '@/views/system/user/GuideView.vue'
import ContactView from '@/views/system/user/ContactView.vue'
import ForbiddenView from '@/views/system/error/ForbiddenView.vue'
import CollectorDashboardView from '@/views/system/collector/CollectorDashboardView.vue'
import CollectorAccountSettingsView from '@/views/system/collector/CollectorAccountSettingsView.vue'
import UsersInformationView from '@/views/system/collector/UsersInformationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresAuth: false },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true, requiresUser: true },
    },
    {
      path: '/about/us',
      name: 'aboutus',
      component: AboutusView,
      meta: { requiresAuth: true, requiresUser: true },
    },
    {
      path: '/account/settings',
      name: 'accountsettings',
      component: AccountSettingsView,
      meta: { requiresAuth: true, requiresUser: true },
    },
    {
      path: '/appointment',
      name: 'appointment',
      component: AppointmentView,
      meta: { requiresAuth: true, requiresUser: true },
    },
    {
      path: '/guide',
      name: 'guide',
      component: GuideView,
      meta: { requiresAuth: true, requiresUser: true },
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
      meta: { requiresAuth: true, requiresUser: true },
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: ForbiddenView,
    },
    {
      path: '/collector/dashboard',
      name: 'collectordashboard',
      component: CollectorDashboardView,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/users/information',
      name: 'usersinformation',
      component: UsersInformationView,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/collector/settings',
      name: 'collectorsettings',
      component: CollectorAccountSettingsView,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
  ],
})

router.beforeEach(async to => {
  // Load auth Pinia Store
  const authStore = useAuthUserStore()
  // Load if user is logged in
  const isLoggedIn = await isAuthenticated()

  // Redirect to appropriate page if accessing home route
  if (to.name === 'home') {
    return isLoggedIn ? { name: 'dashboard' } : { name: 'login' }
  }

  // If logged in, prevent access to login or register pages
  if (isLoggedIn && (to.name === 'login' || to.name === 'register')) {
    // redirect the user to the dashboard page
    return { name: 'dashboard' }
  }

  // if (isLoggedIn) {
  //   const userMetadata = await getUserInformation()
  //   const isAdmin = userMetadata.is_admin

  //   //Booelan Approach
  //   // const isCollector = userMetadata.is_collector 
  //   //String Approach
  //   // const isCollector = userMetadata.role === 'Collector'
  // }

  // if (!isAdmin) {
  //   if(to.name.startsWith('dashboard')) {
  //     return {name: 'forbidden'}
  //   }
  // }

  // If not logged in, prevent access to system pages
  if (!isLoggedIn && to.meta.requiresAuth) {
    // redirect the user to the login page
    return { name: 'login' }
  }

  // Check if the user is logged in
  if (isLoggedIn) {
    // Load user data if not already done
    if (!authStore.userData) {
      await authStore.getUserInformation()
    }

    // Get the user role
    const isAdmin = authStore.userData.is_admin
    // remove this comment if not need; Boolean Approach
    // const isCashier = userMetadata.is_cashier
    // remove this comment if not need; String Approach
    // const isCashier = userMetadata.role === 'Cashier'

    // Restrict access to admin-only routes
    if (!isAdmin && to.meta.requiresAdmin) {
      return { name: 'forbidden' }
    }
    // Add conditions here if needed; create boolean meta for cashier
    // if(!isCashier && to.meta.requiresCashier)) {

    // }

     // Restrict admin access to user-only pages
     if (isAdmin && to.meta.requiresUser) {
      return { name: 'forbidden' }
    }
  }
})

export default router
