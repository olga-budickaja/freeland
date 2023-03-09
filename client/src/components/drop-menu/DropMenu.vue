<template>
    <ul class="dropMenu">
      <li
          class="dropMenu__item waves-effect waves-light"
      >
        <router-link to="/">
          Update
        </router-link>
      </li>
      <li
          class="dropMenu__item waves-effect waves-light"
          @click="handleLogout"
      >
        Logout
      </li>
    </ul>
</template>

<script>
import DropElement from "@/components/UI/DropElement.vue";

export default {
  name: 'drop-menu',
  components: { DropElement },
  methods: {
    handleLogout() {
      this.$store.dispatch('authModule/onLogout').then(() => location.reload());
    }
  },
}
</script>

<style lang="scss" scoped>
.dropMenu {
  display: flex;
  flex-direction: column;
  gap: 10px;
  &__item {
    padding: 5px;
    border-radius: 5px;
  }
  * {
    text-transform: uppercase;
  }
}
</style>