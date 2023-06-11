<template>
  <div class="type-nav">
    <!-- 事件委派 -->
    <div class="container" @mouseleave="leaveIndex" @mouseenter="enterShow">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <!-- 三级联动 -->
      <transition name=sort>
        <div class="sort" v-show="show">
          <!-- 实现路由跳转的时间委托goSearch -->
          <div class="all-sort-list2" @click="goSearch">
            <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{curr:currIndex==index}">
              <h3 @mouseenter="enterIndex(index)">
                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
              </h3>
              <!-- 二级三级分类 -->
              <div class="item-list clearfix" :style="{display:currIndex==index?'block':'none'}">
                <div class="subitem">
                  <dl class="fore" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                    <dt>
                      <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                    </dt>
                    <dd>
                      <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                        <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入节流函数
import throttle from 'lodash/throttle'

export default {
  name: 'TypeNav',
  data() {
    return {
      // 控制高亮是否显示的数据
      currIndex: -1,
      // 判断商品分类是否展示
      show: true
    }
  },
  mounted() {

    // mapActions('home', ['categoryList'])
    // 挂载的时候判断不是home主页就隐藏
    if (this.$route.path !== '/home') {
      this.show = false
    }
  },
  computed: {
    ...mapState('home', ['categoryList'])
  },
  methods: {
    // 改变商品分类h3标签的高亮显示
    enterIndex: throttle(function (index) {
      this.currIndex = index
    }, 50),
    leaveIndex() {
      this.currIndex = -1
      // 鼠标离开的时候如果不是home主页就隐藏商品分类
      if (this.$route.path !== '/home') {
        this.show = false
      }
    },
    // 实现商品分类的路由跳转函数
    goSearch(e) {
      // 结构赋值
      const { categoryname, category1id, category2id, category3id } = e.target.dataset
      // 判断点击是不是a标签
      if (categoryname) {
        // 定义push的参数
        const location = { name: "search" }
        const query = { categoryName: categoryname }
        // 判断是哪一级标签
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id = category3id
        }
        location.query = query
      // 将params参数一起带上
        if (this.$route.params) {
          location.params = this.$route.params
        }
        // 配置跳转
        // console.log('tn',this.$route)

        this.$router.push(location)
      }

    },
    // 判断鼠标进入的时候商品分类是否展示
    enterShow() {
      // 鼠标进入的时候显示商品分类
      if (this.$route.path !== '/home') {
        this.show = true
      }
    }
  },
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }
    .sort-enter-active,
    .sort-leave-active {
      transition: opacity 0.5s;
    }
    .sort-enter, .sort-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .curr {
          background-color: skyblue;
        }
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          /* &:hover {
            .item-list {
              display: block;
            }
          } */
        }
      }
    }
  }
}
</style>