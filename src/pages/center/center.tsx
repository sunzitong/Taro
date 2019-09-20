import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import avator from '../../img/wode/touxiang.png'
import Next from '../../img/wode/next.png'

import './center.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    carsoul: [],
    UserPhone: ''
  }
}

type PageDispatchProps = {
  getCarsoul: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}))
class Index extends Component {
    constructor(props) {
      super(props)
      this.state = {
        loginJudge: false,
        avatorNew: '',
        UserInfoDate: {}
      }
    }
    config: Config = {
    navigationBarTitleText: '个人中心'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  GotoPower(msg) {
    // 进入到授权页面
    if (msg === 'UserPhone') {
      if (Taro.getStorageSync('phone')) {
        Taro.navigateTo({
          url: '../order/order'
        })
      } else {
        // 手机号授权
        this.$preload('PowerType', msg)
        Taro.navigateTo({
          url: '../powerPage/powerPage'
        })
      }
    } else {
      this.$preload('PowerType', msg)
      Taro.navigateTo({
        url: '../powerPage/powerPage'
      })
    }
  }

  componentWillUnmount () { }

  componentDidShow () { 
    Taro.getStorage({ key: 'userInfo' })
      .then((res) => {
        if (res.data.nickName) {
          this.setState({
            loginJudge: true,
            UserInfoDate: res.data.nickName,
            avatorNew: res.data.avatarUrl
          })
        } else {

        }
      })
  }

  componentDidHide () { }

  render () {
    const { loginJudge, UserInfoDate } = this.state
    return (
      <View className='index'>
        <View className='StoreTopReload'>
            {
              loginJudge? (
              <Image
                className='UserDefaultImg'
                src={avatorNew}
              />
              ): (
                <Image
                  onClick={this.GotoPower.bind(this, 'UserInfo')}
                  className='UserDefaultImg'
                  src={avator}
                />
              )
            }
            {
              loginJudge? 
              (
                <View className='UserToLoad'>{UserInfoDate}</View>
              ):
              (
              <View className='UserToLoad' onClick={this.GotoPower.bind(this, 'UserInfo')}>登录</View>
              )
            }
        </View>
        <View className='btnCommon' onClick={this.GotoPower.bind(this, 'UserPhone')}>
          我的预约
          <Image
            className='UserDefaultImg'
            src={Next}
          />
        </View>
        <View className='btnCommon'>
          客服电话
          <View className='kefuPhone'>400-001-1166</View>
        </View>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
