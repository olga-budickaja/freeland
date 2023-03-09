<template>
  <input type="file" @change="onChange($event)"/>
</template>

<script>
export default {
  name: 'upload-file',
  props: ['modelValue'],
  methods: {
    onChange(event) {
      this.$emit('update:modelValue', event.target.files[0]);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>