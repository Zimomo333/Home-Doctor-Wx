// pages/my/healthFile/healthFile.js
let time = require('../../../utils/util');
import myRequest from '../../../utils/request'
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
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
  onLoad(){
    myRequest('/wx_user/get_health_record',null,'GET').then((data)=>{
      if(data === null){
        myRequest('/wx_user/init_health_record',null,'GET').then(()=>{
          myRequest('/wx_user/get_health_record',null,'GET').then((data)=>{
            console.log('healthFile init success!');
            this.setData({ userInfo: data });
          })
        })
      } else {
        this.setData({ userInfo: data });
        if(data.birthdate!==null){  //当birthdate空时不转换
          this.setData({
            tempDate: time.formatTimeTwo(Number(this.data.userInfo.birthdate),'Y-M-D')
          })
        }
      }
    })
  },
  onClickCommit() {
    myRequest('/wx_user/update_health_record',this.data.userInfo,'POST').then(()=>{
      Notify({ type: 'success', message: '保存成功！' });
    }).catch(()=>{
      Notify({ type: 'danger', message: '保存失败！' });
    })
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
  onChangeUsername(event){
    this.setData({
      'userInfo.username': event.detail
    });
  },
  onChangeHeight(event){
    this.setData({
      'userInfo.height': event.detail
    });
  },
  onChangeWeight(event){
    this.setData({
      'userInfo.weight': event.detail
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
      'userInfo.liverState': event.detail
    });
  },
  onChangeMarriage(event) {
    this.setData({ 
      'userInfo.ismarry': event.detail
    });
  },
  onChangeChronicDisease(event){
    this.setData({
      'userInfo.chronicDisease': event.detail
    });
  },
  onChangeHistoryDisease(event){
    this.setData({
      'userInfo.historyDisease': event.detail
    });
  },
  onChangeAllergy(event){
    this.setData({
      'userInfo.allergy': event.detail
    });
  },
  onChangeOther(event){
    this.setData({
      'userInfo.other': event.detail
    });
  },
})