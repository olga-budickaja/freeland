<template>
  <li class="item waves-effect waves-light">
    <router-link class="item__link" :to="item.link">
      {{ item.name }}
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'menu-item',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  padding: 5px 10px;
  border-radius: 20px;
  &__link {
    font-weight: 200;
  }
}
</style>