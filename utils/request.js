export default function myRequest(url,data,method){
  return new Promise((resolve,reject) =>{
    wx.request({
      url: 'http://www.zimomo333.com:8080'+url,
      data: data,
      method,
      header: {
        'token': wx.getStorageSync("token"),
        'content-type': 'application/x-www-form-urlencoded'   // 必须设置编码类型
      },
      success: function(res) {
        if(res.data.code==200){
          resolve(res.data.data)
        } else {
          reject(res.data.attach)
        }
      },
      fail: function(res) {
        reject('request fail')
      }
    })
  })
}