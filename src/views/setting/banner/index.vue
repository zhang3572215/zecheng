<template>
    <div class="banner-container">
        <div class="upload-group">
            <div class="banner-title">轮播图上传</div>
            <ul class="pic-list">
                <li v-for="(item,index) in pics" :key="index" class="file-pic">
                    <el-image :src="item" class="pic-item" fit="contain"></el-image>
                </li>
                <li class="file-upload">
                    <input type="file" multiple @change="uploadFile">
                    <div class="file-under">+</div>
                </li>
            </ul>
            <div class="attention">注意：当已有图片超过5张时会取最新的图片而不是全部覆盖。</div>
            <el-button type="primary" @click="submitBanner">点此上传(不多于5张)</el-button>
        </div>        
    </div>
</template>

<script>
// import { Base64 } from 'js-base64';
import { postBannerPic } from '@/api/setting'
import { getToken } from '../../../utils/auth'
    export default {
        data() {
            return {
                token: getToken(),
                pics: [],
                imageUrl:''
            }
        },
        methods: {
            uploadFile(e){
                let that = this
                console.log(e.target.files)
                e.target.files.forEach(fitem => {
                    let reader = new FileReader()
                    reader.readAsDataURL(fitem)
                    reader.onloadend = function (){
                        let dataUrl = reader.result;
                        console.log(dataUrl)
                        if (that.pics.length <5 ){
                            that.pics.push(dataUrl)
                        }else {
                            that.pics.shift()
                            that.pics.push(dataUrl)
                        }
                    }
                });
            },
            submitBanner(){
                console.log(this.pics.length)
                if (this.pics.length > 0) {
                    postBannerPic({
                        token: this.token,
                        list: this.pics
                    }).then(res => {
                        if ( res.code == '000000') {
                            this.$message('上传成功');
                        }
                    })
                }else {
                    this.$message('请至少上传一张图片');
                }
                
            }
        },
    }
</script>

<style scoped>
  .banner-container {
      padding: 15px;
      background-color: #f5f5f5;
  }
  .upload-group {
      padding: 30px;
      border-radius: 12px;
      background-color: #ffffff;
  }
  .banner-title {
      margin: 15px 0;
      font-size: 1rem;
      line-height: 1em;
      color: #333;
      font-weight: 700;
  }
  .pic-list {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      list-style: none;
  }
  .pic-list .file-pic {
      width: 160px;
      height: 160px;
      margin-right: 30px;
      border: 1px solid #ddd;
      overflow: hidden;
  }
  .pic-item {
      width: 100%;
      height: 100%;
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
  .attention {
      margin: 30px 0;
  }
</style>