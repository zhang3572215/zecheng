<template>
  <div class="app-container">
    <div style="margin: 15px 0;">
        <el-button type="primary" @click="showModal=true" size="medium">设置充值指引</el-button>
    </div>
    <el-table :data="list" border fit highlight-current-row style="width: 100%" :header-row-style="{color:'#333333'}">
      <!-- <el-table-column prop="id" label="id" width="180" /> -->
      <!-- <el-table-column v-for="(iv,ik,ids) in tableData[0]" :key="ids" :label="formThead[ids]" :prop="ik" min-width="80" align="center">
        </el-table-column> -->
      <el-table-column prop="id" min-width="40" label="充值id" align="center" />
      <el-table-column prop="mid" min-width="40" label="充值用户id" align="center" />
      <el-table-column min-width="20" label="类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.type | optionTypeFillter }}
        </template>
      </el-table-column>
      <el-table-column prop="amount" min-width="30" label="金额" align="center" />
      <el-table-column prop="startdate" min-width="40" label="开始时间" align="center" />
      <el-table-column prop="enddate" min-width="40" label="结束时间" align="center" />
      <el-table-column min-width="20" label="状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.status == 0?'进行中':'已完成' }}
        </template>
      </el-table-column>
      <el-table-column prop="nickname" min-width="40" label="用户昵称" align="center" />
      <el-table-column prop="balance" min-width="30" label="账户余额" align="center" />

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
    <el-dialog
        title="充值设置"
        :visible.sync="showModal"
        width="40%">
        <el-form :model="reChargeInfo" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input v-model="reChargeInfo.name" placeholder="收款人姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="reChargeInfo.phone" placeholder="收款人手机号"></el-input>
            </el-form-item>
            <el-form-item label="图片介绍">
                <el-upload
                    class="avatar-uploader"
                    action="https://api.zechengnet.cn/layeditUpload"
                    :show-file-list="false"
                    :on-success="handleEditSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="reChargeInfo.url" :src="reChargeInfo.url" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>   
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="showModal = false">取 消</el-button>
            <el-button type="primary" @click="setRechargeInfo">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { postRechargeInfoData } from '@/api/cash'
export default {
  data () {
    return {
      submitData: {
        page: 0,
        number: 20
      },
      showModal:false,
      reChargeInfo:{
          name: '',
          phone: '',
          url: ''
      }
    }
  },
  computed: {
    ...mapState('user',[
      'token'
    ]),
    ...mapState('rechargeList', [
      'current',
      'pageSize',
      'totle',
      'list'
    ])
  },
  filters: {
    optionTypeFillter (val) {
      if (!val) return '未知类型'
      switch (val) {
        case '3':
          return '提现'
          break
        case '4':
          return '充值'
          break
        default:
          return '未知类型'
          break
      }
    }
  },
  mounted () {
    const that = this
    Object.assign(that.submitData, {
      token: that.token
    })
    that.getRechargeListBy(that.submitData)
  },
  methods: {
    ...mapActions('rechargeList', [
      'getRechargeListBy'
    ]),
    handleSizeChange (val) {
      const that = this
      if (that.pageSize != val) {
        Object.assign(that.submitData, { number: val })
        that.getRechargeListBy(that.submitData)
      }
    },
    handleCurrentChange (val) {
      const that = this
      console.log(`当前页: ${val}`)
      if (that.current != val-1) {
        Object.assign(that.submitData, { page: val-1 })
        that.getRechargeListBy(that.submitData)
      }
    },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt3M = file.size / 1024 / 1024 < 3;
        if (!isJPG) {
            this.$message.error('上传二维码图片只能是 JPG 格式!');
        }
        if (!isLt3M) {
            this.$message.error('上传二维码图片大小不能超过 3MB!');
        }
        return isJPG && isLt3M;
    },
    handleEditSuccess(res, file) {
        this.reChargeInfo.url = res.data.src;
    },
    setRechargeInfo(){
        let that = this
        let postData = new FormData()
        for (const key in that.reChargeInfo) {
            if (that.reChargeInfo.hasOwnProperty(key)) {
                console.log('key:'+key)
                console.log('value:'+that.reChargeInfo[key])
                postData.append(key,that.reChargeInfo[key])
            }
        }
        postData.append('token',that.token)
        console.log(postData.get('items'))
        postRechargeInfoData(postData).then(res => {
            console.log(res)
        })
    }
  }
}
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
}
</style>
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
    .avatar-uploader {
        width: 80px;
        height: 80px;
    }
    .avatar-uploader .el-upload {
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;        
        border: 1px dashed #d9d9d9;
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
