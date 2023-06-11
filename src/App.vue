<template>
  <div>
    <Header></Header>
    <!-- 路由组件要展示的地方 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
// 引入组件
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'


export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    // 向仓库发送一个请求命令获取分类列表
    this.$store.dispatch('home/categoryList')
  }
}
</script>
