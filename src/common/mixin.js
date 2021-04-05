import { debounce } from "./utils"

export const itemLisenerMinxin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    // 图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 50)

    // 对监听的事件进行保存
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}
