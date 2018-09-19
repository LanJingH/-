import pageState from './pageState/index'
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function onRetry(that){
  var abc = pageState(that)
      wx.getNetworkType({
        success: function (res) {
          if (res.networkType == "none") {  //显示 弹框
            abc.error();
            //dd.empty() 
          } else {
            abc.finish()
          }
        }
      })
}

function isNetwork(that){
  var abc = pageState(that)
  wx.getNetworkType({
    success: function (res) {
      if (res.networkType == "none") {  //显示 弹框
        abc.error();
        //dd.empty() 
      } else {
        abc.finish()
      }
    }
  })
  //无网络时做提示no net
  wx.onNetworkStatusChange(function (res) {
    if (res.networkType == "none") {  //显示 弹框
      abc.error();
      console.log("756546")
    } else {
      console.log("dfdskf")
      abc.finish()
      that.onLoad();
    }
  })
}

module.exports = {
  formatTime: formatTime,
  onRetry: onRetry,
  isNetwork: isNetwork
}
