<template>
  <div class="check-button">
    <div class="check-img" :class="{isChecked: isChecked}">
      <img src="~assets/img/cart/tick.svg" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props:{
      isChecked:{
        type:Boolean,
        default:false
      }
    }

  }
</script>

<style scoped>
  .check-img{
    width: 22px;
    height: 22px;
    border:2px solid #ccc;
    border-radius: 50%;
    overflow: hidden;
    line-height: 22px;
    background-color: #fff;
  }
  img{
    width: 90%;
  }
  .isChecked{
    background-color:var(--color-tint);
    border:0
  }
</style>
