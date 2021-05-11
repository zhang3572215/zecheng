import { getUserSubmitData } from '@/api/userForm'
const state = {
    detailData:{
        title:'',
        infos:[],
        infostext:[]
    }
}

const getters = {
    subPicList(state){
        let arr = new Array()
        state.detailData.infos.forEach(item => {
            if (item.code=='1'){
                arr.push(process.env.VUE_APP_BASE_API+item.url)
            }
        });
        return arr
    }
}

const mutations = {
    UPDATE_INFO: (state, obj) => {
        // eslint-disable-next-line no-prototype-builtins
        Object.assign(state.detailData,obj)
    }
}

const actions = {
    getUserSubmitDataBy({state,commit},params){
        getUserSubmitData(params).then(res => {
            if (res.code == '000000'){
                commit('UPDATE_INFO',res.data)
            }
        })
    },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
