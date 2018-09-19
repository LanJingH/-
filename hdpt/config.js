/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

// var host = "http://plat.znxk.net:6802"
// var host = "http://192.168.0.70:8080"
 //var host = "https://www.zflyeagle.com/hdpt-infc-web"
var host = "https://union.znxk.net/hdpt-infc-web"
// var host = "http://192.168.0.18:8080/hdpt.infc.web"
// var host = "http://localhost:8080/hdpt.infc.web"
// var host = "http://192.168.0.70:8080/hdpt-infc-web"
//var host = "https://www.zflyeagle.com/hdpt-infc-web"

var config = {

  // 下面的地址配合云端 Server 工作
  host,

  // 用code换取openId
  openIdUrl: `${host}/login/openid`,

  // 根据code获取openid并检查用户绑定状态
  checkBindByCodeUrl: `${host}/login/checkBindByCode`,

  //发送验证码
  sendVerifyUrl: `${host}/login/sendVerify`,

  //登录opendid
  loginOpenidUrl: `${host}/login/loginOpenid`,

  //登录loginCode
  loginCodeUrl: `${host}/login/loginCode`,

  //banner
  getBannersUrl: `${host}/home/getBanners`,

  //行业动态
  getDynamicUrl: `${host}/home/getDynamic`,

  //会员展示
  getCompanyPageUrl: `${host}/home/getCompanyPage`,

  //会员展示详情(公司主页)
  getCompanyUrl: `${host}/home/getCompany`,

  //查询是否关注
  isConcernsUrl: `${host}/home/isConcerns`,

  //点击关注
  concernsUrl: `${host}/home/concerns`,

  //获取行业动态详细信息
  getDynamicDetailUrl: `${host}/home/getDynamicDetail`,

  //活动通知
  getActivityPageUrl: `${host}/home/getActivityPage`,

  //活动通知详情
  getActivityDetailUrl: `${host}/home/getActivityDetail`,

  //会员服务信息
  getMemberServicesUrl: `${host}/home/getMemberServices`,

  //项目信息
  getProjectPageUrl: `${host}/home/getProjectPage`,

  //行业列表
  getRequirementUrl: `${host}/home/getRequirement`,

  //会员等级列表
  getCooperationTypesUrl: `${host}/home/getCooperationTypes`,

  //项目详情 =》基本信息
  getProjectDetailUrl: `${host}/home/getProjectDetail`,
  
  //发布
  publishUrl: `${host}/project/publish`,

  //用户基本信息
  getMineInfoUrl: `${host}/mine/getMineInfo`,

  //积分记录
  getPointsInfoUrl: `${host}/mine/getPointsInfo`,

  //我的项目
  getMineProjectPageUrl: `${host}/mine/getMineProjectPage`,

  //收藏关注 关注的公司
  getMineCompanyPageUrl: `${host}/mine/getMineCompanyPage`,

  //收藏关注  关注的项目需求
  getConcernsProjectPageUrl: `${host}/mine/getConcernsProjectPage`,

  //我的活动
  getConcernsActivityPageUrl: `${host}/mine/getConcernsActivityPage`,

  //登录（2.0） 含有公司名称  code
  loginCodeCompUrl: `${host}/login/loginCodeComp`,

  //登录（2.0） 含有公司名称  openid
  loginOpenidCompUrl: `${host}/login/loginOpenidComp`,

  //消息模块
  getMsgPageUrl: `${host}/msg/getMsgPage`,
  
  //消息模块
  getIndustrialUrl: `${host}/home/getIndustrial` 
};

module.exports = config
