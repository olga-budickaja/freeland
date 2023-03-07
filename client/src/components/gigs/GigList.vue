<template>
  <div>
    <div v-if="gigs.length" class="gigs">
      <div class="gigs__wrapper">
        <transition-group name="gig-list">
            <GigItem
                v-for="gig in gigs"
                :key="gig._id"
                :gig="gig"
                :userId="gig.userId"
                @remove="$emit('remove', gig)"
            />
        </transition-group>
      </div>
    </div>
    <div v-else class="title-fz20 title empty" >The gig`s list is empty...</div>
  </div>

</template>

<script>
import PostItem from "@/components/gigs/GigItem.vue";
import GigItem from "@/components/gigs/GigItem.vue";

export default {
  components: { GigItem, PostItem },
  props: {
    gigs: {
      type: Array,
      required: true
    }
  },
}
</script>

<style lang="scss" scoped>
.gigs {
  padding: 20px 0;
  &__wrapper {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
}
.gig-list-item {
  display: inline-block;
  margin-right: 10px;
}
.gig-list-enter-active,
.gig-list-leave-active {
  transition: all 0.6s ease;
}
.gig-list-enter-from,
.gig-list-leave-to {
  opacity: 0;
  transform: translateY(130px);
}
.gig-list-move {
  transition: transform 0.6s ease;
}
</style>