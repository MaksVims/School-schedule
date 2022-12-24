<script lang="ts" setup>
import { computed } from '@vue/reactivity';
import { toRefs, ref } from 'vue'

interface CheckboxAppProps {
  modelValue: boolean,
  classes?: string
}

const props = defineProps<CheckboxAppProps>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const { modelValue } = toRefs(props)
const value = computed({
  get() {
    return modelValue.value
  },
  set(value: boolean) {
    emit('update:modelValue', !value)
  }
})

const checkboxRef = ref<null | HTMLInputElement>(null)
const clickBoxHandler = () => {
  if (checkboxRef.value) {
    checkboxRef.value.click()
  }
}

</script>

<template>
  <label class="container" @click="clickBoxHandler">
    <span>
      <slot></slot>
    </span>
    <input type="checkbox" v-model="value" class="hidden checkbox" ref="checkboxRef" />
    <div class="box">
      <span></span>
    </div>
  </label>
</template>

<style lang="scss" scoped>
@import '@/style/var.scss';

.container {
  display: flex;
  align-items: center;
  gap: $gap-normal;
  cursor: pointer;
}

.box {
  width: 25px;
  height: 25px;
  cursor: pointer;
  border: 1px solid black;
}

.box {
  position: relative;
}

.checkbox {
  &+.box {
    & span {
      display: block;
      position: absolute;
      left: 50%;
      top: 50%;
      display: block;
      width: 70%;
      height: 70%;
      transform: translate(-52%, -52%);
      background-color: $darkblue;
      transition: opacity .3s;
      opacity: 0;
    }
  }

  &:checked+.box {
    & span {
      transition: opacity .3s;
      opacity: 1;
    }
  }
}
</style>