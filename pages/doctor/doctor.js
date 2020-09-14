// pages/doctor/doctor.js
Page({
  data: {
    doctor_id: ''
  },
  onLoad(options) {
    this.setData({ doctor_id: options.doctor_id})
  },
})