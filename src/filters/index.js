// import parseTime, formatTime and set to filter
export { parseTime, formatTime } from '@/utils'

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * taskStatus 任务状态数据字典
 * @param {String} string
 */
export function taskStatusFillter(type) {
  if (!type) return '未知'
      switch (type) {
        case '0':
          return '待审核'
          break;
        case '1':
          return '进行中'
          break;
        case '3':
          return '已完成'
          break;
        case '9':
          return '未通过'
          break;
        case '10':
          return '已取消'
          break;
        default:
          return '未知'
          break;
      }
}

/**
 * taskStatus 收集方式数据字典
 * @param {String} string
 */
export function codeFillter(code){
  if (!code) return '未知'
  switch (code) {
    case 1:
      return '图文'
      break;
    case 2:
      return '网址'
      break;
    case 3:
      return '描述'
      break;
    default:
      return '未知'
      break;
  }
}
/**
 * taskStatus 收集类型数据字典
 * @param {String} string
 */
export function taskItemTypeFillter(type){
  if (!type) return '未知'
  switch (type) {
    case 'pic':
      return '图文'
      break;
    case 'url':
      return '网址'
      break;
    case 'text':
      return '描述'
      break;
    default:
      return '未知'
      break;
  }
}
