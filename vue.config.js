const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭eslint检查
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn'
      },
    }
    /*    proxy: {
         '/api': {
           target: 'http://gmall-h5-api.atguigu.cn', // 替换为你的后台接口服务器的实际地址
           changeOrigin: true,
           pathRewrite: {
             '^/api': 'http://gmall-h5-api.atguigu.cn' // 如果后台接口的URL中有/api前缀，需要将其替换为空字符串
           }
         }
       } */
  }
})
