<template>
  <div class="iconMenu">
    <div class="iconMenu__item  waves-effect waves-light">
      <font-awesome-icon icon="fa-brands fa-telegram" class="iconMenu-icon iconAwesome" size="2xl" />
    </div>
    <div class="iconMenu__item  waves-effect waves-light">
      <font-awesome-icon icon="fa-brands fa-linkedin" class="iconMenu-icon iconAwesome" size="2xl" />
    </div>
    <div class="iconMenu__item  waves-effect waves-light">
      <font-awesome-icon icon="fa-brands fa-github" class="iconMenu-icon iconAwesome" size="2xl" />
    </div>
    <div class="iconMenu__item  waves-effect waves-light">
      <font-awesome-icon icon="fa-brands fa-square-instagram" class="iconMenu-icon iconAwesome" size="2xl"  />
    </div>




  </div>
</template>

<script>


export default {
  name: 'menu-icon',
}
</script>

<style lang="scss">
.iconMenu {
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 40px;
  opacity: 0.5;
  &__item {
    display: flex;
    justify-content: center;
    width: fit-content;
    align-items: center;
    padding: 5px;
    border-radius: 100%;
    cursor: pointer;
  }
}
</style>