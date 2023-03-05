<template>
  <div class="post" >
    <div class="post__wrapper">
      <img class="post__img" :src="post.cover" alt="poster">
      <round-button-small
          class="orange darken-3 post__delete"
          @click="$emit('remove', post)"
      >
        delete
      </round-button-small>
      <div class="post__desc">
        <div class="post__header">
          <img class="post__header-img" :src="user.img" alt="user">
          <h2 class="post__header-title title-fz20 title">{{ user.username }}</h2>
        </div>
        <div class="post__text">{{ post.shortDesc }}</div>
        <div class="post__stars">
          <i class="material-icons post__stars-icon">star</i>
          <div class="post__stars-count">{{ post.startNumber }}</div>
        </div>
        <div class="post__footer">
          <div class="post__footer-like">
            <i class="material-icons post__footer-icon">favorite</i>
          </div>
          <div class="post__footer-rating">
            <div class="post__footer-rating-sub">Starting at</div>
            <div class="post__footer-rating-price">$ {{ post.price }}</div>
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
      user: {}
    }
  },
  props: {
    post: {
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
        if (this.post) {
          const res = await defaultAPIInstance.get(`users/${this.userId}`)
          this.user = res.data
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted() {
    this.fetchUser()
  }
}
</script>

<style lang="scss" scoped>
.post {
  margin: 20px 0;
  &__wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  &__img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 30px;
    box-shadow: 0 2px 2px 0 rgb(255 255 255 / 3%), 0 3px 1px -2px rgb(255 255 255 / 2%), 0 1px 5px 0 rgb(255 255 255 / 12%);
  }

  &__delete {
    position: absolute;
    top: 15px;
    right: 15px;
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