import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './order.scss'

import { UsergetOrderList, UserCancelBook } from '../../actions/counter'

import defaultHouse from '../../img/shouye/default.png'
import NoHouseBok from '../../img/shouye/wu.png'

type PageStateProps = {
  counter: {
    orderList: []
  },
}

type PageDispatchProps = {
  getUserPhone: () => any,
  UsergetOrderList: () => any
}

type PageOwnProps = {
  dispatch
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface order {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}))
class order extends Component {
    constructor(props) {
      super(props)
      this.state = {
        phone: ''
      }
    }
    config: Config = {
    navigationBarTitleText: '我的预约'
  }

  componentWillMount () {
    const { dispatch } = this.props
    this.setState({
      phone: Taro.getStorageSync('phone')
    })
    Taro.getStorage({ key: 'phone' })
      .then(res => {
        let sendDate = {
          phone: res.data,
          state: 0
        }
        dispatch(UsergetOrderList(sendDate, ''))
      })
  }

  cancelOrder(id) {
    // 取消预约
    const { dispatch } = this.props
    Taro.showModal({
      title: '',
      content: '确认要取消当前预约吗？',
      confirmColor: '#F5A92B',
      success: (res) => {
        if (res.confirm) {
          let sendDate = {
            phone: Taro.getStorageSync('phone'),
            bookingHouseId: id,
            closeState: 0,
            remark: '',
          }
          dispatch(UserCancelBook(sendDate, ''))
        }
      }
    })
  }

  componentWillReceiveProps () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { orderList = [] } = this.props.counter
    console.log(this.props.counter)
    return (
      <View className='index'>
        {/* <View>{phone}</View> */}
        {
          orderList.length > 0 ? (
            orderList.map((item, index) => {
              return (
                <View className='EachOrders' key={index}>
                  <View className='StoreTopInfor'>
                    <View className='OrderDate'>{item.bookingHouseCreateTime}</View>
                    <View className='OrderCancel' onClick={this.cancelOrder.bind(this, item.bookingHouseId)}>取消预约</View>
                  </View>
                  <View className='StoreHouseDetail'>
                    <Image
                      className='DefaultHouse'
                      src={item.imgUrl? item.imgUrl : defaultHouse}
                    />
                    <View className='HouseName'>{item.itemName}</View>
                    <View className='HousePrice'>{item.minimumPrice}</View>
                  </View>
                </View>
              )
            })
          ): (
            <View>
              <Image
                className='NoOrderHouseImg'
                src={NoHouseBok}
              />
              <View className='UserHasNorOrder'>您还没有预约门店，快去预约吧！</View>
            </View>
          )
        }
      </View>
    )
  }
}

export default order as ComponentClass<PageOwnProps, PageState>
