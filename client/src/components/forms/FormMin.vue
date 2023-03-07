<template>
  <input
      id="min"
      v-model.trim="modelMin"
      @input="this.$emit('update:modelValue', this.modelMin)"
      type="text"
      class="validate formMin__input"
      placeholder="Min"
  />
</template>

<script>
import InputForm from "@/components/UI/InputForm.vue";

export default {
  components: { InputForm },
  props: {
    modelValue: {
      type: String
    }
  },
  data() {
    return {
      modelMin: ''
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