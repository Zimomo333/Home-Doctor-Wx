let time = require('../../utils/util');
import myRequest from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: '',
    doctor_id: '',
    doctor_name: '',
    date: '',
    phone: '',
    showDatePicker: false,
    currentDate: new Date().getTime(),
    tempDate: '',
    maxDate: new Date().getTime() + 31104000000,  // 一年的时间戳
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      } else if (type === 'day') {
        return `${value}日`;
      } else if (type === 'hour') {
        return `${value}时`;
      } else if (type === 'minute') {
        return `${value}分`;
      }
      return value;
    },
  },
  onLoad(options) {
    this.setData({
      doctor_id: options.doctor_id,
      price: options.price,
      doctor_name: options.name
    })
  },
  showDatePicker() {
    this.setData({ showDatePicker: true });
  },
  onCloseDatePicker() {
    this.setData({ showDatePicker: false });
  },
  onConfirmDatePicker(event) {
    console.log(event)
    this.setData({
      date: event.detail,
      tempDate: time.formatTimeTwo(event.detail,'Y-M-D h:m'),
      showDatePicker: false
    });
  },
  onClickCommit(){
    myRequest('/wx_user/publish_porder',
      {
        id:this.data.doctor_id,
        price:this.data.price,
        phone:this.data.phone,
        freeTime:this.data.date
      },
    'POST').then(()=>{
      console.log('提交成功！')
      wx.requestSubscribeMessage({
        tmplIds: ['BVdsgAaSGBIdxJp3gsklODSO9JKUHKm4QwmsFmhnELE'],
        success (res) {console.log(res);}
      })
      wx.navigateTo({
        url: '/pages/my/phoneConsult/phoneConsult'
      })
    })
  }
})