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
    this.setData({
      'userInfo.username': this.data.userInfo.username === null ? '' : this.data.userInfo.username,
      'userInfo.sex': this.data.userInfo.sex === null ? '' : this.data.userInfo.sex,
      'userInfo.birthdate': this.data.userInfo.birthdate === null ? '' : this.data.userInfo.birthdate,
      'userInfo.height': this.data.userInfo.height === null ? '' : this.data.userInfo.height,
      'userInfo.weight': this.data.userInfo.weight === null ? '' : this.data.userInfo.weight,
      'userInfo.issmoke': this.data.userInfo.issmoke === null ? '' : this.data.userInfo.issmoke,
      'userInfo.isdrink': this.data.userInfo.isdrink === null ? '' : this.data.userInfo.isdrink,
      'userInfo.liverState': this.data.userInfo.liverState === null ? '' : this.data.userInfo.liverState,
      'userInfo.ismarry': this.data.userInfo.ismarry === null ? '' : this.data.userInfo.ismarry,
      'userInfo.chronicDisease': this.data.userInfo.chronicDisease === null ? '' : this.data.userInfo.chronicDisease,
      'userInfo.other': this.data.userInfo.other === null ? '' : this.data.userInfo.other,
      'userInfo.allergy': this.data.userInfo.allergy === null ? '' : this.data.userInfo.allergy,
      'userInfo.historyDisease': this.data.userInfo.historyDisease === null ? '' : this.data.userInfo.historyDisease,
    })
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