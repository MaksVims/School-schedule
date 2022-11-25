<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ClassService } from "../api";
import { SelectMenu, Schedule, Clock } from "../components";
import { Loader, Snow } from '../components/UI'
import { useFetch, useTitle, useEvent } from "../hooks";
import { useClassStore } from "../store";

const { setClasses } = useClassStore();
const homeRef = ref<null | HTMLDivElement>(null)

useTitle()

// Отслеживаем изменение окна и добавляем отступ при необходимости
useEvent(window, 'resize', (e: Event) => {
  const widthContent = Number(document.documentElement.clientWidth)
  const diff = window.innerWidth - widthContent

  if (diff && homeRef.value && widthContent > 1217) {
    homeRef.value.style.paddingRight = diff + 'px'
  } else if (homeRef.value) {
    homeRef.value.style.paddingRight = '0px'
  }
})

// Подписка для автообновления данных расписания
const subscribeUpdateData = async () => {
  try {
    const updatedData = await ClassService.subscribeUpdateData()
    setClasses(updatedData)
    subscribeUpdateData()
  } catch (e) {
    setTimeout(() => {
      subscribeUpdateData()
    }, 500);
  }
}

// Загружаем данные и подписываемся на автообновление
const { fetch: fetchData, loading } = useFetch(async () => {
  const fetchData = await ClassService.getAll();
  setClasses(fetchData);
  subscribeUpdateData()
})

onMounted(async () => {
  fetchData()
});

</script>

<template>
  <div v-if="!loading" class="home" ref="homeRef">
    <header class="header">
      <h1 class=" title header__title">Расписание уроков школы № 116</h1>
      <Snow />
      <div class="header__clock">
        <Clock class="clock" />
      </div>
      <SelectMenu />
    </header>
    <main class="main">
      <Schedule />
    </main>
  </div>
  <div class="wrapper__loader center" v-else>
    <Loader class="loader" />
  </div>
</template>

<style scoped lang="scss">
@import "@/style/var.scss";

.wrapper {
  &__loader {
    width: 100vw;
    height: 100vh;
  }
}

.main {
  height: 80%;
}

.home {
  height: 100vh;
}

.header {
  position: relative;
  display: flex;
  height: 20%;
  flex-direction: column;
  padding: 20px;
  gap: $gap-normal;
  text-align: center;
  background: $gradient-main;

  &__clock {
    position: absolute;
    right: 30px;
    top: 30px;
  }

  &__title {
    font-size: $title-big;
    color: rgb(5, 5, 5);
  }
}

.loader {
  &::after {
    width: 150px;
    height: 150px;
    margin: 1px;
    border-width: 3px;
    border-color: $loader-home transparent $loader-home transparent;
  }
}

.clock {
  font-size: $text-veryBig;
}

@media (max-width: $desktop) {
  .header {

    &__title {
      font-size: $title-medium;
    }

    & .clock {
      font-size: $title-normal;
    }
  }
}

@media (max-width: $tabletop) {
  .home {
    width: 1200px;
    overflow: auto;
  }
}

@media (min-height: $height-desktop) {
  .header {
    padding: 30px;
    gap: $gap-medium;
  }
}

@media (min-height: $height-desktop-big) {
  .header {
    padding: 40px;
    gap: $gap-big;
  }
}

</style>