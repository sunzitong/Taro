import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import './houseList.scss';

import manjian from '../../img/shouye/tejia.png'


export default class houseList extends Component{
  constructor(props) {
    super(props)
    this.state = {
      houseList: [],
      carsoul: []
    }
  }
  componentDidMount() {
  }
  componentWillReceiveProps(newProps) {
    console.log(newProps)
  }

  changeToWebView(url) {
    Taro.navigateTo({
      url: '../../pages/webView/webView?url='+ url + '&name=冠寓'
    })
  }

  componentDidShow() {
  }
  render() {
    const houseListAry = this.props.houseList
    return (
      <View>
        {
          houseListAry? (
            houseListAry.items.map((item, index) => {
              return (
                <View className='EachHouse' key={index} onClick={this.changeToWebView.bind(this, item.mwebsiteUrl)}>
                  <View className='StoreHouse'>
                    <Image
                      className='houseImg'
                      src={item.imgUrl}
                    />
                  </View>
                  {
                    item.isFull ? (
                      <View className='Manjian'>
                        <View className='content'>满减</View>
                        <Image
                          className='manjianImg'
                          src={manjian}
                        />
                      </View>
                    ): ''
                  }
                  <View className='StoreDetail'>
                    <View className='HouseName'>{item.itemName}</View>
                    <View className='HouseArea'>{item.subwayList[0]}</View>
                    <View className='HousePrice'>{item.minPrice}</View>
                  </View>
                </View>
              )
            })
          ): ''
        }
      </View>
    )
  }
}