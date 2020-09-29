import myRequest from '../../utils/request'
// pages/doctor/doctor.js
Page({
  data: {
    doctor_id: '',
    doctorInfo: {},
    comments: []
  },
  onLoad(options) {
    this.setData({ doctor_id: options.doctor_id})
    myRequest('/wx_user/get_doctor_message',{id:options.doctor_id},'GET').then((data)=>{
      this.setData({
        doctorInfo: data.doctor,
        comments: data.commonts
      })
    })
  },
  onClickText() {
    wx.navigateTo({
      url: '/pages/textConsult/textConsult?doctor_id=' + this.data.doctor_id + '&price=' + this.data.doctorInfo.morderPrice
    })
  },
  onClickPhone() {
    wx.navigateTo({
      url: '/pages/phoneConsult/phoneConsult?doctor_id=' + this.data.doctor_id + '&price=' + this.data.doctorInfo.porderPrice
    })
  }
})