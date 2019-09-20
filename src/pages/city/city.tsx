import { ComponentClass } from 'react'
import Taro, {Component, Config} from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getCityListUser } from '../../actions/counter'
import { setGolbal, getGolbal } from '../../global_data'
import './city.scss'

type PageStateProps = {
  counter: {
    cityList: [],
    curentCity: '北京' // 当前城市
  }
}

type PageDispatchProps = {
  getCityListUser: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface city {
  props: IProps;
}


@connect(({counter}) => ({
  counter
}))

class city extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '城市列表'
    }
  }

  config: Config = {
    navigationBarTitleText: '城市选择',
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(getCityListUser('', ''))
  }

  getCityDetail (items) {
    setGolbal('cityDetail', items)
    setGolbal('changetArea', true)
    Taro.switchTab({
      url: '../index/index?change=List' 
    })
  }

  componentWillReceiveProps () {
  }

  componentDidShow () {
    // 重置当前城市名称
    this.setState({
      curentCity: getGolbal('cityDetail').cityName
    })
  }

  render () {
    const { cityList = [] } = this.props.counter
    const { curentCity } = this.state
    return (
      <View>
        <View className='allAreas'>当前城市</View>
        <View className='CurentCity'>{curentCity}</View>
        {
          cityList.length > 0 ? (
            cityList.map((item) => {
              return (
                <View className='EachCityName'>
                  <View className='CityAll'>{item.firstLetter}</View>
                  <View className='StoreCitys'>
                    {
                      item.cities.length > 0 ? (
                        item.cities.map((items) =>{
                          return (
                            <View className='CityChild' onClick={this.getCityDetail.bind(this, items)}>{items.cityName}</View>
                          )
                        })
                      ): ''
                    }
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
export default city as ComponentClass<PageOwnProps, PageState>