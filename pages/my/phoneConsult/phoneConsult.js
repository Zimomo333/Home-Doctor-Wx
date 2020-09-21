Page({
  data: {
    active: 0,
    ingList: [
      {
        id: '123',
        doctor_name: '钟南山',
        date: '2020-09-09',
        price: 15
      }
    ],
    waitCommentList: [
      {
        id: '123',
        doctor_name: '钟南山',
        date: '2020-09-09',
        price: 15
      }
    ],
    finishList: [
      {
        id: '123',
        doctor_name: '钟南山',
        date: '2020-09-09',
        price: 15
      }
    ],
  },
  onClickButton(){
    console.log('i am button')
  }
});