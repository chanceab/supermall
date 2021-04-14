<template>
  <div class="detail-swiper">
    <awesome-swiper :topImages="topImages" :pagination="pagination"
                    v-if="topImages.length" :loop="true" color="#ff4d4f">
      <div class="swiper-slide" v-for="item in topImages">
        <img :src="item">
      </div>
    </awesome-swiper>
  </div>
</template>

<script>
  import awesomeSwiper from "components/common/AwesomeSwiper/awesomeSwiper"

  export default {
    name: "DetailSwiper",
    components: {awesomeSwiper},
    data() {
      return {
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
          clickable: true // 允许点击小圆点跳转
        },
      }
    },
    updated() {
      // this.awesomeSwiper.onSlideChangeEnd;
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
  .detail-swiper {
    height: 55vh;
    position: relative;
    overflow: hidden;
  }

  .swiper-slide img {
    width: 100%;
  }
</style>
