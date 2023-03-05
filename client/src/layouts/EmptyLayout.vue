<template>
  <div class="empty">
    <Navbar />
    <div class="empty__container">
      <div class="empty__menuIcon">
        <MenuIcon />
      </div>
      <div class="empty__content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import MenuIcon from "@/components/menu-icon/MenuIcon.vue";
import Navbar from "@/components/navbar/Navbar.vue";

export default {
  name: 'empty-layout',
  components: { Navbar, MenuIcon },
}
</script>

<style lang="scss" scoped>
.empty {
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
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
@media only screen and (max-width: 720px) {
  .empty {
    &__menuIcon {
      display: none;
    }
  }
}
</style>