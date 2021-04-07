<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probeType='3' @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="detailImageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <goods-list ref="recommend" :goods="recommendList"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addToCart="addToCart"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from './childComps/DetailBaseInfo';
  import DetailShopInfo from './childComps/DetailShopInfo';
  import DetailGoodsInfo from './childComps/DetailGoodsInfo';
  import DetailParamInfo from './childComps/DetailParamInfo';
  import DetailCommentInfo from './childComps/DetailCommentInfo';
  import DetailBottomBar from './childComps/DetailBottomBar';

  import Scroll from 'components/common/scroll/Scroll';
  import GoodsList from "components/content/goods/GoodsList";

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail";
  import {debounce} from "common/utils";
  import {itemLisenerMinxin ,backTopMixin} from "common/mixin";

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendList: [],
        themeTopYs:[],
        // getThemeTopY: null
        currentIndex: 0
      }
    },
    mixins: [itemLisenerMinxin, backTopMixin],
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid

      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 1.获取顶部的图片轮播数据
        // console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo;

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6.保存评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }

        this.$nextTick(()=>{

        })

      })

      // 3.请求推荐信息
      // getRecommend().then((res, error) => {
      //   if (error) return
      //   this.recommendList = res.data.list
      // })
      getRecommend().then(res => {
        // console.log(res)
        this.recommendList = res.data.list
      })






    },
    mounted() {

    },
    destroyed(){
      //  console.log('离开详情页');
      this.$bus.$off('imageLoad', this.itemImgListener)
    },
    methods: {
      // 4.监听详情图片加载
      detailImageLoad() {
        this.$refs.scroll.refresh()

        // 4.给getThemeTopY赋值（对给getThemeTopY赋值操作进行防抖）
        // this.getThemeTopY = debounce(() => {
        //   this.themeTopYs = []
        //   this.themeTopYs.push(0);
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        //   console.log(this.themeTopYs)
        // })
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
        // console.log(this.themeTopYs)
      },
      contentScroll(position) {
        // console.log(position)
        // 1. 获取y值
        const positionY = -position.y;

      //  positionY值与主题中值进行对比
        const length = this.themeTopYs.length
        for(let i = 0;i < length-1; i++) {
            // 普通做法
            // if((this.currentIndex !== i) && ((i < length -1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
            //   || (i === length -1 && positionY >= this.themeTopYs[i]))){
            //   this.currentIndex = i
            //   console.log(this.currentIndex)
            //   this.$refs.nav.currentIndex = this.currentIndex
            // }

            // hark做法
            // 在themeTopYs里添加一个很大的值（js中最大的值）后再进行判断
            if ((this.currentIndex !== i) &&
                (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i +1])) {
              this.currentIndex = i
              // console.log(this.currentIndex)
              this.$refs.nav.currentIndex = this.currentIndex
            }
        }
        // // .判断BackTop是否显示
        // this.isShowBackTop = (-position.y) > 1000
        // 判断BackTop是否显示
        this.listenShowBackTop(position)
      },
      titleClick(index) {
        // console.log(index);
        // console.log(this.themeTopYs[index]);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index])
      },
      addToCart() {
      //  1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

      //  2.将商品添加到购物车里
      //   this.$store.commit('addCart', product)
        this.$store.dispatch('addCart', product)
      }
    }

  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    /*height: calc(100% - 44px);*/
    position: absolute;
    top: 44px;
    left: 0px;
    right: 0px;
    bottom: 49px;
  }
</style>
