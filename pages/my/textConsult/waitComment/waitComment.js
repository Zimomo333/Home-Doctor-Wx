import myRequest from '../../../../utils/request'

Page({
  data: {
    consult_id: '',
    doctor_name: '',
    comment: '',
    rate: 5,
    consults: []
  },
  onLoad(options) {
    this.setData({ consult_id: options.id})
    myRequest('/wx_user/show_morder',{id:options.id},'GET').then((data)=>{
      var first = {
        type: 1,
        time: data.beginTime,
        content: data.content
      };
      this.setData({
        consults: this.data.consults.concat(first),
        doctor_name: data.realName
      })
      return myRequest('/wx_user/get_morder_message',{id:options.id},'GET')
    }).then((data)=>{
      this.setData({
        consults: this.data.consults.concat(data)
      })
    })
  },
  onChangeRate(event) {
    this.setData({
      rate: event.detail,
    });
  },
  onChangeComment(event){
    this.setData({
      comment: event.detail
    });
  },
  clickCommit(){
    myRequest('/wx_user/evalute_morder',{id:this.data.consult_id,content:this.data.comment,star:this.data.rate},'POST').then(()=>{
      console.log('评价成功');
      wx.navigateTo({
        url: '/pages/my/textConsult/textConsult?active=2'
      })
    })
  }
})
