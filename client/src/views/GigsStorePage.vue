<template>
  <div class="category container">
    <dialog-modal v-model:show="dialogVisible">
      <PostForm
          @create="createGig"
      />
    </dialog-modal>
    <div class="category__title">
      <h1 class="title-fz48 title">All</h1>
      <main-button @click="showDialog">
        <template v-slot:text>Create gig</template>
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
            :model-value="selectedSort"
            @update:model-value="setSelectedSort"
            :options="sortOptions"
        />
      </div>
    </div>
    <GigList
        v-if="!isGigsLoading"
        :gigs="gigs"
        @remove="removePost"
    />
    <loader-element v-else />
    <div
        v-if="this.page < this.totalPages"
        v-intersection="loadMoreGigs"
        class="observer"
    ></div>
  </div>
</template>

<script>
import PostForm from "@/components/forms/PostForm.vue";
import PostList from "@/components/gigs/GigList.vue";
import DialogModal from "@/components/UI/DialogModal.vue";
import MainButton from "@/components/UI/MainButton.vue";
import LoaderElement from "@/components/UI/LoaderElement.vue";
import SelectForm from "@/components/UI/SelectForm.vue";
import FormMinMax from "@/components/forms/FormMinMax.vue";
import RoundButtonSmall from "@/components/UI/RoundButtonSmall.vue";
import Pagination from "@/components/pagination/Pagination.vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import GigList from "@/components/gigs/GigList.vue";
export default {
  name: 'gigs-page',
  components: {
    GigList,
    Pagination,
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
      location: {},
      dialogVisible: false
    }
  },
  methods: {
    ...mapMutations({
        setPage: "gig/setPage",
      setUrl: "gig/setUrl",
      setSelectedSort: "gig/setSelectedSort",
      setLimit: "gig/setLimit",
      setMin: "gig/setMin",
      setMax: "gig/setMax"
    }),
    ...mapActions({
      loadMoreGigs: "gig/loadMoreGigs",
      fetchGigs: "gig/fetchGigs"
    }),
    createGig(gig) {
      this.gigs.push(gig);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.gigs = this.gigs.filter(p => p._id !== post._id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    handleDelete() {
      this.min = '';
      this.max = '';
      location.reload();
    },
  },
  computed: {
    ...mapState({
      gigs: state => state.gig.gigs,
      min: state => state.gig.min,
      max: state => state.gig.max,
      isGigsLoading: state => state.gig.isGigsLoading,
      selectedSort: state => state.gig.selectedSort,
      searchQuery: state => state.gig.searchQuery,
      url: state => state.gig.url,
      page: state => state.gig.page,
      limit: state => state.gig.limit,
      totalPages: state => state.gig.totalPages,
      sortOptions: state => state.gig.sortOptions
    }),
    ...mapGetters({

    }),
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
    },
    page() {
      this.fetchGigs();
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
  &__pages {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 40px 0;
  }
}
.observer {
  height: 60px;
}
</style>