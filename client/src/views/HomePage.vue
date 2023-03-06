<template>
  <div class="home container">
    <Promo />
    <About />
    <GigsHome />
    <News />
    <Footer/>
  </div>
</template>

<script>
import Promo from "@/components/promo/Promo.vue";
import About from "@/components/about/About.vue";
import GigsHome from "@/components/gigs-home/GigsHome.vue";
import Footer from "@/components/footer/Footer.vue";
import News from "@/components/news/News.vue";

export default {
  name: 'home',
  components: { News, Footer, GigsHome, About, Promo },
}
</script>

<style lang="scss" scoped>

</style>