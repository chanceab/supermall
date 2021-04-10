<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import {getDetail, Goods, Shop, GoodsParam} from "network/getDetail"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";

  import Scroll from 'components/common/scroll/Scroll'


  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,

      Scroll,
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
      })

    },
    methods: {
      imageLoad() {
        this.$refs.scroll.scroll.refresh();
      }
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
    height: calc(100% - 44px);
  }
</style>
