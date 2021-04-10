<template>
  <swiper class="swiperContainer" ref="mySwiper" :options="swiperContainer">
    <swiper-slide v-for="item in banners">
      <img :src="item.image" alt="" class="swiper-slide">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>

</template>

<script>
  export default {
    name: "HomeSwiperBak",
    data() {
      return {
        swiperContainer: {
          slidesPerView: 'auto',
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true,//修改swiper的父元素时，自动初始化swiper
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
            clickable: true // 允许点击小圆点跳转
          },
          autoplay: {
            delay: 3000,
            disableOnInteraction: false // 手动切换之后继续自动轮播
          },
          loop: true,
          initialSlide: 1
        },
      }
    },
    props: {
      banners: {
        type: Array,
        default() {
          return [];
        }
      }
    },
  }
</script>

<style>
  .swiperContainer {
    overflow: hidden;
    width: 100%;
    height: 230px;
  }

  .swiper-slide {
    width: 100%;
  }

  .swiper-pagination-bullet-active {
    background-color: #fff
  }
</style>
