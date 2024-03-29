import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  constructor() {
    super()
    this.state = {}
  }
  globalData = {
    cityId: '1',
    citySecondID: '',
    cityThreeID: '',
    cityDetail: {}
  }
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/active/active',
      'pages/center/center',
      'pages/city/city',
      'pages/powerPage/powerPage',
      'pages/order/order',
      'pages/webView/webView'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#515257',
      selectedColor: '#515257',
      list: [
        {
          text: '冠寓',
          pagePath: 'pages/index/index',
          iconPath: './img/shouye/shou1.png',
          selectedIconPath: './img/shouye/shou2.png'
        },
        {
          text: '活动',
          pagePath: 'pages/active/active',
          iconPath: './img/shouye/ms2.png',
          selectedIconPath: './img/shouye/ms1.png'
        },
        {
          text: '我的',
          pagePath: 'pages/center/center',
          iconPath: './img/shouye/mine1.png',
          selectedIconPath: './img/shouye/mine2.png'
        },
      ]
    },
    permission: {
      "scope.userLocation": {
        "desc": '你的位置信息将用于小程序位置接口的效果展示'
      }
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
