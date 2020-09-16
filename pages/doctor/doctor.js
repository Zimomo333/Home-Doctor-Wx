// pages/doctor/doctor.js
Page({
  data: {
    doctor_id: '',
    doctorInfo: {
      name: '钟南山',
      imageUrl: '/picture/doctor1.jpg',
      department: '呼吸科',
      hospital: '广州市中心医院',
      position: '主任医师',
      education: '清华大学',
      location: '广州',
      introduction: '呼吸内科学家，广州医科大学附属第一医院国家呼吸系统疾病临床医学研究中心主任',
      rate: 4.99,
      total_consult: 300,
      text_consult_price: 99,
      phone_consult_price: 119
    }
  },
  onLoad(options) {
    this.setData({ doctor_id: options.doctor_id})
  },
})