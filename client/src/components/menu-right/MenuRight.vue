<template>
  <div class="menuRight">
    <div class="menuRight__lang">
      <div class="menuRight__lang-item">en</div>
       /
      <div class="menuRight__lang-item">uk</div>
    </div>
    <div class="menuRight__login">
      <div class="menuRight__login-register  waves-effect waves-light">
        <router-link v-if="!user" to="/register">Log in</router-link>
        <div
            v-else
            @click="showDrop"
            class="menuRight__drop"
        >
          {{ user.username }}
        </div>
      </div>
      <drop-element v-model:show="dropVisible">
        <DropMenu/>
      </drop-element>
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";
import DropMenu from "@/components/drop-menu/DropMenu.vue";
import DropElement from "@/components/UI/DropElement.vue";

export default {
  name: 'menu-right',
  components: { DropElement, DropMenu },
  data() {
    return {
      auth: false,
      dropVisible: false,
    }
  },
  computed: {
    ...mapState({
      user: state => state.authModule.credentials.user
    }),
  },
  methods: {
    showDrop() {
      this.dropVisible = !this.dropVisible;
    }
  }
}
</script>

<style lang="scss" scoped>
.menuRight {
  display: flex;
  align-items: center;
  gap: 30px;
  &__lang {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
    gap: 5px;
    &-item {
      font-weight: 200;
    }
  }
  &__login {
    position: relative;
    display: flex;
    flex: 2;
    &-register {
      border: 1px solid var(--text-color);
      border-radius: 20px;
      padding: 8px 20px;
      text-transform: uppercase;
      text-align: center;
      * {
        font-weight: 200;
      }
    }
    &-user {
      display: flex;
      gap: 20px;
      align-items: center;
      &-avatar {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 100%;
      }
      &-name {
        font-size: 16px;
        font-weight: 500;
      }
    }
  }
  &__drop {
    position: relative;
  }
}
</style>