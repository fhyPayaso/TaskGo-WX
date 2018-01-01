var flag = 1
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    txt_color: 'blue',
    showBtn: true,
    showDialog: false,
    bg_send: '#4A90E2',
    bg_self: '#D3CFCF',
    txt_money: "9"
  },
  onLoad: function (options) {
    //获取userId和用户角色
    wx.request({
      url: 'http://192.168.1.17:3014/user/update',
      method: 'POST',
      data: ({
        openId: app.globalData.openid
      }),
      success: function (res) {
        console.log(res.data.user_id),
        console.log(res.data.user_role),
        app.globalData.userId = res.data.user_id
          //app.globalData.isUser = res.data.user_role
      }
    })
  },
  /**
   * 获取输入框内容
   */
  addressInput: function (e) {

    app.globalData.address = e.detail.value
  },
  /**
   * 弹窗
   */
  showDialog: function () {

    //console.log(app.globalData.openid)
    this.setData({
      showDialog: true,
      showBtn: false
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  hideModal: function () {
    this.setData({
      showDialog: false,
      showBtn: true
    })
  },
  /**
   * 送水上门按钮点击事件
   */
  onSendClick: function () {
    this.setData({
      bg_send: '#4A90E2',
      bg_self: '#D3CFCF',
      txt_money: "9"
    }),
      flag = 1
  },
  /**
   * 自取点击事件
   */
  onSelfClick: function () {
    this.setData({
      bg_send: '#D3CFCF',
      bg_self: '#4A90E2',
      txt_money: "8"
    }),
      flag = 0
  },
  /**
   * 提交订单按钮
   */
  onPayClick: function () {

    var address = app.globalData.address
    var that = this

    if (address.length < 4) {

      wx.showToast({
        title: '请输入正确宿舍号',
        icon: 'loading'
      })

    } else {

      wx.request({
        url: 'http://192.168.1.17:3014/order/submit',
        method: 'POST',
        data: {
          user_id: app.globalData.userId,
          address: app.globalData.address,
          type: flag
        },
        success: function (res) {
          console.log(res.data.code),
          wx.showToast({
            title: '任务发布成功',
          })
          that.setData({
            showDialog: false,
            showBtn: true
          })
        }
      })

      this.setData({
        showDialog: false,
        showBtn: true
      })
    }
  },
  /**
   * 接受订单跳转按钮
   */
  onBtnAcceptClick: function () {

    if (app.globalData.isUser == "0") {
      wx.showToast({
        title: '仅支持管理者',
        icon: 'loading'
      })
    } else {
      wx.navigateTo({
        url: '../receive/receive',
      })
    }
  },
  /**
   * 订单管理跳转按钮
   */
  onBtnOrderClick: function () {
    wx.navigateTo({
      url: '../order/order',
    })
  }
})