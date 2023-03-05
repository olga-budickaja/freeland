<template>
  <button
      class="button"
  >
    <slot name="text"></slot>
    <i class="material-icons post__stars-icon button__icon-icon">
      <slot name="icon"></slot>
    </i>
  </button>
</template>

<script>
export default {
  name: 'main-button'
}
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  display: flex;
  width: fit-content;
  flex-direction: row;
  align-items: center;
  padding: 10px 30px;
  gap: 30px;
  border: none;
  background: linear-gradient(180deg, var(--color-accent3) 0%, var(--color-accent1) 100%), linear-gradient(180deg, var(--color-accent4) 0%, var(--color-accent) 100%);
  box-shadow: 4px 27px 51px rgba(242, 183, 5, 0.35);
  border-radius: 50px;
  font-weight: 500;
  text-transform: uppercase;
  transition: all 1.5s ease-out;
  cursor: pointer;
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    width: 40px;
    height: 40px;
    background: var(--color-accent);
  }
  &:hover, &:focus {
    background: linear-gradient(-180deg, var(--color-accent3) 30%, var(--color-accent1) 70%), linear-gradient(-180deg, var(--color-accent4) 30%, var(--color-accent) 70%);
    box-shadow: 4px 27px 51px rgba(242, 183, 5, 0.1);
  }
}
</style>