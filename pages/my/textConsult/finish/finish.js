import myRequest from '../../../../utils/request'

Page({
  data: {
    consult_id: '',
    doctor_name: '',
    comment: '',
    rate: '',
    consults: []
  },
  onLoad(options) {
    this.setData({ consult_id: options.id})
    myRequest('/wx_user/show_morder',{id:options.id},'GET').then((data)=>{
      var first = {
        type: 1,
        time: data.beginTime,
        content: data.content
      };
      this.setData({
        consults: this.data.consults.concat(first),
        doctor_name: data.realName
      })
      return myRequest('/wx_user/get_morder_message',{id:options.id},'GET')
    }).then((data)=>{
      this.setData({
        consults: this.data.consults.concat(data)
      })
    })
    myRequest('/wx_user/getCommonts',{id:options.id},'GET').then((data)=>{
      this.setData({
        comment: data.content,
        rate: data.star
      })
    })
  }
})
