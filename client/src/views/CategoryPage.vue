<template>
  <div class="category container">
    <dialog-modal v-model:show="dialogVisible">
      <PostForm
          @create="createPost"
      />
    </dialog-modal>
    <div class="category__title">
      <h1 class="title-fz48 title">All</h1>
      <main-button @click="showDialog">
        <template v-slot:text>Create post</template>
        <template v-slot:icon>add_circle</template>
      </main-button>
    </div>
    <div class="category__filters">
      <div class="category__filters-minmax">
        <FormMinMax
            v-model:min="min"
            v-model:max="max"
        />
        <round-button-small
            v-if="this.min.length || this.max.length"
            class="orange darken-3 post__delete"
            @click="handleDelete"
        >
          clear
        </round-button-small>
      </div>
      <div class="category__filters-sorts">
        <span class="category__filters-title">Sort by: </span>
        <SelectForm
            v-model="selectedSort"
            :options="sortOptions"
        />
      </div>
    </div>
    <PostList
        v-if="!isPostsLoading"
        :posts="posts"
        @remove="removePost"
    />
    <loader-element v-else />
  </div>
</template>

<script>
import PostForm from "@/components/forms/PostForm.vue";
import PostList from "@/components/posts/PostList.vue";
import DialogModal from "@/components/UI/DialogModal.vue";
import MainButton from "@/components/UI/MainButton.vue";
import { defaultAPIInstance } from "@/requestMethod";
import LoaderElement from "@/components/UI/LoaderElement.vue";
import SelectForm from "@/components/UI/SelectForm.vue";
import FormMinMax from "@/components/forms/FormMinMax.vue";
import RoundButtonSmall from "@/components/UI/RoundButtonSmall.vue";
export default {
  name: 'category-page',
  components: {
    RoundButtonSmall,
    FormMinMax,
    SelectForm,
    LoaderElement,
    MainButton,
    DialogModal,
    PostList,
    PostForm
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      min: '',
      max: '',
      sortOptions: [
        {value: 'createAt', name: 'Date Add'},
        {value: 'price', name: 'Best Selling'},
      ],
      location: {}
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p._id !== post._id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchGigs() {
      try {
        this.isPostsLoading = true;
        let url = `gigs?`;

        if (this.min.length) {
          url += `min=${this.min}&`;
        }

        if (this.max.length) {
          url += `max=${this.max}&`
        }

        const res = await defaultAPIInstance.get(`${url}&sort=${this.sortOptions}`);

        this.posts = res.data
      } catch (e) {
        this.$message('Something went wrong!');
      } finally {
        this.isPostsLoading = false;
      }
    },
    handleDelete() {
      this.min = '';
      this.max = '';
      location.reload();
    },
  },
  mounted() {
    this.location = window.location
    this.fetchGigs();
  },
  watch: {
    min: {
      handler() {
        this.fetchGigs();
      }
    },
    max: {
      handler() {
        this.fetchGigs();
      }
    },
    selectedSort: {
      handler() {
        this.fetchGigs();
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.category {
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    &-minmax {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 30px;
    }
    &-sorts {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
  }
}
</style>