import myRequest from '../../../utils/request'

Page({
  data: {
    active: 0,
    ingList: [],
    waitCommentList: [],
    finishList: []
  },
  onLoad(option){
    if(option.active!==undefined){
      this.setData({
        active: Number(option.active)
      })
    }
    myRequest('/wx_user/find_going_morder',null,'GET').then((data)=>{
      this.setData({
        ingList: data
      })
    })
    myRequest('/wx_user/find_evaluate_morder',null,'GET').then((data)=>{
      this.setData({
        waitCommentList: data
      })
    })
    myRequest('/wx_user/find_complete_morder',null,'GET').then((data)=>{
      this.setData({
        finishList: data
      })
    })
  },
  onClickButton(){
    console.log('i am button')
  },
  onUnload(){
    wx.switchTab({
      url: '/pages/my/my'
    })
  }
});