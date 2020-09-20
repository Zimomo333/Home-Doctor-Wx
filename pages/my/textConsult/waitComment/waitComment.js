Page({
  data: {
    consult_id: '',
    doctor_name: '钟南山',
    comment: '',
    rate: 3,
    consults: [
      {
        type: 1,
        time: '2020-09-20 20:27',
        content: '<h3>I am doctor</h3>'
      },
      {
        type: 0,
        time: '2020-09-20 20:27',
        content: '<h3>I am patient</h3>'
      },
    ]
  },
  onLoad(options) {
    this.setData({ consult_id: options.id})
  },
  onChange(event) {
    this.setData({
      rate: event.detail,
    });
  }
})
