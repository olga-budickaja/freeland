<template>
  <div v-if="dataCover" class="upload">
    <figure class="upload__figure">
      <img class="upload__img" :src="dataCover" alt="Preview upload">
    </figure>
  </div>
  <input
      type="file"
      @change="onChange($event)"
      :name="name"
      :id="id"
      accept="image/*"
  />
  <canvas id="imgCanvas" height="584" width="778" />
</template>

<script>
import { resizeImg } from "@/resize-img";

export default {
  name: 'upload-file',
  props: {
    modelValue: {
      type: Blob,
      default: null
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
  },
  data: () => ({
    dataCover: '',
  }),
  methods: {
    async onChange(event) {
      const file = event.target.files[0];
      const dataCover = URL.createObjectURL(file);
      const blob = await resizeImg.resizeImg(dataCover);
      this.$emit('update:modelValue', blob);
      this.dataCover = dataCover
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
  &__figure {
    margin: 0;
  }
  &__img {
    width: 100%;
    object-fit: cover;
    aspect-ratio: 4 / 3;
  }
}
</style>