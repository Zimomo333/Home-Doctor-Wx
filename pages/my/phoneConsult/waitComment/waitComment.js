import myRequest from '../../../../utils/request'
import Toast from '../../../../miniprogram_npm/@vant/weapp/toast/toast'
import delay from '../../../../utils/delay'
Page({
  data: {
    consult_id: '',
    doctor_name: '',
    date: '',
    phone: '',
    comment: '',
    rate: 5
  },
  onLoad(options) {
    this.setData({ consult_id: options.id})
    myRequest('/wx_user/show_porder',{id:options.id},'GET').then((data)=>{
      this.setData({
        doctor_name: data.realName,
        phone: data.userPhone,
        date: data.freedTime
      })
    })
  },
  onChange(event) {
    this.setData({
      rate: event.detail,
    });
  },
  onClickCommit(){
    myRequest('/wx_user/evalute_porder',{id:this.data.consult_id,content:this.data.comment,star:this.data.rate},'POST').then(()=>{
      Toast.success('评价成功！');
      delay(1000).then(()=>{
        wx.redirectTo({
          url: '/pages/my/phoneConsult/phoneConsult?active=2'
        })
      })
    })
  }
})