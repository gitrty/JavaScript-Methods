// pages/test/test.js
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
  }
})