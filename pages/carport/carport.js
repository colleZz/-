// pages/carport/carport.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    map_sim:"../../static/map.png",
    phone:"",
    userInfo:"",
    test:"",
    //剩余车位数量,页面加载时向后端发送请求获取空闲车位的信息
    number:12
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad(options) {
    var app = getApp()
    this.setData({
      phone:app.globalData.phone,
      userInfo:wx.getStorageSync('userInfo'),
    })
    if(this.data.phone==""||this.data.phone.length<11) {
      wx.showModal({
        title: '请前往个人信息页面绑定手机号以及各类信息',
        icon:"none",
        duration:2000,
        mask:true,
        success(data){
          setTimeout(function(){
            //延时跳转
            wx.switchTab({
              url: '../user/user',
            })
          })
        }
      })
    }else{
      console.log("onLoad")
      this.setData({
        test:"onLoadonLoadonLoadonLoad"
      })
    }

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