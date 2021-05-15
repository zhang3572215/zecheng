<template>
    <div class="report-container">
        <div class="report-group">
            <div class="report-title">活动线报</div>
            <el-row style="margin: 15px 0;">
                <el-col :span="2" style="line-height: 36px;">标题搜索：</el-col>
                <el-col :span="4"><el-input v-model="titleSearch" placeholder="请输入标题搜索" @change="titleChange"></el-input></el-col>
                <el-col :span="4" :offset="1"><el-button type="primary" @click="getActivityList">搜索</el-button></el-col>
                <el-col :span="13" style="text-align: right">
                    <el-button  type="primary" @click="addVisible=true">新增线报</el-button>
                </el-col>
            </el-row>
            <div class="pic-list">
                <el-table :data="reports" border fit highlight-current-row style="width: 100%" :header-row-style="{color:'#333333'}">
                    <el-table-column prop="id" min-width="30" label="id" align="center" />
                    <el-table-column prop="title" min-width="40" label="标题" align="center" />
                    <el-table-column min-width="40" label="内容" align="center">
                        <template slot-scope="scope">
                            <div @click="showDetail(scope.row.content)">点击预览内容</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="description" min-width="60" label="描述" align="center" />
                    <el-table-column min-width="60" label="图片" align="center">
                        <template slot-scope="scope">
                        <el-image
                            style="width: 96px; height: 96px"
                            :src="scope.row.thumb"
                            fit="scale-down"/>
                        </template>
                    </el-table-column>
                    <el-table-column prop="date" min-width="40" label="上传时间" align="center" />
                    <el-table-column min-width="20" label="是否展示" align="center">
                        <template slot-scope="scope">
                            {{scope.row.type==1 ?'展示':'隐藏'}}
                        </template>
                    </el-table-column>
                    <!-- 添加条目请追加到此处上方 -->
                    <el-table-column min-width="40" label="操作" align="center" fixed="right">
                        <template slot-scope="scope">
                        <el-button @click="handleRowEdit(scope.row)" type="text" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="task-list-page">
                    <el-pagination
                        :current-page="submitData.page"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="submitData.number"
                        layout="total, sizes, prev, pager, next"
                        :total="totle"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                    />
                </div>
            </div>
            <el-dialog
                title="编辑"
                top="10vh"
                :visible.sync="dialogVisible"
                @opened="handleOpenDialog"
                :close-on-click-modal="false"
                width="30%">
                <span>
                    <el-form label-width="80px">
                        <el-form-item label="id">
                            <el-input v-model="editData.id" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="标题">
                            <el-input v-model="editData.title"></el-input>
                        </el-form-item>
                        <el-form-item label="描述">
                            <el-input v-model="editData.description"></el-input>
                        </el-form-item>
                        <el-form-item label="是否展示">
                            <el-switch 
                                v-model="editData.type"
                                active-value="1"
                                inactive-value="2"></el-switch>
                        </el-form-item>
                        <el-form-item label="缩略图">
                            <el-upload
                                class="avatar-uploader"
                                action="https://api.zechengnet.cn/layeditUpload"
                                :show-file-list="false"
                                :on-success="handleEditSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="editData.thumb" :src="editData.thumb" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>   
                        </el-form-item>
                        <el-form-item label="内容">
                            <textarea id="richtext" v-model="editData.content"></textarea>
                        </el-form-item>
                    </el-form>
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleEdit">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                title="新增"
                :visible.sync="addVisible"
                @opened="addOpenDialog"
                :close-on-click-modal="false"
                width="30%">
                <span>
                    <el-form label-width="80px">
                        <el-form-item label="标题">
                            <el-input v-model="newData.title"></el-input>
                        </el-form-item>
                        <el-form-item label="描述">
                            <el-input v-model="newData.description"></el-input>
                        </el-form-item>
                        <el-form-item label="缩略图">
                            <el-upload
                                class="avatar-uploader"
                                action="https://api.zechengnet.cn/layeditUpload"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="newData.thumb" :src="newData.thumb" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="内容">
                            <textarea id="addrich" v-model="newData.content"></textarea>
                        </el-form-item>
                    </el-form>
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleNew">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                :visible.sync="detailShow"
                close-on-click-modal
                show-close
                width="60%">
                <span>
                    <div v-html="detail"></div>
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="detailShow = false">确 定</el-button>
                </span>
            </el-dialog>             
        </div>        
    </div>
</template>

