// pages/doctorList/doctorList.js
import area from "./area"

Page({
  data: {
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
    doctors: [
      { 
        id: '1',
        name: '钟南山',
        imageUrl: '/picture/doctor1.jpg',
        textPrice: 10.00,
        telPrice: 13.00
      },
      { 
        id: '2',
        name: '李文亮',
        imageUrl: '/picture/doctor2.jpg',
        textPrice: 10.00,
        telPrice: 13.00
      }
    ]
  },
  onLoad(options) {
    this.setData({ department: options.department})
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
  }
})