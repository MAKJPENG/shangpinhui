<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone">
        <span class="error-msg">{{ errorMessages.phone }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code">
        <button style="width:70px;height:38px" @click="getCode">获取验证码</button>
        <span class="error-msg">{{ errorMessages.code }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password" placeholder="请输入你的登录密码" v-model="password">
        <span class="error-msg">{{ errorMessages.password }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="password" placeholder="请输入确认密码" v-model="password1">
        <span class="error-msg">{{ errorMessages.password1 }}</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" v-model="agree">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errorMessages.agree }}</span>
      </div>
      <div class="btn">
        <button @click="doneRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      phone: '',
      code: '',
      password: '',
      password1: '',
      agree: true,
      errorMessages: {
        phone: '',
        code: '',
        password: '',
        password1: '',
        agree: '',
      },
    }
  },
  methods: {
    // 获取验证码
    async getCode() {
      try {
        await this.$store.dispatch('user/getCode', this.phone)
        this.code = this.$store.state.user.code
      } catch (error) {
        error.message
      }
    },
    // 完成注册
    async doneRegister() {
      if (this.validateForm()) {
        // 表单验证通过，执行注册逻辑
        // ...
        try {
          // 结构赋值
          const { phone, password, code } = this
          // 判断字段非空和前后密码是否相等
          await this.$store.dispatch('user/userRegister', { phone, password, code })
          // 注册成功跳转路由
          this.$router.push({
            path: '/login',
            query: {
              phone
            }
          })
        } catch (error) {
          alert(error.message)
        }
      }

    },
    // 校验整个表单
    validateForm() {
      for (let field in this.errorMessages) {
        this.validateField(field);
      }

      for (let field in this.errorMessages) {
        if (this.errorMessages[field] !== '') {
          return false;
        }
      }

      return true;
    },
    // 校验单个字段
    validateField(field) {
      this.errorMessages[field] = '';

      switch (field) {
        case 'phone':
          if (!/^\d{11}$/.test(this.phone)) {
            this.errorMessages.phone = '手机号码必须是11位数字';
          }
          break;

        case 'code':
          if (!/^\d{6}$/.test(this.code)) {
            this.errorMessages.code = '验证码必须是六位数字';
          }
          break;

        case 'password':
          if (!/^[A-Za-z0-9]{8,16}$/.test(this.password)) {
            this.errorMessages.password = '密码必须是8到16位数字或大小写字母';
          }
          break;

        case 'password1':
          if (this.password !== this.password1) {
            this.errorMessages.password1 = '两次密码输入不一致';
          }
          break;

        case 'agree':
          if (!this.agree) {
            this.errorMessages.agree = '请同意协议并注册';
          }
          break;

        default:
          break;
      }
    },
  },
  watch: {
    phone() {
      this.validateField('phone');
    },
    code() {
      this.validateField('code');
    },
    password() {
      this.validateField('password');
    },
    password1() {
      this.validateField('password1');
    },
    agree() {
      this.validateField('agree');
    },
  },
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>