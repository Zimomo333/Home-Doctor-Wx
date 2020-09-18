// pages/my/healthFile/healthFile.js
let time = require('../../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      userid: '',
      username: '小豪',
      sex: '1',
      birthdate: '',
      phone: '',
      height: 178.0,
      weight: 65.0,
      issmoke: '0',
      isdrink: '0',
      liver_state: '0',
      ismarry: '0',
      chronic_disease: '',
      allergy: '',
      history_disease: '',
      other: '',
    },
    showDatePicker: false,
    currentDate: new Date().getTime(),
    tempDate: '',
    minDate: new Date(1900, 1, 1).getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      } else if (type === 'day') {
        return `${value}日`;
      }
      return value;
    },
  },
  showDatePicker() {
    this.setData({ showDatePicker: true });
  },
  onCloseDatePicker() {
    this.setData({ showDatePicker: false });
  },
  onConfirmDatePicker(event) {
    this.setData({
      'userInfo.birthdate': event.detail,
      tempDate: time.formatTimeTwo(event.detail,'Y-M-D'),
      showDatePicker: false
    });
  },
  onChangeSex(event) {
    // event.detail 为当前输入的值
    this.setData({ 
      'userInfo.sex': event.detail
    });
  },
  onChangeSmoke(event) {
    this.setData({ 
      'userInfo.issmoke': event.detail
    });
  },
  onChangeDrink(event) {
    this.setData({ 
      'userInfo.isdrink': event.detail
    });
  },
  onChangeLiver(event) {
    this.setData({ 
      'userInfo.liver_state': event.detail
    });
  },
  onChangeMarriage(event) {
    this.setData({ 
      'userInfo.ismarry': event.detail
    });
  }
})