// pages/user_add/user_add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plate:"",
    VerificationCode:"",
    phone:""
  },
  //发送验证码
  doGetCode: function () {
    if(!this.checkPhone()){
      return
    }
    var that = this;
    that.setData({
      disabled: true, //只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
      color: '#ccc',
    })
    var phone = that.data.phone;
    var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值
    var warn = null; //warn为当手机号为空或格式不正确时提示用户的文字，默认为空
    wx.request({
      url: '', //后端判断是否已被注册， 已被注册返回1 ，未被注册返回0
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          state: res.data
        })
        if (phone == '') {
          warn = "号码不能为空";
        } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
          warn = "手机号格式不正确";
        } //手机号已被注册提示信息
        else if (that.data.state == 1) {  //判断是否被注册
          warn = "手机号已被注册";
        }
        else {
          wx.request({
            url: '', //填写发送验证码接口
            method: "POST",
            data: {
              phone: that.data.phone
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res.data)
              that.setData({
                VerificationCode: res.data.verifycode
              })
              //当手机号正确的时候提示用户短信验证码已经发送
              wx.showToast({
                title: '短信验证码已发送',
                icon: 'none',
                duration: 2000
              });
              //设置一分钟的倒计时
              var interval = setInterval(function () {
                currentTime--; //每执行一次让倒计时秒数减一
                that.setData({
                  text: currentTime + 's', //按钮文字变成倒计时对应秒数
                })
                //如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
                if (currentTime <= 0) {
                  clearInterval(interval)
                  that.setData({
                    currentTime: 61,
                    disabled: false,
                    color: '#33FF99'
                  })
                }
              }, 100);
            }
          })
        };
        //判断 当提示错误信息文字不为空 即手机号输入有问题时提示用户错误信息 并且提示完之后一定要让按钮为可用状态 因为点击按钮时设置了只要点击了按钮就让按钮禁用的情况
        if (warn != null) {
          wx.showModal({
            title: '提示',
            content: warn
          })
          that.setData({
            disabled: false,
            color: '#33FF99'
          })
          return;
        }
      }
    })
  },
   //提交修改
   submit(){
    if(this.checkPhone()){
      //校验通过之后校验车牌号
      if(this.isCarLicense(this.data.plate)){
        wx.request({
          url: '',
          data:{
            phone:this.data.phone,
            verifycode:this.data.VerificationCode,
            plate:this.data.plate
          },
          success:function(res){
            wx.showToast({
              title: '添加/修改成功',
              icon:"success",
              duration:1500
            })
            wx.switchTab({
              url: '../user/user',
            })
          }
        })
      }
    }else{
      console.log("重置信息")
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
  // 修改验证码
  VerificationCode(e){
    this.setData({
      VerificationCode:e.detail.value
    })
  },
   //校验手机号格式并且进行提示
   checkPhone(){
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if (this.data.phone.length == 0) {
        wx.showToast({
          title: '输入手机号为空',
          icon:"error",
          duration: 1500
        })
        this.setData({
          mobileFormat: false,
        })
        return false
      } else if (this.data.phone.length < 11) {
        wx.showToast({
          title: '手机号长度有误，请重新输入！',
          icon: 'none',
          duration: 1500
        })
        this.setData({
          mobileFormat: false,
        })
        return false
      } else if (!myreg.test(this.data.phone)) {
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    var app=getApp()
    
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