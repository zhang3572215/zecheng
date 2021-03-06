<template>
    <div class="banner-container">
        <div class="upload-group">
            <div class="banner-title">轮播图</div>
            <div class="pic-list">
                <el-table :data="pics" border fit highlight-current-row style="width: 100%" :header-row-style="{color:'#333333'}">
                    <el-table-column prop="num" min-width="40" label="序号" align="center" />
                    <el-table-column prop="name" min-width="40" label="名称" align="center" />
                    <el-table-column prop="link" min-width="80" label="链接地址" align="center" />
                    <el-table-column min-width="40" label="图片" align="center">
                        <template slot-scope="scope">
                        <el-image
                            style="width: 80px; height: 80px"
                            :src="scope.row.pic"
                            fit="scale-down"/>
                        </template>
                    </el-table-column>
                    <!-- 添加条目请追加到此处上方 -->
                    <el-table-column min-width="40" label="操作" align="center" fixed="right">
                        <template slot-scope="scope">
                        <el-button @click="handleRowEdit(scope.row.num)" type="text" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                    <template slot="append" v-if="pics.length<5">
                        <div class="table-add">添加一条</div> 
                    </template>
                </el-table>
            </div>
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%">
                <span>
                    <el-form label-width="80px">
                        <el-form-item label="序号">
                            <el-input v-model="submitData.num" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="名称">
                            <el-input v-model="submitData.name"></el-input>
                        </el-form-item>
                        <el-form-item label="链接地址">
                            <el-input v-model="submitData.link"></el-input>
                        </el-form-item>
                        <el-form-item label="图片">
                            
                            <div class="file-upload">
                                <input type="file" @change="uploadFile">
                                <el-image :src="submitData.pic" fit="contain" class="file-image" v-if="submitData.pic"></el-image>
                                <div class="file-under" v-else>+</div>
                            </div>
                        </el-form-item>
                    </el-form>
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleEditPic">确 定</el-button>
                </span>
            </el-dialog>          
        </div>        
    </div>
</template>

<script>
import { getToken } from '../../../utils/auth'
    export default {
        data() {
            return {
                token: getToken(),
                dialogVisible: false,
                pics: [{
                    num: 0,
                    name: '图片1',
                    pic: '1',
                    link: '2'
                },{
                    num: 1,
                    name: '图片2',
                    pic: '1',
                    link: '2'
                },{
                    num: 2,
                    name: '图片3',
                    pic: '1',
                    link: '3'
                },{
                    num: 3,
                    name: '图片4',
                    pic: '1',
                    link: 'www.baidu.com'
                }],
                submitData:{
                    num: 0,
                    name: '',
                    link: '',
                    pic: ''
                }
            }
        },
        methods: {
            handleRowEdit(idx) {
                let that = this
                that.submitData = that.pics[idx]
                that.dialogVisible = true
            },
            uploadFile(e){
                let that = this
                console.log(e.target.files[0])
                let reader = new FileReader()
                reader.readAsDataURL(e.target.files[0])
                reader.onloadend = function (){
                    let dataUrl = reader.result;
                    console.log(dataUrl)
                    that.submitData.pic = dataUrl
                }
            },
            handleEditPic(){
                that.submitData.pic
            }
        }
    }
</script>

<style scoped>
    .banner-container {
        padding: 15px;
        background-color: #f5f5f5;
    }
    .banner-title {
        margin: 15px 0;
        font-size: 1rem;
        line-height: 1em;
        color: #333;
        font-weight: 700;
    }
    .file-upload {
        width: 160px;
        height: 160px;
        border-radius: 8px;
        border: 1px dashed #ddd;
        position: relative;
        z-index: 100;
    }
    .file-upload > input {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 300;
        background-color: transparent;
        opacity: 0;
    }
    .file-under {
        width: 100%;
        height: 100%;
        position: relative;
        text-align: center;
        line-height: 160px;
        font-size: 40px;
        color: #999;
    }
    .file-image {
        width: 100%;
        height: 100%;
        position: relative;
        text-align: center;
    }
    .table-add {
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
    }
</style>