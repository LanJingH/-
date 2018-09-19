// pages/membershipService/index.js
const getBannersUrl = require('../../config').getBannersUrl;
const getActivityPageUrl = require('../../config').getActivityPageUrl;
const getDynamicUrl = require('../../config').getDynamicUrl;
//import pageState from '../../utils/pageState/index'
const onRetry = require('../../utils/util').onRetry;
const isNetwork = require('../../utils/util').isNetwork;
Page({

  /**
   * 页面的初始数据
   */
  data: {
     imgUrls: [],   //banner
     activitydata:[], //活动通知
     dynamicsdata:[], //会员动态
     menudata:[{ 
          "menuimg": "../../images/icon_5.png",
          "menutext":"项目对接",
          "menuname":"projectDock"
        }, {
          "menuimg": "../../images/icon_6.png",
          "menutext": "融资服务",
          "menuname": "financService"
        }, {
          "menuimg": "../../images/icon_7.png",
          "menutext": "技术提升",
          "menuname": "technicalSupport"
        }, {
          "menuimg": "../../images/icon_8.png",
          "menutext": "管理咨询",
          "menuname": "capitalOperat"
      }],
      indicatorDots: true,
      circular:true,
      autoplay: true,
      interval: 2000,
      duration: 1000
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //banner
    wx.request({
      url: getBannersUrl,
      data: { level: 2 },
      success: function (res) {
        var result = res.data;
        var conts = [];
        if (result.statusCode != 800) {
          console.log(result.msg)
          return false;
        }
        for (var i = 0, len = result.returnObj.length; i < len; i++) {
          console.log(result.returnObj[i].imgUrl)
          conts.push(result.returnObj[i].imgUrl)
        }
        that.setData({
          imgUrls: conts
        })

      }
    })

    //活动通知
    wx.request({
      url: getActivityPageUrl,
      data: { pageNum:1,pageSize:2 },
      success: function (res) {
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
          
        }
        that.setData({
          activitydata: conts
        })

      }
    })

    //会员动态
     wx.request({
        url:getDynamicUrl,
        data:{pageNum:"1",pageSize:"5",type:"032003"},
        success:function(res){
          var result=res.data;
          var conts=[];
          if(result.statusCode!=800){
              console.log(result.msg)
              return false;
          }
          for(var i=0,len=result.returnObj.length;i<len;i++){
             conts[i]={}
             conts[i].code=result.returnObj[i].dynamicId
             conts[i].dynamicsimg=result.returnObj[i].imgUrl
             conts[i].dynamicstext=result.returnObj[i].title
             conts[i].timer = result.returnObj[i].pubDateStr
          }
          that.setData({
            dynamicsdata:conts
          })
        
        }
    })

  },
  jumpPages:function(e){
    console.log(e.currentTarget.id)
    if(e.currentTarget.id=="projectDock"){
      console.log(0)
      wx.navigateTo({ url: '../membershipServiceMenu/index?id=S001'})
    }else if(e.currentTarget.id=="financService"){
      console.log(1)
      wx.navigateTo({ url: '../membershipServiceMenu/index?id=S002'})
    }else if(e.currentTarget.id=="technicalSupport"){
      console.log(2)
      wx.navigateTo({ url: '../membershipServiceMenu/index?id=S003'})
    }else if(e.currentTarget.id=="capitalOperat"){
      wx.navigateTo({ url: '../membershipServiceMenu/index?id=S004'})
    }else if(e.currentTarget.id=="activity-more"){  //活动通知
      console.log(3)
      wx.navigateTo({ url: '../activity/index'})

    }else if(e.currentTarget.id=="dynamics-more"){
      console.log(4)
      wx.navigateTo({ url: '../dynamics/index?code=032003'})
    }
    /*if(e.currentTarget.dataset.id){

    }*/
  },
  unionDetails:function(e){
     var code=e.currentTarget.dataset.textid
        wx.navigateTo({ url: '../newsDetail/index?id='+code+'&codeId=032003' })
  },
  activityDetails:function(e){
    var code=e.currentTarget.dataset.textid
        wx.navigateTo({ url: '../activityDetail/index?id='+code })
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