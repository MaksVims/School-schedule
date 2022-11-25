<script setup lang="ts">
import { ref, watch } from 'vue';
import { ClassService } from '../api';
import { SvgAddFile } from '../components/Svg'
import { useFetch, useTitle } from '../hooks';
import { CheckboxApp, Loader, TextError, TextSuccess } from '../components/UI'
import { ERRORS, SITE_ROUTES } from '../consts'

const file = ref<any>('')
const isAuth = ref(true)
const filePicker = ref<null | HTMLInputElement>(null)
const isSuccess = ref(false)
const isMainFile = ref(false)
useTitle()

const { fetch: loadFile, loading, error } = useFetch(async () => {
  const formData = new FormData()
  formData.append('file', file.value)
  let response: null | { message: string } = null
  if (isMainFile.value) {
    response = await ClassService.loadSchedule(formData)
  } else {
    response = await ClassService.loadTempSchedule(formData)
  }
  if (response) {
    isSuccess.value = true
    setTimeout(() => {
      isSuccess.value = false
      filePicker.value!.value = ''
    }, 5000);
  }
})

const changeFile = (e: Event) => {
  const target = e.target as HTMLInputElement
  // При наличии файла сохраняем его как состояние и вызываем функцию отправки на сервер

  if (target.files?.length) {
    file.value = target.files[0]
    loadFile()
  }
}

const clickFilePicker = () => {
  if (!filePicker.value || !isAuth.value) {
    return
  }

  if (error.value) {
    error.value = null
    filePicker.value.value = ''
  }

  if (!isSuccess.value) {
    filePicker.value.click()
  }
}

watch(error, () => {
  if (error.value === ERRORS.loadFile403) {
    isAuth.value = false
  }
})

watch(isMainFile, () => {
  console.log(isMainFile.value);
})

</script>

<template>
  <div class="admin">
    <header class="admin__header">
      <h1 class="title title__center">Панель администратора</h1>
    </header>
    <main class="admin__content center">
      <RouterLink class="admin__link" :to="SITE_ROUTES.home">Перейти к расписанию</RouterLink>
      <section class="content__container content">
        <div class="content__loadform">
          <div class="content__descriptions">
            <p class="title__center">{{ isMainFile ? 'Загрузить основное раписание' : 'Загрузить временное раписание' }}
            </p>
            <p class="title__center">расширение файла .xlsx</p>
          </div>
          <form @submit.prevent="" class="center form">
            <CheckboxApp v-model="isMainFile">Основное расписание вкл.</CheckboxApp>
            <input class="hidden" type="file" @change="changeFile" accept=".xlsx" ref="filePicker">
            <div :class="['dropzone', 'center', { 'dropzone--disable': isSuccess }]" @click="clickFilePicker">
              <Loader class="loader" v-if="loading" />
              <SvgAddFile v-else-if="!loading && !isSuccess && !error" class="icon" />
              <img v-else-if="!error" src="@/assets/image/check.png" alt="check" class="img__progress" />
              <img v-else src="@/assets/image/error.png" alt="error" class="img__progress" />
            </div>
          </form>
          <TextError class="notation" v-if="error && !isAuth">
            Вы не авторизованы в системе! <RouterLink :to="SITE_ROUTES.login">Авторизоваться</RouterLink>
          </TextError>
          <TextError class="notation" v-else-if="error">Проверьте отправляемый файл!</TextError>
          <TextSuccess class="notation" v-else-if="isSuccess">Загрузка прошла успешно!</TextSuccess>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped lang="scss">
@import "@/style/var.scss";

.admin {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  &__header {
    padding: 15px 0;
    background: $gradient-main;
  }

  &__content {
    position: relative;
    flex-grow: 1;
    flex-shrink: 0;
  }

  &__link {
    position: absolute;
    right: 30px;
    top: 20px;
  }
}

.dropzone {
  position: relative;
  width: 350px;
  height: 350px;
  cursor: pointer;
  border: 2px dashed black;

  &--disable {
    cursor: auto;
  }
}

.content {
  &__container {
    display: flex;
    flex-direction: column;
    min-width: 600px;
  }

  &__loadform {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    padding-bottom: 40px;
    gap: $gap-veryBig;
    border-radius: $radius-normal;
    background-color: white;
  }

  &__descriptions {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: $gap-normal;

    & p {
      color: black;
      font-size: $subtitle-normal;
    }
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: $gap-normal;
}

.notation {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 15px;
}

.icon {
  width: 150px;
  height: 150px;
  fill: $icon-loadfile;
}

.loader {
  &::after {
    width: 200px;
    height: 200px;
    margin: 1px;
    border-width: 6px;
    border-color: $loader-admin transparent $loader-admin transparent;
  }
}

.img {
  &__progress {
    width: 150px;
    height: 150px;
  }
}

@media (max-width: $mobile) {
  .content {
    &__container {
      min-width: auto;
    }
  }
}

@media (max-width: $mobile-small) {
  .content {
    &__container {
      min-width: auto;
    }

    &__descriptions {
      & p {
        font-size: $subtitle-small;
      }
    }
  }

  .img {
    &__progress {
      width: 100px;
      height: 100px;
    }
  }

  .loader {
    &::after {
      width: 100px;
      height: 100px;
      border-width: 2px;
    }
  }

  .icon {
    width: 100px;
    height: 100px;
    fill: $icon-loadfile;
  }

  .dropzone {
    width: 250px;
    height: 250px;
  }
}
</style>