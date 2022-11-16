// components/login.js
import {setStorageUserInfo} from '../../utils/storge'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo:{},
    phone:"",
    password:"",
    current:1,
    codeText:'获取验证码',
    counting:false,
    countCode:"",
    enpassword1:"",
    enpassword2:"",
  },

  /**
   * 组件的方法列表
   */
  methods: {
      // 点击授权获取用户信息
  handleGetUserInfo(e) {
    wx.getUserInfo({
      success: function(res) {
        console.log(res)
      }
    })
    console.log(this.data.userInfo)
    // 把用户信息存储到本地存储中
    setStorageUserInfo(e.detail.userInfo);
  },
    // 登陆注册监听
    click(e){
      let index = e.currentTarget.dataset.code;
      this.setData({
        current:index
      })
    },
    //获取验证码 
    getCode(){
    //校验手机号
      if(this.checkPhone()==false){
        return
      }
      var that = this;
      if (!that.data.counting) {
        //向后端发送请求，通过阿里云短信服务发送短信
        wx.showToast({
          title: '验证码已发送',
        })
        //开始倒计时60秒
        that.countDown(that, 60);
      }
     //校验验证码
     if(this.data.countCode==""&&this.data.countCode.length<6){
      wx.showToast({
        title: '验证码已发送',
        icon:"none",
        duration:1000
      })
      return 
     }
     //校验两次密码是否一致且不为空

    },
    //倒计时60秒
    countDown(that,count){
      if (count == 0) {
        that.setData({
          codeText: '获取验证码',
          counting:false
        })
        return;
      }
      that.setData({
        counting:true,
        codeText: count + '秒后重新获取',
      })
      setTimeout(function(){
        count--;
        that.countDown(that, count);
      }, 1000);
    },
 
  //input绑定手机号
    phone(e){
      let value = e.detail.value.replace(/\D/g, '')
      this.setData({
        phone: value,
      })
    },
    //input绑定密码
    password(e){
      var value=e.detail.value
      this.setData({
        password:value
      })
    },
    //input绑定验证码
    countcode(e){
      var value=e.detail.value
      this.setData({
        countCode:value
      })
    },
    //input绑定注册时的输入密码
    enpassword1(e){
      var value=e.detail.value
      this.setData({
        enpassword1:value
      })
    },
    //input绑定注册时的确认密码
    enpassword2(e){
      var value=e.detail.value
      this.setData({
        enpassword2:value
      })
    },
    //忘记密码的方法
    forgetPassword(e){
      console.log(this.data.phone)
    },
    //登录
    login(){
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
  
      } else if (this.data.phone.length < 11) {
        wx.showToast({
          title: '手机号长度有误，请重新输入！',
          icon: 'none',
          duration: 1500
        })
        this.setData({
          mobileFormat: false,
        })
  
      } else if (!myreg.test(this.data.phone)) {
        wx.showToast({
          title: '手机号有误，请重新输入！',
          icon: 'none',
          duration: 1500
        })
      } 
     else if(this.data.password==""){
        wx.showModal({
          title:"密码不能为空",
          icon:"none",
          duration:1000
        })
      }
      else{
        //校验数据完成,发送请求，成功后回传数据给user.wxml页面显示登录之后的页面,此处先使用假数据
        console.log("校验数据完成")
        this.triggerEvent("changeFlag",{params:this.data.phone})
        wx.switchTab({
          url: '../../pages/user/user',
        })
      }
    },

    //注册
    enroll(){
      //此处开始对各类信息进行校验并且向后端发送请求
      //开发前端阶段，使用假数据首先将页面开发完成
      //注册完成之后自动登录
      this.triggerEvent("changeFlag",{params:this.data.phone})
      wx.switchTab({
        url: '../../pages/user/user',
      })
    },
    //登录或者注册，current为1为登录，为0为注册
    loginOrenroll(){
      if(this.data.current==1){
        this.login()
    }else{
      this.enroll()
    }
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
  }
})
