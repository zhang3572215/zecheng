<template>
  <div class="app-container">
    <div class="task-fillter">
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple-dark">
            <el-row class="flex">
              <el-col :span="6">任务类型:</el-col>
              <el-col :span="18">
                <el-select v-model="taskType" placeholder="请选择" @change="typeChangeHandle">
                  <el-option
                    v-for="item in taskTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>
          </el-col>
        <el-col :span="6"><div class="grid-content bg-purple-dark"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-dark"></div></el-col>
      </el-row>
    </div>
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card" @tab-click="tabsHandleClick">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <el-table :data="tableData" border fit highlight-current-row style="width: 100%" :header-row-style="{color:'#333333'}">
            <!-- <el-table-column prop="id" label="id" width="180" /> -->
            <!-- <el-table-column v-for="(iv,ik,ids) in tableData[0]" :key="ids" :label="formThead[ids]" :prop="ik" min-width="80" align="center">
            </el-table-column> -->
            <el-table-column prop="id" min-width="40" label="任务id" align="center"></el-table-column>
            <el-table-column prop="title" min-width="160" label="任务标题" align="center"></el-table-column>
            <el-table-column prop="label" min-width="80" label="APP标签" align="center"></el-table-column>
            <el-table-column prop="equipment" min-width="35" label="任务设备" align="center"></el-table-column>
            <el-table-column prop="type" min-width="35" label="任务类型" align="center"></el-table-column>
            <el-table-column min-width="70" label="任务合计" align="center">
              <el-table-column prop="money" min-width="30" label="任务单价" align="center"></el-table-column>
              <el-table-column prop="count" min-width="30" label="任务数量" align="center"></el-table-column>
              <el-table-column prop="amount" min-width="30" label="总价" align="center"></el-table-column>
            </el-table-column>
            <el-table-column prop="connection_count" min-width="24" label="已接单数量" align="center"></el-table-column>
            <el-table-column prop="completion_count" min-width="24" label="已完成数量" align="center"></el-table-column>
            <el-table-column prop="timeframe" min-width="20" label="审核限时" align="center"></el-table-column>
            <el-table-column prop="max" min-width="20" label="任务限次" align="center"></el-table-column>
            <el-table-column prop="endtime" min-width="40" label="任务截止时间" align="center"></el-table-column>
            <el-table-column prop="description" min-width="40" label="任务描述" align="center"></el-table-column>
            <el-table-column prop="date" min-width="40" label="任务发布时间" align="center"></el-table-column>
            <el-table-column min-width="40" label="任务状态" align="center">
              <template slot-scope="scope">
                {{scope.row.status | taskStatusFillter}}
              </template>
            </el-table-column>
            <!-- 添加条目请追加到此处上方 -->
            <el-table-column min-width="40" label="操作" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button @click="handleRowClick(scope.row.id)" type="text" size="small">查看</el-button>
                <el-button @click="handleRowVerify(scope.row.id)" type="text" size="small">审核</el-button>
              </template>
            </el-table-column>
          </el-table>
        </keep-alive>
        <div class="task-list-page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="current"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next"
            :total="totle">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { postTaskVerifyData } from '@/api/task'
export default {
  data() {
    return {
      tabMapOptions: [
        { label: '全部', key: 'n' },
        { label: '待审核', key: '0' },
        { label: '审核未通过 ', key: '9' }
      ],
      activeName: 'n',
      createdTimes: 0,
      submitData:{
        page: 0,
        number: 20
      },
      taskType: '0',
      taskTypeOptions:[{
          value: '0',
          label: '全部'
        },{
          value: '1',
          label: '注册下载'
        },{
          value: '2',
          label: '电商相关 '
        },{
          value: '3',
          label: '多天阶梯 '
        },{
          value: '4',
          label: '纯关注'
        },{
          value: '5',
          label: '投票砍价'
        },{
          value: '6',
          label: '纯转发'
        },{
          value: '7',
          label: '其他  '
        }
      ]
    }
  },
  computed: {
    ...mapState('taskList',[
      'token',
      'current',
      'pageSize',
      'totle',
      'tableData'
    ])
  },
  filters:{
    taskStatusFillter(type){
      if (!type) return '未知'
      switch (type) {
        case '0':
          return '审核中'
          break;
        case '1':
          return '已发布'
          break;
        case '3':
          return '已结束'
          break;
        case '9':
          return '审核未通过'
          break;
        case '10':
          return '已取消'
          break;
        default:
          return '未知'
          break;
      }
    }
  },
  mounted(){
      let that = this      
      this.getTaskListBy({
        page: 0,
        number: 20
      })
  },
  methods:{
      ...mapActions('taskList',[
          'getTaskListBy'
      ]),
      tabsHandleClick(tab, event){
        console.log(tab);
        let that = this
        if (tab.index == 0) {
          if (that.submitData.status) { 
            delete that.submitData.status
            that.getTaskListBy(that.submitData)
          }else {
            that.getTaskListBy(that.submitData)
          }
        }else {
          Object.assign(that.submitData,{status: tab.name})
          that.getTaskListBy(that.submitData)
        }
      },
      typeChangeHandle(val){
        let that = this
        console.log(val)
        if (val =='0') {
          if (that.submitData.type){
            delete that.submitData.type
            that.getTaskListBy(that.submitData)
          }else {
            that.getTaskListBy(that.submitData)
          }
        }else {
          Object.assign(that.submitData,{type: val})
          that.getTaskListBy(that.submitData)
        }
      },
      handleSizeChange(val) {
        let that = this
        if (that.pageSize != val) {
          Object.assign(that.submitData,{number: val})
          that.getTaskListBy(that.submitData)
        }
      },
      handleCurrentChange(val){
        let that = this
        console.log(`当前页: ${val}`);
        if (that.current != val) {
          Object.assign(that.submitData,{page:val})
          that.getTaskListBy(that.submitData)
        }
      },
      handleRowClick(id){
        console.log(id)
        this.$router.push({
          path: '/task/detail',
          query: {id:id}
        })
      },
      handleRowVerify(id) {
        this.$alert('点击确定会将此条任务改为已审核状态，若不小心误操作请点击取消', '审核提示', {
          confirmButtonText: '确定',
          showCancelButton: true,
          cancelButtonText: '取消',
          callback: action => {
            // console.log(action)
            if (action == 'confirm') {
              postTaskVerifyData({
                token: this.token,
                id: id
              }).then(res => {
                console.log(res)
              }).catch(err => {
                console.log(err.message)
              })
            }
          }
        });
        
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