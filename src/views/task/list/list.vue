<template>
  <div class="app-container">
    <div class="task-fillter">
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple-dark">
            <el-row>
              <el-col :span="6" style="line-height: 36px;">任务类型:</el-col>
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
        <el-col :span="12" :offset="6" style="text-align: right;">
          <el-button type="primary" @click="$router.push('/task/new')">新增</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card" @tab-click="tabsHandleClick">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive> -->
          <el-table :data="tableData" border fit highlight-current-row style="width: 100%" :header-row-style="{color:'#333333'}">
            <!-- <el-table-column prop="id" label="id" width="180" /> -->
            <!-- <el-table-column v-for="(iv,ik,ids) in tableData[0]" :key="ids" :label="formThead[ids]" :prop="ik" min-width="80" align="center">
            </el-table-column> -->
            <el-table-column prop="id" min-width="40" label="任务id" align="center"></el-table-column>
            <el-table-column prop="title" min-width="60" label="任务标题" align="center"></el-table-column>
            <el-table-column prop="label" min-width="40" label="APP标签" align="center"></el-table-column>
            <el-table-column prop="equipment" min-width="30" label="任务设备" align="center"></el-table-column>
            <el-table-column prop="type" min-width="30" label="任务类型" align="center"></el-table-column>
            <el-table-column min-width="70" label="任务合计" align="center">
              <el-table-column prop="money" min-width="24" label="任务单价" align="center"></el-table-column>
              <el-table-column prop="count" min-width="24" label="任务数量" align="center"></el-table-column>
              <el-table-column prop="amount" min-width="24" label="总价" align="center"></el-table-column>
            </el-table-column>
            <el-table-column prop="connection_count" min-width="24" label="已接单数量" align="center"></el-table-column>
            <el-table-column prop="completion_count" min-width="24" label="已完成数量" align="center"></el-table-column>
            <el-table-column prop="timeframe" min-width="20" label="审核限时" align="center"></el-table-column>
            <el-table-column prop="max" min-width="20" label="任务限次" align="center"></el-table-column>
            <el-table-column prop="endtime" min-width="40" label="任务截止时间" align="center"></el-table-column>
            <el-table-column prop="description" min-width="40" label="任务描述" align="center"></el-table-column>
            <el-table-column prop="date" min-width="40" label="任务发布时间" align="center"></el-table-column>
            <el-table-column min-width="30" label="任务状态" align="center">
              <template slot-scope="scope">
                {{scope.row.status | taskStatusFillter}}
              </template>
            </el-table-column>
            <!-- 添加条目请追加到此处上方 -->
            <el-table-column min-width="40" label="操作" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button @click="handleRowClick(scope.row.id)" type="text" size="small">查看</el-button>
                <el-button @click="handleRowVerify(scope.row.id)" type="text" size="small">审核</el-button>
                <el-button @click="handleSetOption(scope.row)" type="text" size="small">设置</el-button>
              </template>
            </el-table-column>
          </el-table>
        <!-- </keep-alive> -->
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
      <!-- </el-tab-pane>
    </el-tabs> -->
    <el-dialog
        title="设置"
        top="10vh"
        :visible.sync="setVisible"
        :close-on-click-modal="false"
        width="30%">
        <span>
            <el-form label-width="120px">
                <el-form-item label="id">
                    <el-input v-model="taskDataSet.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="是否vip可见">
                    <el-switch v-model="taskDataSet.is_vip" :active-value="2" inactive-value="1"></el-switch>
                </el-form-item>
                <el-form-item label="是否头部展示">
                    <el-switch v-model="taskDataSet.is_top" :active-value="1" inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="taskDataSet.sort"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="taskDataSet.heat"></el-input>
                </el-form-item>
            </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="setVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmEdit">确 定</el-button>
        </span>
    </el-dialog>
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
      setVisible: false,
      activeName: '',
      createdTimes: 0,
      submitData:{
        page: 0,
        number: 20
      },
      taskDataSet:{
          id: '',
          is_vip: false,
          is_top: false,
          sort: 0,
          heat: 0
      },
      preEditData:{
          id: '',
          is_vip: false,
          is_top: false,
          sort: 0,
          heat: 0
      },
      taskType: '0',
    }
  },
  computed: {
    ...mapState('taskList',[
      'token',
      'current',
      'pageSize',
      'totle',
      'tableData'
    ]),
    ...mapState([
      'taskTypeOptions'
    ])
  },
  // filters:{
  //   taskStatusFillter(type){
  //     if (!type) return '未知'
  //     switch (type) {
  //       case '0':
  //         return '待审核'
  //         break;
  //       case '1':
  //         return '进行中'
  //         break;
  //       case '3':
  //         return '已完成'
  //         break;
  //       case '9':
  //         return '未通过'
  //         break;
  //       case '10':
  //         return '已取消'
  //         break;
  //       default:
  //         return '未知'
  //         break;
  //     }
  //   }
  // },
  mounted(){
      let that = this      
      this.getTaskListBy({
        page: 0,
        number: 20
      })
  },
  methods:{
      ...mapActions('taskList',[
          'getTaskListBy',
          'upDataTaskDetailBy'
      ]),
      // tabsHandleClick(tab, event){
      //   console.log(tab);
      //   let that = this
      //   if (tab.index == 0) {
      //     if (that.submitData.status) { 
      //       delete that.submitData.status
      //       that.getTaskListBy(that.submitData)
      //     }else {
      //       that.getTaskListBy(that.submitData)
      //     }
      //   }else {
      //     Object.assign(that.submitData,{status: tab.name})
      //     that.getTaskListBy(that.submitData)
      //   }
      // },
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
              let formData = new FormData();
              formData.append(token, this.token);
              formData.append(id, id)
              postTaskVerifyData(formData).then(res => {
                console.log(res)
              }).catch(err => {
                console.log(err.message)
              })
            }
          }
        });        
      },
      handleSetOption(obj){
        Object.assign(this.taskDataSet,{
            id: obj.id,
            is_vip: obj.is_vip,
            is_top: obj.is_top,
            sort: obj.sort,
            heat: obj.heat
        })
        Object.assign(this.preEditData,{
            id: obj.id,
            is_vip: obj.is_vip,
            is_top: obj.is_top,
            sort: obj.sort,
            heat: obj.heat
        })
        this.setVisible = true
      },
      confirmEdit(){
          let flag = 0
          let postData = new Object()
          for (const key in this.taskDataSet) {
              if (this.taskDataSet[key] != this.preEditData[key]) {
                Object.assign(postData,{
                    [key]: this.taskDataSet[key]
                })
                flag += 1
              }
          }
          Object.assign(postData,{
              id: this.taskDataSet.id,
              token: this.token
          })
          if (flag > 0) {
              console.log(postData)
              let formData = new FormData();
              for (const key in postData) {
                formData.append([key], postData[key]);
              }
              console.log(formData)
              this.upDataTaskDetailBy(formData).then(res => {
                console.log(res)
                this.getTaskListBy({
                    page: this.current,
                    number: this.pageSize
                })
              })
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
    .task-fillter {
      margin-bottom: 20px;
    }
    .el-table th > .cell{
      color: #333333!important;
    }
</style>