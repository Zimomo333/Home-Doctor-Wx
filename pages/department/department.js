// pages/department/department.js
Page({
  data: {
    active: 1,
    value: '',
    list: [
      {
        "url": "/pages/index/index",
        "icon": "wap-home",
        "text": "首页"
      },
      {
        "url": "/pages/department/department",
        "icon": "search",
        "text": "问诊"
      },
      {
        "url": "/pages/my/my",
        "icon": "contact",
        "text": "我的"
      }
    ],
    department: [
      {
        "icon": "/icon/bone.svg",
        "text": "骨科",
        "name": "bone"
      },
      {
        "icon": "/icon/brain.svg",
        "text": "精神心理科",
        "name": "brain"
      },{
        "icon": "/icon/ear.svg",
        "text": "耳鼻喉科",
        "name": "ear"
      },{
        "icon": "/icon/throat.svg",
        "text": "咽喉",
        "name": "throat"
      },{
        "icon": "/icon/heart.svg",
        "text": "心血管科",
        "name": "heart"
      },{
        "icon": "/icon/kidney.svg",
        "text": "泌尿科",
        "name": "kidney"
      },{
        "icon": "/icon/lung.svg",
        "text": "呼吸科",
        "name": "lung"
      },{
        "icon": "/icon/stomach.svg",
        "text": "消化科",
        "name": "stomach"
      },{
        "icon": "/icon/teeth.svg",
        "text": "口腔科",
        "name": "teeth"
      },
    ]
  },
  onLoad() {
    const page = getCurrentPages().pop();
    this.setData({
   　  active: this.data.list.findIndex(item => item.url === `/${page.route}`)
    });
  },
  onChange(event) {
    wx.switchTab({
      url: this.data.list[event.detail].url
    });
  }
})