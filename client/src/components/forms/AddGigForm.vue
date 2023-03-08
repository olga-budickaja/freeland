<template>
  <form class="formAdd" @submit.prevent>
    <div class="title title-fz20 formAdd__title">Create gig</div>
    <div class="formAdd__wrapp">
      <div class="formAdd__left">
        <input-form
            id="title"
            type="text"
            name="title"
            label="title"
            v-model.trim="gig.title"
            class="formAdd__input validate"
        >
          <template v-slot:label>Title</template>
        </input-form>
        <div class="form__error" v-if="titleError">{{ titleError }}</div>

        <SelectForm
            v-model="catModel"
            :options="catOptions"
            v-model.trim="gig.catModel"
            name="cat"
        />
        <div class="formAdd__input-wrapp">
          <label class="formAdd__input-label" for="cover">Cover image 4x3</label>
          <input
              id="cover"
              type="file"
              name="cat"
          />
        </div>
        <div class="formAdd__input-wrapp">
          <label class="formAdd__input-label" for="images">Upload images</label>
          <input
              id="images"
              type="file"
              name="images"
          />
        </div>
        <div class="formAdd__input-wrapp">
          <label class="formAdd__input-label" for="desc">Description</label>
          <textarea
              id="desc"
              name="desc"
              v-model="gig.descModel"
              class="formAdd__textarea"
              placeholder="Brief descriptions to introduce your service to customers"
          />
        </div>

      </div>
      <div class="formAdd__right">
        <input-form
            id="shortTitle"
            type="text"
            label="Service Title (max length 50 symbols)"
            name="shortTitle"
            v-model.trim="gig.shortTitle"
            class="formAdd__input validate"
        >
          <template v-slot:label>Service Title (max length 50 symbols)</template>
        </input-form>
        <div class="formAdd__input-wrapp">
          <label class="formAdd__input-label" for="desc">Description</label>
          <textarea
              id="shortDesc"
              name="shortDesc"
              v-model="gig.shortDescModel"
              class="formAdd__textarea"
              placeholder="Short description of your service"
          />
        </div>
        <div class="form__error" v-if="shortDescError">{{ shortDescError }}</div>
        <input-form
            id="delivery"
            type="number"
            label="Delivery Time (e.g. 3 days)"
            name="delivery"
            v-model.trim="gig.deliveryModel"
            class="formAdd__input validate"
        >
          <template v-slot:label>Delivery Time (e.g. 3 days)</template>
        </input-form>
        <input-form
            id="revision"
            type="number"
            name="revision"
            label="Revision Number"
            v-model.trim="gig.revisionModel"
            class="formAdd__input validate"
        >
          <template v-slot:label>Revision Number</template>
        </input-form>
        <div class="formAdd__input-wrapp">
          <label class="formAdd__input-label" for="features">Add Features</label>
          <input-form
              id="features"
              type="text"
              name="features"
              label="e.g. page design"
              v-model.trim="gig.featuresModel"
              class="formAdd__input validate"
          >
            <template v-slot:label>e.g. page design</template>
          </input-form>
          <input-form
              id="features"
              type="text"
              name="features"
              label="e.g. file uploading"
              v-model.trim="gig.featuresModel"
              class="formAdd__input validate"
          >
            <template v-slot:label>e.g. file uploading</template>
          </input-form>
          <input-form
              id="features"
              type="text"
              name="features"
              label="e.g. setting up a domain"
              v-model.trim="gig.featuresModel"
              class="formAdd__input validate"
          >
            <template v-slot:label>e.g. setting up a domain</template>
          </input-form>
          <input-form
              id="features"
              type="text"
              name="features"
              v-model.trim="gig.featuresModel"
              label="e.g. hosting"
              class="formAdd__input validate"
          >
            <template v-slot:label>e.g. hosting</template>
          </input-form>
        </div>
      </div>
    </div>

    <main-button class="formAdd__button" @click="createPost">
      <template v-slot:text>Create</template>
      <template v-slot:icon>add_circle</template>
    </main-button>
  </form>
</template>

<script>

import MainButton from "@/components/UI/MainButton.vue";
import InputForm from "@/components/UI/InputForm.vue";
import { mapState } from "vuex";
import SelectForm from "@/components/UI/SelectForm.vue";

export default {
  components: { SelectForm, InputForm, MainButton },
  data() {
    return {
      gig: {
        title: '',
        desc: '',
        shortTitle: '',
        coverModel: '',
        imagesModel: '',
        descModel: '',
        deliveryModel: '',
        revisionModel: '',
        shortDescModel: '',
        featuresModel: '',
        catModel: ''
      },
      catModel: '',
      titleError: '',
      shortDescError: '',
      shortTitleError: '',
      isValid: false,
    }
  },
  methods: {
    validateForm() {
      this.isValid = true

      if (this.gig.title.length > 120) {
        this.titleError = 'Title cannot be more than 120 characters'
        this.isValid = false
      } else {
        this.titleError = ''
      }

      if (this.gig.shortTitle.length > 50) {
        this.shortTitleError = 'Short Title cannot be more than 50 characters'
        this.isValid = false
      } else {
        this.shortTitleError = ''
      }

      if (this.gig.shortDesc.length > 300) {
        this.shortDescError = 'Short Title cannot be more than 300 characters'
        this.isValid = false
      } else {
        this.shortDescError = ''
      }

      return this.isValid
    },
    createPost() {
      if (this.validateForm()) {
        this.$emit('create', this.gig)
        this.gig = {
          name: '',
          desc: ''
        }
      }

    }
  },
  computed: {
    ...mapState({
      catOptions: state => state.gig.catOptions
    }),
  }
}
</script>

<style lang="scss" scoped>
.formAdd {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 60px;
  &__title {
    text-align: center;
  }
  &__wrapp {
    display: grid;
    justify-content: space-between;
    gap: 60px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  &__left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 30px;
  }
  &__right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__input {
    width: 100%;
    &-wrapp {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    &-label {
      font-size: 15px;
    }
  }
  &__textarea {
    min-height: 150px;
    padding: 20px;
    border-radius: 8px;
    &::placeholder {
      color: #767b88;
    }
  }
  &__button {
    margin: 60px auto 0 auto;
  }
}
</style>