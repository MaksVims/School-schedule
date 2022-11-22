<template>
  <div>
    <span class="error">
      <slot></slot>
    </span>
  </div>
</template>

<style scoped lang="scss">
@import '@/style/var.scss';

.error {
  font-size: $text-small;
  color: $text-error-color;
}
</style>