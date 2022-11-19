// pages/user_mes/user_mes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money:"11111.90",
    parkLocation:"A5",
    addmes:false,
    checkmes:true,
    text: '获取验证码', //按钮文字
    currentTime: 61, //倒计时
    disabled: false, //按钮是否禁用
    VerificationCode:"",
    userInfo:{},
    phone:"",
    plates:[
      {
        "id":"1",
        "plate":"赣J4n987"
      },
      {
        "id":"2",
        "plate":"赣J4n111"
      }
  ],
    bguser:"../../static/bguser.png",
    state:1,
  },
  goToCZhi(){
    wx.navigateTo({
      url: '../chongzhi/chongzhi',
      
    })
  },
  changepalte(e){
    var palate=e.target.dataset.palate
    console.log(e.target.dataset.palate)
    this.setData({
      plate:palate,
      addmes:true,
      checkmes:false
    })
  },
  addmes(){
    this.setData({
      addmes:true,
      checkmes:false
    })
  },
  checkmes(){
    this.setData({
      addmes:false,
      checkmes:true,
      plate:""
    })
  },

 
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var app=getApp()
    this.setData({
      phone:app.globalData.phone,
      userInfo:wx.getStorageSync('userInfo'),
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