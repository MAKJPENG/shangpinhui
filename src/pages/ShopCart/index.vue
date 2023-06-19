<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart) in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked===1" @change="updataChecked(cart)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handel('mins',-1,cart)">-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" :value="cart.skuNum" @change="handel('chang',$event.target.value*1,cart)">
            <a href="javascript:void(0)" class="plus" @click="handel('plus',1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuPrice*cart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCart(cart.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked&&cartInfoList.length>0" @change="updataAllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice()}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="settlement">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// 引入节流函数
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
  async mounted() {
    // 获取购物车列表数据
    this.getData()

  },
  methods: {
    // 获取购物车列表函数
    getData() {
      this.$store.dispatch('shopcart/getCartList')
    },
    // 计算总价
    totalPrice() {
      let sum = 0
      this.cartInfoList.forEach(cart => {
        sum += cart.skuPrice * cart.skuNum
      })
      return sum
    },
    // 修改数量函数
    handel: throttle(async function (type, disNum, cart) {
      switch (type) {
        case 'mins':
          if (cart.skuNum > 1) {
            disNum = -1
          } else {
            disNum = 0
          }
          break
        case 'plus':
          disNum = 1
          break
        case 'chang':
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0
          } else {
            disNum = parseInt(disNum) - cart.skuNum
          }
      }
      // 派发请求更新数据
      try {
        await this.$store.dispatch('detail/addOrUpdataShopCar', { skuId: cart.skuId, skuNum: disNum })
        this.getData()
      } catch (e) {
        alert(e.message)
      }

    }, 1000),
    // 删除商品函数
    async deleteCart(skuId) {
      try {
        // 删除成功并更新数据
        await this.$store.dispatch('shopcart/getDeleteCart', skuId)
        this.getData()
      } catch (e) {
        alert(e.message)
      }
    },
    // 修改商品选中状态函数
    async updataChecked(cart) {
      // 修改选中的控制值
      let isChecked = cart.isChecked === 1 ? '0' : '1'
      try {
        // 更新数据
        await this.$store.dispatch('shopcart/getUpdataChecked', { skuId: cart.skuId, isChecked: isChecked })
        this.getData()
      } catch (e) {
        alert(e.message)
      }
    },
    // 删除所有选中的商品
    async deleteAllChecked() {
      try {
        // 派发请求更新数据
        await this.$store.dispatch('shopcart/DeleteAllChecked')
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 全选框
    async updataAllChecked() {
      let isChecked = this.isAllChecked ? '0' : '1'
      // 做成功判断
      try {
        await this.$store.dispatch('shopcart/updataAllIsChecked', isChecked)
        this.getData()
      } catch (error) {
        error.message
      }
    },
    // 提交结算函数
    settlement() {
      if (this.isShopCartChecked) {
        this.$router.push('/trade')
      } else {
        alert('没有商品被选中')
      }
    }
  },
  computed: {
    // 获取数据
    ...mapGetters('shopcart', ['cartList']),
    // 获取列表
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    // 计算全选框状态
    isAllChecked() {
      return this.cartInfoList.every((cart) => {
        return cart.isChecked === 1
      })
    },
    // 计算是否有商品被选中
    isShopCartChecked() {
      let state
      this.cartInfoList.forEach((cart) => {
        if (cart.isChecked === 1) {
          state = true
        }
      })
      return state
    }
  },

}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>