const getMineInfoUrl = require('../../config').getMineInfoUrl;
//import pageState from '../../utils/pageState/index'
const onRetry = require('../../utils/util').onRetry;
const isNetwork = require('../../utils/util').isNetwork;
// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      _imgUrl:"",
      _companyAlias:"",
      _pointsSum:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
      wx.request({
          url:getMineInfoUrl,
          data:{custId:getApp().globalData.custId},
          success:function(res){
            var result=res.data;
              if(result.statusCode!=800){
                  console.log(result.msg)
                  return false;
              }
              that.setData({
                  _imgUrl:result.returnObj.imgUrl,
                  _companyAlias:result.returnObj.companyAlias,
                  _pointsSum:result.returnObj.pointsSum
              })
          }
      })
  },
  jumpPage :function(){
      var _point=this.data._pointsSum
      wx.navigateTo({ url: '../IntegralRecord/index?id='+_point})
  },
  jumpPage2:function(){
       wx.navigateTo({ url: '../mineProject/index'})
  },
  jumpPage4:function(){
    wx.navigateTo({ url: '../mineActivity/index' })
  },
  jumpPage5:function(){
      wx.navigateTo({ url: '../mineFollowProject/index'})
  },
  jumpPage6:function(){
      wx.navigateTo({ url: '../mineFollowCompany/index' })
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