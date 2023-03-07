<template>
  <div class="main">
      <Navbar />
      <div class="main__container">
        <div class="main__menuIcon">
          <MenuIcon />
        </div>
        <div class="main__content">
          <router-view/>
        </div>
      </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar/Navbar.vue";
import MenuIcon from "@/components/menu-icon/MenuIcon.vue";

export default {
  name: 'main-layout',
  components: { MenuIcon, Navbar },
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100vh;
  &__container {
    display: flex;
    height: calc(100vh - 77px);
    padding: 77px 0 0 0;
  }
  &__menuIcon {
    flex: 1;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    left: 60px;
  }
  &__content{
    flex: 11;
  }
}
@media only screen and (max-width: 1024px) {
  .main {
    &__menuIcon {
      display: none;
    }
  }
}
</style>