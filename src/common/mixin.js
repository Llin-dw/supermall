import { debounce } from "./utils"
import BackTop from 'components/content/backTop/BackTop'

export const itemLisenerMinxin = {
  data() {
    return {
      itemImgListener: null,
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

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: true,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    listenShowBackTop(position) {
      // 判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000
    }
  }
}
