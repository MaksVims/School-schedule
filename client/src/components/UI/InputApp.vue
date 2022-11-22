<script setup lang="ts">
import { onMounted, ref, toRefs, computed } from "vue";

interface InputProps {
  isFocus?: boolean;
  modelValue: string;
}

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const props = defineProps<InputProps>();
const { modelValue } = toRefs(props);
const inputRef = ref<HTMLInputElement | null>(null);

const value = computed({
  get() {
    return modelValue.value;
  },
  set(value: string) {
    emit("update:modelValue", value);
  },
});

onMounted(() => {
  if (props.isFocus) {
    inputRef.value?.focus();
  }
});
</script>


<template>
  <input type="text" class="input" ref="inputRef" v-model="value"/>
</template>

<style scoped lang="scss">
@import "@/style/var.scss";

.input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid $border-input;
  font-size: $text-normal;
}
</style>