<template>
    <ul class="menu">
      <MenuItem
          v-for="item in items"
          :key="item.id"
          :item="item"
      />
    </ul>
  <div class="menu__mobile waves-effect waves-light" @click="isMenuOpen = !isMenuOpen">
    <i v-if="!isMenuOpen" class="material-icons post__footer-icon">menu</i>
    <i v-else class="material-icons post__footer-icon">close</i>
  </div>
  <div class="menu__wrapp" :class="{ open: isMenuOpen }">
    <MenuRight class="menu__wrapp-options"/>
    <div class="menu__wrapp-menu">
      <ul class="menu__wrapp-list">
        <MenuItem
            v-for="item in items"
            :key="item.id"
            :item="item"
        />
      </ul>
      <MenuIcon />
    </div>
  </div>

</template>

<script>
import MenuRight from "@/components/menu-right/MenuRight.vue";
import MenuItem from "@/components/menu/MenuItem.vue";
import MenuIcon from "@/components/menu-icon/MenuIcon.vue";

export default {
  name: 'menu-nav',
  components: { MenuIcon, MenuItem, MenuRight },
  data() {
    return {
      items: [
        {id: 1, name: 'Home', link: '/'},
        {id: 2, name: 'Categories', link: '/categories'},
      ],
      isMenuOpen: false,
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  text-transform: uppercase;
  &__mobile {
    display: none;
    align-items: center;
    justify-content: center;
    padding: 6px 5px 4px 5px;
    border-radius: 100%;
    cursor: pointer;
  }
  &__wrapp {
    position: fixed;
    top: 0;
    left: -100%;
    width: 300px;
    height: 100vh;
    background: var(--background-color);
    display: flex;
    flex-direction: column;
    padding: 40px;
    transition: all 1s ease;
    &-options {
      margin-top: 77px;
    }
    &-list {
      display: flex;
      margin: 50px 0;
      text-transform: uppercase;
      flex-direction: column;
      gap: 20px;
    }
  }
  &__wrapp.open {
    left: 0;
    &-options {
      display: flex;
    }
  }
}

body.active + .menu__wrapp {
  left: -300px;
}

@media only screen and (max-width: 992px) {
  .menu {
    display: none;
    &__mobile {
      display: flex;
    }
  }
}
</style>