<script>
var layedit;
layui.use('layedit', function(){
    layedit = layui.layedit;
    console.log('layui加载成功')
    
});
import { getToken } from '../../../utils/auth'
import { getActivitiesList, postThumb } from '@/api/setting'
import request from '@/utils/request'
    export default {
        data() {
            return {
                token: getToken(),
                dialogVisible: false,
                addVisible: false,
                titleSearch:'',
                totle: 0,
                detail: '',
                detailShow: false,
                reports: [],
                submitData:{
                    number: 20,
                    page: 0
                },
                editData:{
                    id: 2,
                    title: '标题3',
                    description: '描述',
                    thumb: '缩略图',
                    type: '1',              //修改的话暂时默认展示
                    content: '内容'
                },
                newData:{
                    title: '',
                    description: '',
                    thumb: '',
                    content: ''
                },
                saveData:{},
                editIndex: 0,
                newIndex: 0,
                dataMapping:{
                    title: '标题',
                    description: '描述',
                    thumb: '缩略图',
                    content: '内容',
                    type: '是否展示'
                }
            }
        },
        mounted(){
            this.getActivityList()
        },
        methods: {
            handleRowEdit(obj) {
                let that = this
                that.editData = obj                
                Object.assign(this.saveData,obj)          //建立data副本
                that.dialogVisible = true                
            },
            addOpenDialog(){
                layedit.set({
                    uploadImage: {
                        url: 'https://api.zechengnet.cn/layeditUpload', //接口url
                        type: 'post' //默认post
                    }
                });
                this.newIndex = layedit.build('addrich',{
                    height: 150
                }); //建立编辑器
            },
            handleOpenDialog(){
                layedit.set({
                    uploadImage: {
                        url: 'https://api.zechengnet.cn/layeditUpload', //接口url
                        type: 'post' //默认post
                    }
                });
                this.editIndex = layedit.build('richtext',{
                    height: 150
                }); //建立编辑器

            },
            titleChange(e){                
                if (e!='') {
                    Object.assign(this.submitData,{
                        title: this.titleSearch
                    })
                }else {
                    delete this.titleSearch.title
                }
            },
            handleAvatarSuccess(res, file) {
                this.newData.thumb = res.data.src;
            },
            beforeAvatarUpload(file) {
                // const isJPG = file.type === 'image/jpeg';
                const isLt3M = file.size / 1024 / 1024 < 3;
                // if (!isJPG) {
                //     this.$message.error('上传头像图片只能是 JPG 格式!');
                // }
                if (!isLt3M) {
                    this.$message.error('上传头像图片大小不能超过 3MB!');
                }
                // return isJPG && isLt3M;
                return isLt3M;
            },
            handleEditSuccess(res, file) {
                this.editData.thumb = res.data.src;
            },
            handleEdit(){
                let that = this
                that.editData.content = layedit.getContent(that.editIndex)
                let flag = 0
                let postData = new Object()
                Object.assign(postData,{id:that.editData.id})
                for (let key in that.editData) {
                    if (that.editData[key] == ''){
                        that.$message.error('缺少内容：'+that.dataMapping[key])
                        flag = 1
                        return
                    }else {
                        if (that.editData[key] != that.saveData[key] ) {
                            Object.assign(postData,{
                                [key]:that.editData[key]
                            })
                        }
                    }
                }
                if (flag < 1) {
                    const formData = new FormData();
                    for (const key in postData) {
                        formData.append(key, postData[key]);
                    }
                    request({
                        url: '/updateActivitiesData',
                        method: 'post',
                        data: formData
                    }).then(res => {
                        console.log(res)
                        that.dialogVisible = false
                        that.getActivityList()
                    })
                }                
            },
            handleNew(){
                this.newData.content = layedit.getContent(this.newIndex)
                let flag = 0
                for (let key in this.newData) {
                    if (this.newData[key] =='') {
                        this.$message.error('缺少内容：'+this.dataMapping[key])
                        flag = 1
                        return
                    }
                }
                if (flag < 1) {
                    const formData = new FormData();
                    for (const key in this.newData) {
                        formData.append(key, this.newData[key]);
                    }
                    console.log(formData)
                    request({
                        url: '/insertActivitiesData',
                        method: 'post',
                        data: formData
                    }).then(res => {
                        console.log(res)
                        this.getActivityList()
                    })
                }                
            },
            uploadThumb(e){
                let that = this
                let reader = new FileReader()
                console.log(e.target.files[0])
                reader.readAsDataURL(e.target.files[0])
                reader.onloadend = function (){
                    let dataUrl = reader.result;
                    console.log(dataUrl)
                    that.newData.thumb = dataUrl
                }
                
            },
            handleSizeChange (val) {
                const that = this
                if (that.pageSize != val) {
                    Object.assign(that.submitData, { number: val })
                    // that.getUserListBy(that.submitData)
                }
            },
            handleCurrentChange (val) {
                const that = this
                console.log(`当前页: ${val}`)
                if (that.current != val-1) {
                    Object.assign(that.submitData, { page: val-1 })
                    // that.getUserListBy(that.submitData)
                }
            },
            showDetail(content){
                this.detail = content
                this.detailShow = true
            },
            getActivityList(){
                getActivitiesList({
                    token: this.token,
                    ...this.submitData
                }).then(res => {
                    // console.log(res)
                    if (res.code == '000000') {
                        this.reports = res.data.data
                        this.totle = res.data.count
                        this.submitData.number = res.data.number
                        this.submitData.page = res.data.page
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .report-container {
        padding: 15px;
        background-color: #f5f5f5;
    }
    .report-group {
        padding: 30px;
        border-radius: 12px;
        background-color: #ffffff;
    }
    .report-title {
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
    .task-list-page {
      margin-top: 10px;
      padding-right: 15px;
      text-align: center;
    }
    .avatar-uploader {
        width: 80px;
        height: 80px;
        border: 1px dashed #d9d9d9;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
    }
    .avatar {
        width: 80px;
        height: 80px;
        display: block;
    }
</style>