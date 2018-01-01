// pages/order/order.js
const app = getApp()
var finishBtn = false
var noFinishBtn = true
var ifFinish = true
var totalNumber = 0
var noFinishArray = []
var testArray = []
var finishArray = []
var userArray = []
var tt = true
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifFinish: true,
    finishBtn: false,
    noFinishBtn: true,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    mode: ["自提", "送水上门"],
    state: ["未付款", "未接受", "未完成", "已完成"],
    taskTime: "   12-05 16:30",
    taskNumber: "5308",
    totalNumber: noFinishArray.length,
    finishArray: [],
    noFinishArray: [],
    tt:app.globalData.isUser,
    userArray: [1, 2, 3, 4, 5]

  },


  //点击已完成页面
  finish: function () {

    let that = this

    if (finishBtn == true) {
    }
    else {
      wx.request({
        method: "GET",
        url: "http://192.168.1.17:3014/order/all", //仅为示例，并非真实的接口地址
        data: {
          "status": "3"
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          finishArray = res.data.data
          that.setData({
            finishArray: finishArray,
            totalNumber: finishArray.length,
          })
        }
      })

      this.setData({
        noFinishBtn: false,
        finishBtn: true,
        ifFinish: false,

      })
    }
  },
  noFinish: function () {
    if (noFinishBtn != true) {
    }
    else {
      this.setData({
        noFinishBtn: true,
        finishBtn: false,
        ifFinish: true,
        totalNumber: noFinishArray.length,

      })
    }
  },
  btnCofirm: function (e) {
    let that = this
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.request({
      url: "http://192.168.1.17:3014/order/update",
      method: "POST",
      data: {
        "order_id": id,
        "status": "3"
      },
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success: function (res) {


        console.log("success")
        wx.request({
          method: "GET",
          url: "http://192.168.1.17:3014/order/all", //仅为示例，并非真实的接口地址
          data: {
            "status": "2"
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            noFinishArray = res.data.data
            that.setData({
              noFinishArray: noFinishArray,
              totalNumber: noFinishArray.length,
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    tt = app.globalData.isUser
    let that = this
    if (tt == "1") {
      wx.request({
        method: "GET",
        url: "http://192.168.1.17:3014/order/all", //仅为示例，并非真实的接口地址
        data: {
          "status": "2"
        },
        success: function (res) {
          noFinishArray = res.data.data
          that.setData({
            noFinishArray: noFinishArray,
            totalNumber: noFinishArray.length,
          })
        }
      })
    }
    else {
      console.log("testr")
      var userid = app.globalData.userId
      wx.request({
        method: "GET",
        url: "http://192.168.1.17:3014/order/mine",
        data: {
          "id": userid
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          userArray = res.data.data

          that.setData({
            userArray: userArray,
            totalNumber: userArray.length,
          })
        }
      })
    }
  }
})