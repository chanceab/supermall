<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="NavBar"/>
    <scroll class="content" ref="scroll"
            :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"
                         @imageLoad="imageLoad"/>
      <!--                         -->
      <detail-param-info :param-info="paramInfo"
                         ref="params"/>
      <detail-comment :comment="comment" ref="comment"/>
      <goods-list :goods="recommend" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <transition name="back-top">
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </transition>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailComment from "./childComps/DetailComment";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from 'components/common/scroll/Scroll';
  import GoodsList from 'components/content/goods/GoodsList';
  import BackTop from 'components/content/backTop/BackTop'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/getDetail"

  import {mapActions} from 'vuex'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailComment,
      DetailBottomBar,

      Scroll,
      GoodsList,
      BackTop,
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {
          type: Object,
          default() {
            return {};
          }
        },
        shop: {
          type: Object,
          default() {
            return {};
          }
        },
        detailInfo: {
          type: Object,
          default() {
            return {};
          }
        },
        paramInfo: {
          type: Object,
          default() {
            return {};
          }
        },
        comment: {
          type: Object,
          default() {
            return {};
          }
        },
        recommend: [],
        isShowBackTop: false,
        themeTopYs: [],
        currentIndex: 0,  // 监听滚动位置
      };
    },
    created() {
      // 保存传入的 iid
      this.iid = this.$route.params.iid;

      //根据 iid 请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res)
        // console.log(res.result);
        const data = res.result;
        // console.log(data)
        // 获取顶部轮播数据
        this.topImages = data.itemInfo.topImages;

        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

        // 获取店铺信息
        this.shop = new Shop(data.shopInfo)

        // 获取商品详细信息
        this.detailInfo = data.detailInfo;

        // 获取商品参数
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 获取评论数据
        if (data.rate.cRate) {
          this.comment = data.rate.list[0];
        }

        // 下一帧
        this.$nextTick(() => {
        })
      })

      // 请求推荐数据
      getRecommend().then(res => {
        this.recommend = res.data.list;
        // console.log(res.data.list);
      })
    },
    mounted() {

    },
    updated() {

    },
    methods: {
      ...mapActions(['addCart']),
      // 只会回调一次, 在 DetailGoodsInfo 组件中做了防抖
      imageLoad() {
        this.$refs.scroll.scroll.refresh();
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
        // console.log(this.themeTopYs);
      },
      //
      backClick() {
        this.$refs.scroll.scrollTo(0, 0);
      },

      // 控制 BackTop 显示与隐藏
      contentScroll(position) {
        // console.log(this.$refs.scroll.scrollerHeight)
        this.isShowBackTop = (-position.y) > 500;

        let length = this.themeTopYs.length;
        for (let i = 0; i < length - 1; i++) {
          if (this.currentIndex !== i && (-position.y >= this.themeTopYs[i] && -position.y < this.themeTopYs[i + 1])) {
            this.currentIndex = i;
            this.$refs.NavBar.currentIndex = this.currentIndex;
          }
        }
      },

      // 监听 NavBar 点击事件
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
      },

      // 添加购物车
      addToCart() {
        // 获取商品数据.
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        // 将商品添加到购物车
        // this.$store.commit('addCart', product)
        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res)
        // })
        this.addCart(product).then(res => {
          this.$toast.show(res)
        })
      },
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    height: 100vh;
    background-color: #ffffff;
  }

  .detail-nav {
    position: relative;
    background-color: #ffffff;
    z-index: 9;
  }

  .content {
    height: calc(100% - 44px - 2.09rem);
  }

  .back-top-enter-active, .back-top-leave-active {
    transition: all .5s ease;
  }

  .back-top-enter, .back-top-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }
</style>
