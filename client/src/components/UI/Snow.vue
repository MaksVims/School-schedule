<script lang="ts" setup></script>

<template>
  <div class="container">
    <div v-for="n in 50" class="snowflake"></div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0;
  height: 100%;
  overflow: hidden;
  margin: 0;
  background: transparent;
}

.snowflake {
  --size: 1vw;
  width: var(--size);
  height: var(--size);
  background: white;
  border-radius: 50%;
  position: absolute;
  top: -5vh;
}

@keyframes snowfall {
  0% {
    transform: translate3d(var(--left-ini), 0, 0);
  }

  100% {
    transform: translate3d(var(--left-end), 80vh, 0);
  }
}

@for $i from 1 through 50 {
  .snowflake:nth-child(#{$i}) {
    --size: #{random(5) * 0.2}vw;
    --left-ini: #{random(20) - 10}vw;
    --left-end: #{random(20) - 10}vw;
    left: #{random(100)}vw;
    animation: snowfall #{5 + random(10)}s linear infinite;
    animation-delay: -#{random(10)}s;
  }
}

.snowflake:nth-child(6n) {
  filter: blur(1px);
}
</style>