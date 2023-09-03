<script setup lang="ts">
import { toRefs, ref, watch, computed } from "vue";
import { InputApp, ButtonApp, Loader } from "../components/UI";
import { useEvent } from "../hooks/useEvent";

interface FormLoginProps {
  fetch: () => Promise<void>;
  loading: boolean;
  login: string;
  password: string;
}

const props = defineProps<FormLoginProps>();
const emit = defineEmits<{
  (e: "update:login", value: string): void;
  (e: "update:password", value: string): void;
}>();

const { fetch } = props;
const { loading, login, password } = toRefs(props);
const isDisabled = ref(true);

useEvent(document.body, "keydown", (e: Event) => {
  if (
    (e as KeyboardEvent).code === "Enter" &&
    password.value &&
    login.value &&
    isDisabled.value === false
  ) {
    fetch();
  }
});

const loginValue = computed({
  get: () => login.value,
  set: (value: string) => emit("update:login", value),
});

const passwordValue = computed({
  get: () => password.value,
  set: (value: string) => emit("update:password", value),
});

watch([login, password], () => {
  if (login.value && password.value) {
    isDisabled.value = false;
    return;
  } else {
    isDisabled.value = true;
  }
});
</script>

<template>
  <form autocomplete="off" class="form center" @submit.prevent="">
    <label class="form__row">
      <span>Логин:</span>
      <div class="form__input-wrapper">
        <a-input placeholder="Логин..." v-model:value="loginValue" autofocus />
      </div>
    </label>
    <label class="form__row">
      <span>Пароль:</span>
      <div class="form__input-wrapper">
        <a-input-password
          v-model:value="passwordValue"
          placeholder="Пароль..."
        />
      </div>
    </label>
    <ButtonApp
      :disabled="isDisabled || loading"
      class="form__btn center"
      type="submit"
      @click="fetch"
    >
      <template v-if="!loading">Войти</template>
      <Loader v-else class="loader" />
    </ButtonApp>
  </form>
</template>

<style scoped lang="scss">
@import "@/style/var.scss";

.form {
  flex-direction: column;
  justify-content: flex-start;
  gap: $gap-normal;

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 500px;

    & span {
      font-size: $text-normal;
    }
  }

  &__btn {
    align-self: flex-end;
    width: 80px;
    transition: background-color 0.3s;
    border-radius: $radius-small;
    background-color: $btn-formlogin-bg;
    color: $btn-formlogin-color;

    &:hover:not(:disabled),
    &:focus:not(:disabled) {
      transition: background-color 0.3s;
      background-color: $btn-formlogin-hover-bg;
    }

    &:disabled {
      background-color: $btn-formlogin-disable-bg;
    }
  }

  &__input-wrapper {
    width: 430px;
  }
}

.loader::after {
  width: 15px;
  height: 15px;
  margin: 1px;
  border-width: 2px;
}

@media (max-width: $mobile) {
  .form {
    &__input-wrapper {
      width: 250px;
    }

    &__row {
      width: 350px;
    }
  }
}
</style>