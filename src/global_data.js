const globalData = {
  changetArea: false,
  cityDetail: {
    cityId: '1',
    cityName: '北京'
  }
}
/**
 * cityDetail  城市信息
*/
export function setGolbal (key, val) {
  globalData[key] = val
}

export function getGolbal (key) {
  return globalData[key]
}