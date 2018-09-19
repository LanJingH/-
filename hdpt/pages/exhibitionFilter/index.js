// pages/exhibitionFilter/index.js
const getCooperationTypesUrl = require('../../config').getCooperationTypesUrl;   //会员等级列表
const getIndustrialUrl = require('../../config').getIndustrialUrl;        //行列列表
//import pageState from '../../utils/pageState/index'
const onRetry = require('../../utils/util').onRetry;
const isNetwork = require('../../utils/util').isNetwork;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankAry: [],
    vocationAry:[],
    attion:false,
    rankSeleAry:[],
    vocationSeleAry:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var ppt=[];
      //会员等级
      wx.request({
        url:getCooperationTypesUrl,
        success:function(res){
          var result=res.data;
          var conts = []; 
          if(result.statusCode!=800){
              console.log(result.msg)
              return false;
          }
          for(var i=0,len=result.returnObj.length;i<len;i++){
              conts[i]={};
              conts[i].name=result.returnObj[i].configName
              conts[i].code=result.returnObj[i].configCode
              conts[i].state=0;
              ppt.push(result.returnObj[i].configCode)
          }
          that.setData({
            rankAry:conts,
            rankSeleAry: getApp().globalData.sps//wx.getStorageSync('_rank')

          });
          var _rank=getApp().globalData.sps//wx.getStorageSync('_rank');
          for(var i=0,len=_rank.length;i<len;i++){
              console.log(_rank[i])
              var index_selep = ppt.indexOf(_rank[i]);
              that.data.rankAry[index_selep].state = 1;
          }
          that.setData({
            rankAry: that.data.rankAry
          });

        }
      })
      //行业
      wx.request({
        url:getIndustrialUrl,
        success:function(res){
          var result=res.data;
          var conts = []; 
          if(result.statusCode!=800){
              console.log(result.msg)
              return false;
          }
          for(var i=0,len=result.returnObj.length;i<len;i++){
              conts[i]={};
              conts[i].name=result.returnObj[i]
              conts[i].state=0;
          }
          that.setData({
            vocationAry:conts,
            vocationSeleAry: getApp().globalData.sps2
          });
          var _vocations=getApp().globalData.sps2;
          for(var i=0,len=_vocations.length;i<len;i++){
              console.log(_vocations[i])
              var index_selep = result.returnObj.indexOf(_vocations[i]);
              console.log(index_selep)
              that.data.vocationAry[index_selep].state = 1;
          }
          that.setData({
            vocationAry: that.data.vocationAry
          });

        }
      })
      
  },
  listenfilter: function (e) {
    let index = e.currentTarget.dataset.key;    //获取所有的index

    let code = e.currentTarget.dataset.textid || e.target.dataset.textid;

    let index_sele = this.data.rankSeleAry.indexOf(code);   //获取选中的index

    if (this.data.rankAry[index].state == 1) {

        this.data.rankSeleAry.splice(index_sele,1)

        this.data.rankAry[index].state = 0;

      } else if (this.data.rankAry[index].state == 0) {

        this.data.rankSeleAry.push(code)

        this.data.rankAry[index].state = 1;
      }

    this.setData({
      rankAry: this.data.rankAry,
      rankSeleAry:this.data.rankSeleAry
    });
  },
  listenfilter2: function (e) {

    let index = e.currentTarget.dataset.key;

    let code = e.currentTarget.dataset.textid || e.target.dataset.textid;

    let index_sele = this.data.vocationSeleAry.indexOf(code);   //获取选中的index

    console.log(index)
    if (this.data.vocationAry[index].state == 1) {

      this.data.vocationSeleAry.splice(index_sele,1)

      this.data.vocationAry[index].state = 0;

    } else if (this.data.vocationAry[index].state == 0) {

      this.data.vocationSeleAry.push(code)
      this.data.vocationAry[index].state = 1;

    }
    this.setData({
      vocationAry: this.data.vocationAry,
      vocationSeleAry:this.data.vocationSeleAry
    });
  },
  conBtn:function(){
    /*wx.setStorage({key:"_rank",data:this.data.rankSeleAry})
    wx.setStorage({key:"_vocation",data:this.data.vocationSeleAry})*/
    getApp().globalData.sps=this.data.rankSeleAry
    getApp().globalData.sps2=this.data.vocationSeleAry
    console.log(getApp().globalData.sps)
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length - 2];//上一页面
    prevPage.setData({//直接给上移页面赋值
      urls: 'pages/exhibitionFilter/index'
    });
    /*    prevPage.setData({//直接给上移页面赋值
           rank:this.data.rankSeleAry,
           vocation:this.data.vocationSeleAry
        });*/
    wx.navigateBack({
      delta:1,
      success:function(){
          prevPage.onLoad();
      }
    })

  },
  clearData:function(){
    for(var i=0,len=this.data.vocationAry.length;i<len;i++){
       this.data.vocationAry[i].state = 0;
    }
    for(var i=0,len=this.data.rankAry.length;i<len;i++){
       this.data.rankAry[i].state = 0;
    }
    this.setData({
      rankAry:this.data.rankAry,
      vocationAry: this.data.vocationAry,
      rankSeleAry:[],
      vocationSeleAry:[]
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.data.rankAry)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    /*for(var i=0,len=this.data._vocations.length;i<len;i++){
       this.data.vocationAry[i].state = 1;
    }*/
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