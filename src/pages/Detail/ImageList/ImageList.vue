<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide,index) in skuImageList" :key="slide.spuImgId">
        <img :src="slide.imgUrl" @click="changCurIndex(index)" :class="{active:curIndex===index}">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

import Swiper from 'swiper'
export default {
  name: "ImageList",
  props: ['skuImageList'],
  data() {
    return {
      curIndex: 0
    }
  },
  methods: {
    changCurIndex(index) {
      this.curIndex = index
      // 将索引值发送给兄弟组件
      this.$bus.$emit('getIndex',this.curIndex)
    }
  },
  watch: {
    // 监视轮播图数据更新
    skuImageList: {
      // 立即执行一次
      immediate: true,
      handler() {
        // 在轮播图数据更新之后，在页面结构已经渲染成功后，执行后面代码
        this.$nextTick(() => {
          var mySwiper = new Swiper('.swiper-container', {

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            // spaceBetween: 1,
            // 一行展示几张图片
            slidesPerView: 3,
          })
        })
      }
    }
  },
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>