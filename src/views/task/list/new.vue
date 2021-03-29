<template>
    <div class="new-task">
        <h3>新建任务</h3>
        <el-form ref="form"
            :model="submitData"
            :rules="dataRules"
            inline 
            label-width="120px"
            show-message
            validate-on-rule-change
            :inline-message="true"
            style="background-color:white;padding:22px 0;">
            <div>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="submitData.title"></el-input>
                </el-form-item>
                <el-form-item label="标签" prop="label">
                    <el-input v-model="submitData.label"></el-input>
                </el-form-item>
                <el-form-item label="任务描述" prop="description">
                    <el-input v-model="submitData.description" type="textarea" placeholder="任务描述"></el-input>
                </el-form-item>
            </div>          
            <el-form-item label="任务类型" prop="type">
                <el-select v-model="submitData.type" placeholder="请选择任务类型">
                    <el-option 
                        v-for="item in taskTypeOptions"
                        :label="item.label"
                        :value="item.value"
                        :key="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="支持设备" prop="equipment">
                <el-select v-model="submitData.equipment" placeholder="请选择支持设备">
                    <el-option label="全部" value="0"></el-option>
                    <el-option label="IOS" value="1"></el-option>
                    <el-option label="安卓" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="金额" prop="money">
                <el-input-number v-model="submitData.money" controls-position="right" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="数量" prop="count">
                <el-input-number v-model="submitData.count" controls-position="right" :min="10"></el-input-number>
            </el-form-item>
            <el-form-item label="任务完成时限" prop="enddate">
                <el-select v-model="submitData.enddate" placeholder="请选择任务完成时限">
                    <el-option v-for="item in timeLimitMap" :label="item.text" :value="item.id" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="审核时限" prop="timeframe">
                <el-select v-model="submitData.timeframe" placeholder="请选择审核时限">
                    <el-option v-for="item in frameLimitMap" :label="item.text" :value="item.id" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="任务限次" prop="max">
                <el-select v-model="submitData.max" placeholder="请选择审核时限">
                    <el-option v-for="item in maxLimitMap" :label="item.text" :value="item.id" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="派单截止时间" prop="endtime">
                <el-input v-model="submitData.endtime" placeholder="yyyy-mm-dd"></el-input>
            </el-form-item>
            <el-form-item style="width: 100%;height: 20px;margin: 22px 0;background-color: #f5f5f5;">
            </el-form-item>
            <div style="width: 100%;margin: 0 0 16px;padding: 0 5%;text-align:right;">
                <el-button type="primary" @click="newItem">新增任务步骤</el-button>
            </div>
            <div class="form-flex">
                <div class="label-flex">任务步骤</div>
                <el-table ref="dragTable" :data="itemList" row-key="id" border fit highlight-current-row>
                    <el-table-column align="center" label="ID" width="200">
                        <template slot-scope="{row}">
                        <span>{{ row.id }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column width="120" align="center" label="收集方式">
                        <template slot-scope="{row}">
                            <template v-if="row.id==editRowId">
                                <el-select v-model="row.code" placeholder="请选择收集方式">
                                    <el-option label="图文" value="1"></el-option>
                                    <el-option label="网址" value="2"></el-option>
                                    <el-option label="描述" value="3"></el-option>
                                </el-select>
                            </template>
                            <span v-else>{{ row.code | codeFillter }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column width="120" align="center" label="类型">
                        <template slot-scope="{row}">
                            <template v-if="row.id==editRowId">
                                <el-select v-model="row.type" placeholder="选择步骤类型">
                                    <el-option label="图文" value="pic"></el-option>
                                    <el-option label="网址" value="url"></el-option>
                                    <el-option label="描述" value="text"></el-option>
                                </el-select>
                            </template>
                            <span v-else>{{ row.type | taskItemTypeFillter }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column width="200" align="center" label="图片">
                        <template slot-scope="{row}">
                            <template v-if="row.id == editRowId && row.type=='pic'">
                                <div class="upload-group">
                                    <input type="file" @change="uploadItemFile">
                                    <el-image
                                        style="width: 96px; height: 96px"
                                        :src="row.url"
                                        fit="fit"></el-image>
                                </div>
                            </template>
                            <el-image
                                style="width: 96px; height: 96px"
                                v-else
                                :src="row.url"
                                fit="fit"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="步骤描述">
                        <template slot-scope="{row}">
                            <el-input  v-if="row.id == editRowId && row.type=='pic'" type="textarea" v-model="row.text"></el-input>
                            <span v-else>{{ row.text}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="200" align="center" label="网址链接">
                        <template slot-scope="{row}" >
                            <el-input type="textarea" v-model="row.url" v-if="row.id == editRowId && row.type=='url'"></el-input>
                            <!-- <el-image
                                style="width: 96px; height: 96px"
                                v-if="row.id != editRowId && row.type=='pic'"
                                :src="row.url"
                                fit="fit"></el-image> -->
                            <span v-if="row.id != editRowId && row.type=='url'">{{ row.url}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="120"  align="center" label="操作">
                        <template slot-scope="{row}">
                            <el-button type="text" @click="complete(row)" v-if="row.id==editRowId">完成</el-button>
                            <el-button type="text" @click="editRow(row.id)" v-else>编辑</el-button>
                            <el-button type="text" @click="delItemRow(row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div style="width: 100%;margin: 0 0 16px;padding: 0 5%;text-align:right;">
                <el-button type="primary" @click="newInfo">新增收集信息</el-button>
            </div>
            <div class="form-flex">
                <div class="label-flex">收集信息</div>
                <el-table ref="dragTable" :data="infoList" row-key="id" border fit highlight-current-row>
                    <el-table-column align="center" label="ID" width="200">
                        <template slot-scope="{row}">
                        <span>{{ row.id }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column width="120" align="center" label="收集方式">
                        <template slot-scope="{row}">
                            <template v-if="row.id==editRowId">
                                <el-select v-model="row.code" placeholder="请选择收集方式">
                                    <el-option label="图文" value="1"></el-option>
                                    <el-option label="文字" value="2"></el-option>
                                </el-select>
                            </template>
                            <span v-else>{{ row.code == '1'?'图文':'文字' }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column width="120" align="center" label="类型">
                        <template slot-scope="{row}">
                            <template v-if="row.id==editRowId">
                                <el-select v-model="row.type" placeholder="选择步骤类型">
                                    <el-option label="图文" value="pic"></el-option>
                                    <el-option label="文字" value="url"></el-option>
                                </el-select>
                            </template>
                            <span v-else>{{ row.type | taskItemTypeFillter }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column width="200" align="center" label="图片">
                        <template slot-scope="{row}">
                            <template v-if="row.id == editRowId && row.type=='pic'">
                                <div class="upload-group">
                                    <input type="file" @change="uploadInfoFile">
                                    <el-image
                                        style="width: 96px; height: 96px"
                                        :src="row.url"
                                        fit="fit"></el-image>
                                </div>
                            </template>
                            <el-image
                                style="width: 96px; height: 96px"
                                v-else
                                :src="row.url"
                                fit="fit"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="收集信息描述">
                        <template slot-scope="{row}">
                            <el-input  v-if="row.id == editRowId && row.type=='pic'" type="textarea" v-model="row.text"></el-input>
                            <span v-else>{{ row.text}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="120"  align="center" label="操作">
                        <template slot-scope="{row}">
                            <el-button type="text" @click="complete(row)" v-if="row.id==editRowId">完成</el-button>
                            <el-button type="text" @click="editRow(row.id)" v-else>编辑</el-button>
                            <el-button type="text" @click="delInfoRow(row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-form-item style="width: 100%;margin: 0;text-align:center;">
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { number } from 'echarts/lib/export'
    export default {
        data() {
            return {
                submitData:{
                    title: '',
                    description: "",
                    type: '',
                    equipment: '',
                    label: '',
                    type: '', 
                    money: 1.00,
                    count: 10,
                    enddate:'',
                    timeframe: '',
                    max: 0,
                    endtime: '',
                },
                emptyData:{
                    code:1,
                    type:"pic",
                    url:"",
                    src:"",
                    text:""
                },
                itemList:[
                    // {"code":1,"id":1615222373988,"type":"pic","url":"base64的图片地址","src":"可不传","text":"测试图文"},
                    // {"code":3,"id":1615222375390,"type":"text","text":"测试描述步骤"},
                    // {"code":2,"id":1615222377078,"type":"url","text":"测试网址链接","url":"www.baidu.com"}
                ],
                infoList:[
                    // {"code":1,"id":1615222414968,"type":"pic","url":"base64的图片地址","src":"可不传","text":"收集截图1"},
                    // {"code":2,"id":1615222416214,"type":"text","text":"收集信息1"},
                ],
                editRowId: 1615222373988,
                token: 'f0f8f0eeb153ea6c656fd56df2b648ec'          //测试用固定token
            }
        },
        computed:{
            ...mapState([
                'taskTypeOptions'
            ]),
            ...mapState('taskDetail',[
                'dataRules',
                'timeLimitMap',
                'frameLimitMap',
                'maxLimitMap'
            ])
        },
        methods: {
            onSubmit() {
                // console.log(this.submitData)
                let that = this
                that.$refs.form.validate()
                let postData = new FormData()
                for (const key in that.submitData) {
                    postData.append(key,that.submitData[key])
                }
                postData.append('items',JSON.stringify(that.itemList))
                postData.append('infos',JSON.stringify(that.infoList))
                postData.append('token',that.token)
                console.log(postData.get('items'))
                that.postNewTaskBy(postData)
            },
            newItem(){
                let num = (new Date()).valueOf()
                let obj = new Object()
                Object.assign(obj,{
                    id: num,
                    ...this.emptyData
                })
                this.itemList.push(obj)
                this.editRowId = num
            },
            newInfo(){
                let num = (new Date()).valueOf()
                let obj = new Object()
                Object.assign(obj,{
                    id: num,
                    ...this.emptyData
                })
                this.infoList.push(obj)
                this.editRowId = num
            },
            editRow(id){
                this.editRowId = id
                this.$refs.dragTable.doLayout()
            },
            delItemRow(id){
                this.itemList.forEach((item,index)=>{
                    if (item.id == id) {
                        this.itemList.splice(index,1)
                    }
                })
            },
            delInfoRow(id){
                this.infoList.forEach((item,index)=>{
                    if (item.id == id) {
                        this.infoList.splice(index,1)
                    }
                })
            },
            complete(obj){
                this.itemList[this.editRowId] = obj
                this.editRowId = 'no-data'
                this.$refs.dragTable.doLayout()
            },
            uploadItemFile(e){
                let that = this
                let reader = new FileReader()
                reader.readAsDataURL(e.target.files[0])
                reader.onload = function(file){
                    console.log(file.target.result)
                    that.itemList.forEach(item => {
                    if (item.id == that.editRowId) {
                        item.url = file.target.result
                    }
                });
                }
                
            },
            uploadInfoFile(e){
                let that = this
                let reader = new FileReader()
                reader.readAsDataURL(e.target.files[0])
                reader.onload = function(file){
                    console.log(file.target.result)
                    that.infoList.forEach(item => {
                    if (item.id == that.editRowId) {
                        item.url = file.target.result
                    }
                });
                }
                
            },
            ...mapActions('taskDetail',[
                'postNewTaskBy'
            ])
        }
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
        width: 29%;
        margin: 0 2% 16px;
    }
    .el-input {
        min-width: 240px;
    }
    .form-flex {
        width: 100%;
        margin-bottom: 10px;
        padding: 0 2%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
    }
    .label-flex {
        width: 120px;
        padding-right: 12px;
        font-size: 0.875rem;
        color: #606266;
        text-align: right;
        line-height: 36px;
        font-weight: 700;
    }
    .upload-group {
        width: 96px;
        height: 96px;
        margin: 0 auto;
        border: 1px dashed #ddd;
        position: relative;
        z-index: 100;
        overflow: hidden;
    }
    .upload-group input[type="file"] {
        width: 96px;
        height: 96px;
        position: absolute;
        top: 0;
        left:0;
        opacity: 0;
        z-index: 200;
    }
</style>