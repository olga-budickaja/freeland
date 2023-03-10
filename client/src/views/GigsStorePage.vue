<template>
  <div class="category container">
    <dialog-modal v-model:show="dialogVisible">
      <AddGigForm
          @create="createGig"
      />
    </dialog-modal>
    <div class="category__title">
      <h1 class="title-fz48 title">All</h1>
      <main-button @click="$router.push('/add')">
        <template v-slot:text>Create gig</template>
        <template v-slot:icon>add_circle</template>
      </main-button>
    </div>
    <div class="category__filters">
      <div class="category__filters-minmax">
        <FormMinMax
            :model-value.min="{ min: null, max: null }"
            :model-value.max="{ min: null, max: null }"
            @update:model-value.min="setMin"
            @update:model-value.max="setMax"
        />
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
        :gigs="handleSearchQuery"
        @remove="removeGig"
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
import DialogModal from "@/components/UI/DialogModal.vue";
import MainButton from "@/components/UI/MainButton.vue";
import LoaderElement from "@/components/UI/LoaderElement.vue";
import SelectForm from "@/components/UI/SelectForm.vue";
import FormMinMax from "@/components/forms/FormMinMax.vue";
import RoundButtonSmall from "@/components/UI/RoundButtonSmall.vue";
import Pagination from "@/components/pagination/Pagination.vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import GigList from "@/components/gigs/GigList.vue";
import FlatButtonWhite from "@/components/UI/FlatButtonWhite.vue";
import AddGigForm from "@/components/forms/AddGigForm.vue";
import router from "@/router";
export default {
  name: 'gigs-page',
  components: {
    FlatButtonWhite,
    GigList,
    Pagination,
    RoundButtonSmall,
    FormMinMax,
    SelectForm,
    LoaderElement,
    MainButton,
    DialogModal,
    AddGigForm
  },
  data() {
    return {
      location: {},
      dialogVisible: false,
    }
  },
  methods: {
    router() {
      return router
    },
    ...mapMutations({
        setPage: "gig/setPage",
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
    removeGig(gig) {
      this.gigs = this.$store.commit('gig/setGigs', this.gigs.filter(p => p._id !== gig._id)) ;
    },
    showDialog() {
      this.dialogVisible = true;
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
      sortOptions: state => state.gig.sortOptions,
      user: state => state.authModule.credentials.user,
    }),
    ...mapGetters({
      handleSearchQuery: "gig/handleSearchQuery"
    }),
  },
  mounted() {
    this.location = window.location
    this.fetchGigs();
  },
  watch: {
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
      &-title {

      }
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