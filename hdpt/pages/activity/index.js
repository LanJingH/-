// pages/activity/index.js
const getActivityPageUrl = require('../../config').getActivityPageUrl;
//import pageState from '../../utils/pageState/index'
const onRetry = require('../../utils/util').onRetry;
const isNetwork = require('../../utils/util').isNetwork;
var p = 1
var GetList = function (that) {
  that.setData({
    hidden: false
  });
  wx.request({
    url: getActivityPageUrl,
    data:{pageNum:p,pageSize:15},
    success: function (res) {
        var l=that.data.activitydata
       var result = res.data;
        var flag="";
        var activityDate="";
        const conts = [];
       
        if (result.statusCode != 800) {
            console.log(result.msg)
            return false;
        }
        for (var i = 0, len = result.returnObj.length; i < len; i++) {
          
          if(result.returnObj[i].status==1){
            flag="审核中"
          }else if(result.returnObj[i].status==2){
            flag="报名中"

          }else if(result.returnObj[i].status==3){
            flag="拒绝"
          }else if(result.returnObj[i].status==4){
            flag="报名结束"
          }else if(result.returnObj[i].status==9){
            flag="下架"
          }
          activityDate=result.returnObj[i].startDateStr+'—'+result.returnObj[i].endDateStr
          conts[i]={}
          conts[i].code=result.returnObj[i].activityId
          conts[i].activityimg=result.returnObj[i].imgUrl
          conts[i].title=result.returnObj[i].activityName
          conts[i].richTitle=flag
          conts[i].description=activityDate
          l.push(conts[i])
          
        }
        that.setData({
          activitydata:l
        })
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
    activitydata:[]//活动通知
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     // 页面初始化 options为页面跳转所带来的参数
    p=1;
    this.setData({
       activitydata:[],
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
      activitydata: [],
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
    wx.navigateTo({ url: '../activityDetail/index?id='+code })
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