import myRequest from '../../../../utils/request'
import Toast from '../../../../miniprogram_npm/@vant/weapp/toast/toast'
import delay from '../../../../utils/delay'
import Dialog from '../../../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({
  data: {
    consult_id: '',
    doctor_name: '',
    date: '',
    phone: ''
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
  onClickCommit(){
    Dialog.confirm({
      title: '确认订单',
      message: '是否需要确认订单？',
    }).then(() => {
      myRequest('/wx_user/confirm_porder',{id:this.data.consult_id},'GET').then(()=>{
        Toast.success('确认成功！');
        delay(1000).then(()=>{
          wx.redirectTo({
            url: '/pages/my/phoneConsult/phoneConsult?active=1'
          })
        })
      })
    })
    .catch(() => {
      // on cancel
    });
  }
})