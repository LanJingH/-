// pages/msg/index.js
const getMsgPageUrl = require('../../config').getMsgPageUrl;
//import pageState from '../../utils/pageState/index'
const onRetry = require('../../utils/util').onRetry;
const isNetwork = require('../../utils/util').isNetwork;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      atttion:true,
      msgAry:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
      //渲染html
     wx.request({
        url:getMsgPageUrl,
        data:{pageNum:1,pageSize:100,custId:getApp().globalData.custId,msgType:2},
        success:function(res){
          var result = res.data;
          var conts = [];
          if (result.statusCode != 800) {
            console.log(result.msg)
            return false;
          }
          for (var i = 0, len = result.returnObj.length; i < len; i++) {
               conts[i]={};
               conts[i].send_date=result.returnObj[i].sendDateStr
               conts[i].msg_text=result.returnObj[i].msgText
               if(result.returnObj[i].msgType==1){
                conts[i].msg_title='系统通知'
                }else{
                  conts[i].msg_title='联盟通知'
                }
          }
          that.setData({
            msgAry: conts,
            atttion: true
          })


        }
      })
  },
  changeBg: function(e){
    var code = e.currentTarget.dataset.textid;
    var that=this;
    if(code==1){
      // 系统通知  atttion=false
      this.setData({
        atttion: false
      })
    }else{
      //联盟通知 atttion=true
      this.setData({
        atttion: true
      })
    }
    wx.request({
        url:getMsgPageUrl,
        data:{pageNum:1,pageSize:100,custId:getApp().globalData.custId,msgType:code},
        success:function(res){
          var result = res.data;
          var conts = [];
          if (result.statusCode != 800) {
            console.log(result.msg)
            return false;
          }
          for (var i = 0, len = result.returnObj.length; i < len; i++) {
              conts[i]={};
              conts[i].send_date=result.returnObj[i].sendDateStr
              conts[i].msg_text=result.returnObj[i].msgText
              if(result.returnObj[i].msgType==1){
                conts[i].msg_title='系统通知'
              }else{
                conts[i].msg_title='联盟通知'
              }
          }
          that.setData({
            msgAry: conts
          })


        }
      })
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
    this.setData({
      atttion: true
    })
    this.onLoad()
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
  
  },
  //点击重试
  onRetry: function () {
    var that = this;
        onRetry(that)
  },
  onShow: function () {
    var that = this;
        isNetwork(that)
  }
})