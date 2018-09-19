// pages/membershipServiceMenu/index.js
const WxParse=require('../../wxParse/wxParse.js');
const getMemberServicesUrl = require('../../config').getMemberServicesUrl;  //渲染页面
const isConcernsUrl = require('../../config').isConcernsUrl;  //查询关注
const concernsUrl = require('../../config').concernsUrl;  //点击关注
//import pageState from '../../utils/pageState/index'
const onRetry = require('../../utils/util').onRetry;
const isNetwork = require('../../utils/util').isNetwork;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    atttiontext:"关注",
    id:"",
    atttion:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      id:options.id
    })
    // 页面初始化 options为页面跳转所带来的参数
    if(options.id=="S001"){  //行业动态
        wx.setNavigationBarTitle({
            title: "项目对接"
        })
    }else if(options.id=="S002"){
       wx.setNavigationBarTitle({
            title: "融资服务"
        })
    }else if(options.id=="S003"){
      wx.setNavigationBarTitle({
            title: "技术提升"
        })
    }else if(options.id=="S004"){
      wx.setNavigationBarTitle({
            title: "管理咨询"
        })
    }

    var that=this;
    //渲染html
      wx.request({
          url:getMemberServicesUrl,
          data:{servicesId:options.id},
          success:function(res){
            var result=res.data;
            if(result.statusCode!=800){
                console.log(result.msg)
                return false;
            }
            var article=result.returnObj.h5Text;
            WxParse.wxParse('article', 'html', article, that,20);
          }
      })
      //检测是否关注过
      wx.request({
          url:isConcernsUrl,
          data:{type:"034003",fieldValue:options.id,custId:getApp().globalData.custId},
          success:function(res){
             var result=res.data;
            if(result.statusCode!=800){
                  //console.log(result.msg)
                   wx.showToast({
                      title: result.msg,
                      icon: 'loading',
                      duration: 2000
                    })
                return false;
            }
            console.log(result.returnObj)

            if(!result.returnObj){
                //没有关注
                that.setData({atttiontext:"关注"})
            }else{
                //已经关注
               that.setData({atttiontext:"已关注",atttion:true})
            }
            
          }
      })
  },
  atttionFocus:function(){
    var that=this;
    wx.request({
          url:concernsUrl,
          method: 'POST',
          data:{type:"034003",fieldValue:this.data.id,custId:getApp().globalData.custId},
          success:function(res){
             var result=res.data;
            if(result.statusCode==800){
                //console.log(result.msg)
                //提示关注成功
                wx.showToast({
                    title: result.msg,
                    duration: 2000
                  })
                 that.setData({atttiontext:"已关注",atttion:true})
            }else if(result.statusCode==900){
               //已经关注 提示已关注
                /*wx.showToast({
                    title: result.msg,
                    duration: 2000
                })*/
            }
            
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