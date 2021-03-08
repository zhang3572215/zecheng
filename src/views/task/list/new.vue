<template>
    <div class="new-task">
        <h3>新建任务</h3>
        <el-form ref="form" :model="submitData" inline label-width="120px" style="background-color:white;padding-top:22px;">
            <el-form-item label="任务类型">
                <el-select v-model="submitData.type" placeholder="请选择活动区域">
                <el-option 
                    v-for="item in taskTypeOptions"
                    :label="item.label"
                    :value="item.value"
                    :key="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="支持设备">
                <el-select v-model="submitData.type" placeholder="请选择活动区域">
                <el-option label="全部" value="全部"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapState } from 'vuex'
    export default {
        data() {
            return {
                submitData:{
                    title: '',
                    label: '',
                    equipment: '全部',
                    type: "全部", 
                    money: 0.90,
                    count: "10", 
                    rates: "0.90",
                    connection_count: "1",
                    completion_count: "1", 
                    amount: "10.00",
                    timeframe: "0",
                    max: "3",
                    endtime: "2021-02-24 00:00",
                    description: "后视镜",
                    date: "2021-02-24 11:24",     // 任务发布时间
                    status: "1",
                    is_top: "0",
                    reasons: null,
                    is_vip: "1",
                    m_id: "3",
                    headimgurl: "http://api.zechengnet.cn/Public/tx.jpg",
                    heat: "10",
                    sort: "10"
                }
            }
        },
        computed:{
            ...mapState([
                'taskTypeOptions'
            ])
        },
        methods: {
            onSubmit() {
                console.log(this.submitData)
            }
        },
    }
</script>

<style scoped>
    .new-task {
        padding: 30px;
        background-color: #f5f5f5;
    }
    h3 {
        margin: 0;
        padding: 20px 30px;
        background: #fff;
    }
    .el-form-item {
        width: 40%;
        margin: 0 5% 22px;
    }
</style>