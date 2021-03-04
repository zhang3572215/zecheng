<template>
  <div class="app-container">
    <el-table :data="list" border fit highlight-current-row style="width: 100%" :header-row-style="{color:'#333333'}">
      <!-- <el-table-column prop="id" label="id" width="180" /> -->
      <!-- <el-table-column v-for="(iv,ik,ids) in tableData[0]" :key="ids" :label="formThead[ids]" :prop="ik" min-width="80" align="center">
        </el-table-column> -->
      <el-table-column prop="id" min-width="40" label="用户ID" align="center" />
      <el-table-column prop="phone" min-width="40" label="用户手机号" align="center" />
      <el-table-column prop="amount" min-width="20" label="余额" align="center" />
      <el-table-column prop="openid" min-width="60" label="openid" align="center" />
      <el-table-column prop="nickname" min-width="40" label="用户昵称" align="center" />
      <el-table-column min-width="20" label="性别" align="center">
        <template slot-scope="scope">
          {{ scope.row.sex == 1 ?'男':'女' }}
        </template>
      </el-table-column>
      <el-table-column prop="language" min-width="24" label="语言" align="center" />
      <el-table-column prop="city" min-width="20" label="城市" align="center" />
      <el-table-column prop="province" min-width="20" label="省份" align="center" />
      <el-table-column prop="country" min-width="20" label="国家" align="center" />
      <el-table-column min-width="40" label="用户头像" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 80px; height: 80px"
            :src="scope.row.headimgurl"
            fit="scale-down"
          />
        </template>
      </el-table-column>
      <el-table-column prop="" min-width="40" label="是否绑定" align="center">
        <template slot-scope="scope">
          {{ scope.row.is_bind ?'是':'否' }}
        </template>
      </el-table-column>
      <el-table-column prop="logintime" min-width="40" label="最后登录时间" align="center" />
      <el-table-column prop="mytasks_count" min-width="40" label="接任务数量" align="center" />
      <el-table-column prop="tasks_count" min-width="40" label="发任务数量" align="center" />
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
    ...mapState('userList', [
      'token',
      'current',
      'pageSize',
      'totle',
      'list'
    ])
  },
  mounted () {
    const that = this
    Object.assign(that.submitData, {
      token: that.token
    })
    that.getUserListBy(that.submitData)
  },
  methods: {
    ...mapActions('userList', [
      'getUserListBy'
    ]),
    handleSizeChange (val) {
      const that = this
      if (that.pageSize != val) {
        Object.assign(that.submitData, { number: val })
        that.getUserListBy(that.submitData)
      }
    },
    handleCurrentChange (val) {
      const that = this
      console.log(`当前页: ${val}`)
      if (that.current != val) {
        Object.assign(that.submitData, { page: val })
        that.getUserListBy(that.submitData)
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
