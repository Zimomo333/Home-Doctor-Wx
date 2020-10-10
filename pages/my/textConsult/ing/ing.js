import myRequest from '../../../../utils/request'
import Toast from '../../../../miniprogram_npm/@vant/weapp/toast/toast'
import delay from '../../../../utils/delay'
import Dialog from '../../../../miniprogram_npm/@vant/weapp/dialog/dialog';

Page({
  data: {
    formats: {},
    placeholder: '请详细描述你的病情...',
    editorHeight: 150,
    keyboardHeight: 0,
    isIOS: false,
    dialogShow: false,
    consult_id: '',
    doctor_name: '',
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

    const platform = wx.getSystemInfoSync().platform
    const isIOS = platform === 'ios'
    this.setData({ isIOS})
    const that = this
    this.updatePosition(0)
    let keyboardHeight = 0
    wx.onKeyboardHeightChange(res => {
      if (res.height === keyboardHeight) return
      const duration = res.height > 0 ? res.duration * 1000 : 0
      keyboardHeight = res.height
      setTimeout(() => {
        wx.pageScrollTo({
          scrollTop: 99999,
          success() {
            that.updatePosition(keyboardHeight)
            that.editorCtx.scrollIntoView()
          }
        })
      }, duration)
    })
  },
  updatePosition(keyboardHeight) {
    const toolbarHeight = 50
    const { windowHeight, platform } = wx.getSystemInfoSync()
    let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
    this.setData({ editorHeight, keyboardHeight })
  },
  calNavigationBarAndStatusBar() {
    const systemInfo = wx.getSystemInfoSync()
    const { statusBarHeight, platform } = systemInfo
    const isIOS = platform === 'ios'
    const navigationBarHeight = isIOS ? 44 : 48
    return statusBarHeight + navigationBarHeight
  },
  // 初始化编辑器
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
  // 失去焦点
  blur() {
    this.editorCtx.blur()
  },
  format(e) {
    let { name, value } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)

  },
  // 返回选区已设置的样式
  onStatusChange(e) {
    const formats = e.detail
    this.setData({ formats })
  },
  // 获取内容
  clickCommit(e) {
    var that = this
    this.editorCtx.getContents({
      success: function(res) {
        var local_list = []   // 本地缓存图片路径
        // var remote_list = []  服务器图片路径
        var promise_list = [] // Promise异步数组
        var new_html = ''     // 替换后的富文本
        // 获取原富文本中的本地缓存图片路径
        res.html.replace(/<img src="(.+?)"/g,(a,v) => {
          local_list.push(v);
        })
        // 有多少张图就构造多少个 上传图片的异步Promise
        local_list.forEach((local_url) => {
          promise_list.push(
            new Promise((resolve,reject)=> {
                wx.uploadFile({
                  url: 'https://www.qnm.green:8080/wx_user/upload_image',
                  filePath: local_url,
                  name: 'file',
                  header: {
                    'token': wx.getStorageSync("token")
                  },
                  success: function (res) {
                    // remote_list.push(JSON.parse(res.data).img)  Promisconsult_e.all里的Promise是异步调用的，在此push无法保证图片顺序
                    resolve(JSON.parse(res.data).data)
                  }
                })
            })
          )
        })
        // 待图片全部上传成功，并返回服务器图片路径后，替换掉原文本中的路径
        Promise.all(promise_list).then((remote_list)=>{             // Promise.all里的Promise是异步调用的，但是then中返回的结果有序
          new_html = res.html.replace(/<img src="(.+?)"/g,() => {
            return '<img src="'+remote_list.shift()+'"';
          })
          return myRequest('/wx_user/reply_morder_message',{id:that.data.consult_id,content:new_html,type:1},'POST')
        }).then(()=>{
          Toast.success('回复成功！');
          that.setData({
            consults: []
          })
          that.clear();
          that.onLoad({id:that.data.consult_id});
        })
      }
    })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function (res) {
      }
    })
  },
  openConfirm() {
    this.setData({
        dialogShow: true
    })
  },
  tapDialogButton(e) {    //弹窗确认，防止清空误操作
    if(e.detail.index==0){
      this.setData({
        dialogShow: false
      })
    } else {
      this.clear();
      this.setData({
        dialogShow: false
      })
    }
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  insertImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.editorCtx.insertImage({
          src: res.tempFilePaths[0],
          width: '80%',
          success: function () {
          }
        })
      }
    })
  },
  clickConfirm() {
    Dialog.confirm({
      title: '确认订单',
      message: '是否需要确认订单？',
    }).then(() => {
      myRequest('/wx_user/confirm_morder',{id:this.data.consult_id},'GET').then(()=>{
        Toast.success('确认成功！');
        delay(1000).then(()=>{
          wx.redirectTo({
            url: '/pages/my/textConsult/textConsult?active=1'
          })
        })
      })
    })
    .catch(() => {
      // on cancel
    });
  }
})
