<template>
  <div
      v-if="show === true"
      class="dialog"
      @click="hideDialog"
  >
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixin from "@/mixins/ToggleMixin";

export default {
  name: 'dialog-modal',
  mixins: [toggleMixin]
}
</script>

<style lang="scss" scoped>
.dialog {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.5);
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  overflow-y: auto;
  &__content {
    background: var(--background-color1);
    border-radius: 20px;
    padding: 5px;
    //min-width: 300px;
    width: 80%;
    min-height: 50px;
    box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%), 0 1px 5px 0 rgb(0 0 0 / 20%);
  }
}

@media only screen and (max-width: 720px) {
  .dialog {
    &__content {
      width: 90%;
    }
  }
}
</style>