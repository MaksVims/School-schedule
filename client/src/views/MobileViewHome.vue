<script setup lang="ts">
import { onMounted } from "vue";
import { ClassService } from "../api";
import { MobileSelectMenu, MobileSchedule } from "../components/Mobile";
import { Loader } from "../components/UI";
import { useFetch } from "../hooks";
import { useClassStore } from "../store";

const { setClasses } = useClassStore();

// Подписка для автообновления данных расписания
const subscribeUpdateData = async () => {
  try {
    const updatedData = await ClassService.subscribeUpdateData();
    setClasses(updatedData);
    subscribeUpdateData();
  } catch (e) {
    setTimeout(() => {
      subscribeUpdateData();
    }, 500);
  }
};

// Загружаем данные
const { fetch: fetchData, loading } = useFetch(async () => {
  const fetchData = await ClassService.getAll();
  setClasses(fetchData);
  subscribeUpdateData();
});

onMounted(async () => {
  fetchData();
});
</script>

<template>
  <div v-if="!loading" class="home">
    <a-space direction="vertical" class="space" :size="0">
      <a-layout style="height: 100vh">
        <a-layout-header class="header">
          <a-space style="width: 100%" direction="vertical" :size="10">
            <a-row align="center">
              <a-col :span="24">
                <h1 class="title header__title">
                  Расписание уроков школы № 116
                </h1>
              </a-col>
            </a-row>
            <a-row>
              <MobileSelectMenu />
            </a-row>
          </a-space>
        </a-layout-header>
        <a-layout-content class="content">
          <MobileSchedule />
        </a-layout-content>
      </a-layout>
    </a-space>
  </div>
  <div v-else class="wrapper__loader center">
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

.loader {
  &::after {
    width: 150px;
    height: 150px;
    margin: 1px;
    border-width: 3px;
    border-color: $loader-home transparent $loader-home transparent;
  }
}

.home {
  min-height: 100vh;
}

body {
  overflow: auto;
}

.content {
  margin-bottom: 50px;
}

.header {
  width: 100%;
  height: 110px;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: $gap-small;
  text-align: center;
  background: $gradient-main;

  &__title {
    font-size: $title-xxs;
    color: rgb(5, 5, 5);
    margin-bottom: 0;
    margin-top: 0;
    line-height: 32px;
  }
}

@media (max-width: $mini) {
  .header {
    &__title {
      font-size: $title-mini;
    }
  }
}

@media (min-width: $ipad) {
  .header {
    height: 120px;

    &__title {
      font-size: $title-small;
      line-height: 42px;
    }
  }
}

@media (min-width: 800px) {
  .content {
    margin-bottom: 0px;
  }
}

@media (max-height: $height-mobile-horizontal) {
  .header {
    padding: 10px;
    height: 100px;

    &__title {
      line-height: 24px;
    }
  }
}
</style>