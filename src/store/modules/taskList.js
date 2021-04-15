import { getTaskList, postDataToEditTask } from '@/api/task'
import { testToken } from '@/api/user'
const state = {
    current: 0,
    pageSize: 2,
    totle: 0,
    tableData: [
        {
          id: 'tl-01',
          title: '轰炸',
          label: '憨0',
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
    ]
  }
  
  const mutations = {
    UPDATE_TASK_LIST: (state, list) => {
      state.tableData = []
      state.tableData = state.tableData.concat(list)
    },
    UPDATE_TASK_ATTRS: (state, obj) => {
      Object.assign(state,obj)
    }
  }
  
  const actions = {
    getTaskListBy({ commit, state, rootState },params){
        let data = {
            token: rootState.user.token,
            ...params
        }
        console.log(data)
        getTaskList(data).then(res => {
          if (res.code == '000000'){
            console.log(res)
            commit('UPDATE_TASK_LIST',res.data.data)
            commit('UPDATE_TASK_ATTRS',{
                current: parseInt(res.data.page),
                pageSize: parseInt(res.data.number),
                totle: parseInt(res.data.count)
            })
          }
        }).catch(err => {
            console.log(err)
        })
    },
    upDataTaskDetailBy({ commit, state, dispatch },params){
      console.log(params)
      postDataToEditTask(params)
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  