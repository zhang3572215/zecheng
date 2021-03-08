import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
const state = {
    taskTypeOptions:[{
      value: '0',
      label: '全部'
    },{
      value: '1',
      label: '注册下载'
    },{
      value: '2',
      label: '电商相关 '
    },{
      value: '3',
      label: '多天阶梯 '
    },{
      value: '4',
      label: '纯关注'
    },{
      value: '5',
      label: '投票砍价'
    },{
      value: '6',
      label: '纯转发'
    },{
      value: '7',
      label: '其他  '
    }
  ]
}
const store = new Vuex.Store({
  state,
  modules,
  getters
})

export default store
