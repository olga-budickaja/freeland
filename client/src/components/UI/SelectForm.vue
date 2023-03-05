<template>
  <div>
    <select
        :v-model="modelValue"
        class="browser-default select"
        @change="changeOption"
    >
      <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          class="select__option"
      >
        {{ option.name }}
      </option>
    </select>
  </div>

</template>

<script>
export default {
  name: 'select-form',
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  width: fit-content;
  background: transparent;
  border: none;
}
</style>