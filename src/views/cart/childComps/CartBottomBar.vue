<template>
  <div class="button-bar">
    <div class="allSelect">
      <check-button/>
      <span>全选</span>
    </div>
    <div class="totalPrice">
      合计：{{ totalPrice }}
    </div>
    <div class="calculate">
      去计算：{{ checkLength }}
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/CheckButton/CheckButton'
  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice(){
        return '￥' + this.cartList.filter(item =>item.checked)
          .reduce((preValue, item) => preValue + item.price * item.count, 0)
          .toFixed(2)
      },
      checkLength(){
        return this.cartList.filter(item => item.checked).length
      },
    }
  }
</script>

<style scoped>
  .button-bar{
    display:flex;
    height: 40px;
    background-color:#eee;
    line-height: 40px;
  }
  .allSelect{
    flex: 1.5;
    display: flex;
    margin-left: 5px;
    align-items: center;
  }
  .allSelect span {
    margin-left: 5px;
  }
  .totalPrice{
    flex: 3;
    color:#333

  }
  .calculate{
    flex: 2;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background-color: var(--color-tint);
    color:#fff
  }
</style>
