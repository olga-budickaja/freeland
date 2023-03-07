<template>
  <button
      class="flatButton waves-effect waves-light"
      type="submit"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'flat-button-white'
}
</script>

<style lang="scss" scoped>
.flatButton {
  background: transparent;
  height: fit-content;
  text-transform: uppercase;
  padding: 10px 20px;
  border: 1px solid white;
  border-radius: 40px;
}
</style>