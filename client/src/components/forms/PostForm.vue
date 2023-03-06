<template>
  <form class="form" @submit.prevent>
    <div class="title title-fz20 form__title">Create post</div>
    <input-form
        id="title"
        type="text"
        label="title"
        v-model.trim="post.title"
    >
      <template v-slot:label>Title</template>
    </input-form>
    <input-form
        id="description"
        type="text"
        label="description"
        v-model.trim="post.desc"
    >
      <template v-slot:label>Description</template>
    </input-form>
    <main-button class="form__button" @click="createPost">
      <template v-slot:text>Create</template>
      <template v-slot:icon>add_circle</template>
    </main-button>
  </form>
</template>

<script>

import MainButton from "@/components/UI/MainButton.vue";
import InputForm from "@/components/UI/InputForm.vue";

export default {
  components: { InputForm, MainButton },
  data() {
    return {
      post: {
        title: '',
        desc: ''
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit('create', this.post)
      this.post = {
        name: '',
        desc: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  &__button {
    margin: 60px auto 0 auto;
  }
}
</style>