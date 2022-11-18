// pages/money/money.js
Page({

 
  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    userInfo:"",
    showModal:false,
  },
  toShowModal(e) {
    this.setData({
      showModal: true
    })
  },

  hideModal(){
    this.setData({
      showModal: false
    });
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
      console.log("此处开始向后台发送请求，获取数据")
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