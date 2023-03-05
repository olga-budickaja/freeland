<template>
  <form
      @submit.prevent="submitMinMax"
      class="formMinMax"
  >
    <span class="category__filters-title">Budget:</span>
    <input-form
        id="min"
        label="min"
        v-model.trim="modelMin"
        type="number"
        class="validate formMinMax__input"
    >
      <template class="formMinMax__label" v-slot:label>Min</template>
    </input-form>
    <div class="form__error" v-if="numError">Please enter a valid value for min.</div>
    <input-form
        id="max"
        label="max"
        v-model.trim="modelMax"
        type="number"
        class="validate formMinMax__input"
    >
      <template class="formMinMax__label" v-slot:label>Max</template>
    </input-form>
    <div class="form__error" v-if="numError">Please enter a valid value for max.</div>
    <button
        class="formMinMax__button waves-effect waves-light"
        type="submit"
    >
      Apply
    </button>
  </form>
</template>

<script>
import InputForm from "@/components/UI/InputForm.vue";
import MainButton from "@/components/UI/MainButton.vue";

export default {
  name: 'form-min-max',
  components: { MainButton, InputForm },
  props: {
    min: {
      type: String
    },
    max: {
      type: String
    }
  },
  data() {
    return {
      modelMax: '',
      modelMin: '',
      numError: '',
      isValidMax: true
    }
  },
  methods: {
    validateMax() {
      let isValid = true

      if (this.modelMax === '') {
        this.isValidMax = false;
        return;
      }

      if (this.modelMin === '') {
        this.isValidMax = false;
        return;
      }

      const num = parseFloat(this.modelMax);
      const numMin = parseFloat(this.modelMin);

      if (isNaN(num) || num < 0 || num > 10000) {
        this.isValidMax = false;
        return;
      }

      if (isNaN(numMin) || numMin < 0 || numMin > 10000) {
        this.isValidMax = false;
        return;
      }

      this.isValidMax = true;

      return isValid;
    },
    submitMinMax() {
      if (this.validateMax()) {
        this.$emit('update:min', this.modelMin);
        this.$emit('update:max', this.modelMax);
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.formMinMax {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  &__input {
    max-width: 70px;
  }
  &__button {
    background: transparent;
    height: fit-content;
    text-transform: uppercase;
    padding: 10px 20px;
    border: 1px solid white;
    border-radius: 40px;
  }
}

</style>