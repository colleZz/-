// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
  // 判断用户是否授权登录
  wx.getSetting({
    success: function (res) {
      // 判断是否授权
      if (res.authSetting['scope.userInfo']) {
         //获取用户信息
        wx.getUserInfo({
          success: function (res) {
            //用户已经授权过，添加用户信息
            var that = this
            wx.setStorageSync('nickName', res.userInfo.nickName)
            wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl)
            console.log(res.userInfo)
          }
        });
      }else{
        wx.showToast({
           title: '请授权登录！',
           icon: 'none',
           duration: 1500,
           success: function () {
        //定时器，未授权1.5秒后跳转授权页面
           setTimeout(function () {
           wx.reLaunch({
           url: '../home/home.wxml',
              })
            }, 1500);
           }
          })
      }
    }
  })
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