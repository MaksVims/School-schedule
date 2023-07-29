import { createRouter, createWebHistory, RouteLocationNormalized } from "vue-router";
import { HomeView, LoginView, AdminView } from '../views'
import { SITE_ROUTES } from '../consts'
import { useFetch } from '../hooks'
import { AuthService } from "../api";

const { fetch: fetchAccess } = useFetch<boolean>(async () => {
  if(document.cookie.includes('token')) {
    const token = document.cookie.slice(6)
    const isAccess = await AuthService.checkAccess(token)
    return isAccess
  }
  return false
})

const routes = [
  {
    path: SITE_ROUTES.home,
    name: 'Main',
    component: HomeView,
  },
  {
    path: SITE_ROUTES.login,
    component: LoginView,
    beforeEnter: async () => {
      const isAccess = await fetchAccess()
      if (isAccess) {
        router.push(SITE_ROUTES.adminPanel)
      }
    },
  },
  {
    path: SITE_ROUTES.adminPanel,
    component: AdminView,
    beforeEnter: async () => {
      const isAccess = await fetchAccess()
      if (!isAccess) {
        router.push(SITE_ROUTES.login)
      }
    }
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to: RouteLocationNormalized) => {
  if (!Object.values(SITE_ROUTES).includes(to.path)) {
    router.push(SITE_ROUTES.home)
  }
})
