// pages/doctor/doctor.js
Page({
  data: {
    department: ''
  },
  onLoad(options) {
    this.setData({ department: options.department})
  }
})