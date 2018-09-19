const getBannersUrl = require('../../config').getBannersUrl;
const getDynamicUrl = require('../../config').getDynamicUrl;
//import pageState from '../../utils/pageState/index'
const onRetry = require('../../utils/util').onRetry;
const isNetwork = require('../../utils/util').isNetwork;

Page({
  data: {
    imgUrls: [],   //banner
    newsdata:[],  //行业动态
    uniondata:[], //联盟动态
    menudata:[{ 
          "menuimg": "../../images/icon_1.png",
          "menutext":"项目信息",
          "menuname":"inform"
        }, {
          "menuimg": "../../images/icon_2.png",
          "menutext": "会员展示",
          "menuname": "exhibition"
        }, {
          "menuimg": "../../images/icon_3.png",
          "menutext": "会员服务",
          "menuname": "service"
      }],
    indicatorDots: true,
    circular: true,
    autoplay: true,
    interval: 2500,
    duration: 500,
    nonet: true
  },
  onLoad: function (options) {
    console.log(2)
    //var dd=pageState(that,"亲 暂无提交的项目呦~")
     var that = this;
      //banner
      wx.request({
          url:getBannersUrl,
          data:{level:1},
          success:function(res){
            var result=res.data;
            var conts=[];
            if(result.statusCode!=800){
                console.log(result.msg)
                return false;
            }
            for(var i=0,len=result.returnObj.length;i<len;i++){
              console.log(result.returnObj[i].imgUrl)
                conts.push(result.returnObj[i].imgUrl)
            }
            that.setData({
              imgUrls:conts
            })
          
          }
      })
      //行业动态
       wx.request({
          url:getDynamicUrl,
          data:{pageNum:"1",pageSize:"5",type:"032001"},
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
               conts[i].unionimg=result.returnObj[i].imgUrl
               conts[i].uniontext=result.returnObj[i].title
               conts[i].timer=result.returnObj[i].pubDateStr
            }
            that.setData({
              newsdata:conts
            })
          
          }
      })
      //联盟动态
       wx.request({
          url:getDynamicUrl,
          data:{pageNum:"1",pageSize:"5",type:"032002"},
          success:function(res){
            console.log(res)
            var result=res.data;
            var conts=[];
            if(result.statusCode!=800){
                console.log(result.msg)
                return false;
            }
            for(var i=0,len=result.returnObj.length;i<len;i++){
               conts[i]={}
               conts[i].code=result.returnObj[i].dynamicId
               conts[i].unionimg=result.returnObj[i].imgUrl
               conts[i].uniontext=result.returnObj[i].title
               conts[i].timer=result.returnObj[i].pubDateStr
            }
            that.setData({
              uniondata:conts
            })
          
          }
      })

  },
  jumpPages:function(e){
    console.log(e.currentTarget.id)
    if(e.currentTarget.id=="inform"){
      console.log(0)
     wx.navigateTo({ url: '../projectList/index'})
    }else if(e.currentTarget.id=="exhibition"){
      console.log(1)
      wx.navigateTo({ url: '../exhibition/index'})
    }else if(e.currentTarget.id=="service"){
      console.log(2)
     wx.navigateTo({ url: '../membershipService/index'})
    }else if(e.currentTarget.id=="news-more"){
      console.log(3)
      wx.navigateTo({ url: '../news/index?code=032001'})

    }else if(e.currentTarget.id=="union-more"){
      console.log(4)
       wx.navigateTo({ url: '../union/index?code=032002'})
    }
    /*if(e.currentTarget.dataset.id){

    }*/
  },
  newsDetails:function(e){
    console.log(2)
    var code=e.currentTarget.dataset.textid
        wx.navigateTo({ url: '../newsDetail/index?id='+code+'&codeId=032001' })
  },
  unionDetails:function(e){
    var code=e.currentTarget.dataset.textid
        wx.navigateTo({ url: '../newsDetail/index?id='+code+'&codeId=032002' })
  },
  listenerCancel:function(){  //点击取消
    this.setData({ nonet: true })
  },
  //点击重试
  onRetry:function(){
    var that=this;
    onRetry(that)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {
    var that=this;
    isNetwork(that)
  },
})