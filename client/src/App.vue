<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#1c8d2b',
      },
    }"
  >
    <router-view />
  </a-config-provider>
</template>