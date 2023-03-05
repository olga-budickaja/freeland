<template>
  <div class="loader">
    <div class="loader__circles loader__circle1"></div>
    <div class="loader__circles loader__circle2"></div>
    <div class="loader__circles loader__circle3"></div>
  </div>
</template>

<script>
export default {
 name: 'loader-element'
}
</script>

<style lang="scss" scoped>
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  &__circles {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    animation: bounce 1s 0.7s linear infinite;
  }
  &__circle1 {
    background: var(--color-accent1);
  }
  &__circle2 {
    animation-delay: 0.2s;
    background: var(--color-accent1);
  }
  &__circle3 {
    animation-delay: 0.4s;
    background: var(--color-accent1);
  }
}

@keyframes bounce {
  0%,
  50%,
  100% {
      transform: scale(1);
      filter: blur(0px);
    }
  25% {
    transform: scale(0.6);
  }
  75% {
    transform: scale(1.4);
    background: var(--color-accent3);
  }
}
</style>