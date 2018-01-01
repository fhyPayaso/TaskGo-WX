const app = getApp()
var totalnumber=0 //生命一个全局变量

var textArray = []

Page({


  /**
   * 页面的初始数据
   */
  data: {

    textArray: [],
    totalnumber:0

  },

  /**
   * 点击按钮，清空列表内容
   */
  // rapid: function () {

  //   //其实就是让数组变成一个空数组即可
  //   this.setData({
  //     textArray: [],
  //     totalnumber: 0
  //   });
  // },


  receive_tap: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id

    // console.log(id)

    wx.request({
      method: "POST",
      url: 'http://192.168.1.17:3014/order/update',
      data: {
        "order_id": id,
        "status": "2"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        wx.request({
          method: "GET",
          url: 'http://192.168.1.17:3014/order/all',
          data: {
            "status": 1
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            textArray = res.data.data,

              that.setData({

                textArray: textArray,
                totalnumber: textArray.length

              })
          }
        })
      }
    })



  },

  rapid: function () {
    var that = this;


    that.setData({

      textArray: textArray,
      totalnumber:textArray.length
    })

    // console.log(id)
 totalnumber=textArray.length

    // console.log(totalnumber)
   
    if (totalnumber != 0) {
      console.log(totalnumber)
      for (var i = totalnumber - 1; i >= 0; i--) {

        var id = textArray[i].id
        
        wx.request({
          method: "POST",
          url: 'http://192.168.1.17:3014/order/update',
          data: {
            "order_id": id,
            "status": "2"
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            

          }
        })
      }
    }
    wx.request({
      method: "GET",
      url: 'http://192.168.1.17:3014/order/all',
      data: {
        "status": 1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        textArray = res.data.data,
          // console.log(res.data.data)
          that.setData({

            textArray: textArray,
            totalnumber: textArray.length

          })
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

    var that = this;

    wx.request({
      method: "GET",
      url: 'http://192.168.1.17:3014/order/all',
      data: {
        "status": 1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        textArray = res.data.data,
          // console.log(res.data.data)
          that.setData({

            textArray: textArray,
            totalnumber: textArray.length
          })
      }
    })
  },





  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    this.setData({
      // users: Date.textArray.length
      users: this.data.textArray.length
    })





  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },




})





