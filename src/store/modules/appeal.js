import { getHelpList } from '@/api/appeal'
const state = {
    current: 0,
    pageSize: 2,
    totle: 0,
    list: []
  }
  
  const mutations = {
    UPDATA_LIST: (state, obj) => {
        state.list = obj.data
        state.current = obj.page
        state.pageSize = obj.number
        state.totle =obj.count
    }
  }
  
  const actions = {
    getHelpListBy({ commit, rootState }, params){
        Object.assign(params,{token: rootState.user.token})
        getHelpList(params).then(res => {
            console.log(res)
            if (res.code == '000000') {
                commit('UPDATA_LIST',res.data)
            }
        })
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  