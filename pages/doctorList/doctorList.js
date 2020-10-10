// pages/doctorList/doctorList.js
import area from "./area"
import myRequest from '../../utils/request'

Page({
  data: {
    page:1,
    department: '',
    keyword: '',
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
    doctors: [],
    sortUrlOptions: ['find_doctor_by_department','find_goodCommonts_doctor','find_services_doctor','find_priceasc_doctor','find_pricedesc_doctor']
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
      areaName: values[1].name,
      page: 1,
      sort: 0
    });
    if(values[1].code!=='100100'){
      myRequest('/wx_user/find_place_doctor',{department:this.data.department,page:1,city:values[1].name},'GET').then((data)=>{
        data.forEach((doctor)=>{
          doctor.goodcommonts=(doctor.goodcommonts/doctor.allcommonts*5).toFixed(2)
        })
        this.setData({
          doctors: data
        })
      })
    } else {
      myRequest('/wx_user/find_doctor_by_department',{department:this.data.department,page:1},'GET').then((data)=>{
        data.forEach((doctor)=>{
          doctor.goodcommonts=(doctor.goodcommonts/doctor.allcommonts*5).toFixed(2)
        })
        this.setData({
          doctors: data
        })
      });
    }
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
    myRequest('/wx_user/'+this.data.sortUrlOptions[this.data.sort],{department:this.data.department,page:this.data.page+1},'GET').then((data)=>{
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
  },
  onClickChange(e){
    this.setData({
      sort: e.detail,
      page: 1,
      areaName: '全国',
      areaCode: '100100'
    })
    switch(e.detail){
      case 0:{
        myRequest('/wx_user/find_doctor_by_department',{department:this.data.department,page:1},'GET').then((data)=>{
          data.forEach((doctor)=>{
            doctor.goodcommonts=(doctor.goodcommonts/doctor.allcommonts*5).toFixed(2)
          })
          this.setData({
            doctors: data
          })
        });
        break;
      }
      case 1:{
        myRequest('/wx_user/find_goodCommonts_doctor',{department:this.data.department,page:1},'GET').then((data)=>{
          data.forEach((doctor)=>{
            doctor.goodcommonts=(doctor.goodcommonts/doctor.allcommonts*5).toFixed(2)
          })
          this.setData({
            doctors: data
          })
        });
        break;
      }
      case 2:{
        myRequest('/wx_user/find_services_doctor',{department:this.data.department,page:1},'GET').then((data)=>{
          data.forEach((doctor)=>{
            doctor.goodcommonts=(doctor.goodcommonts/doctor.allcommonts*5).toFixed(2)
          })
          this.setData({
            doctors: data
          })
        });
        break;
      }
      case 3:{
        myRequest('/wx_user/find_priceasc_doctor',{department:this.data.department,page:1},'GET').then((data)=>{
          data.forEach((doctor)=>{
            doctor.goodcommonts=(doctor.goodcommonts/doctor.allcommonts*5).toFixed(2)
          })
          this.setData({
            doctors: data
          })
        });
        break;
      }
      case 4:{
        myRequest('/wx_user/find_pricedesc_doctor',{department:this.data.department,page:1},'GET').then((data)=>{
          data.forEach((doctor)=>{
            doctor.goodcommonts=(doctor.goodcommonts/doctor.allcommonts*5).toFixed(2)
          })
          this.setData({
            doctors: data
          })
        });
        break;
      }
    }
  },
  onSearch() {
    wx.navigateTo({
      url: '/pages/doctorList/search/search?keyword=' + this.data.keyword
    })
  }
})