const checkBindByCodeUrl = require('./config').checkBindByCodeUrl;
//app.js
App({
  onLaunch: function () {
    wx.setStorage({key:"_rank",data:[]})
    wx.setStorage({key:"_vocation",data:[]})
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    var self = this;
    if (!self.globalData.openid) {
      // 登录
      wx.login({
        success: data => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log(data.code);
          wx.request({
            url: checkBindByCodeUrl,
            data: {
              code: data.code
            },
            success: function (res) {
              console.log('拉取openid成功', res);
              self.globalData.openid = res.data.returnObj.openid;
              self.globalData.isBind = res.data.returnObj.isBind;
              self.globalData.custId = res.data.returnObj.custId;
              //判断是否绑定
              if(self.globalData.isBind==true){ //绑定后 进入首页
                 wx.switchTab({ url: '../index/index' })  
                //wx.navigateTo({ url: '../index/index' })
                }else{  //未绑定  进入登录页
                  //wx.navigateTo({ url: '../login/index' })
                }
            },
            fail: function (res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
            }
          });
        }
      })
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    hasLogin: false,
    openid: null,
    isBind:false,
    custId:null,
    sps:[],  //存储数据  等级
    sps2:[]  //存储数据   行业
  },
   // lazy loading openid
  getUserOpenId: function (callback) {
    var self = this

    if (!self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      wx.login({
        success: function (data) {
          wx.request({
            url: openIdUrl,
            data: {
              code: data.code
            },
            success: function (res) {
              console.log('拉取openid成功', res)
              self.globalData.openid = res.data.openid
              callback(null, self.globalData.openid)
            },
            fail: function (res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              callback(res)
            }
          })
        },
        fail: function (err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })
    }
  }
})