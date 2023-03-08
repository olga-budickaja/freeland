<template>
  <div class="navbar">
    <div class="navbar__container">
      <Logo />
      <Menu />
      <div class="navbar__right">
        <MenuRight />
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "@/components/menu/MenuNav.vue";
import MenuRight from "@/components/menu-right/MenuRight.vue";
import Logo from "@/components/logo/Logo.vue";

export default {
  name: 'navbar',
  components: { Logo, MenuRight, Menu },
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  position: fixed;
  width: 100%;
  padding: 0 60px;
  z-index: 10;
  background: rgba(2, 11, 38, 1);
  &__container {
    display: flex;
    gap: 20px;
    padding: 13px 0;
    width: 100%;
    margin: 0 auto;
    border-bottom: 1px solid var(--background-color1);
    justify-content: space-between;
    align-items: center;
  }
}

@media only screen and (max-width: 1024px) {
 .navbar {
   padding: 0 20px;
   &__right {
     display: none;
   }
 }
}
</style>