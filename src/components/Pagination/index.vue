<template>
  <div class="pagination">
    <button :disabled="pageNo===1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startNumAndEndNum.start>1" @click="$emit('getPageNo',1)" :class="{active:pageNo===1}">1</button>
    <button v-if="startNumAndEndNum.start>2">···</button>
    <!-- 连续的分页器 -->
    <template v-for="(page,index) in startNumAndEndNum.end">
      <button v-if="page>=startNumAndEndNum.start" :key="index" @click="$emit('getPageNo',page)" :class="{active:pageNo===page}">{{page}}</button>
    </template>

    <button v-if="startNumAndEndNum.end<totalPage-1">···</button>
    <button v-if="startNumAndEndNum.end<totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo===totalPage}">{{totalPage}}</button>
    <button :disabled="pageNo===totalPage" @click="$emit('getPageNo',totalPage)">上一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    // 总页数
    totalPage() {
      // 总页数等于总数据除以每页展示数据条数向上取整
      return Math.ceil(this.total / this.pageSize)
    },
    // 计算连续分页的开始值和结束值
    startNumAndEndNum() {
      const { pageNo, pageSize, continues } = this
      let start, end
      // 如果总页数小于连续页数的情况
      if (continues > this.totalPage) {
        start = 1
        end = this.totalPage
      } else {
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        // 判断如果start出现负数或零的情况
        if (start < 1) {
          start = 1
          end = continues
        }
        // 判断end出现大于总页数的情况
        if (end > this.totalPage) {
          end = this.totalPage
          start = this.totalPage - continues + 1
        }
      }
      return { start, end }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>