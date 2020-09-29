import myRequest from '../../utils/request'

Page({
  data: {
    price: '',
    doctor_id: '',
    formats: {},
    placeholder: '请详细描述你的病情...',
    editorHeight: 300,
    keyboardHeight: 0,
    isIOS: false,
    dialogShow: false
  },
  onLoad(options) {
    this.setData({ 
      doctor_id: options.doctor_id,
      price: options.price
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
          scrollTop: 0,
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

      if (wx.getStorageSync("content")) { // 设置~历史值
        that.editorCtx.insertText(wx.getStorageSync("content")) // 注意：插入的是对象
      }
      
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
  // clickCommit(e) {
  //   this.editorCtx.getContents({
  //     success: function(res) {
  //       console.log(res.html)
  //       wx.setStorageSync("content", res.html); // 缓存本地
  //     }
  //   })
  // },
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
                    // remote_list.push(JSON.parse(res.data).img)  Promise.all里的Promise是异步调用的，在此push无法保证图片顺序
                    resolve(res.data.data)
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
          myRequest('/wx_user/publish_morder',{id:that.data.doctor_id,price:that.data.price,content:new_html},'POST').then(()=>{
            wx.navigateTo({
              url: '/pages/my/textConsult/textConsult'
            })
          })
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
        console.log("clear success")
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
            console.log('insert image success')
          }
        })
      }
    })
  }
})
