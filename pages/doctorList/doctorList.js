// pages/doctorList/doctorList.js
import area from "./area"

Page({
  data: {
    page:0,
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
        hospital: '广州市中心医院',
        location: '广州',
        introduction: '呼吸内科学家，广州医科大学附属第一医院国家呼吸系统疾病临床医学研究中心主任',
        total_consult: 300,
        rate: 4.99,
        textPrice: 10.00,
        telPrice: 13.00
      },
      { 
        id: '2',
        name: '李文亮',
        imageUrl: '/picture/doctor2.jpg',
        hospital: '北京市中心医院',
        location: '北京',
        introduction: '呼吸内科学家，广州医科大学附属第一医院国家呼吸系统疾病临床医学研究中心主任',
        total_consult: 200,
        rate: 4.97,
        textPrice: 10.00,
        telPrice: 13.00
      },
      { 
        id: '2',
        name: '李文亮',
        imageUrl: '/picture/doctor2.jpg',
        hospital: '北京市中心医院',
        location: '北京',
        introduction: '呼吸内科学家，广州医科大学附属第一医院国家呼吸系统疾病临床医学研究中心主任',
        total_consult: 200,
        rate: 4.97,
        textPrice: 10.00,
        telPrice: 13.00
      },
      { 
        id: '2',
        name: '李文亮',
        imageUrl: '/picture/doctor2.jpg',
        hospital: '北京市中心医院',
        location: '北京',
        introduction: '呼吸内科学家，广州医科大学附属第一医院国家呼吸系统疾病临床医学研究中心主任',
        total_consult: 200,
        rate: 4.97,
        textPrice: 10.00,
        telPrice: 13.00
      },
      { 
        id: '2',
        name: '李文亮',
        imageUrl: '/picture/doctor2.jpg',
        hospital: '北京市中心医院',
        location: '北京',
        introduction: '呼吸内科学家，广州医科大学附属第一医院国家呼吸系统疾病临床医学研究中心主任',
        total_consult: 200,
        rate: 4.97,
        textPrice: 10.00,
        telPrice: 13.00
      },
      { 
        id: '2',
        name: '李文亮',
        imageUrl: '/picture/doctor2.jpg',
        hospital: '北京市中心医院',
        location: '北京',
        introduction: '呼吸内科学家，广州医科大学附属第一医院国家呼吸系统疾病临床医学研究中心主任',
        total_consult: 200,
        rate: 4.97,
        textPrice: 10.00,
        telPrice: 13.00
      },
      { 
        id: '2',
        name: '李文亮',
        imageUrl: '/picture/doctor2.jpg',
        hospital: '北京市中心医院',
        location: '北京',
        introduction: '呼吸内科学家，广州医科大学附属第一医院国家呼吸系统疾病临床医学研究中心主任',
        total_consult: 200,
        rate: 4.97,
        textPrice: 10.00,
        telPrice: 13.00
      },
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
  },
  onReachBottom(){    //上拉懒加载
    var doctor = { 
      id: '2',
      name: '李文亮',
      imageUrl: '/picture/doctor2.jpg',
      hospital: '北京市中心医院',
      location: '北京',
      introduction: '呼吸内科学家，广州医科大学附属第一医院国家呼吸系统疾病临床医学研究中心主任',
      total_consult: 200,
      rate: 4.97,
      textPrice: 10.00,
      telPrice: 13.00
    };
    var arr= [];
    for(var i=0;i<10;i++){
      arr.push(doctor);
    }
    console.log(this.data.limit);
    this.setData({
      page: this.page.limit+1,
      doctors: this.data.doctors.concat(arr)
    })
  }
})