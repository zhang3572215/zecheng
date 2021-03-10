<template>
    <div class="pwd-container">
        <el-form ref="form" :model="submitData" label-width="80px" >
            <el-form-item label="原密码" class="col-8">
                <el-input v-model="submitData.oldpassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码" class="col-8">
                <el-input v-model="submitData.newpassword"></el-input>
            </el-form-item>
            <el-form-item class="col-8">
                <el-button type="primary" @click="onSubmit">提交修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import request from '@/utils/request'
    export default {
        data() {
            return {
                submitData: {
                    token: getToken(),
                    oldpassword: '',
                    newpassword: ''
                }
            }
        },
        methods: {
            onSubmit() {
                request({
                    url: 'updatePassword',
                    method: 'post',
                    data: this.submitData
                }).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            }
        },
    }
</script>

<style scoped>
    .pwd-container {
        padding: 30px;
    }
    form {
        text-align: center;
    }
    .col-8 {
        width: 30%;
        margin: 0 auto 22px;
    }
</style>