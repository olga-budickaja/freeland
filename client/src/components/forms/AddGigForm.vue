<template>
  <form
      class="formAdd"
      @submit.prevent="onSubmit"
      enctype="multipart/form-data"
  >
    <div class="title title-fz20 formAdd__title">Create gig</div>
    <div class="formAdd__wrapp">
      <div class="formAdd__left">
        <input-form
            id="title"
            type="text"
            name="title"
            label="title"
            v-model="gig.titleModel"
            class="formAdd__input validate"
        >
          <template v-slot:label>Title</template>
        </input-form>
        <div class="form__error" v-if="titleError">{{ titleError }}</div>

        <SelectForm
            :options="catOptions"
            v-model="gig.catModel"
            name="cat"
        />
        <div v-if="imgPrc > 0" class="formAdd__progress">
          <div class="progress">
            <div class="determinate" :style="`width: ${imgPrc}%`"></div>
          </div>
          <div class="formAdd__progress-prc">{{ imgPrc }}%</div>
        </div>

        <div v-else class="formAdd__input-wrapp">
          <label class="formAdd__input-label" for="cover">Cover image 4x3</label>
          <upload-file
            :id="cover"
            :model-value="gig.coverModel"
            @update:model-value="(val) => gig.coverModel = val"
            :name="cat"
          />
        </div>
        <div class="formAdd__input-wrapp">
          <label class="formAdd__input-label" for="images">Upload images</label>
          <upload-file
              :id="images"
              :model-value="gig.imagesModel"
              @update:model-value="(val) => gig.imagesModel = val"
              :name="images"
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
            name="shortTitle"
            label="shortTitle"
            v-model="gig.shortTitleModel"
            class="formAdd__input validate"
        >
          <template v-slot:label>Service Title (max length 50 symbols)</template>
        </input-form>
        <div class="form__error" v-if="shortTitleError">{{ shortTitleError }}</div>

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
            name="delivery"
            label="delivery"
            v-model="gig.deliveryModel"
            class="formAdd__input validate"
        >
          <template v-slot:label>Delivery Time (e.g. 3 days)</template>
        </input-form>

        <input-form
            id="revision"
            type="number"
            name="revision"
            label="revision"
            v-model="gig.revisionModel"
            class="formAdd__input validate"
        >
          <template v-slot:label>Revision Number</template>
        </input-form>

        <input-form
            id="price"
            type="number"
            name="price"
            label="price"
            v-model="gig.priceModel"
            class="formAdd__input validate"
        >
          <template v-slot:label>Price</template>
        </input-form>

        <div class="formAdd__input-wrapp">

          <label class="formAdd__input-label formAdd__input-features" for="features">Add Features</label>

          <input-form
              id="features"
              type="text"
              name="features"
              label="features"
              v-model="gig.featuresDesignModel"
              class="formAdd__input validate"
          >
            <template v-slot:label>e.g. page design</template>
          </input-form>

          <input-form
              id="features1"
              type="text"
              name="features1"
              label="features1"
              v-model="gig.featuresUploadingModel"
              class="formAdd__input validate"
          >
            <template v-slot:label>e.g. file uploading</template>
          </input-form>

          <input-form
              id="features2"
              type="text"
              name="features2"
              label="features2"
              v-model="gig.featuresSettingModel"
              class="formAdd__input validate"
          >
            <template v-slot:label>e.g. setting up a domain</template>
          </input-form>

          <input-form
              id="features3"
              type="text"
              name="features3"
              label="features3"
              v-model="gig.featuresHostingModel"
              class="formAdd__input validate"
          >
            <template v-slot:label>e.g. hosting</template>
          </input-form>

        </div>
      </div>
    </div>

    <main-button class="formAdd__button" type="submit">
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
import UploadFile from "@/components/forms/UploadFile.vue";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "@/fb";
import router from "@/router";

export default {
  components: { UploadFile, SelectForm, InputForm, MainButton },
  data() {
    return {
      gig: {
        titleModel: '',
        catModel: '',
        coverModel: null,
        imagesModel: null,
        descModel: '',
        shortTitleModel: '',
        shortDescModel: '',
        deliveryModel: '',
        revisionModel: '',
        priceModel: '',
        featuresDesignModel: '',
        featuresUploadingModel: '',
        featuresSettingModel: '',
        featuresHostingModel: '',
      },
      title: '',
      price: '',
      cat: '',
      cover: '',
      images: '',
      shortTitle: '',
      shortDesc: '',
      delivery: '',
      revision: '',
      features: [],
      titleError: '',
      shortDescError: '',
      shortTitleError: '',
      imgPrc: null,
      isValid: false,
    }
  },
  methods: {
    validateForm() {
      this.isValid = true

      if (this.gig.titleModel.length > 120) {
        this.titleError = 'Title cannot be more than 120 characters'
        this.isValid = false
      } else {
        this.titleError = ''
      }

      if (this.gig.shortTitleModel.length > 50) {
        this.shortTitleError = 'Short Title cannot be more than 50 characters'
        this.isValid = false
      } else {
        this.shortTitleError = ''
      }

      if (this.gig.shortDescModel.length > 300) {
        this.shortDescError = 'Short Title cannot be more than 300 characters'
        this.isValid = false
      } else {
        this.shortDescError = ''
      }

      return this.isValid
    },
    onSubmit() {
      if (this.validateForm() && this.user) {
        // this.$emit('create', this.gig);
        const fileName = `${new Date().getTime()}.jpg`;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, this.gig.coverModel);

        uploadTask.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              this.imgPrc = Math.round(progress)
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
                default:
                  break;
              }
            },
            (error) => {
              // Handle unsuccessful uploads
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                const data = {
                  title: this.gig.titleModel,
                  price: this.gig.priceModel,
                  cat: !this.gig.catModel ? 'design' : this.gig.catModel,
                  cover: downloadURL,
                  images: this.gig.imagesModel,
                  shortTitle: this.gig.shortTitleModel,
                  shortDesc: this.gig.shortDescModel,
                  delivery: this.gig.deliveryModel,
                  revision: this.gig.revisionModel,
                  features: [
                    this.gig.featuresDesignModel,
                    this.gig.featuresHostingModel,
                    this.gig.featuresUploadingModel,
                    this.gig.featuresSettingModel
                  ],
                }
                console.log(data)
                this.$store.dispatch('gig/uploadGig', data)
                    .then((res) => {
                        this.gig = {
                          titleModel: '',
                          catModel: '',
                          coverModel: '',
                          imagesModel: '',
                          descModel: '',
                          shortTitleModel: '',
                          shortDescModel: '',
                          deliveryModel: '',
                          revisionModel: '',
                          featuresModel: '',
                        }
                        router.push({ name: 'gigs' });
                        // setTimeout(() => {
                        //   location.reload();
                        // }, 2000);
                    }).catch((res) => {
                      this.$message(res?.data.message);
                    });
               });
            }
        );
      } else {
        console.log('Form is invalid')
      }

    }
  },
  computed: {
    ...mapState({
      catOptions: state => state.gig.catOptions,
      user: state => state.authModule.credentials.user,
    }),
  },
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
    gap: 30px;
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
      font-weight: 200;
    }
    &-features {
      margin-top: 30px;
      font-weight: 400;
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