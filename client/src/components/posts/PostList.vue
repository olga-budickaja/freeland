<template>
  <div>
    <div v-if="posts.length" class="posts">
      <div class="posts__wrapper">
        <PostItem
            v-for="post in posts"
            :key="post._id"
            :post="post"
            :userId="post.userId"
            @remove="$emit('remove', post)"
        />
      </div>
    </div>
    <div v-else class="title-fz20 title empty" >The post`s list is empty...</div>
  </div>

</template>

<script>
import PostItem from "@/components/posts/PostItem.vue";

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
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}
</style>