<template>
  <transition name="fade">
    <div v-if="show === true"  class="dropdown">
      <slot></slot>
    </div>
  </transition>

</template>

<script>
export default {
  name: 'drop-element',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style lang="scss" scoped>
.dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  padding: 20px;
  background: var(--background-color1);
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%), 0 1px 5px 0 rgb(0 0 0 / 20%);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>