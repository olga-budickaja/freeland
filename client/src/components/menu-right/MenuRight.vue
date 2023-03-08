<template>
  <div class="menuRight">
    <input-search
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
    />
    <div class="menuRight__lang">
      <div class="menuRight__lang-item">en</div>
       /
      <div class="menuRight__lang-item">uk</div>
    </div>
    <div class="menuRight__login">
      <div class="menuRight__login-register  waves-effect waves-light">
        <router-link v-if="!user" to="/register">Log in</router-link>
        <div
            v-else
            @click="showDrop"
            class="menuRight__drop"
        >
          {{ user.username }}
        </div>
      </div>
      <drop-element v-model:show="dropVisible">
        <DropMenu/>
      </drop-element>
    </div>

  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import DropMenu from "@/components/drop-menu/DropMenu.vue";
import DropElement from "@/components/UI/DropElement.vue";
import InputForm from "@/components/UI/InputForm.vue";
import MainFlatButton from "@/components/UI/MainFlatButton.vue";
import toggleMixin from "@/mixins/ToggleMixin";
import InputSearch from "@/components/UI/InputSearch.vue";

export default {
  name: 'menu-right',
  mixins: [toggleMixin],
  components: { InputSearch, MainFlatButton, InputForm, DropElement, DropMenu },
  data() {
    return {
      auth: false,
      dropVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setSearchQuery: "gig/setSearchQuery",
      setGigs: "gig/setGigs",
      setPage: "gig/setPage",
      setSelectedSort: "gig/setSelectedSort",
      setLimit: "gig/setLimit",
      setMin: "gig/setMin",
      setMax: "gig/setMax"
    }),
    ...mapActions({
      handleSearch: "gig/handleSearch",
      fetchGigs: "gig/fetchGigs",
      loadMoreGigs: "gig/loadMoreGigs",
    }),
    showDrop() {
      this.dropVisible = !this.dropVisible;
    },
  },
  computed: {
    ...mapState({
      user: state => state.authModule.credentials.user,
      searchQuery: state => state.gig.searchQuery,
      gigs: state => state.gig.gigs,
      min: state => state.gig.min,
      max: state => state.gig.max,
      isGigsLoading: state => state.gig.isGigsLoading,
      selectedSort: state => state.gig.selectedSort,
      url: state => state.gig.url,
      page: state => state.gig.page,
      limit: state => state.gig.limit,
      totalPages: state => state.gig.totalPages,
    }),
    // handleSearchQuery() {
    //   console.log(this.gigs.filter(gig => gig?.title.includes(this.searchQuery)))
    //   // return
    // }
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
.menuRight {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 30px;
  &__lang {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
    gap: 5px;
    &-item {
      font-weight: 200;
    }
  }
  &__login {
    position: relative;
    display: flex;
    flex: 2;
    &-register {
      border: 1px solid var(--text-color);
      border-radius: 20px;
      padding: 8px 20px;
      text-transform: uppercase;
      text-align: center;
      * {
        font-weight: 200;
      }
    }
    &-user {
      display: flex;
      gap: 20px;
      align-items: center;
      &-avatar {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 100%;
      }
      &-name {
        font-size: 16px;
        font-weight: 500;
      }
    }
  }
  &__drop {
    position: relative;
  }
}
</style>