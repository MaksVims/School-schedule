<template>
  <div>
    <span class="success">
      <slot></slot>
    </span>
  </div>
</template>

<style scoped lang="scss">
@import '@/style/var.scss';

.success {
  font-size: $text-small;
  color: $text-success-color;
}
</style>