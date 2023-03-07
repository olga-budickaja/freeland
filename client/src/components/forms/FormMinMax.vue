<template>
  <form @submit.prevent="submitMinMax" class="formMinMax">
    <span class="category__filters-title">Budget:</span>
    <input
        id="min"
        :value="modelMin"
        @input="modelMin = $event.target.value"
        type="number"
        class="validate formMinMax__input"
        placeholder="Min"
    />
    <div class="form__error" v-if="numError">
      Please enter a valid value for min.
    </div>
    <input
        id="max"
        :value="modelMax"
        @input="modelMax = $event.target.value"
        type="number"
        class="validate formMinMax__input"
        placeholder="Max"
    />
    <div class="form__error" v-if="numError">
      Please enter a valid value for max.
    </div>
    <button class="formMinMax__button waves-effect waves-light" type="submit">
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
    modelValue: {
      type: Object,
      default: () => ({ min: null, max: null }),
    },
  },
  data() {
    return {
      modelMax: this.modelValue.max,
      modelMin: this.modelValue.min,
      numError: "",
      isValidMax: true,
    }
  },
  methods: {
    validateMax() {
      let isValid = true

      if (this.modelMax === '' || this.modelMin === '') {
        this.numError = "Please enter a valid value for min and max.";
        isValid = false;
      } else {
        const num = parseFloat(this.modelMax);
        const numMin = parseFloat(this.modelMin);

        if (isNaN(num) || num < 0 || num > 10000 || isNaN(numMin) || numMin < 0 || numMin > 10000) {
          this.numError = "Please enter a valid value for min and max.";
          isValid = false;
        } else {
          this.numError = "";
        }
      }

      return isValid;
    },
    submitMinMax() {
      if (this.validateMax()) {
        this.$emit("update:modelValue", {
          min: this.modelMin,
          max: this.modelMax,
        });
      }
    },
  },
  watch: {
    modelMin(newValue) {
      this.modelMin = newValue;
    },
    modelMax(newValue) {
      this.modelMax = newValue;
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