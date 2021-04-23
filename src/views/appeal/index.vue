<template>
  <div class="app-container">
    <el-tabs v-model="submitData.type" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in typeList" :key="item.type" :label="item.text" :name="item.type">
        <el-table :data="list" border fit highlight-current-row style="width: 100%" :header-row-style="{color:'#333333'}">
          <!-- <el-table-column prop="id" label="id" width="180" /> -->
          <!-- <el-table-column v-for="(iv,ik,ids) in tableData[0]" :key="ids" :label="formThead[ids]" :prop="ik" min-width="80" align="center">
            </el-table-column> -->
          <el-table-column prop="id" min-width="30" label="申诉id" align="center" />
          <el-table-column min-width="30" label="任务id" align="center" >
            <template slot-scope="{row}">
              <div style="cursor:pointer;" @click="toTaskDetail(row.tid)">{{ row.tid }}</div>
            </template>
          </el-table-column>
          <el-table-column min-width="20" label="状态" align="center">
            <template slot-scope="{row}">
              {{ row.type | typeFillter }}
            </template>
          </el-table-column>
          <el-table-column prop="text" min-width="80" label="申诉文字内容" align="center" />
          <el-table-column min-width="40" label="申诉图片" align="center">
            <template slot-scope="{row}">
              <el-image :src="baseUrl+row.url" class="appeal-img" fit="contain"/>
            </template>
          </el-table-column>
          <el-table-column prop="date" min-width="40" label="提交时间" align="center" />
          <!-- 添加条目请追加到此处上方 -->
          <el-table-column min-width="20" label="操作" align="center" fixed="right">
                <template slot-scope="{row}">
                  <el-button @click="handleTask(row.id)" type="text" size="small">处理</el-button>
                </template>
            </el-table-column>
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { updateHelpList } from '@/api/appeal'
export default {
  data () {
    return {
      submitData: {
        page: 0,
        number: 20,
        type: '0'
      },
      baseUrl: process.env.VUE_APP_BASE_API,
      typeList:[{
        type: '0',
        text: '未处理'
      },{
        type: '1',
        text: '已处理'
      }]
    }
  },
  computed: {
    ...mapState('user',[
      'token'
    ]),
    ...mapState('appeal', [      
      'current',
      'pageSize',
      'totle',
      'list'
    ])
  },
  filters: {
    typeFillter: function(val) {
      if (!val && val!='0') return '';
      return val=='1'?'已处理':'未处理'
    }
  },
  watch: {
    submitData: {
      handler(newObj, oldName) { //特别注意，不能用箭头函数，箭头函数，this指向全局
        this.getHelpListBy(newObj)
      },
      deep: true
    }
  },
  mounted () {
    const that = this
    that.getHelpListBy(that.submitData)
  },
  methods: {
    ...mapActions('appeal', [
      'getHelpListBy'
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
      if (that.current != val-1) {
        Object.assign(that.submitData, { page: val-1 })
        that.getCashListBy(that.submitData)
      }
    },
    handleTask(id){
      let postData = new FormData()
      postData.append('token',this.token)
      postData.append('id',id)
      updateHelpList(postData).then(res => {
        console.log(res)
        if (res.code == '000000') {
          this.getCashListBy(this.submitData)
        }
      })
    },
    toTaskDetail(tid){
      this.$router.push({
        path:'/task/detail',
        query: {
          id: tid
        }
      })
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
    .appeal-img {
      width: 160px;
      height: 160px;
    }
</style>
