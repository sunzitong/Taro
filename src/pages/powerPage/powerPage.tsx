import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Image} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getUserPhone } from '../../actions/counter'

import './powerPage.scss'

import PowerImg from '../../img/active/g22.png'

type PageStateProps = {
  counter: {
    UserPhone: ''
  },
}

type PageDispatchProps = {
  getUserPhone: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface powerPage {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}))
class powerPage extends Component {
    constructor(props) {
      super(props)
      this.state = {
        PowerType: ''
      }
    }
    config: Config = {
    navigationBarTitleText: '授权页面'
  }

  componentWillMount () {
    let msg = this.$router.preload.PowerType
    this.setState({
      PowerType: msg
    })
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  getUserPhoneNumber(e) {
    const { dispatch } = this.props
    console.log(e.detail)
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      const encryptedData = e.detail.encryptedData
      const iv = e.detail.iv
      Taro.login({
        success: (res) => {
          let sendDate = {
            code: res.code,
            encryptedData,
            iv
          }
          dispatch(getUserPhone(sendDate, ''))
        }
      })
    }
  }

  turnBack() {
    Taro.switchTab({
      url: '../center/center'
    })
  }
  
  getuserinfo(e) {
    console.log(e.detail)
    if (e.detail.userInfo.nickName) {
      Taro.setStorageSync('userInfo', e.detail.userInfo)
      Taro.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000,
        mask: true
      }).then(() => {
        setTimeout(() => {
          Taro.switchTab({
            url: '../center/center'
          })
        }, 2000)
      })
    } else {
      // 用户取消授权
      Taro.switchTab({
        url: '../center/center'
      })
    }
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { PowerType } = this.state
    return (
      <View className='index'>
        <Image
          className='PowerImg'
          src={PowerImg}
        />
        {
          PowerType === 'UserInfo'? (<Button className='activePage power' open-type='getUserInfo' onGetUserInfo={this.getuserinfo.bind(this)}>微信号快捷登录</Button>): (<Button className='activePage power' open-type='getPhoneNumber' onGetphonenumber={this.getUserPhoneNumber}>手机号账号快捷登录</Button>)
        }
        <View onClick={this.turnBack} className='activePage cancel'>取消登录</View>
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

export default powerPage as ComponentClass<PageOwnProps, PageState>
