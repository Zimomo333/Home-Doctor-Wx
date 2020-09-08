// pages/department/department.js
Page({
  data: {
    active: 1,
    list: [
      {
        "url": "/pages/index/index",
        "icon": "wap-home-o",
        "text": "首页"
      },
      {
        "url": "/pages/department/department",
        "icon": "search",
        "text": "问诊"
      },
      {
        "url": "/pages/my/my",
        "icon": "contact",
        "text": "我的"
      }
    ]
  },
  onLoad() {
    const page = getCurrentPages().pop();
    this.setData({
   　  active: this.data.list.findIndex(item => item.url === `/${page.route}`)
    });
  },
  onChange(event) {
    wx.switchTab({
      url: this.data.list[event.detail].url
    });
  }
})