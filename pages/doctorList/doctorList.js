// pages/doctorList/doctorList.js
import area from "./area"
import myRequest from '../../utils/request'

Page({
  data: {
    page:1,
    department: '',
    search: '',
    sortOption: [
      { text: '默认排序', value: 0 },
      { text: '星级评分', value: 1 },
      { text: '回答次数', value: 2 },
      { text: '价格从低到高', value: 3 },
      { text: '价格从高到低', value: 4 },
    ],
    sort: 0,
    areaList: area,
    areaName: '全国',
    areaCode: '100100',
    doctors: []
  },
  onLoad(options) {
    this.setData({ department: options.department})
    myRequest('/wx_user/find_doctor_by_department',{department:options.department,page:this.data.page},'GET').then((data)=>{
      data.forEach((doctor)=>{
        doctor.goodcommonts=(doctor.goodcommonts/doctor.allcommonts*5).toFixed(2)
      })
      this.setData({
        doctors: data
      })
    })
  },
  areaConfirm( {detail: { values }} ) {   //对象解构
    this.selectComponent('#item').toggle();
    this.setData({ 
      areaCode: values[1].code,
      areaName: values[1].name
    })
  },
  areaCancel() {
    this.selectComponent('#item').toggle();
  },
  jump(event){
    wx.navigateTo({
      url: '/pages/doctor/doctor?doctor_id=' + event.currentTarget.id
    })
  },
  onReachBottom(){    //上拉懒加载
    myRequest('/wx_user/find_doctor_by_department',{department:this.data.department,page:this.data.page+1},'GET').then((data)=>{
      if(data.length != 0){   // 判断是否已经没数据了
        data.forEach((doctor)=>{
          doctor.goodcommonts=(doctor.goodcommonts/doctor.allcommonts*5).toFixed(2)
        })
        this.setData({
          page:this.data.page+1,
          doctors: this.data.doctors.concat(data)
        })
      }
    })
  }
})