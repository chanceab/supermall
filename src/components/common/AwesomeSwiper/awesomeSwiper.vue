<template>
  <div class="swiper-contain"
       :style="'--swiper-pagination-color:' + color">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <div class="swiper-pagination" slot="pagination"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/css/swiper.css'

  export default {
    name: "awesomeSwiper",
    components: {
      // VueAwesomeSwiper
      Swiper
    },
    props: {
      // 自动初始化
      observer: {
        type: Boolean,
        default() {
          return true
        }
      },
      observeParents: {
        type: Boolean,
        default() {
          return true
        }
      },
      // 传入颜色
      color: {
        type: String,
        default() {
          return '#fff'
        }
      },
      // 手动切换后自动轮播
      autoplay: {
        type: Object,
        default() {
          return {
            delay: 3000,
            disableOnInteraction: false // 手动切换之后继续自动轮播
          }
        }
      },

      // 分页
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        clickable: true // 允许点击小圆点跳转
      },

      // 设置能够同时显示的slides数量
      slidesPerView: {
        type: String,
        default() {
          return 'auto'
        }
      },
      // 初始幻灯片
      initialSlide: {
        type: Number,
        default() {
          return 0
        }
      },
      // 环路
      loop: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data() {
      return {
        activeClass: ".swiper-contain", //滑动模块名称
        mySwiper: null
      }
    },
    methods: {
      // 更新Swiper
      onSlideChangeEnd() {
        this.mySwiper.update();
      }
    },
    mounted() {
      this.mySwiper = new Swiper(this.activeClass, {
        observer: this.observer,  // 自动初始化
        observeParents: this.observeParents,  // 自动初始化
        autoplay: this.autoplay,    //自动播放
        loop: this.loop,
        //分页器
        pagination: this.pagination,
        initialSlide: this.initialSlide,
      });
    }
  }
</script>

<style scoped>
  .swiper-contain {
    /* hoshi 无法修改颜色*/
  }
</style>
