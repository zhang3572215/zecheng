<template>
  <div class="app-container">
    <el-table :data="list" border fit highlight-current-row style="width: 100%" :header-row-style="{color:'#333333'}">
      <!-- <el-table-column prop="id" label="id" width="180" /> -->
      <!-- <el-table-column v-for="(iv,ik,ids) in tableData[0]" :key="ids" :label="formThead[ids]" :prop="ik" min-width="80" align="center">
        </el-table-column> -->
      <el-table-column prop="id" min-width="40" label="提现id" align="center" />
      <el-table-column prop="mid" min-width="40" label="提现用户id" align="center" />
      <el-table-column min-width="20" label="类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.type | optionTypeFillter }}
        </template>
      </el-table-column>
      <el-table-column prop="amount" min-width="30" label="金额" align="center" />
      <el-table-column prop="startdate" min-width="40" label="开始时间" align="center" />
      <el-table-column prop="enddate" min-width="40" label="结束时间" align="center" />
      <el-table-column min-width="20" label="提现状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.status == 0?'进行中':'已完成' }}
        </template>
      </el-table-column>
      <el-table-column prop="nickname" min-width="40" label="用户昵称" align="center" />
      <el-table-column prop="balance" min-width="30" label="账户余额" align="center" />

      <!-- 添加条目请追加到此处上方 -->
      <!-- <el-table-column min-width="40" label="操作" align="center" fixed="right">
            <template slot-scope="scope">
            <el-button @click="handleRowClick(scope.row.id)" type="text" size="small">查看</el-button>
            <el-button @click="handleRowVerify(scope.row.id)" type="text" size="small">审核</el-button>
            </template>
        </el-table-column> -->
    </el-table>
    <div class="task-list-page">
      <el-pagination
        :current-page="current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="totle"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      submitData: {
        page: 0,
        number: 20
      }
    }
  },
  computed: {
    ...mapState('cashOutList', [
      'token',
      'current',
      'pageSize',
      'totle',
      'list'
    ])
  },
  filters: {
    optionTypeFillter (val) {
      if (!val) return '未知类型'
      switch (val) {
        case '3':
          return '提现'
          break
        case '4':
          return '充值'
          break
        default:
          return '未知类型'
          break
      }
    }
  },
  mounted () {
    const that = this
    Object.assign(that.submitData, {
      token: that.token
    })
    that.getCashListBy(that.submitData)
  },
  methods: {
    ...mapActions('cashOutList', [
      'getCashListBy'
    ]),
    handleSizeChange (val) {
      const that = this
      if (that.pageSize != val) {
        Object.assign(that.submitData, { number: val })
        that.getCashListBy(that.submitData)
      }
    },
    handleCurrentChange (val) {
      const that = this
      console.log(`当前页: ${val}`)
      if (that.current != val) {
        Object.assign(that.submitData, { page: val })
        that.getCashListBy(that.submitData)
      }
    }
  }
}
</script>
<style scoped>
    .task-list-page {
      margin-top: 10px;
      padding-right: 15px;
      text-align: center;
    }
    .flex {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }
    .el-table th > .cell{
      color: #333333!important;
    }
</style>
