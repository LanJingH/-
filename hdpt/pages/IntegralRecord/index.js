const getPointsInfoUrl = require('../../config').getPointsInfoUrl;
import pageState from '../../utils/pageState/index'
// pages/IntegralRecord/index.js
const onRetry = require('../../utils/util').onRetry;
const isNetwork = require('../../utils/util').isNetwork;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList:[],
    recoutNum:"",
    record_count:"" 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(getApp().globalData.custId)
    //渲染html
    wx.request({
        url:getPointsInfoUrl,
        data:{custId:getApp().globalData.custId},
        success:function(res){
          var result=res.data;
          var _data=result.returnObj.pointsInfos
          console.log(_data)
            if(result.statusCode!=800){
                console.log(result.msg)
                return false;
            }
            var counts=[];
            for (var i = 0, len = _data.length; i < len; i++) {
                  counts[i]={};
                  counts[i]._points=_data[i].points
                  counts[i]._pointTypeName=_data[i].pointTypeName
                  counts[i]._createDateStr=_data[i].createDateStr
            }
            that.setData({
               recordList:counts,
               record_count:options.id
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