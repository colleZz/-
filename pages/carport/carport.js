// pages/carport/carport.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mapUrl:"../../static/map.png",
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
    //向后端发送请求，获取图片数据和剩余车位数量
    // var app = getApp()
    // var host=app.globalData.host
    // wx.request({
    //   url: host+"/admin/getCarPortUrl",
    //   method:"GET",
    //   header: {
    //     "Content-Type": "application/json"
    //   },
    //   success(res){
    //     this.setData({
    //       mapUrl:res.data.data.mapUrl
    //     })
    //   }
    // })
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
    //发送请求获取实时车位信息
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