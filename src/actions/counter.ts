import {
  CARSOUL,
  HOUSELIST,
  LOCATION,
  CITYLIST,
  ORDERLIST,
} from '../constants/counter'
import Taro from '@tarojs/taro'
import { getcarousel, getLocation, getCityList, getUserPhonenumber, getOrderList, cancelOrder } from '../utils/server'


export function getCarsoul(data, header) {
  // 获取轮播图
  return dispatch => {
    getcarousel(data, header).then((res) => {
      // 获取轮播图资源
      dispatch(getCourl(res))
    })
    .catch(() => {
    })
  }
}

export function UserGetLocation(data, token) {
  // 获取当前城市信息
  return dispatch => {
    getLocation(data, token).then((res) => {
      dispatch(getCurenCityDetail(res))
    })
    .catch(() => {
    })
  }
}

export function getCityListUser(data, token) {
  // 城市列表
  return dispatch  => {
    getCityList(data, token).then((res) => {
      dispatch(getUserCityList(res))
    })
    .catch(() => {
    })
  }
}

export function getUserPhone(data, token) {
  // 用户手机号
  getUserPhonenumber(data, token).then((res) => {
    Taro.showToast({
      title: '授权成功',
      icon: 'success',
      duration: 1400
    }).then(() => {
      Taro.setStorageSync('phone', res.data.data.phone)
      setTimeout(() => {
        Taro.redirectTo({
          url: '../order/order'
        })
      }, 1400)
    })
  })
}

export function UsergetOrderList(data, token) {
  // 获取预约列表
  return dispatch => {
    getOrderList(data, token).then((res) => {
      dispatch(senOrderList(res))
    })
    .catch(() => {
    })
  }
}

export function UserCancelBook(data, token) {
  return dispatch => {
    cancelOrder(data, token).then((res) => {
      console.log('取消预约')
      console.log(res)
      Taro.getStorage({ key: 'phone' })
        .then(res => {
          let sendDate = {
            phone: res.data,
            state: 0
          }
          getOrderList(sendDate, '').then((res) => {
            dispatch(senOrderList(res))
          })
        })
    })
  }
}


/**
 * 
 * reducer
 * 
 */

export const getCourl = (list) => {
  return {
    type: CARSOUL,
    payload: {
      list
    }
  }
}

export const getCurenCityDetail = (data) => {
  return {
    type: LOCATION,
    payload: {
      data
    }
  }
}

export const getUserCityList = (data) => {
  return {
    type: CITYLIST,
    payload: {
      data
    }
  }
}

export const senOrderList = (res) => {
  return {
    type: ORDERLIST,
    payload: {
      list: res
    }
  }
}


