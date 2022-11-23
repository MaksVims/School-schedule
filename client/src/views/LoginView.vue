<script setup lang="ts">
import { ref, watch } from "vue";
import { TextError } from "../components/UI";
import { FormLogin } from "../components";
import { useFetch, useTitle} from "../hooks";
import { AuthService } from "../api";
import { router } from '../router'
import { SITE_ROUTES } from '../consts'
import { useAuth } from '../store'

const login = ref("school_admin_116");
const password = ref("Sch-116");
const { setAuth } = useAuth()
useTitle()

const {
  fetch: fetchLogin,
  loading,
  error,
} = useFetch(async () => {
  const { token } = await AuthService.login(login.value, password.value);
  if (token) {
    setAuth(true)
    router.push(SITE_ROUTES.adminPanel)
  }
});

watch(error, () => {
  if (error.value) {
    login.value = "";
    password.value = "";
  }
});

</script>

<template>
  <div class="wrapper center">
    <div class="container center">
      <h1 class="title">Вход для администратора</h1>
      <FormLogin :fetch="fetchLogin" :loading="loading" v-model:login="login" v-model:password="password" />
      <TextError class="error" v-if="error">{{ error }}</TextError>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/style/var.scss";

.wrapper {
  width: 100vw;
  height: 100vh;
  background: $gradient-secondary;
}

.container {
  position: relative;
  flex-direction: column;
  gap: $gap-big;
  padding: 40px;
  border-radius: 15px;
  background: white;
}

.error {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10px;
}

@media (max-width: $mobile) {
  .container {
    padding: 20px;
  }
}

@media (max-width:$mobile-small) {
  .wrapper {
    min-width: 400px;
  }
}

@media (min-height: $height-small) and (max-width: $mobile-small) {
  .wrapper {
    min-height: 720px;
  }
}

@media (min-height: $height-small) and (max-width: $mini) {
  .wrapper {
    min-height: 940px;
  }
}

@media (min-height: $height-mobile) and (max-width: $mobile-small) {
  .wrapper {
    min-height: 830px;
  }
}


@media (min-height: $height-tabletop) and (max-width: $mobile-small) {
  .wrapper {
    min-height: 870px;
  }
}
</style>