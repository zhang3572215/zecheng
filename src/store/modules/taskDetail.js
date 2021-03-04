import { getTaskDetail } from '@/api/task'
import { testToken } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
const state = {
    token:getToken(),
    infos: [],
    items: [],
  }
  
  const mutations = {
    UPDATE_INFO_LIST: (state, list) => {
      state.infos = []
      state.infos = state.infos.concat(list)
    },
    UPDATE_ITEM_ATTRS: (state, list) => {
      state.items = []
      state.items = state.items.concat(list)
    }
  }
  
  const actions = {
    getTaskDetailBy({ commit },params){

        console.log(params)
        getTaskDetail(params).then(res => {
          console.log(res)
            commit('UPDATE_INFO_LIST',res.data.infos)
            commit('UPDATE_ITEM_ATTRS',res.data.items)
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
  