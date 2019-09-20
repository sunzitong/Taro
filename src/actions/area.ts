import {
  HOUSELIST,
  CITYDOWNLIST,
  THTREHOUSE
} from '../constants/counter'
import Taro from '@tarojs/taro'
import { gethouseList, getCurentCityChoice, getSecondCityList, UserHouseByLocation } from '../utils/server'

export function GetHouseList(data, header) {
  // 获取房间列表
  return dispatch => {
    gethouseList(data, header).then((res) => {
      dispatch(getHouselist(res))
    })
    .catch(() => {
    })
  }
}

export function GetCityDowns(data, token) {
  // 获取当前城市下的区域
  return dispatch => {
    getCurentCityChoice(data, token).then((res) => {
      dispatch(getCityDownList(res))
    })
    .catch(() => {
      // 获取失败
    })
  }
}

export function GetThreeCityHose(data, token) {
  // 点击三级菜单获取当前门店
  Taro.showLoading({
    title: '数据加载中...'
  })
  return dispatch => {
    getSecondCityList(data, token).then((res) => {
      dispatch(getHouselist(res))
    })
    .catch(() => {
      // 门店列表获取失败
    })
  }
}

export function LocationGetByHouse(data, contenType) {
  // 最近门店列表
  Taro.showLoading({
    title: '数据加载中...'
  })
  return dispatch => {
    UserHouseByLocation(data, contenType).then((res) => {
      dispatch(getHouselist(res))
    })
    .catch(() => {
      // 门店列表获取失败
    })
  }
}



/*
* reducer
*/

export const getHouselist = (list) => {
  return {
    type: HOUSELIST,
    payload: {
      list
    } 
  }
}

export const getCityDownList = (list) => {
  return {
    type: CITYDOWNLIST,
    payload: {
      list
    }
  }
}