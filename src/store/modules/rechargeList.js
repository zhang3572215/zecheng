import { getRechargeListBy } from '@/api/cash'
import router, { resetRouter } from '@/router'

const state = {
  current: 0,
  pageSize: 2,
  totle: 0,
  list: []
}

const mutations = {
  SET_CASH_LIST: (state, list) => {
    state.list = list
  },
  SET_CURRENT: (state, current) => {
    state.current = parseInt(current)
  },
  SET_PAGE_SIZE: (state, pageSize) => {
    state.pageSize = parseInt(pageSize)
  },
  SET_TOTLE: (state, totle) => {
    state.totle = parseInt(totle)
  }
}

const actions = {
  // user login
  getRechargeListBy ({ commit, state }, obj) {
    console.log(obj)
    return new Promise((resolve, reject) => {
      getRechargeListBy(obj).then(response => {
        const { data } = response
        console.log(data)
        commit('SET_CASH_LIST', data.data)
        commit('SET_CURRENT', data.page)
        commit('SET_PAGE_SIZE', data.number)
        commit('SET_TOTLE', data.count)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
