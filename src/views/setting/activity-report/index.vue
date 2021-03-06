<template>
  <div class="components-container">
    <textarea id="richtext"></textarea>
    <el-button type="primary" style="margin-top:30px;">确认提交</el-button>
  </div>
</template>

<script>
var layedit;
layui.use('layedit', function(){
    layedit = layui.layedit;
    console.log('layui加载成功')
    
});
export default {
  data() {
        return {
         content1: '',
        }
  },
  mounted(){
    layedit.set({
        uploadImage: {
            url: '', //接口url
            type: 'post' //默认post
        }
    });
	layedit.build('richtext'); //建立编辑器
  },
  methods: {
    
  }
}
</script>

<style scoped>

</style>
