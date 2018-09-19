// pages/exhibition/index.js
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
    url:getCompanyPageUrl,
    data:{pageNum:p,pageSize:15,types:that.data.rank,industrials:that.data.vocation},
    success: function (res) {
      var l=that.data.exhibitionData
      console.log(l)
      var result=res.data;
      var conts = [];
      if(result.statusCode!=800){
          console.log(result.msg)
          return false;
      }
      for(var i=0,len=result.returnObj.length;i<len;i++){
         conts[i]={},
         conts[i].code=result.returnObj[i].companyCode
         conts[i].img=result.returnObj[i].imgUrl
         conts[i].title = result.returnObj[i].companyName
         conts[i].richTitle=result.returnObj[i].industrial
         conts[i].typeName=result.returnObj[i].cooperationTypeName
         l.push(conts[i])
      }
      console.log(conts)
      that.setData({
        exhibitionData:l
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
      exhibitionData:[],
      rank:"",
      vocation:"",
      attion:true,
      urls:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    console.log(currPage)
    if (currPage.route != "pages/exhibitionFilter/index" && currPage.data.urls != "pages/exhibitionFilter/index"){
      getApp().globalData.sps=[]
      getApp().globalData.sps2=[]
      //this.onLoad();
    }
    console.log(getApp().globalData.sps)
   // 页面初始化 options为页面跳转所带来的参数
    if(getApp().globalData.sps.length>0 || getApp().globalData.sps2.length>0){
      console.log(2)
       this.setData({//将携带的参数赋值
         rank:getApp().globalData.sps.join(","),
         vocation: getApp().globalData.sps2.join(",")
       });
    }else{
      this.setData({//将携带的参数赋值
         rank: "",
         vocation: ""
       });
    }
    p=1;
    this.setData({
      exhibitionData: []
    });
    var that=this;
        GetList(that)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  onShow: function () {
    /*let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    if (currPage.data.urls != "pages/exhibitionFilter/index"){
      getApp().globalData.sps=[]
      getApp().globalData.sps2=[]
      //this.onLoad();
    }*/
    /*let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    if (currPage.data.rank.length > 0 || currPage.data.vocation.length > 0) {
      this.setData({//将携带的参数赋值
        rank: currPage.data.rank.join(","),
        vocation: currPage.data.vocation.join(",")
      });
    } else {
      this.setData({//将携带的参数赋值
        rank: "",
        vocation: ""
      });
    }
    p = 1;
    this.setData({
      exhibitionData: []
    });
    var that = this;
    GetList(that)
    if (this.data.exhibitionData.length>0){  //消失
      this.setData({
        attion:true
      });
    }else{
      this.setData({
        attion:false     //显现
      });
    }*/
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //下拉
    console.log("下拉")
    p=1;
    this.setData({
      exhibitionData: [],
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
    wx.navigateTo({ url: '../companyPage/index?id='+code })
  },
  jumpSearch:function(){
    wx.navigateTo({ url: '../exhibitionSearch/index' })
  },
  jumpFilter:function(){
    wx.navigateTo({ url: '../exhibitionFilter/index' })
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