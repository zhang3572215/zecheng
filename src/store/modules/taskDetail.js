import { getTaskList } from '@/api/task'
import { testToken } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
const state = {
    token:getToken(),
    infos: [
        {
          id: 'tl-01',
          title: '轰炸',
          label: '憨0'
        }
    ],
    items: [
      {
        id: 'tl-01',
        title: '轰炸',
        label: '憨0'
      }
    ],
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
    getTaskListBy({ commit, state, dispatch },params){
        let data = {
            token: state.token,
            ...params
        }
        console.log(data)
        getTaskList(data).then(res => {
            commit('UPDATE_TASK_LIST',res.data.data)
            commit('UPDATE_TASK_ATTRS',{
                current: parseInt(res.data.page),
                pageSize: parseInt(res.data.number),
                totle: parseInt(res.data.count)
            })
        }).catch(err => {
            console.log(err)
        })
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  