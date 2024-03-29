<script setup lang="ts">
import { onMounted, ref, toRefs } from "vue";
import { ClassService, DateService } from "../api";
import { SelectMenu, Schedule, Clock } from "../components";
import { Loader, Snow } from "../components/UI";
import { useFetch, useTitle, useEvent } from "../hooks";
import { useClassStore, useAppStore } from "../store";
import { getFormatDate, getFormatDateHourAndMinute } from "../helpers";

const { setClasses } = useClassStore();
const { setLastUpdateDate } = useAppStore();
const { lastUpdateDate } = toRefs(useAppStore());
const homeRef = ref<null | HTMLDivElement>(null);

useTitle();

// Отслеживаем изменение окна и добавляем отступ при необходимости
useEvent(window, "resize", (e: Event) => {
  const widthContent = Number(document.documentElement.clientWidth);
  const diff = window.innerWidth - widthContent;

  if (diff && homeRef.value && widthContent > 1217) {
    homeRef.value.style.paddingRight = diff + "px";
  } else if (homeRef.value) {
    homeRef.value.style.paddingRight = "0px";
  }
});

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

const subscribeUpdatedDateLastUpdate = async () => {
  try {
    const dateLastUpdate = await DateService.subscribeLastUpdateDate();
    setLastUpdateDate(dateLastUpdate);
    subscribeUpdatedDateLastUpdate();
  } catch (e) {
    setTimeout(() => {
      subscribeUpdatedDateLastUpdate();
    }, 500);
  }
};

// Загружаем данные и подписываемся на автообновление
const { fetch: fetchData, loading } = useFetch(async () => {
  const fetchData = await ClassService.getAll();
  setClasses(fetchData);
  subscribeUpdateData();
});

// Получаем дату последнего обновления и подписываемся на автообновление
const { fetch: fetchLastUpdateDate } = useFetch(async () => {
  const fetchDate = await DateService.getLastUpdateDate();
  setLastUpdateDate(fetchDate);
  subscribeUpdatedDateLastUpdate();
});

onMounted(async () => {
  fetchLastUpdateDate();
  fetchData();
});
</script>

<template>
  <div v-if="!loading" class="home" ref="homeRef">
    <a-space direction="vertical" class="space" :size="0">
      <a-layout style="height: 100vh">
        <a-layout-header class="header">
          <!-- <Snow /> -->
          <div class="header__clock">
            <Clock class="clock" />
            <div
              class="header__lastUpdateDate lastUpdateDate"
              v-if="lastUpdateDate"
            >
              <p>Обновлено:</p>
              <p class="date-update">
                {{ getFormatDate(new Date(lastUpdateDate.lastUpdate)) }}
                {{
                  getFormatDateHourAndMinute(
                    new Date(lastUpdateDate.lastUpdate)
                  )
                }}
              </p>
            </div>
          </div>
          <a-space style="width: 100%" direction="vertical" :size="35">
            <a-row align="center">
              <a-col :span="24">
                <h1 class="title header__title">
                  Расписание уроков школы № 116
                </h1>
              </a-col>
            </a-row>
            <a-row align="center" :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
              <a-col :span="24">
                <SelectMenu />
              </a-col>
            </a-row>
          </a-space>
        </a-layout-header>
        <a-layout-content class="content">
          <Schedule />
        </a-layout-content>
      </a-layout>
    </a-space>
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

.content {
  height: 80%;
  margin-bottom: 15px;
}

.home {
  height: 100vh;
}

.header {
  width: 100%;
  height: 230px;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: $gap-small;
  text-align: center;
  background: $gradient-main;

  &__clock {
    position: absolute;
    width: 230px;
    top: 30px;
    right: 30px;
  }

  &__title {
    font-size: $title-big;
    color: rgb(5, 5, 5);
    margin-top: 15px;
    margin-bottom: 0;
  }

  &__lastUpdateDate {
    position: absolute;
    top: 130px;
    font-size: $text-small;
    text-align: center;
    color: #fff;
    width: 100%;

    p {
      line-height: 10px;
    }
  }
}

.date-update {
  color: #fff;
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

@media (max-width: $desktop-big) {
  .header__clock {
    width: 220px;
  }
}

@media (max-width: $desktop) {
  .header {
    &__title {
      font-size: $title-medium;
    }

    & .clock {
      font-size: $title-normal;
    }

    &__clock {
      width: 200px;
    }
  }
}

@media (max-width: $tabletop) {
  .home {
    width: 1200px;
    overflow: auto;
  }
}

@media (min-width: $tabletop) {
  .content {
    margin-bottom: 0;
  }
}


</style>