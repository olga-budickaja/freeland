<template>
  <div>
    <div v-if="posts.length" class="posts">
      <div class="posts__wrapper">
        <transition-group name="post-list">
            <PostItem
                v-for="post in posts"
                :key="post._id"
                :post="post"
                :userId="post.userId"
                @remove="$emit('remove', post)"
            />
        </transition-group>
      </div>
    </div>
    <div v-else class="title-fz20 title empty" >The post`s list is empty...</div>
  </div>

</template>

<script>
import PostItem from "@/components/gigs/GigItem.vue";

export default {
  components: { PostItem },
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
}
</script>

<style lang="scss" scoped>
.posts {
  padding: 20px 0;
  &__wrapper {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
}
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.4s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateY(130px);
}
.post-list-move {
  transition: transform 0.4s ease;
}
</style>