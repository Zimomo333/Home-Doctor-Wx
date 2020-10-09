import myRequest from '../../utils/request'
// pages/doctor/doctor.js
Page({
  data: {
    page: 1,
    doctor_id: '',
    doctorInfo: {},
    comments: []
  },
  onLoad(options) {
    this.setData({ doctor_id: options.doctor_id})
    myRequest('/wx_user/get_doctor_message',{id:options.doctor_id},'GET').then((data)=>{
      data.doctor.goodcommonts = (data.doctor.goodcommonts/data.doctor.allcommonts*5).toFixed(2);
      this.setData({
        doctorInfo: data.doctor
      })
    })
    myRequest('/wx_user/get_comments',{id:options.doctor_id,page:this.data.page},'GET').then((data)=>{
      this.setData({
        comments: this.data.comments.concat(data)
      })
    })
  },
  onReachBottom(){    //上拉懒加载
    myRequest('/wx_user/get_comments',{id:this.data.doctor_id,page:this.data.page+1},'GET').then((data)=>{
      if(data.length != 0){   // 判断是否已经没数据了
        this.setData({
          page:this.data.page+1,
          comments: this.data.comments.concat(data)
        })
      }
    })
  },
  onClickText() {
    wx.navigateTo({
      url: '/pages/textConsult/textConsult?doctor_id=' + this.data.doctor_id + '&price=' + this.data.doctorInfo.morderPrice
    })
  },
  onClickPhone() {
    wx.navigateTo({
      url: '/pages/phoneConsult/phoneConsult?doctor_id=' + this.data.doctor_id + '&price=' + this.data.doctorInfo.porderPrice + '&name=' +　this.data.doctorInfo.realName
    })
  }
})