//index.js
//获取应用实例
const app = getApp()
import myRequset from '../../utils/request'

Page({
  data: {
    page: 1,
    active: 0,
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
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    swiperList: [{
      url: '/picture/1.jpg'
    }, {
      url: '/picture/2.jpg'
    }, {
      url: '/picture/3.jpg'
    }, {
      url: '/picture/4.jpg'
    }, {
      url: '/picture/5.jpg'
    }],
    articleList: []
  },
  onLoad() {
    const page = getCurrentPages().pop();
    this.setData({
   　  active: this.data.list.findIndex(item => item.url === `/${page.route}`)  //正则匹配当前页的索引
    });
    myRequset('/wx_user/getHealthyAbouts',{page:1},'GET').then((data)=>{
      data.forEach(item=> item.time = item.time.slice(0,10));
      this.setData({
        articleList: data
      })
    })
  },
  onChange(event) {
    wx.switchTab({
      url: this.data.list[event.detail].url
    });
  },
  onReachBottom(){    //上拉懒加载
    myRequset('/wx_user/getHealthyAbouts',{page:this.data.page+1},'GET').then((data)=>{
      if(data.length != 0){   // 判断是否已经没数据了
        data.forEach(item=> item.time = item.time.slice(0,10));
        this.setData({
          page:this.data.page+1,
          articleList: this.data.articleList.concat(data)
        })
      }
    })
  },
  jump(event){
    wx.navigateTo({
      url: '/pages/article/article?id=' + event.currentTarget.id
    })
  }
})
