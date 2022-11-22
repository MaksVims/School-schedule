<script setup lang="ts">
import { onMounted } from "vue";
import { ClassService } from "../api";
import { SelectMenu, Schedule, Clock } from "../components";
import { Loader, Snow } from '../components/UI'
import { useFetch, useTitle } from "../hooks";
import { useClassStore } from "../store";

const { setClasses } = useClassStore();
useTitle()

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
  <div v-if="!loading" class="home">
    <header class="header">
      <h1 class=" title header__title">Расписание уроков школы № 116</h1>
      <Snow />
      <div class="header__clock">
        <Clock class="clock"/>
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
  height: 78%;
}

.home {
  height: 100vh;
}

.header {
  position: relative;
  display: flex;
  height: 22%;
  flex-direction: column;
  padding: 30px;
  gap: $gap-big;
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
    &__title, .clock {
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
</style>