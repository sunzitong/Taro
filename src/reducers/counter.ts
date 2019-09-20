import { CARSOUL, HOUSELIST, LOCATION, CITYLIST, ORDERLIST } from '../constants/counter'
import Taro from '@tarojs/taro'

const INITIAL_STATE = {
  carsoul: [],
  houseList: [],
  cityDetail: {},
  cityList: [],
  orderList: []
}

export default function counter (state = INITIAL_STATE, action) {
  Taro.hideLoading() // 数据即将渲染完毕 统一隐藏loading
  switch (action.type) {
    case CARSOUL:
      return {
        ...state,
        carsoul: action.payload.list.data.data
      }
    case HOUSELIST:
      return {
        ...state, 
        houseList: action.payload.list.data.data
      }
    case LOCATION:
      return {
        ...state,
        cityDetail: action.payload.data.data.data
      }
    case CITYLIST:
      return {
        ...state,
        cityList: action.payload.data.data.data
      }
    case ORDERLIST:
      return {
        ...state,
        orderList: action.payload.list.data.data
      }
     default:
       return state
  }
}
