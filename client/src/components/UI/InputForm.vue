<template>
  <div class="input-field">
    <input
        :value="modelValue"
        @input="updateInput"
        :id="id"
        :type="type"
        class="validate form__input"
    >
    <label :for="label"><slot name="label"></slot></label>
    <slot name="icon"></slot>
  </div>
</template>

<script>
export default {
  name: 'input-form',
  props: {
    modelValue: [String, Number],
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>