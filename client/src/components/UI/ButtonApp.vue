<script lang="ts">
import { defineComponent } from "vue-demi";

export default defineComponent({
  inheritAttrs: false,
});
</script>

<template>
  <button class="btn" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
@import '@/style/var.scss';
.btn {
  cursor: pointer;
  padding: 10px 15px;
  font-size: $text-normal;
}
</style>