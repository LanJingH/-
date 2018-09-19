// pages/projectList/index.js
const getMineProjectPageUrl = require('../../config').getMineProjectPageUrl;
//import pageState from '../../utils/pageState/index'
const onRetry = require('../../utils/util').onRetry;
const isNetwork = require('../../utils/util').isNetwork;
var p = 1
var GetList = function (that) {
  that.setData({
    hidden: false
  });
  wx.request({
    url:getMineProjectPageUrl,
    data:{pageNum:p,pageSize:15,"orderByType":that.data.nums,"requirement":that.data.projectName,custId:getApp().globalData.custId},
    success: function (res) {
      var l=that.data.projectList
      console.log(l)
      var result=res.data;
      var conts = [],flag="";
      if(result.statusCode!=800){
          console.log(result.msg)
          return false;
      }
      for(var i=0,len=result.returnObj.length;i<len;i++){
        if (result.returnObj[i].status == 1) {
          flag = "审核中"
        } else if (result.returnObj[i].status == 2) {
          flag = "已发布"

        } else if (result.returnObj[i].status == 3) {
          flag = "已驳回"
        } else if (result.returnObj[i].status == 9) {
          flag = "下架"
        }
         conts[i]={},
         conts[i].code=result.returnObj[i].projectId
         conts[i].name=result.returnObj[i].projectName
         conts[i].timer=result.returnObj[i].pubDateStr
         conts[i].person=result.returnObj[i].contactMan
         conts[i].tel=result.returnObj[i].tel
         conts[i].status = flag
         l.push(conts[i])
      }
      console.log(conts)
      that.setData({
        projectList:l
      })
      if (that.data.projectList.length > 0) {  //消失
        that.setData({
          attion: true
        });
      } else {
        that.setData({
          attion: false     //显现
        });
      }
      p++;
    }
  });
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
      projectList:[],
      url:'../../images/bottom.png',
      urls:"../../images/_no_check.png",
      attion:true,
      nums:1,
      showModalStatus:false,
      preparat:false,//行业字体颜色
      projectList:[],
      catalog:0,
      projectName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    p=1;
    this.setData({
      projectList: [],
    });
    var that=this;
        GetList(that)
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    p = 1;
    this.setData({
      projectList: [],
    });
    var that = this;
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
  //
 jumpPages:function(e){
    var code=e.currentTarget.dataset.textid
        wx.navigateTo({ url: '../mineProjectDetail/index?id='+code })
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