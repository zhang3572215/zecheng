<template>
	<div class="content">
		<div class="cards">
			<el-card class="box-card">
				<div slot="header" class="flex">
					<span class="title">用户信息</span>
				</div>
				<div class="info-hro">
					<div class="avatar">
						<img :src="detailData.headimgurl" alt="" srcset="">
					</div>
					<div class="info">
						<p class="info-lable">用户昵称：{{detailData.nickname}}</p>
						<p class="info-lable">提交时间：{{detailData.date}}</p>
					</div>
				</div>
			</el-card>
		</div>
		<div class="cards">
			<el-card class="box-card">
				<div slot="header" class="flex">
					<span class="title">文字描述信息</span>
				</div>
				<div class="info-ver">
					<div v-for="item in detailData.infostext" :key="item.id" class="list-item">
						<div>{{item.text}}</div>
						<img :src="url+item.url" v-if="item.type == 'pic'" alt="">
						<p v-if="item.type == 'url'">活动链接： <a :href="item.url">{{item.url}}</a> </p>
					</div>
				</div>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="flex">
					<span class="title">截图</span>
				</div>
				<div class="info-ver">
					<div v-for="item in detailData.infos" :key="item.id" class="list-item">
						<!-- <img :src="baseUrl+item.url" v-if="item.code == '1'" alt=""> -->
						<el-image :src="baseUrl+item.url" v-if="item.code == '1'" :preview-src-list="subPicList"/>
					</div>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
    export default {
        data() {
            return {
                baseUrl:process.env.VUE_APP_BASE_API
            }
        },
        computed: {
			...mapState('user',[
				'token'
			]),
            ...mapState('userForm',[
                'detailData'
            ]),
			...mapGetters('userForm',[
				'subPicList'
			])
        },
        mounted () {
            let that = this
			console.log(that.$route.params)
            if (that.$route.params.myid) {
				that.getUserSubmitDataBy({
					token: that.token,
					myid: that.$route.params.myid,
					tid: that.$route.params.tid,
					mid: that.$route.params.mid
				})
            }else {
                that.$router.back
            }
		},
		methods:{
			...mapActions('userForm',[
				'getUserSubmitDataBy'
			])
		}
    }
</script>

<style scoped>
.content {
    margin-top: 30px;
	padding: 0 30px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-column-gap: 40px;
}
.cards  .box-card + .box-card {
    margin-top: 20px;
}
.info-lable {
    margin-bottom: 10px;
    font-size: 0.875rem;
    color: #333;
    line-height: 1em;
    text-align: left;
}
.info-lable:last-child {
    margin-bottom: 0;
}
.list-title {
    margin: 20px 0;
}
.list-item {
    margin:  0;
    padding: 10px 15px;
}
.list-item div {
    margin: 0;
}
.list-item img {
    max-width: 100%;
}
.info-value {
    font-size: 0.875rem;
    color: #999;
    line-height: 1em;
    text-align: left;
}
.info-value-red {
    color: red;
}
.info-hro {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
}
.avatar {
    width: 80px;
    height: 80px;
    margin-right: 15px;
    border-radius: 40px;
    overflow: hidden;
}
.avatar img {
    max-width: 100%;
    max-height: 100%;
}
.info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
}
.info > p:first-child {
    margin-top: 0;
}
.info > p:last-child {
    margin-bottom: 0;
}
</style>