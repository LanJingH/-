// pages/projectList/index.js
const getProjectPageUrl = require('../../config').getProjectPageUrl;
const getRequirementUrl = require('../../config').getRequirementUrl;
//import pageState from '../../utils/pageState/index'
const onRetry = require('../../utils/util').onRetry;
const isNetwork = require('../../utils/util').isNetwork;
var p = 1
var GetList = function (that) {
  that.setData({
    hidden: false
  });
  wx.request({
    url:getProjectPageUrl,
    data:{pageNum:p,pageSize:15,"orderByType":that.data.nums,"requirement":that.data.projectName},
    success: function (res) {
      var l=that.data.projectList
      console.log(l)
      var result=res.data;
      var conts = [];
      if(result.statusCode!=800){
          console.log(result.msg)
          return false;
      }
      for(var i=0,len = result.returnObj.length; i < len;i++){
         conts[i]={},
         conts[i].code=result.returnObj[i].projectId
         conts[i].name=result.returnObj[i].projectName
         conts[i].timer=result.returnObj[i].pubDateStr
         conts[i].person=result.returnObj[i].pubName
         conts[i].projectType=result.returnObj[i].requirement
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
      projectList:[],
      url:'../../images/bottom.png',
      urls:"../../images/_no_check.png",
      atttion:false, //时间的切换
      attion:true,  //空白页面的显示
      nums:1,
      showModalStatus:false,
      preparat:false,//行业字体颜色
      preparatList:[],
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

    //加载行业列表
    wx.request({
       url:getRequirementUrl,
       success: function (res) {
         var result=res.data;
         var conts_1=[];
          if(result.statusCode!=800){
              console.log(result.msg)
              return false;
          }
          conts_1[0]={"select":0,"txt":"全部"};
          for(var i=0;i<result.returnObj.length;i++){
            conts_1[i+1]={};
            conts_1[i+1].select=i+1,
            conts_1[i+1].txt=result.returnObj[i]
          }
          that.setData({
            preparatList:  conts_1
          });
          
       }
    })
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
  //点击时间按钮
  change_img:function(){
    //时间的 nums值
    this.data.nums==1? this.setData({ nums:2 }) : this.setData({ nums:1 });

    //时间 字体的颜色变化
    this.setData({
      atttion: !this.data.atttion
    });

    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
          duration: 200,  //动画时长
          timingFunction: "linear", //线性
          delay: 0  //0则不延迟
      });
       // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;
 
    // 第3步：执行第一组动画：Y轴偏移440px后(盒子高度是440px)，停
    animation.translateY(-440).step();
 
    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })
     // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画：Y轴不偏移，停
      animation.translateY(0).step()
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })
      //关闭抽屉
      this.setData(
        {
          showModalStatus: false,
          preparat: false,
          urls:'../../images/_no_check.png'
        }
      );
    }.bind(this), 200)

    p=1;
    this.setData({
      projectList: [],
    });
    var that=this;
        GetList(that)
  },
  //点击行业按钮 列表框的弹出
  powerDrawer: function (e) {
    this.util()
  },
  util: function(currentStatu){
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });
    
    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;
 
    // 第3步：执行第一组动画：Y轴偏移440px后(盒子高度是440px)，停
    animation.translateY(-240).step();
 
    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })
    
    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画：Y轴不偏移，停
      animation.translateY(0).step()
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })
      this.data.urls=='../../images/_no_check.png'? this.setData({ urls:'../../images/_check.png' }) : this.setData({ urls:'../../images/_no_check.png' });
      this.setData(
          {
            showModalStatus: !this.data.showModalStatus,
            preparat: !this.data.preparat

          }
        );
    }.bind(this), 200)

  },
  //点击列表任何一个元素  执行事件   
  closeMenu:function(res){
    console.log(res.currentTarget.dataset.name)
    //请求数据
    if(res.currentTarget.dataset.name=="全部"){
        this.setData({
           projectName:""
        })
      }else{
        this.setData({
            projectName:res.currentTarget.dataset.name
        })
       
      }

      p=1;
      this.setData({
        projectList: [],
      });
      var that=this;
          GetList(that)
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });
       // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;
 
    // 第3步：执行第一组动画：Y轴偏移440px后(盒子高度是440px)，停
    animation.translateY(-440).step();
 
    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })
     // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画：Y轴不偏移，停
      animation.translateY(0).step()
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })
      //关闭抽屉
      this.setData(
        {
          showModalStatus: false,
          preparat: false,
          catalog:res.currentTarget.dataset.select,
          urls:'../../images/_no_check.png'
        }
      );
    }.bind(this), 200)
  },
  //
 jumpPages:function(e){
    var code=e.currentTarget.dataset.textid
    wx.navigateTo({ url: '../projectDetail/index?id='+code })
  },
  preventTouchMove:function(){
    
  },
  //点击重试
  onRetry: function () {
    var that = this;
    onRetry(that)
  },
  onReady: function () {
    var that = this;
    isNetwork(that)
  }
})