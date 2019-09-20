import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Carsolut from '../../components/lunbo/Carsolut'
import HouseList from '../../components/houseList/houseList'
import { getCarsoul } from '../../actions/counter'
import { GetHouseList, GetCityDowns, GetThreeCityHose, LocationGetByHouse } from '../../actions/area'
import { getGolbal, setGolbal } from '../../global_data'

import location from '../../img/shouye/location.png'
import locationArea from '../../img/shouye/jiao.png'

import topYellow from '../../img/shouye/s.png'
import topYellow1 from '../../img/shouye/s1.png'

import btnBlack from '../../img/shouye/j.png'
import btnBlack1 from '../../img/shouye/j1.png'

import './index.scss'


type PageStateProps = {
  counter: {
    carsoul: []
  },
  area: {
    houseList: [],
    cityDownList: []
  }
}

type PageDispatchProps = {
  getCarsoul: () => any
  GetHouseList: () => any
  GetCityDowns: () => any
  LocationGetByHouse: () => any
  GetThreeCityHose: () => any
}

type PageOwnProps = {
  dispatch
}

type PageState = {
}

type Readonly = {
  powerStatus
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps & Readonly

interface Index {
  props: IProps;
}
@connect(({ counter, area}) => ({
  counter, area
}))

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cityName: '北京',
      cityId: '1',
      citySecondeId: '', // 二级城市id信息
      cityThreeID: '', // 三级城市id信息
      ThreeCityAry: [], // 三级城市集合
      ChoiceImg: {
        location: require('../../img/shouye/location.png')
      },
      contenType: '', // 地区获取门店的content_type和 其他的不同 
      HouseSort: 'PRICE_ASC',  // PRICE_DESC 降序  PRICE_ASC 升序
      CityBoxStatus: 'none',
      powerStatus: true, // 授权状态
      curentAreaName: '区域' // 当前区域名称  默认  '区域'
    }
  }
    config: Config = {
    navigationBarTitleText: '冠寓'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  getcarousel() {
    const { dispatch } = this.props;
    const sendDate = {
      cityid: '1',
      platform: "MINI"
    }
    dispatch(getCarsoul(sendDate, ''))
  }

  getHouseList(cityId) {
    // 获取房屋列表
    const { dispatch } = this.props;
    const { HouseSort } = this.state;
    const sendata = {
      cityId: cityId,
      distictId: "",
      business: '',
      sort: HouseSort,
      isLocalCity: true
    }
    Taro.showLoading({
      title: '数据加载中...'
    })
    dispatch(GetHouseList(sendata, ''))
  }

  UsergetLocation() {
    // 获取地理位置授权
    const { powerStatus, cityThreeID, curentAreaName } = this.state;
    Taro.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setState({
          powerStatus: true,
          HouseSort: 'DISTANCE'
        }, () => {
          this.getNewHouseList(cityThreeID, curentAreaName, true, `${res.longitude}, ${res.latitude}`)
        })
      },
      fail: () => {
        this.setState({
          powerStatus: false
        })
      }
    })
    if (!powerStatus) {
      Taro.openSetting({
        success: (res) => {
          if (res.authSetting['scope.userLocation']) {
            this.setState({
              powerStatus: true
            }) 
          }
        }
      })
    }
  }

  changeToCityList() {
    Taro.navigateTo({
      url: '../city/city'
    })
  }

  getCurenCityList(data) {
    const { dispatch } = this.props
    dispatch(GetCityDowns(data, ''))
  }

  componentWillUnmount () { }

  componentDidMount () {
    const { cityId } = this.state
    this.getcarousel(); // 获取轮播图
    this.getHouseList(cityId);
  }

  componentDidShow () {
    // 每次进入执行
    const { powerStatus } = this.state;
    // 切换城市
    console.log('城市切换')
    console.log(this.$router)
    if (getGolbal('changetArea')) {
      // 切换城市了
      setGolbal('changetArea', false)
      this.setState({
        cityId: getGolbal('cityDetail').cityId,
        cityName: getGolbal('cityDetail').cityName,
        curentAreaName: '区域',
        ThreeCityAry: []
      }, () => {
        this.getHouseList(getGolbal('cityDetail').cityId);
      })
    }
    let sendDate = {
      cityId: getGolbal('cityDetail').cityId
    }
    this.getCurenCityList(sendDate); // 获取当前城市下的区域

    if (!powerStatus) {
      // 再次进入到首页  如果已经点击允许 再点击获取最近数据
      Taro.openSetting({
        success: (res) => {
          if (res.authSetting['scope.userLocation']) {
            this.setState({
              powerStatus: true
            }) 
          }
        }
      })
    }
  }

  changeSecondId (id, ary) {
    // 点击二级城市
    this.setState({
      ThreeCityAry: ary,
      citySecondeId: id
    })
  }

  startChangeArea() {
    // 点击区域开始选择
    this.setState({
      CityBoxStatus: 'block'
    })
  }

  changeSortPrice() {
    // 触发排序
    const { HouseSort, cityThreeID, curentAreaName } = this.state
    if (HouseSort == 'PRICE_ASC') {
      this.setState({
        HouseSort: 'PRICE_DESC'
      }, () => {
        this.getNewHouseList(cityThreeID, curentAreaName, false, '')
      })
    } else {
      this.setState({
        HouseSort: 'PRICE_ASC'
      }, () => {
        this.getNewHouseList(cityThreeID, curentAreaName, false, '')
      })
    }
  }

  getNewHouseList (id, name, status, contentype) {
    // 点击三级城市  数据刷新
    const { cityId, citySecondeId, HouseSort} = this.state
    const { dispatch } = this.props
    this.setState({
      cityThreeID: id,
      CityBoxStatus: 'none',
      curentAreaName: name
    })
    // 开始获取新数据
    let sendDate = {
      cityId: cityId,
      distictId: citySecondeId,
      business: id,
      sort: HouseSort,
      isLocalCity: status
    }
    if (!status) {
      // 正常获取门店列表
      dispatch(GetThreeCityHose(sendDate, ''))
    } else {
      // 获取最近的门店列表
      dispatch(LocationGetByHouse(sendDate, contentype))
    }
  }

  componentDidHide () { }
  stopTouchMove (e) {
    e.stopPropagation()
  }
  hideDownList () {
    this.setState({
      CityBoxStatus: 'none'
    })
  }

  render () {
    const { carsoul } = this.props.counter
    const { houseList = [], cityDownList = [] } = this.props.area
    const { cityName, ThreeCityAry, citySecondeId, cityThreeID, CityBoxStatus, HouseSort, curentAreaName } = this.state
    return (
      <View className='index'>
        {
          carsoul.length > 0? <Carsolut dataSource={this.props.counter}/> : ''
        }
        <View className='ChoiceCitys'>
          <View className='StoreMainBox'>
            <Image
              className='Locatioon' 
              src={location}
            />
            <View className='obtainHouses'>
              <View className='obtainther' onClick={this.changeToCityList.bind(this)}>{cityName}</View>
              <View className={ curentAreaName == '区域' ? 'obtaintherNew': 'obtaintherNewYeallow' } onClick={this.startChangeArea.bind(this)}>
                { curentAreaName }
                <Image 
                  className='choiceArea' 
                  src={locationArea}
                />
              </View>
              <View className={HouseSort == 'DISTANCE'? 'obtainCommonYellow': 'obtainCommon'} onClick={this.UsergetLocation.bind(this)}>距离最近</View>
              <View className='obtaintherPrice' onClick={this.changeSortPrice.bind(this)}>
                价格
                <Image 
                  className='choiceAreaBlack' 
                  src={HouseSort == 'PRICE_ASC'? btnBlack : btnBlack1}
                />
                <Image 
                  className='choiceAreaYellow' 
                  src={HouseSort == 'PRICE_ASC'? topYellow : topYellow1}
                />
              </View>
            </View>
          </View>
        </View>
        <HouseList houseList={houseList}/>
        <View className='ChiceCityid' id='ChiceCityid' style={'display: '+ CityBoxStatus +''}>
          <View className='CityIdLeft'>
            <View className={citySecondeId == ''? 'activeEachChoice':'EachChoice'} onClick={this.changeSecondId.bind(this, '', [])}>不限</View>
            {
              cityDownList.length > 0 ? (
                cityDownList.map((item, index) => {
                  return (
                    <View className={citySecondeId == item.id? 'activeEachChoice':'EachChoice'} onClick={this.changeSecondId.bind(this, item.id, item.businessCircleItemList)} key={index}>{item.name}</View>
                  )
                })
              ): ''
            }
          </View>
          <View className='CityIdRight'>
            <View className={cityThreeID == '' ? 'activeEachChoice':'EachChoice'} onClick={this.getNewHouseList.bind(this, '', '不限', false, '')}>不限</View>
            {
              ThreeCityAry.length > 0 ? (
                ThreeCityAry.map((item, index) => {
                  return (
                    <View className={cityThreeID == item.id? 'activeEachChoice': 'EachChoice'} onClick={this.getNewHouseList.bind(this, item.id, item.name, false, '')} key={index}>{item.name}</View>
                  )
                })
              ): ''
            }
          </View>
        </View>
        <View className='boxShadow' style={'display: '+ CityBoxStatus +''} onTouchMove={this.stopTouchMove.bind(this)} onClick={this.hideDownList.bind(this)}></View>
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
