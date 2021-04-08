<template>
  <div class="toast" v-show="isShow">
    <span>{{message}}</span>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    // props: {
    //   message: {
    //     type: String,
    //     default: ''
    //   },
    //   isShow: {
    //     type: Boolean,
    //     default: false
    //   }
    // },
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message, duration = 1500) {
        this.message = message;
        this.isShow = true;
        setTimeout(() => {
          this.message = '';
          this.isShow = false;
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast{
    position: fixed;
    left: 50%;
    top: 50%;
    padding: 8px 10px;
    transform: translate(-50%,-50%);
    background-color:rgba(0, 0, 0, .6);
    z-index: 9999;
    /*height: 35px;*/
    /*line-height: 35px;*/
    text-align: center;
    color:#fff;

  }
  .toast span {
    padding: 0px 10px;
  }
</style>
