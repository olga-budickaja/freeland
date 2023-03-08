<template>
  <div class="gig" >
    <div class="gig__wrapper">
      <router-link :to="`/gigs/${gig._id}`">
        <img class="gig__img" :src="gig.cover" alt="giger">
      </router-link>
      <round-button-small
          class="orange darken-3 gig__delete"
          @click="$emit('remove', gig)"
      >
        delete
      </round-button-small>
      <div class="gig__desc">
        <div class="gig__header">
          <img v-if="!user.img" class="gig__header-img" src="../../assets/users/no-avatar.png" alt="user">
          <img v-if="user.img" class="gig__header-img" :src="user.img" alt="user">
          <h2 class="gig__header-title title-fz20 title">{{ user.username }}</h2>
        </div>
        <h2 class="gig__title">{{ gig.title }}</h2>
        <div class="gig__text">{{ gig.shortDesc }}</div>
        <div class="gig__stars">
          <i class="material-icons gig__stars-icon">star</i>
          <div class="gig__stars-count">
            {{ !isNaN(this.gig.totalStars / this.gig.starsNumber) ? Math.round(this.gig.totalStars / this.gig.starsNumber) : '' }}
          </div>
        </div>
        <div class="gig__footer">
          <div class="gig__footer-like">
            <i class="material-icons gig__footer-icon">favorite</i>
          </div>
          <div class="gig__footer-rating">
            <div class="gig__footer-rating-sub">Starting at</div>
            <div class="gig__footer-rating-price">$ {{ gig.price }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import RoundButtonSmall from "@/components/UI/RoundButtonSmall.vue";
import { defaultAPIInstance } from "@/requestMethod";

export default {
  components: { RoundButtonSmall },
  data() {
    return {
      user: {},
    }
  },
  props: {
    gig: {
      type: Object,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  methods: {
    async fetchUser() {
      try {
        if (this.gig) {
          const res = await defaultAPIInstance.get(`users/${this.userId}`)
          this.user = res.data
        }
      } catch (e) {
        console.log(e)
      }
    },
    starsNum() {
      if (!isNaN(this.gig.totalStars / this.gig.starsNumber)) {
        this.star = Math.round(this.gig.totalStars / this.gig.starsNumber)
      }
    }
  },
  mounted() {
    this.fetchUser()
    this.starsNum()
  }
}
</script>

<style lang="scss" scoped>
.gig {
  margin: 20px 0;
  &__wrapper {
    position: relative;
    max-width: 95%;
    display: flex;
    flex-direction: column;
  }

  &__img {
    width: 100%;
    aspect-ratio: 4 / 3;
    border-radius: 30px;
    box-shadow: 0 2px 2px 0 rgb(255 255 255 / 3%), 0 3px 1px -2px rgb(255 255 255 / 2%), 0 1px 5px 0 rgb(255 255 255 / 12%);
  }
  object-fit: cover;

  &__delete {
    position: absolute;
    top: 15px;
    right: 15px;
  }

  &__title {
    font-size: 16px;
  }

  &__desc {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 250px;
    padding: 20px;
  }

  &__header {
    display: flex;
    gap: 20px;
    align-items: center;

    &-img {
      width: 40px;
      height: 40px;
      object-fit: cover;
      border-radius: 100%;
    }
  }

  &__stars {
    display: flex;
    align-items: center;
    margin: 15px 0;
    gap: 5px;

    * {
      color: yellow;
      font-weight: 700;
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-icon {
      color: var(--color-submit1);
    }

    &-rating {
      text-align: right;

      &-sub {
        text-transform: uppercase;
        font-weight: 200;
        color: var(--color-submit3);
      }

      &-price {
        font-weight: 500;
        color: var(--color-submit3);
      }
    }
  }
}
</style>