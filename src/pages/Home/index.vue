<template>
  <div>
    <!-- 商品分类导航 -->
    <TypeNav></TypeNav>
    <!-- 列表 -->
    <ListContainer></ListContainer>
    <!-- 今日推荐 -->
    <TodayRecommend></TodayRecommend>
    <!-- 商品排行 -->
    <Rank></Rank>
    <!-- 猜你喜欢 -->
    <Like></Like>
    <!-- 楼层 -->
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
    <!-- 商标 -->
    <Brand></Brand>
  </div>
</template>

<script>
// 引入路由组件
import ListContainer from '@/pages/Home/ListContainer'
import TodayRecommend from '@/pages/Home/TodayRecommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'

import {mapState} from 'vuex'
export default {
  name: 'Home',
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted(){
    // 发起floor的action请求
    this.$store.dispatch('home/getfloorlist')
   
  },
  computed:{
    ...mapState('home',['floorList'])
  }
}
</script>

<style>
</style>