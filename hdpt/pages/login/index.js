// pages/login2/index.js
// pages/msg/index.js
const sendVerifyUrl = require('../../config').sendVerifyUrl;
const loginOpenidCompUrl = require('../../config').loginOpenidCompUrl;
const loginCodeCompUrl = require('../../config').loginCodeCompUrl;
var interval=null //倒计时函数
var myreg = /^[1][3,4,5,7,8][0-9]{9}$/  //手机号正则
var companyreg=/^[\u4e00-\u9fa5()（）]+$/ //公司正则
Page({

  /**
   * 页面的初始数据
   */
  data: {
    company:'', //公司名称
    phone:'',   //手机号
    password:'',  //验证码
    time:'获取验证码', //倒计时，
    currentTime:61   //当前时间
  },

  //获取公司名称
  companyInput:function(e){
     this.setData({
       company: e.detail.value
     })
  },

  // 获取输入账号
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取短信验证码
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  //获取倒计时
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime;
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 500)
  },

  //触发短信验证码
  getVerificationCode() {
    if (this.data.phone.length == 0) {
      //弹出提示
      wx.showToast({
        title: '请输入手机号',
        icon: 'loading',
        duration: 2000
      })
      return false;
    }else if (!myreg.test(this.data.phone)){
      //弹出提示
      wx.showToast({
        title: '手机号不正确',
        icon: 'loading',
        duration: 2000
      })
      return false;
    }
    var that=this;
    //请求接口
    wx.request({
        url: sendVerifyUrl,
        data: {phone: this.data.phone},
        success: function (res) {
           var result=res.data;
           //console.log(res)
            //调用
           if(result.statusCode!=800){
                wx.showToast({
                  title: result.msg,
                  icon: 'loading',
                  duration: 2000
                })
            }else{
               wx.showToast({
                  title: '验证码发送成功',
                  icon: '',
                  duration: 2000
                })
                //调用倒计时
                that.getCode();
                that.setData({
                  disabled: true
                })
            } 
        }
    })

  },

  //绑定手机号
  login:function(){
    //console.log(getApp().globalData.openid)
    if(this.data.company.length==0){
      //弹出提示
      wx.showToast({
        title: '请输入公司名称',
        icon: 'loading',
        duration: 2000
      })
      return false;
    }else if(!companyreg.test(this.data.company)){
      //弹出提示
      wx.showToast({
        title: '公司格式不正确',
        icon: 'loading',
        duration: 2000
      })
      return false;
    }

    if (this.data.phone.length == 0) {
      //弹出提示
      wx.showToast({
        title: '请输入手机号',
        icon: 'loading',
        duration: 2000
      })
      return false;
    }else if (!myreg.test(this.data.phone)){
      //弹出提示
      wx.showToast({
        title: '手机号不正确',
        icon: 'loading',
        duration: 2000
      })
      return false;
    }

    if (this.data.password.length == 0) {
      //弹出提示
      wx.showToast({
        title: '请输入验证码',
        icon: 'loading',
        duration: 2000
      })
      return false;
    }
    //有openid 调用接口
    if(getApp().globalData.openid){
        wx.request({
            url: loginOpenidCompUrl,
            method:"POST",
            data: {phone: this.data.phone,verify: this.data.password,openid:getApp().globalData.openid,companyName:this.data.company},
            success: function (res) {
               var result=res.data;
               //console.log(res)
                //调用
               if(result.statusCode!=800){
                    //console.log(result.msg)
                     wx.showToast({
                        title: result.msg,
                        icon: 'loading',
                        duration: 2000
                      })
                }else{
                  //让custId重现赋值
                   getApp().globalData.custId=result.returnObj
                  //跳转首页
                  wx.switchTab({  url: '../index/index'}) 
                } 
            }
        })
    }else{ //没有 openid 获取code,调取另外一个接口
      var that=this;
      wx.login({
        success: function(res) {
           if (res.code) {
              wx.request({
                  url: loginCodeCompUrl,
                  method:"POST",
                  data: {phone: that.data.phone,verify: that.data.password,code:res.code,companyName:this.data.company},
                  success: function (res) {
                     var result=res.data;
                     //console.log(res)
                      //调用
                     if(result.statusCode!=800){
                          //console.log(result.msg)
                           wx.showToast({
                            title: result.msg,
                            icon: 'loading',
                            duration: 2000
                          })
                      }else{
                        //让custId重现赋值
                         getApp().globalData.custId=result.returnObj
                        //跳转首页
                        wx.switchTab({  url: '../index/index'}) 
                      } 
                  }
              })
           }
        }
      })
    }
    //跳转首页
    /*wx.switchTab({ 
       url: '../index/index', 
       success: function (res) { 
       // success 
       console.log(res)
       }, 
       fail: function () { 
       // fail 
         console.log("fail")
       }, 
       complete: function () { 
       // complete 
       } 
    }) 
*/
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})