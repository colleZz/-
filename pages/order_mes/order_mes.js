// pages/order_mes/order_mes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_mes:[
      {
        "id":"1",
        "phone":"15932123123850142",
        "plate":"赣J4n987",
        "parkfee":"100",
        "intime":"2022-09-21 20:15:25",
        "outtime":"2022-09-28 20:15:28",
        "parklocation":"A5",
        "status":"200"
      },
      {
      "id":"2",
      "phone":"15932850142",
      "plate":"赣J4n987",
      "parkfee":"90",
      "intime":"2022-09-21 20:15:25",
      "outtime":"2022-09-28 20:15:28",
      "parklocation":"A5",
      "status":"400"
    },
    {
      "id":"3",
      "phone":"15932850142",
      "plate":"赣J4n987",
      "parkfee":"90",
      "intime":"2022-09-21 20:15:25",
      "outtime":"2022-09-28 20:15:28",
      "parklocation":"A5",
      "status":"300"
    },
    
    {
      "id":"4",
      "phone":"15932850142",
      "plate":"赣J4n987",
      "parkfee":"90",
      "intime":"2022-09-21 20:15:25",
      "outtime":"2022-09-28 20:15:28",
      "parklocation":"A5",
      "status":"400"
    },
  ],
    phone:"",
    userInfo:"",
    currtab: 0,
    swipertab: [{ name: '已完成', index: 0 }, { name: '正在进行', index: 1 }, { name: '异常交易', index: 2 }]
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
      //伪造固定数据，首先将页面ui确定，此后
      this.setData({
        
      })
      console.log(this.data.order_mes)
    }
      

    
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