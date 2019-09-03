// pages/test/test.js
const $ = require('../../utils/Promise.js')

Page({
  data: {
    list1: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    list2: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    switchArr: [1, 2, 3],
    temArr: [{
        text: '数据1'
      },
      {
        text: '数据2'
      },
      {
        text: '数据3'
      }
    ],
    router: [{
        id: 1,
        title: '标题111'
      },
      {
        id: 2,
        title: '标题222'
      },
      {
        id: 3,
        title: '标题333'
      }
    ]
  },
  update() {
    let lines = this.data.switchArr
    lines.unshift(4)
    this.setData({
      switchArr: lines
    })
  },
  routerLink(event) {
    let data = event.currentTarget.dataset
    // 页面跳转API  => 不能跳转到 TarBar 导航页面
    wx.navigateTo({
      url: '/pages/active/active?id=' + data.id + "&title=" + data.title,
    })
  },
  bigClick(){
    console.info('big被点击')
  },
  smallClick(){
    console.info('small被点击')
  },

  onLoad(options){
    this.get()
  },
  
  get() {
    this.getUserLocation().then(data=>{
      // console.info(data)
      this.getWeather(data)
    })
    
  },
  //获取用户地址(坐标)
  getUserLocation() {
    return $.wxPromisify(wx.getLocation)().then(res => {
      // console.info(res)
      return location = `${res.longitude},${res.latitude}`
    })
  },
  //获取天气数据
  getWeather(location) {
    let key = '74c6266dae0844b9ac5fe4cbda81d585'
    let url = `https://free-api.heweather.net/s6/weather?key=${key}&location=${location}`
    return $.get(url).then(res => {
      // console.log(res.data.HeWeather6[0])
      let data = res.data.HeWeather6[0]
      let basic = data.basic
      let now = data.daily_forecast[0]
      let daily_forecast = data.daily_forecast[1]

      this.setData({
        basic: `${basic.admin_area}省 ${basic.parent_city}市 ${basic.location}区`,
        now: `日期:${now.date}(今日)`,
        now1: `最高温度:${now.tmp_max} 最低温度:${now.tmp_min}`,
        now2: `白天天气状况描述:${now.cond_txt_d}`,
        now3: `夜间天气状况描述:${now.cond_txt_n}`,
        tomorrow: `日期:${daily_forecast.date}(明日)`,
        tomorrow1: `最高温度:${daily_forecast.tmp_max} 最低温度:${daily_forecast.tmp_min}`,
        tomorrow2: `白天天气状况描述:${daily_forecast.cond_txt_d}`,
        tomorrow3: `夜间天气状况描述:${daily_forecast.cond_txt_n}`
      })
      // console.log(this.data)
    })
  }
})