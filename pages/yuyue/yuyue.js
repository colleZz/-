// pages/yuyue/yuyue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yuyue:[
      {
        id:"202209230825231",
        phone:"15932850152",
        plate:"赣J4N987",
        starttime:"2022-09-28 20:15:28",
        overtime:"2022-09-28 20:30:28",
        status:"0"
      },
      {
        id:"2022012312330825231",
        phone:"15932850152",
        plate:"赣J4N987",
        starttime:"2022-09-28 20:15:28",
        overtime:"2022-09-28 20:30:28",
        status:"0"
      },
      {
        id:"202201231233082522222",
        phone:"15932850152",
        plate:"赣J4N987",
        starttime:"2022-09-28 20:15:28",
        overtime:"2022-09-28 20:30:28",
        status:"2"
      },
      {
        id:"2022092308251233",
        phone:"15932850152",
        plate:"赣J4N987",
        starttime:"2022-09-30 20:15:28",
        overtime:"2022-09-30 20:30:28",
        status:"1"
      },
      {
        id:"20220923082131",
        phone:"15932850152",
        plate:"赣J4N987",
        starttime:"2022-09-31 20:15:28",
        overtime:"2022-09-31 20:30:28",
        status:"2"
      },
    ],
    state:"",
    phone:"",
    identify:"",
    userInfo:"",
    currtab: 0,
    swipertab: [{ name: '已完成', index: 0 }, { name: '正在进行', index: 1 }, { name: '已取消', index: 2 }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad(options) {
    var app = getApp()
    var userInfo=wx.getStorageSync('userInfo')
    this.setData({
      phone:app.globalData.phone,
      identify:app.globalData.identify,
      userInfo:wx.getStorageSync('userInfo'),
    })
    
    if(userInfo==""){
      wx.showToast({
        title: '请登录/注册',
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
    }
    else if(this.data.phone==""||this.data.phone.length<11) {
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
    }

  },

 
  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },
 
  /**
  * @Explain：选项卡点击切换
  */
  tabSwitch: function (e) {
    //把this对象复制到临时变量that，解决作用域不够的问题
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.target.dataset.current
      })
    }
  },
 
  tabChange: function (e) {
    this.setData({ currtab: e.detail.current })
    this.orderShow()
  },
 
  orderShow: function () {
    let that = this
    switch (this.data.currtab) {
      case 0:
        that.alreadyShow()
        break
      case 1:
        that.waitPayShow()
        break
      case 2:
        that.lostShow()
        break
    }
  },
  alreadyShow: function(){
  },
 
  waitPayShow:function(){
  },
 
  lostShow: function () {
  },
  addyuyue(){
    //发送请求给后端，携带当前用户的phone的信息，进行预约，默认一个小时之前到达
    console.log("用户预约事件")
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

    // 页面渲染完成
    this.getDeviceInfo()
    this.orderShow()
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