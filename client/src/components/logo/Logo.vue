<template>
  <div class="logo  waves-effect waves-light">
    <div class="logo__circle logo__animate">
      <i class="material-icons">code</i>
    </div>
    <router-link to="/">
      <div class="logo__title title title-fz20">
        Free<span class="logo__accent logo__animate title title-fz20">Land</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'logo',
}
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 40px;
  gap: 10px;
  &__circle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    object-fit: cover;
    background: var(--color-submit3);

  }
  &__link {
    display: block;
    height: fit-content;
  }
  &__accent {
    color: var(--color-submit3)
  }
  &__animate {
    animation: rotateHue 2s alternate infinite;
  }
}
@keyframes rotateHue {
  to {
    filter: hue-rotate(1turn);
  }
}
</style>