<script setup lang="ts">
import { toRefs } from "vue";
import { ButtonApp } from "./UI";

interface ListProps {
  items: string[];
  handleClick: (value: string) => void;
}

const props = defineProps<ListProps>();
const { handleClick } = props;
const { items } = toRefs(props);
</script>

<template>
  <div class="wrapper center">
    <div class="list" v-if="items.length">
      <ButtonApp
        class="list__btn center"
        v-for="item in items"
        :key="item"
        @pointerdown="() => handleClick(item)"
      >
        {{ item }}
      </ButtonApp>
    </div>
    <h2 v-else>Нет данных</h2>
  </div>
</template>

<style scoped lang="scss">
@import "@/style/var.scss";

.wrapper {
  width: 100%;
}

.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  gap: $gap-normal;
  row-gap: 30px;

  &__btn {
    flex-grow: 0;
    width: 90px;
    transition: border 0.1s;
    padding: 20px;
    border: 2px solid $btn-select-popup-border;
    font-size: $text-veryBig;

    &:hover,
    &:active,
    &:focus {
      transition: border 0.1s;
      border: 2px solid $btn-select-popup-state-border;
    }
  }
}
</style>