import { HOUSELIST, CITYDOWNLIST } from '../constants/counter'
import Taro from '@tarojs/taro'

const INITIAL_STATE = {
  houseList: [],
  cityDownList: []
}

export default function counter (state = INITIAL_STATE, action) {
  Taro.hideLoading() // 数据即将渲染完毕 统一隐藏loading
  Taro.hideToast() // 关闭show.toast()
  switch (action.type) {
    case HOUSELIST:
      return {
        ...state, 
        houseList: action.payload.list.data.data
      }
    case CITYDOWNLIST:
      return {
        ...state,
        cityDownList: action.payload.list.data.data
      }
     default:
       return state
  }
}
