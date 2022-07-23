const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

function checkLogin(call){
  wx.checkSession({
    success: function () {
      wx.getStorage({
        key: "me", // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
        success(res) {
          if (res.data != null && new Date(res.data.expiresAt) > new Date()) {
            call(true);
          }
          else{
            call(false);
          }
        },
        fail:function(){
          call(false);
        }
      });
    },
    fail: function () {
      call(false);
    },
  });
}

module.exports = {
  formatTime,
  checkLogin
}
