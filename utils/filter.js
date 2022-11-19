var common = {
  orderStatused: function (_num) {
    switch (_num) {
      case 0: return "已完成"; break;
      case 1: return "正在进行"; break;
      case 2: return "已取消"; break;
      case 200: return "交易成功"; break;
      case 300: return "正在进行"; break;
      case 400: return "交易失败"; break;
      default: return ""; break;
    }
  },
  isCarLicense:function(license){
    
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
}
 
module.exports = {
  orderText: common.orderStatused,
  isCarLicense: common.isCarLicense
}