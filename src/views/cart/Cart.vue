<template>
  <div class="cart">
    <!--  导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
      <div slot="right" @click="deleteAll">清空</div>
    </nav-bar>
    <!--  商品的列表  -->
    <scroll class="content">
      <cart-list class="cart-list"/>
    </scroll>

    <!--  底部汇总  -->
    <cart-bottom-bar/>
  </div>

</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import Scroll from "components/common/scroll/Scroll";

  import { mapGetters } from 'vuex'
  import {mapActions} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar,
      Scroll
    },
    computed: {
    //  语法一：
    //   ...mapGetters([
    //     'cartLength',
    //     'cartList'
    //   ])
    //  语法二：
      ...mapGetters({
        length: 'cartLength'
      })
    },
    methods: {
      ...mapActions(['deleteAllItem']),
      deleteAll() {
        this.deleteAllItem()
      }
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
.nav-bar {
  background-color: var(--color-tint);
  color:#fff;
  font-weight: 700;
}
  .content {
    height: calc(100% - 44px - 49px - 40px);
    overflow:hidden;
  }
</style>
