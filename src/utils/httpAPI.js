import Taro from '@tarojs/taro';

export function getServer(method, url, data, token, ContentType) {
  return new Promise((resolve, reject) => {
    Taro.request({
      url,
      method,
      data,
      header: {
        'content-type': ContentType,
        token,
      },
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export function GetHouseByLocation(method, url, data, ContentType) {
  return new Promise((resolve, reject) => {
    Taro.request({
      url,
      method,
      data,
      header: {
        'content-type': 'application/json;charset=UTF-8',
        'X-GY-App-Location': ContentType
      },
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}