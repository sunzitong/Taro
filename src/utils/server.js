import { getServer, GetHouseByLocation } from './httpAPI';
import jiekou from './jiekou';

/**
 * method、url、data、token、ContentType
 * 
 */

export function getcarousel(data, token) {
  //1. 获取轮播图
  return getServer('POST', jiekou.lunbo, data, token, 'application/json')
}

export function gethouseList(data, token) {
  //2. 获取轮播图
  return getServer('GET', jiekou.shoplist, data, token, 'application/x-www-form-urlencoded')
}

export function getLocation(data, token) {
  //3. 根据经、纬度获取当前城市信息
  return getServer('GET', jiekou.citydingwei, data, token, 'application/json')
}

export function getCityList(data, token) {
  //4. 获取城市列表
  return getServer('GET', jiekou.citylist, data, token, 'application/json')
}

export function getUserPhonenumber(data, token) {
  //5. 获取用户手机号
  return getServer('GET', jiekou.dizhi + 'webapp/mini/getPhone', data, token, 'application/json;charset=UTF-8')
}

export function getOrderList(data, token) {
  //6. 获取订单列表
  return getServer('GET', jiekou.yuyuelist, data, token, 'application/x-www-form-urlencoded')
}

export function cancelOrder(data, token) {
  //7. 取消当前预约订单
  return getServer('POST', jiekou.closebook, data, token, 'application/json')
}

export function getCurentCityChoice(data, token) {
  //8. 获取当前城市下的分部
  return getServer('GET', jiekou.cityshangquan, data, token, 'application/json;charset=UTF-8')
}

export function getSecondCityList(data, token) {
  //9. 点击三级菜单 获取当前区域下的房屋
  return getServer('GET', jiekou.ThreeHouse, data, token, 'application/json;charset=UTF-8')
}

export function UserHouseByLocation(data, location) {
  // 10. 获取最近门店列表
  return GetHouseByLocation('GET', jiekou.ThreeHouse, data, location)
}

