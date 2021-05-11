import { getTaskDetail, postNewTask } from '@/api/task'
import { testToken } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

//验证任务类型
function validatType(rule, value, callBack) {
  if (value == '') {
    return callBack(new Error())
  }
}

//验证设备类型
function validatEquipment(rule, value, callBack) {
  if (value == '') {
    return callBack(new Error())
  }
}

//验证任务完成时限
function validatEnddate(rule, value, callBack) {
  if (value == '') {
    return callBack(new Error())
  }
}

//验证审核时限
function validatFrame(rule, value, callBack) {
  if (value == '') {
    return callBack(new Error())
  }
}

//验证审核时限
function validatMax(rule, value, callBack) {
  if (value == '') {
    return callBack(new Error())
  }
}
const state = {
    token:getToken(),
    infos: [],
    items: [],
    dataRules:{
      title: {
        required: true, //是否必填
        message: '标题不能为空', //规则
        trigger: 'blur' 
      },
      label:{
        required: true, //是否必填
        message: '标题不能为空', //规则
        trigger: 'blur' 
      },
      type:{
        required: true, //是否必填
        message: '请选择一个任务类型', //规则
        trigger: ['blur','change'],
        validator: validatType
      },
      description:{
        required: true, //是否必填
        message: '描述不能为空', //规则
        trigger: 'blur'
      },
      equipment:{
        required: true, //
        message: '请选择一个设备类型', //规则
        trigger: ['blur','change'],
        validator: validatEquipment
      },
      money:{
        required: true, //是否必填
        message: '金额必须为数字', //规则
        trigger: 'blur' 
      },
      count:{
        required: true, //是否必填
        message: '数量必须为整数', //规则
        trigger: 'blur' 
      },
      enddate:{
        required: true, //是否必填
        message: '请选择一个任务完成时限', //规则
        trigger: ['blur','change'],
        validator: validatEnddate
      },
      timeframe:{
        required: true, //是否必填
        message: '请选择一个任务完成时限', //规则
        trigger: ['blur','change'],
        validator: validatFrame
      },
      max:{
        required: true, //是否必填
        message: '请选择一个任务完成时限', //规则
        trigger: ['blur','change'],
        validator: validatMax
      },
      endtime:{
        required: true, //是否必填
        pattern: /^20\d{2}-[0,1]\d{1}-\d{2}$/,
        message: '请按照yyyy-mm-dd格式填写', //规则
        trigger: 'blur' 
      }
    },
    timeLimitMap:[
      {
        id: '0',
        text: '10分钟'
      },{
        id: 1,
        text: '20分钟'
      },{
        id: 2,
        text: '30分钟'
      },{
        id: 3,
        text: '60分钟'
      }
    ],
    frameLimitMap:[
      {
        id: '0',
        text: '1小时'
      },{
        id: '1',
        text: '3小时'
      },{
        id: '2',
        text: '6小时'
      },{
        id: '4',
        text: '12小时'
      },{
        id: '5',
        text: '24小时'
      }
    ],
    maxLimitMap:[
      {
        id: '0',
        text: '每人一次 '
      },{
        id: 1,
        text: '每周一次'
      },{
        id: 2,
        text: '每天一次'
      },{
        id: 3,
        text: '每天多次'
      }
    ]
  }
  const getters = {
    subInfoPicList(state){
        let arr = new Array()
        state.infos.forEach(item => {
            if (item.code=='1'){
                arr.push(process.env.VUE_APP_BASE_API+item.url)
            }
        });
        return arr
    },
    subItemPicList(state){
      let arr = new Array()
      state.items.forEach(item => {
          if (item.code=='1'){
              arr.push(process.env.VUE_APP_BASE_API+item.url)
          }
      });
      return arr
    }
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
    },
    postNewTaskBy({ commit },params){
      postNewTask(params).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  }
  