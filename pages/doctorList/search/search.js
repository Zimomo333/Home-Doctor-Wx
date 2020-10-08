import myRequest from '../../../utils/request'

Page({
  data: {
    page:1,
    keyword: '',
    doctors: []
  },
  onLoad(options) {
    this.setData({ keyword: options.keyword})
    myRequest('/wx_user/search_doctor',{keyword: options.keyword,page:this.data.page},'GET').then((data)=>{
      data.forEach((doctor)=>{
        doctor.goodcommonts=(doctor.goodcommonts/doctor.allcommonts*5).toFixed(2)
      })
      this.setData({
        doctors: data
      })
    })
  },
  jump(event){
    wx.navigateTo({
      url: '/pages/doctor/doctor?doctor_id=' + event.currentTarget.id
    })
  },
  onReachBottom(){    //上拉懒加载
    myRequest('/wx_user/search_doctor',{keyword: this.data.keyword,page:this.data.page+1},'GET').then((data)=>{
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
  onSearch() {
    this.onLoad({keyword: this.data.keyword})
  }
})