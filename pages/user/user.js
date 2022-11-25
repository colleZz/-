// pages/user/user.js
import {setStorageUserInfo} from '../../utils/storge'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    phone:"",
    identify:0,
    bguser:"../../static/bguser.png",
    userInfo:"",
    hasUserInfo:false,
    showModal:false
  },
  //点击显示模态框并且获取当前用户的余额
  toShowModal(e) {
    if (!this.data.showModal) {
      this.setData({
        showModal: true
      })
    }else{
      this.setData({
        showModal: false
      })
    }

  },

  hideModal(){
    this.setData({
      showModal: false
    });
  },
  onLoad() {
    
  },
  getUserProfile(e) {
    var that=this
    var appInstance = getApp()
    var host = appInstance.globalData.host
    // 推荐使用 wx.getUserProfile 获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
        wx.setStorageSync('userInfo', res.userInfo)
            //登录之后获取该微信号所绑定的用户的信息
        wx.request({
          url: host+"/user/getMessage",
          method:'GET',
          data:{
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl
          },
          header: {
            "Content-Type": "application/json"
          },
          success:function(res){
            //改变全局变量的值
            appInstance.globalData.phone=res.data.data.user.phone
            that.setData({
              identify:res.data.data.user.identify
            })
          }
        })
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