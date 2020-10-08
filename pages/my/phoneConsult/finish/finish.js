import myRequest from '../../../../utils/request'
Page({
  data: {
    consult_id: '',
    doctor_name: '',
    date: '',
    phone: '',
    comment: '',
    rate: 0
  },
  onLoad(options) {
    this.setData({ consult_id: options.id})
    myRequest('/wx_user/show_porder',{id:options.id},'GET').then((data)=>{
      this.setData({
        doctor_name: data.realName,
        phone: data.userPhone,
        date: data.freedTime
      })
    });
    myRequest('/wx_user/getCommonts',{id:options.id},'GET').then((data)=>{
      this.setData({
        comment: data.content,
        rate: data.star
      })
    })
  }
})