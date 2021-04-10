<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control"
                 :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick" ref="tabControl_back"
                 v-show="isTabFixed"/>
    <scroll class="content" ref="scroll"
            :probe-type="3" @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">

      <home-swiper-vue :banners="banners"
                       @swiperImageLoad.once="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-control"
                   :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick" ref="tabControl"/>
      <good-list :goods="showGoods"/>
    </scroll>
    <transition name="back-top">
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </transition>
  </div>

  <!--    <back-top @click.native="backClick" v-show="isShowBackTop"/>-->

</template>

<script>
  // import HomeSwiperBak from "./childComps/HomeSwiperBak"
  // import HomeSwiper from "./childComps/HomeSwiper";
  import HomeSwiperVue from "./childComps/HomeSwiperVue";
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata, getHomeGoods} from "network/home"

  export default {
    name: "Home",
    components: {
      // HomeSwiperBak,
      // HomeSwiper,
      HomeSwiperVue,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodList,
      Scroll,
      BackTop,
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOfSetTop: 0,
        isTabFixed: false,
      }
    },
    mounted() {
      // 获取 tabControl 的 offsetTop
      // 每一个组件都有一个属性 $el:用于获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop);
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl_back.currentIndex = index;
        this.$refs.tabControl.currentIndex = index;
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0);
      },
      contentScroll(position) {
        // 判断上拉是否显示
        this.isShowBackTop = (-position.y) > 500;

        // 决定 tabContril 是否产生吸顶效果
        this.isTabFixed = (-position.y) > this.tabOfSetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType);
      },
      swiperImageLoad() {
        // 获取tabControl离顶部的高度
        this.tabOfSetTop = this.$refs.tabControl.$el.offsetTop;
        // console.log(this.$refs.tabControl.$el.offsetTop)
      },
      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        let page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          // 调用子组件方法
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content {
    height: 400px;
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;

  }

  .content {
    height: calc(100% - 93px);
    overflow: hidden;
    /*margin-top: 44px;*/
    overflow-x: scroll
  }

  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
    overflow-y: hidden;
    overflow-x: scroll;
    height: calc(100% - 65px)
  }

  .back-top-enter-active, .back-top-leave-active {
    transition: all .5s ease;
  }

  .back-top-enter, .back-top-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

</style>
