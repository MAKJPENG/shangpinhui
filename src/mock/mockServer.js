// 引入mock
import Mock from 'mockjs'
// 引入json
import banner from './banners.json'
import floor from './floors.json'

// 使用mock,第一个是请求地址，第二个是请求数据
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })