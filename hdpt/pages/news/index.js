const getDynamicUrl = require('../../config').getDynamicUrl;
//import pageState from '../../utils/pageState/index'
const onRetry = require('../../utils/util').onRetry;
const isNetwork = require('../../utils/util').isNetwork;
var p = 1
var GetList = function (that) {
  that.setData({
    hidden: false
  });
  wx.request({
    url:getDynamicUrl,
    data:{pageNum:p,pageSize:15,type:that.data.codeId},
    success: function (res) {
      var l=that.data.newsdata
      console.log(l)
      var result=res.data;
      var conts = [];
      if(result.statusCode!=800){
          console.log(result.msg)
          return false;
      }
      for(var i=0,len=result.returnObj.length;i<len;i++){
         conts[i]={}
         conts[i].code=result.returnObj[i].dynamicId
         conts[i].newsimg=result.returnObj[i].imgUrl
         conts[i].newstext=result.returnObj[i].title
         conts[i].timer = result.returnObj[i].pubDateStr
         l.push(conts[i])
      }
      console.log(conts)
      that.setData({
        newsdata:l
      })
      p++;
      that.setData({
        hidden: true
      });
    }
  });
}
// pages/news/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsdata:[],  //行业动态
    codeId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    if(options.code=="032001"){  //行业动态
        wx.setNavigationBarTitle({
            title: "行业动态"
        })
    }
   
    p=1;
    this.setData({
      newsdata: [],
      codeId:options.code
    });
    var that=this;
        GetList(that)
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //下拉
    console.log("下拉")
    p=1;
    this.setData({
      newsdata: [],
    });
    var that = this
    GetList(that)
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
     //上拉
    console.log("上拉")
    var that = this
    GetList(that)
  },
  jumpPages:function(e){
    var code=e.currentTarget.dataset.textid
        wx.navigateTo({ url: '../newsDetail/index?id='+code+'&codeId='+this.data.codeId })
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