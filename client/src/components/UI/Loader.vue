<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  inheritAttrs: false
})
</script>

<script setup lang="ts"></script>

<template>
  <div class="lds-dual-ring" v-bind="$attrs"></div>
</template>

<style scoped lang="scss">
.lds-dual-ring:after {
  content: " ";
  display: block;
  animation: lds-dual-ring 1.2s linear infinite;
  border-radius: 50%;
  border: 2px solid #fff;
  border-color: #fff transparent #fff transparent;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>