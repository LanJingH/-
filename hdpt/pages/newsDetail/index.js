// pages/newsDetail/index.js
const WxParse=require('../../wxParse/wxParse.js');
const getDynamicDetailUrl = require('../../config').getDynamicDetailUrl;
//import pageState from '../../utils/pageState/index'
const onRetry = require('../../utils/util').onRetry;
const isNetwork = require('../../utils/util').isNetwork;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
   if(options.codeId=="032001"){  //行业咨询
        wx.setNavigationBarTitle({
            title: "行业资讯"
        })
    }else if(options.codeId=="032002"){ //联盟咨询
       wx.setNavigationBarTitle({
            title: "联盟资讯"
        })
    }else if(options.codeId=="032003"){
      wx.setNavigationBarTitle({
            title: "会员资讯"
        })
    }
      this.data.id=options.id
      var that = this;
      console.log(options)
      //渲染html
      wx.request({
          url:getDynamicDetailUrl,
          data:{dynamicId:options.id},
          success:function(res){
            console.log(res)
            var result=res.data;
            if(result.statusCode!=800){
                console.log(result.msg)
                return false;
            }
            var article=result.returnObj.h5Text;
            WxParse.wxParse('article', 'html', article, that, 20);
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