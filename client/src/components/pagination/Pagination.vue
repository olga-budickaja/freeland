<template>
  <div
      class="pagePagination waves-effect waves-light"
      :class="{
        'current-page': page === pageNumber
      }"
  >
      {{ pageNumber }}
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    page: {
      type: Number,
      required: true
    },
    pageNumber: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.pagePagination, .current-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 100%;
  font-weight: 400;
}
.pagePagination {
  border: 2px solid var(--background-color1);
}
.current-page {
  background: var(--color-accent);
  border: none;
  box-shadow: 4px 27px 51px rgba(242, 183, 5, 0.8);
}
</style>