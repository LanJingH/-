// utils/pageState/index.js
const loading = (that) => {
  return () => {
    that.setData({
      pageState: {
        state: 'loading',
        message: '加载中'
      }
    })
  }
}

const error = (that, message) => {
  return (message = '请检查您的网络连接') => {
    that.setData({
      pageState: {
        state: 'error',
        message
      }
    })
  }
}

const empty = (that, message) => {
  return () => {
    that.setData({
      pageState: {
        state: 'empty',
        message
      }
    })
  }
}

const finish = (that) => {
  return () => {
    that.setData({
      pageState: {
        state: 'finish',
        message: ''
      }
    })
  }
}

export default (that,message) => {
  return {
    loading: loading(that),
    error: error(that),
    empty: empty(that,message),
    finish: finish(that)
  }
}


