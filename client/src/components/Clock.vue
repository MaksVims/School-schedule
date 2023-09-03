<script lang="ts" setup>
import moment from "moment";
import { onMounted, onUnmounted, ref } from "vue";

const time = ref(new Date());
const intervalId = ref<null | NodeJS.Timer>(null);

onMounted(() => {
  if (!intervalId.value) {
    intervalId.value = setInterval(() => {
      time.value = new Date();
    }, 1000);
  }
});

onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
});
</script>

<template>
  <div class="clock">
    <span class="clock__content">{{ moment(time).format("HH:mm:ss") }}</span>
  </div>
</template>

<style scoped lang="scss">
@import "@/style/var.scss";
.clock span {
  max-width: 250px;
  min-width: 190px;
  display: block;
  padding: 15px;
  border: 1px solid white;
  color: white;
  font-size: $text-xxl;
}

@media (max-width: 1600px) {
  .clock span {
    font-size: $text-veryBig;
  }
}

@media (min-width: 2000px) {
  .clock span {
    font-size: $text-overSize;
  }
}
</style>