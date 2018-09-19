// pages/activityDetail/index.js
const getActivityDetailUrl = require('../../config').getActivityDetailUrl;
const isConcernsUrl = require('../../config').isConcernsUrl;
const concernsUrl = require('../../config').concernsUrl;
const WxParse=require('../../wxParse/wxParse.js');
//import pageState from '../../utils/pageState/index'
const onRetry = require('../../utils/util').onRetry;
const isNetwork = require('../../utils/util').isNetwork;
Page({

  /**
   * 页面的初始数据
   */
  data: {
     // text:"这是一个页面"
    hiddenModal: true,
    atttion:false,
    titleMore:false,
    atttiontext:"确认报名",
    img:"",
    name:"",
    sponsor:"",
    person:"",
    tel:"",
    lastDate:"",
    dates:"",
    adress:"",
    status:"",
    id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.id)
    that.data.id=options.id
    
     //渲染html
      wx.request({
          url:getActivityDetailUrl,
          data:{activityId:options.id},
          success:function(res){
            var result=res.data;
            var flag="";
            var flag_bg="";
            if(result.statusCode!=800){
                console.log(result.msg)
                return false;
            }
            console.log(result)
            if(result.returnObj.status==1){
                flag="审核中"
              }else if(result.returnObj.status==2){
                flag="报名中"
              }else if(result.returnObj.status==3){
                flag="拒绝"
              }else if(result.returnObj.status==4){
                flag="报名结束"
                flag_bg=true
              }else if(result.returnObj.status==9){
                flag="下架"
              }

            that.setData({
               img :result.returnObj.imgUrl,
               name :result.returnObj.activityName,
               sponsor :result.returnObj.sponsor,
               person :result.returnObj.contactMan,
               tel: result.returnObj.tel,
               lastDate :result.returnObj.closingDateStr,
               dates :result.returnObj.startDateStr + "—"+result.returnObj.endDateStr,
               adress :result.returnObj.address,
               status:flag,
               titleMore:flag_bg
            })
             var article=result.returnObj.h5Text;
             WxParse.wxParse('article', 'html', article, that, 20);

          }
      })
     //检测是否关注过
      wx.request({
          url:isConcernsUrl,
          data:{type:"034004",fieldValue:options.id,custId:getApp().globalData.custId},
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
                that.setData({atttiontext:"确认报名"})
            }else{
                //已经关注
               that.setData({atttiontext:"已报名",atttion:true})
            }
            
          }
      })
  
  },
  listenerButton:function() {
    console.log(this.data.atttion)
    if(!this.data.atttion){
        this.setData({
          hiddenModal: false
       })
    }else{
      this.setData({
          hiddenModal: true
       })
      this.comFun()
    }
      
  },
  listenerConfirm:function() {
      //发送请求 按钮添加背景颜色
      this.setData({
          hiddenModal: true,
      })
      this.comFun()
  },

  listenerCancel:function() {
      this.setData({
          hiddenModal: true
      })
  },
  comFun:function(){
     var that=this;
     wx.request({
            url:concernsUrl,
            method: 'POST',
            data:{type:"034004",fieldValue:that.data.id,custId:getApp().globalData.custId},
            success:function(res){
               var result=res.data;
              if(result.statusCode==800){
                  //console.log(result.msg)
                  //提示关注成功
                  wx.showToast({
                      title: result.msg,
                      duration: 2000
                    })
                  that.setData({atttiontext:"已报名",atttion:true})
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