// pages/chongzhi/chongzhi.js
Page({
  /**
   * 页面的初始数据
   */
   /**
   * 页面的初始数据
   */
  data: {
    userMoney:10.0,
    CZmoney:0.0,
    //在onshow方法中获取当前用户的余额
    selfMoney:0,
    activeIndex: 0, //默认选中第一个
    numArray: [20, 30, 50, 80, 100,'m']
  },
  activethis: function (event) { //点击选中事件
    var thisindex = event.currentTarget.dataset.thisindex; //当前index
    this.setData({
      activeIndex: thisindex
    })
  },
  selfInput(e){
    this.setData({
      selfMoney:e.detail.value
    })
  },
  chongzhi(){
    // 首先获取充值的金额，之后弹出支付页面，确认支付密码之后则更新金额
    this.setData({
      CZmoney:this.data.numArray[this.data.activeIndex]=='m'?this.data.selfMoney:this.data.numArray[this.data.activeIndex],
    })
    this.data.CZmoney+=this.data.userMoney
    console.log(this.data.CZmoney)
    wx.navigateTo({
      url: '../pay/pay?CZmoney='+this.data.CZmoney,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    var app=getApp()
    var host = app.globalData.host
    var that=this
    wx.request({
      url:host+"/user/getUserMoney" ,
      data:{
        phone:app.globalData.phone
      },
      method:"GET",
      header: {
        "Content-Type": "application/json"
      },
      success(res){
        that.setData({
          userMoney: res.data.data.money
        })
      }
    })
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