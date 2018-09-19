// pages/publish/index.js
const publishUrl = require('../../config').publishUrl;
//import pageState from '../../utils/pageState/index'
const onRetry = require('../../utils/util').onRetry;
const isNetwork = require('../../utils/util').isNetwork;
var myreg3= /([^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n])|(\s)/g
var myreg2 =/^[\u4e00-\u9fa5a-zA-Z0-9]+$/  //需求/联系人
var myreg = /^[1][3,4,5,7,8][0-9]{9}$/  //手机号正则
Page({

  /**
   * 页面的初始数据
   */
  data: {
    demandtext:"",
    person:"",
    contactWay:"",
    describe:"",
    imageList:[],
    name_focus_1:false,
    name_focus_2: false,
    name_focus_3: false,
    name_focus_4: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  
  },
  //监听 项目需求
  listenDemand:function(e){
    this.data.demandtext=e.detail.value
  },
  //监听 联系人
  listenPerosn:function(e){
    this.data.person=e.detail.value
  },
  //监听 联系方式
  listenContactWay:function(e){
    this.data.contactWay=e.detail.value
  },
  listenDescribe:function(e){
    if(myreg3.test(e.detail.value)){
        wx.showToast({
          title: '不能输入表情',
          icon: 'loading',
          duration: 2000
        })
        this.setData({
            describe:e.detail.value.replace(myreg3, "")
        })
    }else{
      this.data.describe=e.detail.value
    }
    console.log(this.data.contactWay)
  },
  //失去焦点 进行验证
  blurContactWay:function(){
    if (this.data.contactWay.length == 0) {
        //弹出提示
        wx.showToast({
          title: '请输入联系方式',
          icon: 'loading',
          duration: 2000
        })
        return false;
      }else if (!myreg.test(this.data.contactWay)){
        //弹出提示
        wx.showToast({
          title: '联系方式不正确',
          icon: 'loading',
          duration: 2000
        })
        return false;
      }
  },
  //选择图片
  bindChooiceProduct:function(){ 
     var that = this;
     if(this.data.imageList.length <3){
          wx.chooseImage({
            count: 1,  //最多可以选择的图片总数
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = res.tempFilePaths;
              console.log(res)
              that.setData({  
                 imageList: that.data.imageList.concat(res.tempFilePaths) 
              }); 
            }
         })
      }else{
          wx.showToast({  
            title: '图片最多三张',
            icon:"loading"  
          })
          return false;
      }    
  },

  //提交
  listenerButton:function(){
    if(this.data.demandtext.length==0){
       wx.showToast({  
            title: '请输入需求',
            icon:"loading"  
          })
        this.setData({
          name_focus_1:true
        })
        return false;
    } else if (!myreg2.test(this.data.demandtext)){
      //弹出提示
        wx.showToast({
          title: '需求格式不正确',
          icon: 'loading',
          duration: 2000
        })
      this.setData({
        name_focus_1: true
      })
        return false;
    }

    if(this.data.person.length==0){
       wx.showToast({  
            title: '请输入联系人',
            icon:"loading"  
          })
      this.setData({
        name_focus_2: true
      })
       return false;
    } else if (!myreg2.test(this.data.person)) {
      //弹出提示
      wx.showToast({
        title: '联系人格式不正确',
        icon: 'loading',
        duration: 2000
      })
      this.setData({
        name_focus_2: true
      })
      return false;
    }

    console.log(this.data.contactWay)
    if(this.data.contactWay.length==0){
       wx.showToast({  
            title: '请输入联系方式',
            icon:"loading"  
          })
      this.setData({
        name_focus_3: true
      })
       return false;
    }else if (!myreg.test(this.data.contactWay)){
        //弹出提示
        wx.showToast({
          title: '联系方式不正确',
          icon: 'loading',
          duration: 2000
        })
      this.setData({
        name_focus_3: true
      })
        return false;
      }

    if(this.data.describe.length==0){
       wx.showToast({  
            title: '请输入需求描述',
            icon:"loading"  
          })
      this.setData({
        name_focus_3: true
      })
       return false;
    }
    var that=this;
    console.log(getApp().globalData.custId)
    wx.request({
        url:publishUrl,
        method: 'POST',
        data:{projectName:that.data.demandtext,contactMan:that.data.person,tel:that.data.contactWay,description:that.data.describe,requirement:"111",custId:getApp().globalData.custId},
        success:function(res){
          console.log(res)
          var result=res.data;
          if(result.statusCode!=800){
              wx.showToast({  
                title: '发布失败' 
              })
              return false;
          }
          wx.showToast({  
            title: '发布成功' 
          })
       wx.navigateTo({ url: '../mineProject/index' })
        that.setData({
            demandtext:"",
            person:"",
            contactWay:"",
            describe:""
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
    isNetwork(that);
  }
})