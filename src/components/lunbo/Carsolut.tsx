import Taro, { Component } from '@tarojs/taro';
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import './Carsolut.scss'

export default class Carsolut extends Component {
  constructor(props) {
    super(props)
  }

  changeToWebView(url, name) {
    Taro.navigateTo({
      url: '../../pages/webView/webView?url='+ url + '&name=' + name
    })
  }

  render () {
    const { dataSource = {} } = this.props;
    const { carsoul = [] } = dataSource;
    return (
      <View>
        {
          dataSource? (
            <Swiper
              className='test-h'
              indicatorColor='#999'
              indicatorActiveColor='#333'
              circular
              indicatorDots
              autoplay>
                {
                  carsoul.map((item) => {
                    return (
                      <SwiperItem style='height:100%' onClick={this.changeToWebView.bind(this, item.imgHyperlink, item.title)}>
                        <View style='height:100%;border-radius:8px;'>
                          <Image 
                            style="width:100%;height:100%;border-radius:8px;"
                            src={item.imgUrl}
                          />
                        </View>
                      </SwiperItem>
                    )
                  })
                }
            </Swiper>
          ): ''
        }
      </View>
    )
  }
}