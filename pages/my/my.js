// pages/my/my.js
const app = getApp()

Page({
  data: {
    userInfo: {
      avatarUrl: '/icon/nologin.jpg'
    },
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    active: 2,
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
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})