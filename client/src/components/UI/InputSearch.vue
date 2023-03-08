<template>
  <div class="search">
    <input
        :value="modelValue"
        @input="updateInput"
        placeholder="Search..."
        class="search__input"
    />
    <main-flat-button>
      <template v-slot:icon>
        <i class="material-icons">search</i>
      </template>
    </main-flat-button>
  </div>
</template>

<script>
import MainFlatButton from "@/components/UI/MainFlatButton.vue";

export default {
  name: 'input-search',
  components: { MainFlatButton },
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
}
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 0 20px;

  &__input {
    border: none !important;
    height: 30px !important;

    &::placeholder {
      font-weight: 100;
      color: #767b88;
      font-style: italic;
    }
  }
}
</style>