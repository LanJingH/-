// pages/mineProjectDetail/index.js
const WxParse=require('../../wxParse/wxParse.js');
const getProjectDetailUrl = require('../../config').getProjectDetailUrl; //渲染页面
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
      _projectName:"",
      _requirement:"",
      _pubName:"",
      _tel:"",
      _email:"",
      _pubDateStr:"",
      attchList:[],
      atttiontext:"关注",
      id:"",
      atttion:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        id:options.id
      })
      var that=this;
      //渲染页面
      wx.request({
        url:getProjectDetailUrl,
        data:{projectId:options.id},
        success:function(res){
          console.log(res)
          var result=res.data;
            if(result.statusCode!=800){
                console.log(result.msg)
                return false;
            }

            //基本信息
            that.setData({
              _projectName:result.returnObj.projectName,
              _contactMan:result.returnObj.contactMan,
              _tel:result.returnObj.tel,
              _pubDateStr:result.returnObj.pubDateStr
            })

            //需求描述
            var article=result.returnObj.description;
            WxParse.wxParse('article', 'html', article, that, 20);

            //项目资料
            var _nameArr=result.returnObj.projectAttachs;
            var conts=[];
            for(var i=0,len=_nameArr.length;i<len;i++){
              conts[i]={};
              conts[i]._url=_nameArr[i].attchUrl
              conts[i]._name=_nameArr[i].attchName
            }
            that.setData({
              attchList:conts
            })

        }
      })
      //检测是否关注过
      wx.request({
          url:isConcernsUrl,
          data:{type:"034001",fieldValue:options.id,custId:getApp().globalData.custId},
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
          data:{type:"034001",fieldValue:this.data.id,custId:getApp().globalData.custId},
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
  loadFiled:function(e){
    var _urls=e.currentTarget.dataset.urls
    console.log(_urls)
    wx.downloadFile({
        url:_urls,
        success:function(res){
          console.log(res)
          var filePath=res.tempFilePath
               wx.showToast({
                    title:"下载成功"
                })
          /*wx.saveFile({
                tempFilePath: res.tempFilePath,
                success:function(){
                    wx.showToast({
                        title:"下载成功"
                    })
                }
           })*/
           wx.openDocument({
              filePath: filePath,
              success:function(){
                 wx.showToast({
                        title:"打开成功"
                    })
              },
              fail:function(){
                   wx.showToast({
                    title: '打开失败',
                    icon:"loading",
                    duration: 2000
                  })
              }

           })

        },
        fail:function(){
           wx.showToast({
              title: '下载失败',
              duration: 2000
            })

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
        isNetwork(thats)
  }
})