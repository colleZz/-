// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CZmoney:0.0,
    // 输入框参数设置
    inputData: {
      input_value: "",//输入框的初始内容
      value_length: 0,//输入框密码位数
      isNext: false,//是否有下一步的按钮
      get_focus: true,//输入框的聚焦状态
      focus_class: true,//输入框聚焦样式
      value_num: [1, 2, 3, 4, 5, 6],//输入框格子数
      height: "98rpx",//输入框高度
      width: "604rpx",//输入框宽度
      see: false,//是否明文展示
      interval: true,//是否显示间隔格子
      },
    },

    // 当组件输入数字6位数时的自定义函数
  valueSix() {
    var app=getApp()
    var host =app.globalData.host
    //像后端发送请求，更新余额
    wx.request({
      url:host+ '/user/moneyRecharge',
      method:"PUT",
      header: {
        "Content-Type": "application/json"
      },
      data:{
        phone: app.globalData.phone,
        money: this.data.CZmoney
      },
      success(res){
        if(res.data.code==201){
          // 模态交互效果
          wx.showToast({
            title: '充值失败请重试',
            icon:"error",
            duration: 2000
          })
        }
        // 模态交互效果
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      CZmoney:options.CZmoney
    })
    console.log(this.data.CZmoney)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})