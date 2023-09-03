import { createRouter, createWebHistory, RouteLocationNormalized } from "vue-router";
import { HomeView, LoginView, AdminView, MobileViewHome } from '../views'
import { SITE_ROUTES } from '../consts'
import { useFetch } from '../hooks'
import { AuthService } from "../api";
import { getToken } from '../helpers'
import MobileDetect from "mobile-detect";


const detect = new MobileDetect(window.navigator.userAgent)
const isMobile = detect.mobile()

const { fetch: fetchAccess } = useFetch<boolean>(async () => {
  if (document.cookie.includes('token')) {
    const isAccess = await AuthService.checkAccess(getToken())
    return isAccess
  }
  return false
})


const routes = [
  {
    path: SITE_ROUTES.home,
    name: 'Main',
    component: MobileDetect ? MobileViewHome : HomeView,
  },
  {
    path: SITE_ROUTES.login,
    component: LoginView,
    beforeEnter: async () => {
      if (isMobile) {
        router.push(SITE_ROUTES.home)
      }

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
      if (isMobile) {
        router.push(SITE_ROUTES.home)
      }

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
