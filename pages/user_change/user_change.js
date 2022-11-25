// pages/user_change/user_change.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 页面所需数据
    plate:"",
    newplate:"",
    VerificationCode:"",
    phone:"",
    newphone:"",
        /**
        * 顶部切换页面配置
        */
       winWidth: 0,
       winHeight: 0,
       // tab切换
       currentTab: 0,
  },
//发送验证码
doGetCode: function (e) {
  var app=getApp()
  var host =app.globalData.host
  if(!this.checkPhone(this.data.phone)&&this.changePhone(this.data.newphone)){
    return
  }
  var that = this;
  that.setData({
    disabled: true, //只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
    color: '#ccc',
  })
 var phone=this.data.newphone
 console.log(phone)
  var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值
  var warn = null; //warn为当手机号为空或格式不正确时提示用户的文字，默认为空
  // 发送请求，携带手机号码给后端，后端成功之后回传数据，再进行操作
  wx.request({
    url: host+"/user/sendValidateCode",
    data: {
     phone: phone,
    },
    method:"GET",
    header: {
      "Content-Type": "application/json"
    },
    success:function(res){
      wx.showToast({
        title: '短信验证码已发送',
        icon: 'none',
        duration: 2000
      });
      console.log(res)
      // 获取验证码失败
      if(res.data.code==201){
        wx.showToast({
          title: '获取失败，请重试',
          duration: 1000,
          icon:"none"
        })
        that.setData({
          disabled: false, //重启点击
          color: '#80a1a3',
        })
      }
    }
  })
  return true
},
 //提交修改
 changePlate(){
  var app=getApp()
  var host =app.globalData.host
  if(this.checkPhone(this.data.phone)){
      //校验通过后再对新旧车牌号的格式进行验证
      if(this.checkPhone(this.data.plate)&&this.checkPhone(this.data.newplate)){
        //全部成功之后则向后端发送修改请求
        wx.request({
          url: host+"/user/updatePlate",
          method: "PUT",
          header: {
            "Content-Type": "application/json"
          },
          data:{
            phone: this.data.phone,
            validateCode: this.data.VerificationCode,
            newPlate:this.data.newPlate,
            oldPlate: this.data.oldPlate
          },
          success:function(res){
            //请求失败的提示信息
            if(res.data.code==201){
              wx.showToast({
                title: '修改失败请重试',
                icon:"none",
                duration: 1000
              })
            }
            wx.switchTab({
              url: '../user/user',
            })
          }
        })
        //修改成功回到查看个人信息页面
      }
  }else{
    console.log("changePlate")
  }
},
 //提交修改
 changePhone(){
  if(this.checkPhone(this.data.phone)&&this.checkPhone(this.data.newphone)){
    var app=getApp()
    var host =app.globalData.host
    wx.request({
      url:host+"/user/updatePhone" ,
      method:"PUT",
      data:{
        oldPhone : this.data.phone,
        newPhone: this.data.newphone,
        validateCode: this.data.VerificationCode
      },
      header: {
        "Content-Type": "application/json"
      },
      success:function(res){
        //判断后端回传的值，如果为200，则需要将小程序中的全局变量修改为新修改的手机号，如果不是则展示提示框
        if(res.data.code==201){
          wx.showToast({
            title: '修改失败请重试',
            icon:"none",
            duration: 1000
          })
        }
        wx.switchTab({
          url: '../user/user',
        })
      }
    })
  }else{
    console.log("changePhone")
  }
},
//修改手机号
phone(e){
  this.setData({
    phone:e.detail.value
  })
},
//修改车牌号
plate(e){
  this.setData({
    plate:e.detail.value
  })
},
//修改新的车牌号
newplate(e){
  this.setData({
    newplate:e.detail.value
  })
},
newphone(e){
  this.setData({
    newphone:e.detail.value
  })
},
// 修改验证码
VerificationCode(e){
  this.setData({
    VerificationCode:e.detail.value
  })
},
 //校验手机号格式并且进行提示
 checkPhone(phone){
  var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (phone.length == 0) {
      wx.showToast({
        title: '输入手机号为空',
        icon:"error",
        duration: 1500
      })
      this.setData({
        mobileFormat: false,
      })
      return false
    } else if (phone.length < 11) {
      wx.showToast({
        title: '手机号长度有误，请重新输入！',
        icon: 'none',
        duration: 1500
      })
      this.setData({
        mobileFormat: false,
      })
      return false
    } else if (!myreg.test(phone)) {
      wx.showToast({
        title: '手机号有误，请重新输入！',
        icon: 'none',
        duration: 1500
      })
      return false
    } 
    return true
},
/**
*  　判断是否合法车牌号
*　　@name isCarLicense
*　　@param license 车牌号
*　　@return bool
*/
isCarLicense(license){
  
  //匹配民用车牌和使馆车牌
  //判断标准
  //1.第一位为汉子省份缩写
  //2.第二位为大写字母城市编码
  //3.后面是5位仅含字母和数字的组合
  if(/[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新使]{1}[A-Z]{1}[0-9a-zA-Z]{5}$/u.exec(license)){
    return true;
  }
  //匹配特种车牌(挂,警,学,领,港,澳)
  if(/[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新]{1}[A-Z]{1}[0-9a-zA-Z]{4}[挂警学领港澳]{1}$/u.exec(license)){
    return true;
  }

  //匹配武警车牌
  if(/^WJ[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新]?[0-9a-zA-Z]{5}$/u.exec(license)){
    return true;
  }

  //匹配新能源车辆6位车牌
  //小型新能源车
  if(/[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新]{1}[A-Z]{1}[DF]{1}[0-9a-zA-Z]{5}$/u.exec(license)){
    return true;
  }
  //大型新能源车
  if(/[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新]{1}[A-Z]{1}[0-9a-zA-Z]{5}[DF]{1}$/u.exec(license)){
    return true;
  }
  wx.showToast({
    title: '车牌号错误',
    duration:1500,
    icon:"none"
  })
  return false;
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
 
    /**
     * 获取系统信息
     */
    wx.getSystemInfo( {
 
      success: function( res ) {
        that.setData( {
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
 /**
     * 滑动切换tab
     */
    bindChange: function( e ) {
 
      var that = this;
      that.setData( { currentTab: e.detail.current });
   
    },
    /**
     * 点击tab切换
     */
    swichNav: function( e ) {
   
      var that = this;
   
      if( this.data.currentTab === e.target.dataset.current ) {
        return false;
      } else {
        that.setData( {
          currentTab: e.target.dataset.current
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