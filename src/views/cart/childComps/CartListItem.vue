<template>
  <div class="CartListItem">
    <div class="item">
      <check-button class="check-button" :isChecked='product.checked' @click.native='ButtonClick'/>
      <div class="item-image">
        <img :src="product.image" alt="">
      </div>
      <div class="item-message">
        <span @click='itemClick'><p>{{product.title}}</p></span>
        <div @click='itemClick'>{{product.desc}}</div>

        <p>
          <strong>{{'￥'+ product.price}}</strong>
          <span @click='deleteClick'>删除</span>
          <i>
            <button @click="des">-</button>
            {{'x'+product.count}}
            <button @click="add">+</button>
          </i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/CheckButton/CheckButton'
  import { mapActions } from 'vuex'

  export default {
    name: "CartListItem",
    components: {
      CheckButton
    },
    props: {
      product: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      ...mapActions(['deleteOne']),
      ButtonClick(){
        this.product.checked = !this.product.checked
      },
      itemClick() {
        this.$router.push('/detail/'+this.product.iid)
      },
      des() {
        if(this.product.count > 1) {
          this.product.count--
        }
      },
      add() {
        this.product.count++
      },
      deleteClick() {
        this.deleteOne(this.product.iid)
      }
    }
  }

</script>

<style scoped>
  .CartListItem {
    width: 100%;
  }

  .item {
    display: flex;
    width: 100%;
    height: 150px;
    border-bottom: 1px solid #eee;
  }
  .check-button {
    flex:0.4;
    position: relative;
    top: 59px;
    left: 5px;
  }
  .item .item-image {

    height: 92%;
    flex:2;
    overflow: hidden;
  }
  .item .item-image img {
    width: 90%;
    margin: 10px;
  }
  .item .item-message {
    flex:5;
    overflow: hidden;
    padding: 10px;
  }
  .item-message>span>p {
    margin-left: 5px;
    font-size: 20px;
    color:#333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-message>div {
    margin: 28px 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-message>p {
    margin: 45px 5px;
    color:chocolate;
    position:relative;
    bottom: 5px;

  }
  .item-message>p i{
    font-style: normal;
    color:#333;
    position: absolute;
    right:0;
  }
  .item-message button {
    width: 20px;
  }
  .item-message>p strong {
    display: inline-block;
    width: 47%;
  }
  .item-message>p span {
    color:#333;
    position: relative;
    top: 3px;
    right:0
  }

</style>
