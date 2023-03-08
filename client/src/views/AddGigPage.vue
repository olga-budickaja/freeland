<template>
  <div class="addGig container">
    <AddGigForm />
  </div>
</template>

<script>
import AddGigForm from "@/components/forms/AddGigForm.vue";

export default {
  name: 'add-gig-page',
  components: { AddGigForm }

}
</script>

<style lang="scss" scoped>
.addGig {
  margin: 60px auto;
  border-radius: 40px;
  background: var(--background-color1);
}
</style>