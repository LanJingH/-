// pages/exhibitionSearch/index.js
const getCompanyPageUrl = require('../../config').getCompanyPageUrl;
//import pageState from '../../utils/pageState/index'
const onRetry = require('../../utils/util').onRetry;
const isNetwork = require('../../utils/util').isNetwork;
var p = 1
var GetList = function (that) {
  that.setData({
    hidden: false
  });
    wx.request({
      url: getCompanyPageUrl,
      data: { pageNum: p, pageSize: 15 ,companyName:that.data.search_data},
      success: function (res) {
        var l = that.data.exhibitionData
        console.log(l)
        var result = res.data;
        var conts = [];
        if (result.statusCode != 800) {
          console.log(result.msg)
          return false;
        }
        for (var i = 0, len = result.returnObj.length; i < len; i++) {
          conts[i] = {},
          conts[i].code = result.returnObj[i].companyCode
          conts[i].img = result.returnObj[i].imgUrl
          conts[i].title = result.returnObj[i].companyName
          conts[i].richTitle = result.returnObj[i].industrial
          conts[i].typeName = result.returnObj[i].cooperationTypeName
          l.push(conts[i])
        }
        that.setData({
          exhibitionData: l
        })
        if (that.data.exhibitionData.length > 0) {  //消失
          that.setData({
            attion: true
          });
        } else {
          that.setData({
            attion: false     //显现
          });
        }
        p++;
        that.setData({
          hidden: true
        });
      }
    });
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    exhibitionData: [],
    search_data:"",
    attion:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  listenName:function(e){
     this.data.search_data=e.detail.value
  },

  listenSearch:function(){
    // 页面初始化 options为页面跳转所带来的参数
    p=1;
    this.setData({
      exhibitionData: []
    });
    var that=this;
    wx.request({
      url: getCompanyPageUrl,
      data: { pageNum: p, pageSize: 15 ,companyName:that.data.search_data},
      success: function (res) {
        var result = res.data;
        var conts = [];
        if (result.statusCode != 800) {
          console.log(result.msg)
          return false;
        }
        for (var i = 0, len = result.returnObj.length; i < len; i++) {
          conts[i] = {},
          conts[i].code = result.returnObj[i].companyCode
          conts[i].img = result.returnObj[i].imgUrl
          conts[i].title = result.returnObj[i].companyName
          conts[i].richTitle = result.returnObj[i].industrial
          conts[i].typeName = result.returnObj[i].cooperationTypeName
        }
        that.setData({
          exhibitionData: conts
        })
        if (that.data.exhibitionData.length>0){  //消失
            that.setData({
              attion:true
            });
          }else{
            that.setData({
              attion:false     //显现
            });
        }
        that.setData({
          hidden: true
        });
      }
    });
    p=2;
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
    wx.navigateTo({ url: '../companyPage/index?id='+code })
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