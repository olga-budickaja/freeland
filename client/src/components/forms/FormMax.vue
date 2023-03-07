<template>
  <input
      id="max"
      v-model.trim="modelMax"
      @input="this.$emit('update:modelValue', this.modelMax)"
      type="number"
      class="validate formMin__input"
      placeholder="Max"
  />
</template>

<script>
import InputForm from "@/components/UI/InputForm.vue";

export default {
  components: { InputForm },
  props: {
    modelValue: {
      type: String,
    }
  },
  data() {
    return {
      modelMax: ''
    }
  },
}
</script>

<style lang="scss" scoped>
.formMin {
  &__input {
    max-width: 70px;
  }
}
</style>