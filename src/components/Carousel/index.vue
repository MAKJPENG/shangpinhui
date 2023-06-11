<template>
  <div class="swiper-container" id="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(banner) in list" :key="banner.id">
        <img :src="banner.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入swiper
import Swiper from 'swiper'
export default {
  name: 'Carousel',
  props: ['list'],
  watch: {
    // 监视轮播图数据更新
    list: {
      // 立即执行一次
      immediate: true,
      handler() {
        // 在轮播图数据更新之后，在页面结构已经渲染成功后，执行后面代码
        this.$nextTick(() => {
          var mySwiper = new Swiper('.swiper-container', {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              // 点击小圆点切换图片
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },

            // 如果需要滚动条
            scrollbar: {
              el: '.swiper-scrollbar',
            },
          })
        })
      }
    }
  },
}
</script>

<style scoped>
</style>
