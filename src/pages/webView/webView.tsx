import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, WebView} from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './webView.scss'

type PageStateProps = {
  counter: {
    UserPhone: ''
  },
}

type PageDispatchProps = {
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface webView {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}))
class webView extends Component {
    constructor(props) {
      super(props)
      this.state = {
        url: '',
        name: ''
      }
    }
    config: Config = {
    navigationBarTitleText: ''
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
    console.log(this.$router.params)
    this.setState({
      url: this.$router.params.url
    })
    Taro.setNavigationBarTitle({
      title:  this.$router.params.name
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { url } = this.state
    return (
      <View className='index'>
        <WebView src={url} />
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

export default webView as ComponentClass<PageOwnProps, PageState>
