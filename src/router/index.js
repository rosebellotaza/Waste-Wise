import { useAuthUserStore } from '@/stores/authUser'
import { getUserInformation, isAuthenticated } from '@/utils/supabase'
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DashboardView from '@/views/system/DashboardView.vue'
import AboutusView from '@/views/system/AboutusView.vue'
import AccountSettingsView from '@/views/system/AccountSettingsView.vue'
import UserRolesView from '@/views/system/manage-users/UserRolesView.vue'
import AppointmentView from '@/views/system/AppointmentView.vue'
import GuideView from '@/views/system/GuideView.vue'
import ContactView from '@/views/system/ContactView.vue'
import ForbiddenView from '@/views/system/ForbiddenView.vue'
import CollectorDashboardView from '@/views/system/CollectorDashboardView.vue'
import UsersInformation from '@/views/system/UsersInformation.vue'

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
    },
    {
      path: '/about/us',
      name: 'aboutus',
      component: AboutusView,
    },
    {
      path: '/account/settings',
      name: 'accountsettings',
      component: AccountSettingsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/user/roles',
      name: 'userroles',
      component: UserRolesView,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/appointment',
      name: 'appointment',
      component: AppointmentView,
    },
    {
      path: '/guide',
      name: 'guide',
      component: GuideView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
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
    },
    {
      path: '/users/information',
      name: 'usersinformation',
      component: UsersInformation,
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
  }
})

export default router
