<template>
  <div>
    <awesome-swiper class="swiper" :pagination="pagination" :loop=true
                    v-if="banners.length" ref="Swiper" color="skyblue">
      <div class="swiper-slide" v-for="item in banners">
        <img :src="item.image" @load="imageLoad">
      </div>
    </awesome-swiper>
  </div>

</template>

<script>
  import AwesomeSwiper from "components/common/AwesomeSwiper/awesomeSwiper";

  export default {
    name: "HomeSwiperVue",
    components: {
      AwesomeSwiper
    },
    data() {
      return {
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
          clickable: true // 允许点击小圆点跳转
        },
      }
    },
    props: {
      banners: {
        type: Array,
        default() {
          return [];
        },
      }
    },
    methods: {
      imageLoad() {
        this.$emit('swiperImageLoad')
      }
    }
  }
</script>

<style scoped>
  .swiper {
    width: 100%;
    position: relative;
  }

  .swiper-slide img {
    width: 100%;
  }

  /*.swiper-pagination-bullet-active {*/
  /*  background-color: #fff*/
  /*}*/
</style>
