// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    identify:"",
    //暂时设置为定值，在后期需要在onshow（页面加载时）调用后端api进行获取路径，管理员可以修改
    autoplay: true,
    interval: 3000,
    duration: 1000,
    //此时轮播图设置为定值，后期对此进行改造，管理员可以修改
    banners: [
      { "picUrl": '../../static/swiper/car1.jpg', "id": 1 },
      { "picUrl": '../../static/swiper/A.png', "id": 2 },
      { "picUrl": '../../static/swiper/in.jpg', "id": 3 },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
   
  onLoad (options) {
    var app=getApp()
    var host =app.globalData.host
    this.setData({
      phone:app.globalData.phone,
      identify:app.globalData.identify
    })
    wx.setNavigationBarTitle({
      title: "小区车辆管理"
    })
    const demo=wx.getStorageSync("demo")
    console.log(demo)
    // wx.request({
    // //  调用后台API，将真正可以修改的轮播图数组赋值
    //   url: host+"/admin/getBanners",
    //   success: function (res) {
    //     if (res.data.code == 201) {
    //       wx.showModal({
    //         title: '提示',
    //         content: '请在后台添加 banner 轮播图片',
    //         showCancel: false
    //       })
    //     } else {
    //       that.setData({
    //         banners: res.data.data.banners
    //       });
    //     }
    //   }
    // })
  },
  navToMes(){
    wx.navigateTo({
      url: '../message/message',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
   //事件处理函数
   swiperchange: function (e) {
    //console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //点击轮播图而后进行预览
  preview(event) {
    let id = event.currentTarget.dataset.id
    console.log(event)
    wx.previewImage({
      current: this.data.banners[id], // 当前显示图片的链接
      urls: this.data.banners // 需要预览的图片链接列表
    })
  },
  goToYuyue(){
    wx.navigateTo({
      url: '../yuyue/yuyue',
    })
  },
  goToCarplace(){
    wx.navigateTo({
      url: '../carport/carport',
    })
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

  },
  //用户拨打电话
  salContact(e) {
    wx.makePhoneCall({
      phoneNumber: '13888888888'
    })
  },
    //获取经纬度
    getLocation: function (e) {
      console.log(e)
      var that = this
      wx.getLocation({
        success: function (res) {
          // success
          console.log(res)
          that.setData({
            hasLocation: true,
            location: {
              longitude: res.longitude,
              latitude: res.latitude
            }
          })
        }
      })
    },
    //根据经纬度在地图上显示
    openLocation: function (e) {
      console.log("openLocation" + e)
      var value = e.detail.value
      wx.openLocation({
        latitude: 27.642659,
        longitude: 113.752604, 
        
      })
    }
})