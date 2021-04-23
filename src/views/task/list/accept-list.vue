<template>
    <div class="container">
        <el-table :data="list" border fit highlight-current-row style="width: 100%" :header-row-style="{color:'#333333'}">
            <!-- <el-table-column prop="id" label="id" width="180" /> -->
            <!-- <el-table-column v-for="(iv,ik,ids) in tableData[0]" :key="ids" :label="formThead[ids]" :prop="ik" min-width="80" align="center">
            </el-table-column> -->
            <el-table-column prop="id" min-width="20" label="用户接单ID" align="center"/>
            <el-table-column prop="tid" min-width="20" label="任务ID" align="center"/>
            <el-table-column prop="mid" min-width="20" label="用户ID" align="center"/>
            <el-table-column prop="title" min-width="40" label="任务标题" align="center"/>
            <el-table-column prop="money" min-width="20" label="任务金额" align="center"/>
            <el-table-column min-width="20" label="完成限时" align="center">
                <template slot-scope="{row}">
                <span>{{row.endtype | endTypeFilter}}</span>
                </template>
            </el-table-column>
            <el-table-column min-width="40" label="用户头像" align="center">
                <template slot-scope="{row}">
                <el-image
                    style="width: 80px; height: 80px"
                    :src="row.headimgurl"
                    fit="scale-down"
                />
                </template>
            </el-table-column>
            <el-table-column prop="tasksEndTime" min-width="40" label="最晚交单时间" align="center"/>
            <el-table-column min-width="20" label="任务状态" align="center">
                <template slot-scope="{row}">
                <span>{{row.type | typeFilter}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="reasons" min-width="40" label="驳回备注" align="center"/>
            <!-- 添加条目请追加到此处上方 -->
            <!-- <el-table-column min-width="40" label="操作" align="center" fixed="right">
              <template slot-scope="{row}">
                <el-button @click="handleRowClick(row.id)" type="text" size="small">查看</el-button>
                <el-button @click="handleRowVerify(row.id)" type="text" size="small">审核</el-button>
              </template>
            </el-table-column> -->
          </el-table>
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
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
    export default {
        data() {
            return {
                submitData:{
                    page: 0,
                    number: 20
                }
            }
        },
        computed: {
            ...mapState('acceptList',[
                'list',
                'pageSize',
                'totle',
                'current'
            ])
        },
        filters: {
            endTypeFilter: function(val) {
                if (!val)return '未知';
                let str = ''
                switch (val) {
                    case '0':
                        str = '10分钟'
                        break;
                    case '1':
                        str = '20分钟'
                        break;
                    case '2':
                        str = '30分钟'
                        break;
                    case '3':
                        str = '60分钟'
                        break;
                    default:
                        str = 未知
                        break;
                }
                return str
            },
            typeFilter: function(val) {
                if (!val)return '未知';
                let str = ''
                switch (val) {
                    case '1':
                        str = '进行中'
                        break;
                    case '2':
                        str = '主动放弃'
                        break;
                    case '3':
                        str = '待审核'
                        break;
                    case '5':
                        str = '未通过'
                        break;
                    case '9':
                        str = '已完成'
                        break;
                    case '10':
                        str = '超时未完成'
                        break;
                    case '13':
                        str = '任务已结束'
                        break;
                    default:
                        str = 未知
                        break;
                }
                return str
            }
        },
        mounted () {
            if (this.$route.params.id) {
                console.log(this.$route.params.id   )
                Object.assign(this.submitData,{id: this.$route.params.id})
                this.getAcceptListBy(this.submitData)
            }
        },
        methods: {
            handleSizeChange(val) {
                let that = this
                if (that.pageSize != val) {
                    Object.assign(that.submitData,{number: val})
                    that.getAcceptListBy(that.submitData)
                }
            },
            handleCurrentChange(val){
                let that = this
                console.log(`当前页: ${val}`);
                if (that.current != val-1) {
                    Object.assign(that.submitData,{page:val-1})
                    that.getAcceptListBy(that.submitData)
                }
            },
            ...mapActions('acceptList',[
                'getAcceptListBy'
            ])
        },
    }
</script>

<style scoped>
.container {
    padding: 30px 45px;
}
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