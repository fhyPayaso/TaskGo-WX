//app.js
App({
  onLaunch: function () {

    let that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code)
        //获取openId
        wx.request({
          url: 'http://192.168.1.17:3014/user/login',
          data: {
            //暂时拿个人appId和秘钥测试
            code: res.code,
            appId: 'wxf5454f41a34e7bc8',
            appSecret: 'ba489bc491ce716a2463ffffa2755554'
          },
          success: function (res) {
            //保存openid
            console.log(res.data.ch.openid)
            that.globalData.openid = res.data.ch.openid
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openId: "",
    userId: "",
    isUser: "1",//0买水者，1送水者
    address:""
  }
})