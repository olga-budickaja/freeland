<template>
  <button
      class="button  waves-effect waves-light"
  >
    <slot name="text"></slot>
    <i class="material-icons post__stars-icon button__icon-icon">
      <slot name="icon"></slot>
    </i>
  </button>
</template>

<script>
export default {
  name: 'main-flat-button'
}
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  box-shadow: 4px 27px 51px rgba(242, 183, 5, 0.35);
  min-width: 40px;
  height: 40px;
  border-radius: 100%;
  text-transform: uppercase;
  transition: all 1.5s ease-out;
  cursor: pointer;
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    background: var(--color-accent);
  }
}
</style>