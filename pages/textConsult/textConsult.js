Page({
  data: {
    formats: {},
    readOnly: false,
    placeholder: '开始输入...',
    editorHeight: 300,
    keyboardHeight: 0,
    isIOS: false,
    dialogShow: false
  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onLoad() {
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
  clickLogText(e) {
    this.editorCtx.getContents({
      success: function(res) {
        console.log(res.html)
        wx.setStorageSync("content", res.html); // 缓存本地
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
        wx.uploadFile({
          url: '自己的图片上传地址',
          filePath: res.tempFilePaths[0],
          name: 'file',
          header: {
            'Authorization': 'test123'
          },
          success: function (res) {
            console.log(res.data,'图片上传之后的数据')
            var data = JSON.parse(res.data)
            console.log(data.data.url)
            that.editorCtx.insertImage({
              src: data.data.url,
              success: function () {
                console.log('insert image success')
              }
            })
          }
        })
      }
    })
  }
})
