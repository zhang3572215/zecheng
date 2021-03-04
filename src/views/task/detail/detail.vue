<template>
    <div class="task-detail">
		<div class="task-items">
			<h4>信息收集</h4>
			<el-table :data="infos" border fit highlight-current-row style="width: 100%" :header-row-style="{color:'#333333'}" current-row-key='id'>
				<!-- <el-table-column prop="id" label="id" width="180" /> -->
				<!-- <el-table-column v-for="(iv,ik,ids) in tableData[0]" :key="ids" :label="formThead[ids]" :prop="ik" min-width="80" align="center">
				</el-table-column> -->
				<el-table-column min-width="20" label="收集类型" align="center">
					<template slot-scope="scope">
						{{scope.row.code == '1'?'收集截图':'手机信息'}}
					</template>
				</el-table-column>
				<el-table-column prop="id" min-width="60" label="id" align="center"></el-table-column>
				<el-table-column prop="type" min-width="20" label="类型" align="center"></el-table-column>
				<el-table-column min-width="40" label="图片地址" align="center">
					<template slot-scope="scope">
						<el-image v-if="scope.row.type == 'pic'"
							style="width: 96px; height: 96px"
							:src="'http://api.zechengnet.cn'+scope.row.url"
							fit="scale-down"/>
					</template>
				</el-table-column>
				<el-table-column prop="text" min-width="80" label="描述" align="center"></el-table-column>
				<!-- 添加条目请追加到此处上方 -->
				<!-- <el-table-column min-width="40" label="操作" align="center" fixed="right">
				<template slot-scope="scope">
					<el-button @click="handleRowClick(scope.row.id)" type="text" size="small">查看</el-button>
					<el-button @click="handleRowVerify(scope.row.id)" type="text" size="small">审核</el-button>
				</template>
				</el-table-column> -->
			</el-table>          
		</div>
		<div  class="task-items">
			<h4>任务步骤</h4>
			<el-table :data="items" border fit highlight-current-row style="width: 100%" :header-row-style="{color:'#333333'}" current-row-key='id'>
				<!-- <el-table-column prop="id" label="id" width="180" /> -->
				<!-- <el-table-column v-for="(iv,ik,ids) in tableData[0]" :key="ids" :label="formThead[ids]" :prop="ik" min-width="80" align="center">
				</el-table-column> -->
				
				<el-table-column prop="id" min-width="20" label="id" align="center"></el-table-column>
				<el-table-column min-width="20" label="说明类型" align="center">
					<template slot-scope="scope">
						{{scope.row.type | itemTypeFilter}}
					</template>
				</el-table-column>
				<el-table-column min-width="40" label="图片地址" align="center">
					<template slot-scope="scope">
						<el-image v-if="scope.row.type == 'pic'"
							style="width: 96px; height: 96px"
							:src="'http://api.zechengnet.cn'+scope.row.url"
							fit="scale-down"/>
					</template>
				</el-table-column>
				<el-table-column prop="text" min-width="80" label="描述" align="center"></el-table-column>
				<el-table-column min-width="80" label="网址描述" align="center">
					<template slot-scope="scope" v-if="scope.row.type=='url'">
						{{scope.row.url}}
					</template>
				</el-table-column>
			</el-table>
		</div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        data() {
            return {
                id: '',
                list: null,
                listLoading: true,
                listQuery: {
                    page: 1,
                    limit: 10
                }
            }
        },
        computed: {
            ...mapState('taskDetail',[
				'token',
                'infos',
                'items'
            ])
        },
        filters: {
            itemTypeFilter(type) {
				if (!type) return '未知类型'
				switch (type) {
					case 'pic':
						return '图文说明'
						break;
					case 'url':
						return '网址说明'
						break;
					case 'text':
						return '文字说明'
						break;
					default:
						return '未知类型'
						break;
				}
            }
        },
        mounted () {
            let that = this
            if (that.$route.query.id) {
				that.id = that.$route.query.id
				that.getTaskDetailBy({
					token: that.token,
					id: that.id
				})
            }else {
                that.$router.back
            }
		},
		methods:{
			...mapActions('taskDetail',[
				'getTaskDetailBy'
			])
		}
    }
</script>

<style scoped>
    .task-detail {
        padding: 30px 60px;
		background-color: #f5f5f5;
    }
	.task-items {
		margin-top: 30px;
		padding: 10px 30px;
		background-color: #ffffff;
		border-radius: 12px;
	}
	.task-items h4 {
		margin: 10px 0 20px;
	}
</style>