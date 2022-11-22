import { onMounted } from "vue"
import { useRoute } from "vue-router"
import { SITE_TITLES, SITE_ROUTES } from '../consts'

export const useTitle = () => {

  onMounted(() => {
    const data = useRoute()
    let title = ''

    switch (data.path) {
      case SITE_ROUTES.home:
        title = SITE_TITLES.home
        break;
      case SITE_ROUTES.login:
        title = SITE_TITLES.login
        break;
      case SITE_ROUTES.adminPanel:
        title = SITE_TITLES.admin
        break;
    }

    document.title = title
  })
}